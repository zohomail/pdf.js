import {
  awaitPromise,
  closePages,
  FSI,
  kbFocusNext,
  loadAndWait,
  PDI,
} from "./test_utils.mjs";

function waitForThumbnailVisible(page, pageNum) {
  return page.waitForSelector(
    `.thumbnailImage[data-l10n-args='{"page":${pageNum}}']`,
    { visible: true }
  );
}

async function waitForMenu(page, buttonSelector, visible = true) {
  return page.waitForFunction(
    (selector, vis) => {
      const button = document.querySelector(selector);
      if (!button) {
        return false;
      }
      return button.getAttribute("aria-expanded") === (vis ? "true" : "false");
    },
    {},
    buttonSelector,
    visible
  );
}

describe("PDF Thumbnail View", () => {
  describe("Works without errors", () => {
    let pages;

    beforeEach(async () => {
      pages = await loadAndWait("tracemonkey.pdf", "#viewsManagerToggleButton");
    });

    afterEach(async () => {
      await closePages(pages);
    });

    it("should render thumbnails without errors", async () => {
      await Promise.all(
        pages.map(async ([browserName, page]) => {
          await page.click("#viewsManagerToggleButton");

          const thumbSelector = "#thumbnailsView .thumbnailImage";
          await page.waitForSelector(thumbSelector, { visible: true });

          await waitForThumbnailVisible(page, 1);

          const src = await page.$eval(thumbSelector, el => el.src);
          expect(src)
            .withContext(`In ${browserName}`)
            .toMatch(/^blob:http:/);
        })
      );
    });
  });

  describe("The view is scrolled correctly", () => {
    let pages;

    beforeEach(async () => {
      pages = await loadAndWait("tracemonkey.pdf", "#viewsManagerToggleButton");
    });

    afterEach(async () => {
      await closePages(pages);
    });

    async function goToPage(page, number) {
      const handle = await page.evaluateHandle(
        num => [
          new Promise(resolve => {
            const container = document.getElementById("viewsManagerContent");
            container.addEventListener("scrollend", resolve, { once: true });
            // eslint-disable-next-line no-undef
            PDFViewerApplication.pdfLinkService.goToPage(num);
          }),
        ],
        number
      );
      return awaitPromise(handle);
    }

    it("should scroll the view", async () => {
      await Promise.all(
        pages.map(async ([browserName, page]) => {
          await page.click("#viewsManagerToggleButton");

          await waitForThumbnailVisible(page, 1);

          for (const pageNum of [14, 1, 13, 2]) {
            await goToPage(page, pageNum);
            const thumbSelector = `.thumbnailImage[data-l10n-args='{"page":${pageNum}}']`;
            await page.waitForSelector(
              `.thumbnail ${thumbSelector}[aria-current="page"]`,
              { visible: true }
            );
            const src = await page.$eval(thumbSelector, el => el.src);
            expect(src)
              .withContext(`In ${browserName}`)
              .toMatch(/^blob:http:/);
          }
        })
      );
    });
  });

  describe("The view is accessible with the keyboard", () => {
    let pages;

    beforeEach(async () => {
      pages = await loadAndWait("tracemonkey.pdf", "#viewsManagerToggleButton");
    });

    afterEach(async () => {
      await closePages(pages);
    });

    async function isElementFocused(page, selector) {
      await page.waitForSelector(selector, { visible: true });

      return page.$eval(selector, el => el === document.activeElement);
    }

    it("should navigate with the keyboard", async () => {
      await Promise.all(
        pages.map(async ([browserName, page]) => {
          await page.click("#viewsManagerToggleButton");

          await waitForThumbnailVisible(page, 1);
          await waitForThumbnailVisible(page, 2);
          await waitForThumbnailVisible(page, 3);

          await kbFocusNext(page);
          expect(await isElementFocused(page, "#viewsManagerSelectorButton"))
            .withContext(`In ${browserName}`)
            .toBe(true);

          await kbFocusNext(page);
          expect(
            await isElementFocused(page, "#viewsManagerStatusActionButton")
          )
            .withContext(`In ${browserName}`)
            .toBe(true);

          await kbFocusNext(page);
          expect(
            await isElementFocused(
              page,
              `#thumbnailsView .thumbnailImage[data-l10n-args='{"page":1}']`
            )
          )
            .withContext(`In ${browserName}`)
            .toBe(true);

          await page.keyboard.press("ArrowDown");
          expect(
            await isElementFocused(
              page,
              `#thumbnailsView .thumbnailImage[data-l10n-args='{"page":2}']`
            )
          )
            .withContext(`In ${browserName}`)
            .toBe(true);

          await page.keyboard.press("ArrowUp");
          expect(
            await isElementFocused(
              page,
              `#thumbnailsView .thumbnailImage[data-l10n-args='{"page":1}']`
            )
          )
            .withContext(`In ${browserName}`)
            .toBe(true);

          await page.keyboard.press("ArrowDown");
          await page.keyboard.press("ArrowDown");
          expect(
            await isElementFocused(
              page,
              `#thumbnailsView .thumbnailImage[data-l10n-args='{"page":3}']`
            )
          )
            .withContext(`In ${browserName}`)
            .toBe(true);
          await page.keyboard.press("Enter");
          const currentPage = await page.$eval(
            "#pageNumber",
            el => el.valueAsNumber
          );
          expect(currentPage).withContext(`In ${browserName}`).toBe(3);

          await page.keyboard.press("End");
          expect(
            await isElementFocused(
              page,
              `#thumbnailsView .thumbnailImage[data-l10n-args='{"page":14}']`
            )
          )
            .withContext(`In ${browserName}`)
            .toBe(true);

          await page.keyboard.press("Home");
          expect(
            await isElementFocused(
              page,
              `#thumbnailsView .thumbnailImage[data-l10n-args='{"page":1}']`
            )
          )
            .withContext(`In ${browserName}`)
            .toBe(true);
        })
      );
    });
  });

  describe("The manage dropdown menu", () => {
    let pages;

    beforeEach(async () => {
      pages = await loadAndWait(
        "tracemonkey.pdf",
        "#viewsManagerToggleButton",
        null,
        null,
        { enableSplitMerge: true }
      );
    });

    afterEach(async () => {
      await closePages(pages);
    });

    async function enableMenuItems(page) {
      await page.evaluate(() => {
        document
          .querySelectorAll("#viewsManagerStatusActionOptions button")
          .forEach(button => {
            button.disabled = false;
          });
      });
    }

    it("should open with Enter key and remain open", async () => {
      await Promise.all(
        pages.map(async ([browserName, page]) => {
          await page.click("#viewsManagerToggleButton");
          await waitForThumbnailVisible(page, 1);

          await enableMenuItems(page);

          // Focus the manage button
          await kbFocusNext(page);
          await kbFocusNext(page);
          await page.waitForSelector("#viewsManagerStatusActionButton:focus", {
            visible: true,
          });

          // Press Enter to open the menu
          await page.keyboard.press("Enter");

          await waitForMenu(page, "#viewsManagerStatusActionButton");

          // Verify first menu item can be focused
          await page.waitForSelector("#viewsManagerStatusActionCopy:focus", {
            visible: true,
          });

          // Close menu with Escape
          await page.keyboard.press("Escape");
          await waitForMenu(page, "#viewsManagerStatusActionButton", false);
        })
      );
    });

    it("should open with Space key and remain open", async () => {
      await Promise.all(
        pages.map(async ([browserName, page]) => {
          await page.click("#viewsManagerToggleButton");
          await waitForThumbnailVisible(page, 1);

          await enableMenuItems(page);

          // Focus the manage button
          await kbFocusNext(page);
          await kbFocusNext(page);
          await page.waitForSelector("#viewsManagerStatusActionButton:focus", {
            visible: true,
          });

          // Press Space to open the menu
          await page.keyboard.press(" ");

          await waitForMenu(page, "#viewsManagerStatusActionButton");

          // Verify first menu item can be focused
          await page.waitForSelector("#viewsManagerStatusActionCopy:focus", {
            visible: true,
          });

          // Navigate menu items with arrow keys
          await page.keyboard.press("ArrowDown");
          await page.waitForSelector("#viewsManagerStatusActionCut:focus", {
            visible: true,
          });

          // Menu should still be open
          await waitForMenu(page, "#viewsManagerStatusActionButton");

          // Close menu with Escape
          await page.keyboard.press("Escape");
          await waitForMenu(page, "#viewsManagerStatusActionButton", false);
        })
      );
    });
  });

  describe("Checkbox accessibility", () => {
    let pages;

    beforeEach(async () => {
      pages = await loadAndWait(
        "tracemonkey.pdf",
        "#viewsManagerToggleButton",
        null,
        null,
        { enableSplitMerge: true }
      );
    });

    afterEach(async () => {
      await closePages(pages);
    });

    it("should have accessible label on checkbox", async () => {
      await Promise.all(
        pages.map(async ([browserName, page]) => {
          await page.click("#viewsManagerToggleButton");

          await waitForThumbnailVisible(page, 1);

          const ariaLabel = await page.$eval(
            `.thumbnail[page-number="1"] input[type="checkbox"]`,
            el => el.getAttribute("aria-label")
          );
          expect(ariaLabel)
            .withContext(`In ${browserName}`)
            .toBe(`Select page ${FSI}1${PDI}`);
        })
      );
    });
  });

  describe("Menu keyboard navigation with multi-character keys (bug 2016212)", () => {
    let pages;

    beforeEach(async () => {
      pages = await loadAndWait(
        "page_with_number_and_link.pdf",
        "#viewsManagerSelectorButton",
        null,
        null,
        { enableSplitMerge: true }
      );
    });

    afterEach(async () => {
      await closePages(pages);
    });

    it("must navigate menus with ArrowDown and Tab keys", async () => {
      await Promise.all(
        pages.map(async ([browserName, page]) => {
          await page.click("#viewsManagerToggleButton");
          await waitForThumbnailVisible(page, 1);

          // Focus the views manager selector button
          await page.waitForSelector("#viewsManagerSelectorButton", {
            visible: true,
          });
          await page.focus("#viewsManagerSelectorButton");

          // Open menu with Enter key
          await page.keyboard.press("Enter");

          // Wait for menu to be expanded
          await waitForMenu(page, "#viewsManagerSelectorButton");

          // Check that focus moved to the first menu button (pages)
          await page.waitForSelector("#thumbnailsViewMenu:focus", {
            visible: true,
          });

          // Press ArrowDown to navigate to second item
          await page.keyboard.press("ArrowDown");

          // Should now be on outlines button
          await page.waitForSelector("#outlinesViewMenu:focus", {
            visible: true,
          });

          // Press Tab to move to the manage button (should close views menu)
          await page.keyboard.press("Tab");

          // Wait for views manager menu to be collapsed
          await waitForMenu(page, "#viewsManagerSelectorButton", false);

          // Focus should be on manage button
          await page.waitForSelector("#viewsManagerStatusActionButton:focus", {
            visible: true,
          });

          // Open manage menu with Space key
          await page.keyboard.press(" ");

          // Wait for manage menu to be expanded
          await waitForMenu(page, "#viewsManagerStatusActionButton");
        })
      );
    });
  });
});
