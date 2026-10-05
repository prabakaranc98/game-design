import { useEffect, useRef } from 'react';
import p5 from 'p5';
import { VIEW, drawGuides, makeInk, palette } from '../sketches/ink.js';

const prefersStill = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mounts one sketch in p5 instance mode and keeps the canvas sized to its box.
// A sketch is { draw(ctx), hit?(x, y, state), press?(x, y, state), drag?(x, y, state), release?() }
// working in `view` coordinates (1000 x 625 unless a sketch asks for another size).
export default function P5Canvas({ sketch, state, theme, label, view = VIEW, guides = true, background = 'panel' }) {
  const hostRef = useRef(null);
  const stateRef = useRef(state);
  const instRef = useRef(null);
  stateRef.current = state;

  useEffect(() => {
    const host = hostRef.current;
    const still = prefersStill();

    const inst = new p5((p) => {
      let ink;
      const fit = () => {
        const s = Math.min(p.width / view.W, p.height / view.H);
        return { s, ox: (p.width - view.W * s) / 2, oy: (p.height - view.H * s) / 2 };
      };
      const mouseInView = () => {
        const { s, ox, oy } = fit();
        return { x: (p.mouseX - ox) / s, y: (p.mouseY - oy) / s };
      };
      const inside = () => p.mouseX >= 0 && p.mouseY >= 0 && p.mouseX <= p.width && p.mouseY <= p.height;

      p.setup = () => {
        const r = host.getBoundingClientRect();
        p.pixelDensity(Math.min(2, window.devicePixelRatio || 1));
        p.createCanvas(Math.max(1, Math.floor(r.width)), Math.max(1, Math.floor(r.height)));
        p.noiseSeed(11);
        ink = makeInk(p);
        if (still) p.noLoop();
        // Canvas text only uses a web font once it has loaded; ask for the faces, then redraw.
        if (document.fonts) {
          Promise.all(['20px Kalam', 'bold 20px Kalam', 'bold 20px "Archivo Variable"'].map((f) => document.fonts.load(f)))
            .then(() => p.redraw())
            .catch(() => {});
        }
      };

      p.draw = () => {
        const c = palette();
        p.background(c[background] || c.panel);
        const { s, ox, oy } = fit();
        const m = mouseInView();
        p.push();
        p.translate(ox, oy);
        p.scale(s);
        if (guides) drawGuides(ink, c);
        sketch.draw({
          p,
          ink,
          c,
          t: still ? 3 : p.millis() / 1000,
          state: stateRef.current,
          mx: m.x,
          my: m.y,
          hover: inside(),
        });
        p.pop();
        if (sketch.hit) p.cursor(inside() && sketch.hit(m.x, m.y, stateRef.current) ? p.HAND : p.ARROW);
      };

      p.mousePressed = () => {
        if (!inside()) return;
        const m = mouseInView();
        if (sketch.press) {
          sketch.press(m.x, m.y, stateRef.current);
        } else if (sketch.hit) {
          const key = sketch.hit(m.x, m.y, stateRef.current);
          if (key) stateRef.current?.onSelect?.(key);
        }
        if (still) p.redraw();
      };

      p.mouseDragged = () => {
        if (!sketch.drag) return;
        const m = mouseInView();
        sketch.drag(m.x, m.y, stateRef.current);
      };

      p.mouseReleased = () => {
        sketch.release?.();
      };
    }, host);

    instRef.current = inst;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) inst.resizeCanvas(Math.floor(width), Math.floor(height));
    });
    ro.observe(host);

    return () => {
      ro.disconnect();
      inst.remove();
      instRef.current = null;
    };
  }, [sketch]); // eslint-disable-line react-hooks/exhaustive-deps

  // A still (reduced-motion) canvas only redraws on request.
  useEffect(() => {
    instRef.current?.redraw();
  }, [theme, state]);

  return <div ref={hostRef} className="p5-host" role="img" aria-label={label} />;
}
