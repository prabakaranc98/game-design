// Shared drawing kit for the storyboard panels.
// Every sketch draws in a fixed 1000 x 625 view; P5Canvas scales it to fit.
// Lines are drawn like pencil: a firm pass plus a faint second pass, with a
// small, stable wobble from Perlin noise so they don't flicker between frames.

export const VIEW = { W: 1000, H: 625 };
export const HAND = 'Kalam';
export const DISPLAY = 'Archivo Variable';

let cache = { key: '', colors: null };

// Colors come from the CSS tokens, so the canvas follows the page theme.
export function palette() {
  const root = document.documentElement;
  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const key = `${root.dataset.theme || 'system'}|${dark}`;
  if (cache.key !== key || !cache.colors) {
    const cs = getComputedStyle(root);
    const v = (name) => cs.getPropertyValue(name).trim();
    cache = {
      key,
      colors: {
        paper: v('--paper'),
        panel: v('--panel'),
        ink: v('--ink'),
        ink2: v('--ink-2'),
        line: v('--line'),
        blue: v('--blue'),
        red: v('--red'),
        design: v('--design'),
        dev: v('--dev'),
        eng: v('--eng'),
      },
    };
  }
  return cache.colors;
}

export function pointOnQuad(t, x1, y1, cx, cy, x2, y2) {
  const u = 1 - t;
  return [u * u * x1 + 2 * u * t * cx + t * t * x2, u * u * y1 + 2 * u * t * cy + t * t * y2];
}

export function pointOnPolyline(t, pts) {
  const lens = [];
  let total = 0;
  for (let i = 1; i < pts.length; i++) {
    const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
    lens.push(d);
    total += d;
  }
  let target = t * total;
  for (let i = 0; i < lens.length; i++) {
    if (target <= lens[i]) {
      const f = lens[i] ? target / lens[i] : 0;
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * f, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * f];
    }
    target -= lens[i];
  }
  return pts[pts.length - 1];
}

