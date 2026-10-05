// Item icons for the HUD and the save file, drawn around (x, y) in a ~36 px box at s = 1.
export function drawIcon(ink, c, key, x, y, s = 1, alpha = 1) {
  const o = (color, seed, extra = {}) => ({ color, weight: 1.8 * s, passes: 1, over: 0, alpha, seed, ...extra });
  const P = (dx, dy) => [x + dx * s, y + dy * s];

  if (key === 'camera') {
    ink.hatch(
      (g) => {
        g.moveTo(...P(-12, 3));
        g.lineTo(...P(15, -11));
        g.lineTo(...P(15, 15));
        g.closePath();
      },
      x - 13 * s,
      y - 12 * s,
      30 * s,
      28 * s,
      { color: c.blue, alpha: 0.55 * alpha, spacing: 3.2 * s },
    );
    ink.line(...P(-12, 3), ...P(15, -11), o(c.blue, 1));
    ink.line(...P(-12, 3), ...P(15, 15), o(c.blue, 2));
    ink.circle(...P(-12, 3), 5 * s, o(c.ink, 3));
  } else if (key === 'pictures') {
    [[-8, -8], [8, -8], [-8, 8], [8, 8]].forEach(([dx, dy], i) =>
      ink.rect(x + (dx - 6) * s, y + (dy - 6) * s, 12 * s, 12 * s, o(c.ink, 10 + i)),
    );
  } else if (key === 'feeling') {
    ink.circle(x, y, 14 * s, o(c.design, 20));
    ink.dot(...P(-5, -4), 1.8 * s, c.design, alpha);
    ink.dot(...P(5, -4), 1.8 * s, c.design, alpha);
    ink.curve(...P(-7, 4), ...P(0, 11), ...P(7, 4), o(c.design, 21));
  } else if (key === 'moment') {
    [-12, 0, 12].forEach((dx, i) => ink.rect(x + (dx - 5) * s, y - 8 * s, 10 * s, 16 * s, o(c.ink, 30 + i)));
  } else if (key === 'page') {
    ink.rect(x - 11 * s, y - 15 * s, 22 * s, 30 * s, o(c.ink, 40));
    [-7, 0, 7].forEach((dy, i) => ink.line(...P(-6, dy), ...P(6, dy), o(c.ink2, 41 + i, { weight: 1.2 * s })));
  } else if (key === 'pencil') {
    const a = -0.7;
    const ux = Math.cos(a);
    const uy = Math.sin(a);
    const L = 15 * s;
    const W = 4.5 * s;
    const pt = (u, v) => [x + ux * u - uy * v, y + uy * u + ux * v];
    ink.poly([pt(-L, -W), pt(L * 0.55, -W), pt(L, 0), pt(L * 0.55, W), pt(-L, W)], o(c.red, 50));
    ink.line(...pt(L * 0.55, -W), ...pt(L * 0.55, W), o(c.red, 51));
  }
}
