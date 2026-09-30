// Kept free of three.js so DOM-side figure code doesn't pull the WebGL bundle into the first load.
export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
