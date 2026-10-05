// HUD inventory: six slots that fill as levels are cleared. A new item pops when it arrives.
import { ITEMS } from '../../play/levels.js';
import { drawIcon } from './icons.js';

export const HUD_VIEW = { W: 330, H: 56 };

export default {
  draw({ ink, c, state }) {
    const items = state?.items ?? [];
    const now = performance.now();
    ITEMS.forEach((item, i) => {
      const x = 30 + i * 54;
      const has = items.includes(item.key);
      const at = state?.collectedAt?.[item.key];
      const age = at ? (now - at) / 1000 : 9;
      const pop = age < 0.7 ? 1 + Math.sin((age / 0.7) * Math.PI) * 0.45 : 1;
      ink.rect(x - 21, 7, 42, 42, {
        color: has ? c.ink : c.ink2,
        weight: has ? 1.8 : 1.2,
        passes: 1,
        over: 1,
        dash: has ? null : [4, 4],
        alpha: has ? 1 : 0.55,
        seed: 10 + i,
      });
      if (has) drawIcon(ink, c, item.key, x, 28, 0.95 * pop);
    });
  },
};