export const ease = (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

// Catmull-Rom through the given points, returned as a dense polyline.
export function smooth(pts, n = 10) {
  const out = [];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    for (let k = 0; k < n; k++) {
      const t = k / n;
      const t2 = t * t;
      const t3 = t2 * t;
      const f = (a, b, c, d) => 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
}

export function makeInk(p) {
  const tint = (col, a = 1) => {
    const c = p.color(col);
    c.setAlpha(255 * a);
    return c;
  };
  const jitter = (seed, amp) => (p.noise(seed) - 0.5) * 2 * amp;
  const seedOf = (...xs) => xs.reduce((s, x, i) => s + x * (0.0131 + i * 0.0071), 0);

  function sampleLine(x1, y1, x2, y2, over, step) {
    const len = Math.hypot(x2 - x1, y2 - y1) || 1;
    const ux = (x2 - x1) / len;
    const uy = (y2 - y1) / len;
    const ax = x1 - ux * over;
    const ay = y1 - uy * over;
    const bx = x2 + ux * over;
    const by = y2 + uy * over;
    const n = Math.max(2, Math.ceil((len + 2 * over) / step));
    const pts = [];
    for (let i = 0; i <= n; i++) pts.push([ax + ((bx - ax) * i) / n, ay + ((by - ay) * i) / n]);
    return pts;
  }

  function sampleQuad(x1, y1, cx, cy, x2, y2, step) {
    const approx = Math.hypot(cx - x1, cy - y1) + Math.hypot(x2 - cx, y2 - cy);
    const n = Math.max(4, Math.ceil(approx / step));
    const pts = [];
    for (let i = 0; i <= n; i++) pts.push(pointOnQuad(i / n, x1, y1, cx, cy, x2, y2));
    return pts;
  }

  function sampleEllipse(cx, cy, rx, ry, seed, step) {
    const a0 = p.noise(seed) * Math.PI * 2;
    const sweep = Math.PI * 2 + 0.32;
    const n = Math.max(16, Math.ceil((Math.PI * (rx + ry) * 1.05) / step));
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const a = a0 + (sweep * i) / n;
      pts.push([cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]);
    }
    return pts;
  }

  // Draw sampled points as pencil strokes.
  function pencil(pts, o) {
    const { color, weight = 2, passes = 2, wobble = 1.1, seed = 0, alpha = 1, dash = null } = o;
    p.noFill();
    for (let k = 0; k < passes; k++) {
      p.stroke(tint(color, (k === 0 ? 1 : 0.35) * alpha));
      p.strokeWeight(k === 0 ? weight : Math.max(0.6, weight * 0.5));
      const jp = pts.map((pt, i) => {
        const a = pts[Math.max(0, i - 1)];
        const b = pts[Math.min(pts.length - 1, i + 1)];
        let nx = -(b[1] - a[1]);
        let ny = b[0] - a[0];
        const L = Math.hypot(nx, ny) || 1;
        nx /= L;
        ny /= L;
        const d = jitter(seed + k * 17.3 + i * 0.41, wobble * (k ? 1.7 : 1));
        return [pt[0] + nx * d, pt[1] + ny * d];
      });
      if (!dash) {
        p.beginShape();
        jp.forEach((q) => p.vertex(q[0], q[1]));
        p.endShape();
        continue;
      }
      const [dOn, dOff] = dash;
      let acc = 0;
      let on = true;
      p.beginShape();
      for (let i = 0; i < jp.length; i++) {
        if (i > 0) acc += Math.hypot(jp[i][0] - jp[i - 1][0], jp[i][1] - jp[i - 1][1]);
        if (acc >= (on ? dOn : dOff)) {
          acc = 0;
          if (on) {
            p.vertex(jp[i][0], jp[i][1]);
            p.endShape();
          } else {
            p.beginShape();
          }
          on = !on;
        }
        if (on) p.vertex(jp[i][0], jp[i][1]);
      }
      if (on) p.endShape();
    }
  }

  function head(x, y, ang, o) {
    const L = o.head ?? 15;
    for (const s of [-1, 1]) {
      const a = ang + Math.PI + s * 0.42;
      pencil(sampleLine(x, y, x + Math.cos(a) * L, y + Math.sin(a) * L, 0, 6), {
        ...o,
        passes: 1,
        dash: null,
        seed: (o.seed ?? 0) + s * 3.1,
      });
    }
  }

  function hatchIn(clip, bx, by, bw, bh, o) {
    const { color, spacing = 9, weight = 1, alpha = 0.3 } = o;
    const ctx = p.drawingContext;
    ctx.save();
    ctx.beginPath();
    clip(ctx);
    ctx.clip();
    p.stroke(tint(color, alpha));
    p.strokeWeight(weight);
    for (let k = -bh; k < bw; k += spacing) p.line(bx + k, by + bh, bx + k + bh, by);
    ctx.restore();
  }

  const step = (o) => (o.dash ? 5 : 13);

  return {
    tint,

    line(x1, y1, x2, y2, o = {}) {
      pencil(sampleLine(x1, y1, x2, y2, o.over ?? 3, step(o)), { seed: seedOf(x1, y1, x2, y2), ...o });
    },

    // An open polyline through any number of points.
    path(points, o = {}) {
      const pts = [];
      for (let i = 1; i < points.length; i++) {
        const seg = sampleLine(points[i - 1][0], points[i - 1][1], points[i][0], points[i][1], 0, step(o));
        if (i > 1) seg.shift();
        pts.push(...seg);
      }
      pencil(pts, { seed: seedOf(points[0][0], points[0][1], points.length), ...o });
    },

    // Hatch inside any canvas path, e.g. (ctx) => { ctx.moveTo(...); ctx.arc(...); }.
    hatch(clip, bx, by, bw, bh, o = {}) {
      hatchIn(clip, bx, by, bw, bh, o);
    },

    curve(x1, y1, cx, cy, x2, y2, o = {}) {
      pencil(sampleQuad(x1, y1, cx, cy, x2, y2, step(o)), { seed: seedOf(x1, y1, x2, y2), ...o });
    },

    arrow(x1, y1, x2, y2, o = {}) {
      const opts = { seed: seedOf(x1, y1, x2, y2), ...o };
      pencil(sampleLine(x1, y1, x2, y2, 0, step(o)), opts);
      head(x2, y2, Math.atan2(y2 - y1, x2 - x1), opts);
    },

    curveArrow(x1, y1, cx, cy, x2, y2, o = {}) {
      const opts = { seed: seedOf(x1, y1, x2, y2), ...o };
      pencil(sampleQuad(x1, y1, cx, cy, x2, y2, step(o)), opts);
      head(x2, y2, Math.atan2(y2 - cy, x2 - cx), opts);
    },

    circle(cx, cy, r, o = {}) {
      const seed = o.seed ?? seedOf(cx, cy, r);
      pencil(sampleEllipse(cx, cy, r, r, seed, step(o)), { ...o, seed });
    },

    ellipse(cx, cy, rx, ry, o = {}) {
      const seed = o.seed ?? seedOf(cx, cy, rx, ry);
      pencil(sampleEllipse(cx, cy, rx, ry, seed, step(o)), { ...o, seed });
    },

    rect(x, y, w, h, o = {}) {
      const s = o.seed ?? seedOf(x, y, w, h);
      const corners = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
      corners.forEach((a, i) => {
        const b = corners[(i + 1) % 4];
        pencil(sampleLine(a[0], a[1], b[0], b[1], o.over ?? 3, step(o)), { ...o, seed: s + i * 7.7 });
      });
    },

    poly(points, o = {}) {
      const s = o.seed ?? seedOf(points[0][0], points[0][1], points.length);
      points.forEach((a, i) => {
        const b = points[(i + 1) % points.length];
        pencil(sampleLine(a[0], a[1], b[0], b[1], o.over ?? 1.5, step(o)), { ...o, seed: s + i * 5.3 });
      });
    },

    hatchRect(x, y, w, h, o = {}) {
      if (w <= 0 || h <= 0) return;
      hatchIn((ctx) => ctx.rect(x, y, w, h), x, y, w, h, o);
    },

    hatchEllipse(cx, cy, rx, ry, o = {}) {
      hatchIn((ctx) => ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2), cx - rx, cy - ry, rx * 2, ry * 2, o);
    },

    dot(x, y, r, color, alpha = 1) {
      p.noStroke();
      p.fill(tint(color, alpha));
      p.circle(x, y, r * 2);
    },

    text(str, x, y, o = {}) {
      const { font = 'hand', size = 20, color, align = 'center', valign = 'center', bold = false, alpha = 1 } = o;
      const ctx = p.drawingContext;
      p.noStroke();
      p.fill(tint(color, alpha));
      p.textFont(font === 'display' ? DISPLAY : HAND);
      p.textStyle(bold ? p.BOLD : p.NORMAL);
      p.textSize(size);
      p.textAlign(
        align === 'left' ? p.LEFT : align === 'right' ? p.RIGHT : p.CENTER,
        valign === 'top' ? p.TOP : valign === 'bottom' ? p.BOTTOM : p.CENTER,
      );
      if ('fontStretch' in ctx) ctx.fontStretch = font === 'display' ? 'semi-condensed' : 'normal';
      if (o.box) {
        // Wrap inside a box centred on (x, y).
        const [bw, bh] = o.box;
        p.textAlign(p.CENTER, p.CENTER);
        p.text(str, x - bw / 2, y - bh / 2, bw, bh);
      } else {
        p.text(str, x, y);
      }
      if ('fontStretch' in ctx) ctx.fontStretch = 'normal';
    },
  };
}

// Viewfinder corner marks in non-photo blue: the storyboard's safe frame.
export function drawGuides(ink, c) {
  const x0 = 22, y0 = 22, x1 = 978, y1 = 603, L = 22;
  const o = { color: c.blue, weight: 1.4, passes: 1, alpha: 0.7 };
  ink.line(x0, y0, x0 + L, y0, o);
  ink.line(x0, y0, x0, y0 + L, o);
  ink.line(x1, y0, x1 - L, y0, o);
  ink.line(x1, y0, x1, y0 + L, o);
  ink.line(x0, y1, x0 + L, y1, o);
  ink.line(x0, y1, x0, y1 - L, o);
  ink.line(x1, y1, x1 - L, y1, o);
  ink.line(x1, y1, x1, y1 - L, o);
}
