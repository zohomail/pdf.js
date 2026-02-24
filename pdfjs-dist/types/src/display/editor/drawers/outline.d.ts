export class Outline {
    static _rescale(src: any, tx: any, ty: any, sx: any, sy: any, dest: any): any;
    static _rescaleAndSwap(src: any, tx: any, ty: any, sx: any, sy: any, dest: any): any;
    /**
     * @returns {string} The SVG path of the outline.
     */
    toSVGPath(): string;
    /**
     * @type {Object|null} The bounding box of the outline.
     */
    get box(): Object | null;
    serialize(_bbox: any, _rotation: any): void;
}
