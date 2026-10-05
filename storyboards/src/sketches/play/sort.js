// Level 3 · Sort: drop each card into mechanics, dynamics or aesthetics.
// When the deck is empty, the two directions of MDA appear above the bins.
import { PLAYTHROUGH } from '../../play/playthrough.js';

const CARDS = PLAYTHROUGH.sortCards;
const BINS = [
  { key: 'm', name: 'MECHANICS', sub: 'rules you write' },
  { key: 'd', name: 'DYNAMICS', sub: 'what happens in play' },
  { key: 'a', name: 'AESTHETICS', sub: 'what players feel' },
];
const BX = (i) => 60 + i * 300;
const BY = 262;
const BW = 280;
const BH = 240;
const inBin = (i, x, y) => x > BX(i) && x < BX(i) + BW && y > BY && y < BY + BH;

export default {
  hit(x, y, state) {
    return (state?.index ?? 0) < CARDS.length && BINS.some((_, i) => inBin(i, x, y));
  },

  press(x, y, state) {
    const i = BINS.findIndex((_, k) => inBin(k, x, y));
    if (i >= 0) state.onDrop(BINS[i].key);
  },

  draw({ ink, c, state }) {
    const index = state?.index ?? 0;
    const placed = state?.placed ?? [];
    const now = performance.now();

    if (index < CARDS.length) {
      const shake = state?.shakeAt && now - state.shakeAt < 450 ? Math.sin(now / 25) * 9 : 0;
      const cx = 500 + shake;
      ink.rect(cx - 230, 22, 460, 176, { color: c.ink, weight: 2.6, seed: 1 });
      ink.text(CARDS[index].text, cx, 112, { size: 38, color: c.ink, box: [400, 150] });
      ink.text(`${index + 1} / ${CARDS.length}`, cx + 216, 44, { font: 'display', size: 17, color: c.ink2, bold: true, align: 'right' });
    } else {
      ink.arrow(110, 74, 890, 74, { color: c.ink2, weight: 1.8, seed: 5 });
      ink.text('how a game is built', 500, 48, { size: 26, color: c.ink2 });
      ink.arrow(890, 176, 110, 176, { color: c.design, weight: 3.2, seed: 6 });
      ink.text('how to board it: start from the feeling', 500, 210, { size: 30, color: c.design, bold: true });
    }

    BINS.forEach((b, i) => {
      const x = BX(i);
      const pop = state?.dropBin === b.key && now - (state?.dropAt ?? 0) < 500;
      ink.rect(x, BY, BW, BH, { color: pop ? c.design : c.ink, weight: pop ? 3.4 : 2.2, seed: 20 + i });
      ink.text(b.name, x + BW / 2, BY + 34, { font: 'display', size: 28, color: c.ink, bold: true });
      ink.text(b.sub, x + BW / 2, BY + 66, { size: 21, color: c.ink2 });
      placed
        .filter((card) => card.bin === b.key)
        .forEach((card, k) => {
          const ty = BY + 112 + k * 62;
          ink.rect(x + 16, ty - 25, BW - 32, 50, { color: c.design, weight: 1.6, passes: 1, over: 1, seed: 30 + i * 3 + k });
          ink.text(card.text, x + BW / 2, ty, { size: 20, color: c.ink, box: [BW - 44, 46] });
        });
    });
  },
};
