// Boss · The critic: a red pencil with a health bar. Each judged point costs it one segment.

function pencil(ink, c, t) {
  ink.hatchRect(-190, -34, 320, 68, { color: c.red, alpha: 0.14, spacing: 9 });
  ink.rect(-190, -34, 320, 68, { color: c.red, weight: 2.8, seed: 1 });
  ink.poly([[130, -34], [212, 0], [130, 34]], { color: c.red, weight: 2.6, passes: 1, seed: 2 });
  ink.hatch(
    (g) => {
      g.moveTo(186, -11);
      g.lineTo(212, 0);
      g.lineTo(186, 11);
      g.closePath();
    },
    186,
    -11,
    26,
    22,
    { color: c.ink, alpha: 0.8, spacing: 3 },
  );
  ink.rect(-232, -34, 42, 68, { color: c.ink2, weight: 2, passes: 1, seed: 3 });
  [-184, -176].forEach((x, i) => ink.line(x, -34, x, 34, { color: c.ink2, weight: 1.4, passes: 1, over: 0, seed: 4 + i }));
  const lx = Math.cos(t * 0.9) * 4;
  const ly = Math.sin(t * 1.3) * 3;
  [20, 72].forEach((x, i) => {
    ink.circle(x, -4, 13, { color: c.ink, weight: 2, passes: 1, seed: 10 + i });
    ink.dot(x + lx, -4 + ly, 4.5, c.ink);
  });
  ink.line(6, -30, 32, -21, { color: c.ink, weight: 2.4, passes: 1, over: 0, seed: 12 });
  ink.line(86, -30, 60, -21, { color: c.ink, weight: 2.4, passes: 1, over: 0, seed: 13 });
}

function broken(p, ink, c) {
  p.push();
  p.translate(-70, 30);
  p.rotate(-0.45);
  ink.rect(-150, -34, 150, 68, { color: c.red, weight: 2.6, seed: 20 });
  ink.rect(-192, -34, 42, 68, { color: c.ink2, weight: 2, passes: 1, seed: 21 });
  p.pop();
  p.push();
  p.translate(80, 30);
  p.rotate(0.38);
  ink.rect(0, -34, 120, 68, { color: c.red, weight: 2.6, seed: 22 });
  ink.poly([[120, -34], [200, 0], [120, 34]], { color: c.red, weight: 2.4, passes: 1, seed: 23 });
  [36, 78].forEach((x, i) => {
    ink.line(x - 9, -13, x + 9, 5, { color: c.ink, weight: 2.2, passes: 1, over: 0, seed: 24 + i * 2 });
    ink.line(x + 9, -13, x - 9, 5, { color: c.ink, weight: 2.2, passes: 1, over: 0, seed: 25 + i * 2 });
  });
  p.pop();
}

export default {
  draw({ p, ink, c, t, state }) {
    const hp = state?.hp ?? 6;
    const max = state?.max ?? 6;
    const now = performance.now();

    for (let i = 0; i < max; i++) {
      const x = 500 - (max * 62) / 2 + i * 62 + 4;
      if (i < hp) ink.hatchRect(x, 20, 54, 22, { color: c.red, alpha: 0.6, spacing: 5 });
      ink.rect(x, 20, 54, 22, { color: c.red, weight: 1.8, passes: 1, over: 1, seed: 30 + i });
    }
    ink.text('THE RED PENCIL', 500, 70, { font: 'display', size: 22, color: c.red, bold: true });

    const hit = state?.hitAt && now - state.hitAt < 350;
    const shake = hit ? Math.sin(now / 20) * 10 : 0;
    p.push();
    p.translate(500 + shake, 225 + Math.sin(t * 2) * 6);
    if (hp > 0) {
      p.rotate(-0.28);
      pencil(ink, c, t);
    } else {
      broken(p, ink, c);
    }
    p.pop();
  },
};
