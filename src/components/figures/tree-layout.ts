/**
 * Schematic layout of the rstechnologies.in catalogue: 1 root, 6 categories,
 * 40 sub-categories and 200 products on widening rings. Shared by the 3D scene
 * and the still drawing so both show the same shape.
 */
type P = [number, number, number];

const Y = [1.9, 0.95, -0.05, -1.1];
const R = [0, 1.15, 2.3, 3.35];
const SUBS = [7, 7, 7, 7, 6, 6];
const PRODUCTS_PER_SUB = 5;

const at = (r: number, a: number, y: number): P => [r * Math.cos(a), y, r * Math.sin(a)];

export function treeLayout() {
  const levels: P[][] = [[], [], [], []];
  const edges: [P, P][] = [];
  const root: P = [0, Y[0], 0];
  levels[0].push(root);
  const slot = (Math.PI * 2) / SUBS.length;

  SUBS.forEach((n, k) => {
    const ca = k * slot;
    const cat = at(R[1], ca, Y[1]);
    levels[1].push(cat);
    edges.push([root, cat]);
    for (let j = 0; j < n; j++) {
      const width = (slot * 0.9) / n;
      const sa = ca + ((j + 0.5) / n - 0.5) * slot * 0.9;
      const sub = at(R[2], sa, Y[2]);
      levels[2].push(sub);
      edges.push([cat, sub]);
      for (let m = 0; m < PRODUCTS_PER_SUB; m++) {
        const pa = sa + ((m + 0.5) / PRODUCTS_PER_SUB - 0.5) * width * 0.9;
        const prod = at(R[3], pa, Y[3]);
        levels[3].push(prod);
        edges.push([sub, prod]);
      }
    }
  });

  const links = edges.flatMap(([a, b]) => [...a, ...b]);
  const rings = R.slice(1).map((r, i) =>
    Array.from({ length: 97 }, (_, k) => at(r, (k / 96) * Math.PI * 2, Y[i + 1]))
  );
  return { levels, edges, links, rings };
}
