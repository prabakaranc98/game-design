// FR 04 · Tracking: one idea travels down the studio line. Red marks are where AI helps.

const STATIONS = [
  { x: 110, label: 'IDEA', pillar: 'design', ai: 'references' },
  { x: 300, label: 'DESIGN', pillar: 'design', ai: 'critique · options' },
  { x: 490, label: 'BUILD', pillar: 'dev', ai: 'code · drafts · motion' },
  { x: 680, label: 'TEST', pillar: 'dev', ai: 'playtest agents' },
  { x: 870, label: 'SHIP', pillar: 'eng', ai: 'pipelines' },
];

const BELT_Y = 404;

function asterisk(ink, x, y, r, color, seed) {
  for (let k = 0; k < 3; k++) {
    const a = (k * Math.PI) / 3 + 0.3;
    ink.line(x - Math.cos(a) * r, y - Math.sin(a) * r, x + Math.cos(a) * r, y + Math.sin(a) * r, {
      color,
      weight: 2.4,
      passes: 1,
      over: 0,
      seed: seed + k,
    });
  }
}

export default {
  draw({ ink, c, t }) {
    // Camera move, drawn the way storyboard artists mark it.
    ink.arrow(60, 66, 940, 66, { color: c.blue, weight: 1.8, passes: 1, seed: 1 });
    ink.text('TRACK', 500, 46, { font: 'display', size: 17, color: c.blue, bold: true });

    // Conveyor.
    ink.line(36, BELT_Y, 964, BELT_Y, { color: c.ink, weight: 2, seed: 2 });
    ink.line(36, BELT_Y + 22, 964, BELT_Y + 22, { color: c.ink, weight: 2, seed: 3 });
    for (let x = 60; x < 960; x += 60) ink.circle(x, BELT_Y + 11, 6, { color: c.ink2, weight: 1.2, passes: 1, seed: x });

    // Tokens riding the belt.
    const tokens = [];
    for (let i = 0; i < 4; i++) tokens.push(((t * 70 + i * 250) % 1040) - 30);

    STATIONS.forEach((s, i) => {
      const col = c[s.pillar];
      ink.hatchRect(s.x - 70, 270, 140, 100, { color: col, alpha: 0.12, spacing: 11 });
      ink.rect(s.x - 70, 270, 140, 100, { color: col, weight: 2.2, seed: 10 + i });
      ink.text(s.label, s.x, 320, { font: 'display', size: 24, color: c.ink, bold: true });

      const near = tokens.some((x) => Math.abs(x - s.x) < 34);
      const r = near ? 17 : 12;
      asterisk(ink, s.x, 226, r, c.red, 30 + i * 5);
      ink.line(s.x, 244, s.x, 266, { color: c.red, weight: 1.2, passes: 1, alpha: 0.6, seed: 60 + i });
      ink.text(s.ai, s.x, i % 2 ? 150 : 180, { size: 20, color: c.red });
    });

    tokens.forEach((x, i) => {
      ink.hatchRect(x - 9, BELT_Y - 20, 18, 18, { color: c.ink, alpha: 0.5, spacing: 4 });
      ink.rect(x - 9, BELT_Y - 20, 18, 18, { color: c.ink, weight: 1.6, passes: 1, over: 1, seed: 80 + i });
    });

    // Pencil key for the station colors.
    const key = [['design', 'design'], ['dev', 'development'], ['eng', 'engineering']];
    key.forEach(([k, name], i) => {
      const x = 330 + i * 150;
      ink.rect(x - 52, 500, 16, 16, { color: c[k], weight: 2, passes: 1, over: 1, seed: 90 + i });
      ink.text(name, x - 28, 507, { size: 20, color: c.ink2, align: 'left' });
    });
    ink.text('AI helps here', 680, 560, { size: 20, color: c.red, align: 'left' });
    asterisk(ink, 660, 560, 9, c.red, 120);
  },
};
