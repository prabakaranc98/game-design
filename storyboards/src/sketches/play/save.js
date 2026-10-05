// Save file: the six items, each one a move to keep.
import { ITEMS } from '../../play/levels.js';
import { drawIcon } from './icons.js';

export default {
  draw({ ink, c, t, state }) {
    const items = state?.items ?? [];
    ITEMS.forEach((it, i) => {
      const x = 95 + i * 162;
      const has = items.includes(it.key);
      const bob = has ? Math.sin(t * 1.5 + i) * 3 : 0;
      ink.rect(x - 58, 14 + bob, 116, 116, {
        color: has ? c.ink : c.ink2,
        weight: has ? 2.4 : 1.4,
        passes: has ? 2 : 1,
        dash: has ? null : [6, 6],
        alpha: has ? 1 : 0.55,
        seed: 10 + i,
      });
      if (has) drawIcon(ink, c, it.key, x, 72 + bob, 2.3);
      ink.text(it.name, x, 158, { size: 22, color: has ? c.ink : c.ink2, bold: has });
      ink.text(it.move, x, 200, { size: 18, color: c.ink2, box: [150, 60] });
    });
  },
};
