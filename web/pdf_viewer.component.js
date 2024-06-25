/* Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  LinkTarget,
  PDFLinkService,
  SimpleLinkService,
} from "./pdf_link_service.js";

import {
  getVisibleElements,
  isValidRotation,
  OutputScale,
  parseQueryString,
  ProgressBar,
  RenderingStates,
  scrollIntoView,
  ScrollMode,
  SpreadMode,
  watchScroll,
} from "./ui_utils.js";

import { AnnotationLayerBuilder } from "./annotation_layer_builder.js";
import { DownloadManager } from "./download_manager.js";
import { EventBus } from "./event_utils.js";
import { GenericL10n } from "./genericl10n.js";
import { getXfaHtmlForPrinting } from "./print_utils.js";
import { NullL10n } from "./l10n_utils.js";
import { PDFFindController } from "./pdf_find_controller.js";
import { PDFHistory } from "./pdf_history.js";
import { PDFPageView } from "./pdf_page_view.js";
import { PDFScriptingManager } from "./pdf_scripting_manager.js";
import { PDFSinglePageViewer } from "./pdf_single_page_viewer.js";
import { PDFThumbnailView } from "./pdf_thumbnail_view.js";
import { PDFThumbnailViewer } from "./pdf_thumbnail_viewer.js";
import { PDFViewer } from "./pdf_viewer.js";
import { StructTreeLayerBuilder } from "./struct_tree_layer_builder.js";
import { TextLayerBuilder } from "./text_layer_builder.js";
import { XfaLayerBuilder } from "./xfa_layer_builder.js";

// eslint-disable-next-line no-unused-vars
const pdfjsVersion = PDFJSDev.eval("BUNDLE_VERSION");
// eslint-disable-next-line no-unused-vars
const pdfjsBuild = PDFJSDev.eval("BUNDLE_BUILD");

class DefaultAnnotationLayerFactory {
  constructor() {
    throw new Error(
      "The `DefaultAnnotationLayerFactory` has been removed, " +
        "please use the `annotationMode` option when initializing " +
        "the `PDFPageView`-instance to control AnnotationLayer rendering."
    );
  }
}

class DefaultStructTreeLayerFactory {
  constructor() {
    throw new Error(
      "The `DefaultStructTreeLayerFactory` has been removed, " +
        "this functionality is automatically enabled when the TextLayer is used."
    );
  }
}

class DefaultTextLayerFactory {
  constructor() {
    throw new Error(
      "The `DefaultTextLayerFactory` has been removed, " +
        "please use the `textLayerMode` option when initializing " +
        "the `PDFPageView`-instance to control TextLayer rendering."
    );
  }
}

class DefaultXfaLayerFactory {
  constructor() {
    throw new Error(
      "The `DefaultXfaLayerFactory` has been removed, " +
        "please use the `enableXfa` option when calling " +
        "the `getDocument`-function to control XfaLayer rendering."
    );
  }
}

export {
  AnnotationLayerBuilder,
  DefaultAnnotationLayerFactory,
  DefaultStructTreeLayerFactory,
  DefaultTextLayerFactory,
  DefaultXfaLayerFactory,
  DownloadManager,
  EventBus,
  GenericL10n,
  getVisibleElements,
  getXfaHtmlForPrinting,
  isValidRotation,
  LinkTarget,
  NullL10n,
  OutputScale,
  parseQueryString,
  PDFFindController,
  PDFHistory,
  PDFLinkService,
  PDFPageView,
  PDFScriptingManager,
  PDFSinglePageViewer,
  PDFThumbnailView,
  PDFThumbnailViewer,
  PDFViewer,
  ProgressBar,
  RenderingStates,
  scrollIntoView,
  ScrollMode,
  SimpleLinkService,
  SpreadMode,
  StructTreeLayerBuilder,
  TextLayerBuilder,
  watchScroll,
  XfaLayerBuilder,
};
