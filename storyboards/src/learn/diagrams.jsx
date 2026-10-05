// Technical figures for the teaching slides. Strokes draw on when their step arrives.
// Palette: black for structure, grey for context and guides, tomato red for the point of the figure.
import { motion } from 'motion/react';
import { BRANCH_PATTERNS, KINDS } from './diagramData.js';

// ---------------------------------------------------------------- path helpers
const R = (x, y, w, h) => `M${x} ${y}H${x + w}V${y + h}H${x}Z`;
const L = (x1, y1, x2, y2) => `M${x1} ${y1}L${x2} ${y2}`;
const E = (cx, cy, rx, ry) => `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${rx * 2} 0a${rx} ${ry} 0 1 0 ${-rx * 2} 0`;
const head = (x, y, ang, s = 12) => {
  const a1 = ang + Math.PI - 0.45;
  const a2 = ang + Math.PI + 0.45;
  return `M${x + Math.cos(a1) * s} ${y + Math.sin(a1) * s}L${x} ${y}L${x + Math.cos(a2) * s} ${y + Math.sin(a2) * s}`;
};

export function smoothPath(pts, closed = false) {
  const p = closed ? [...pts, pts[0], pts[1]] : pts;
  let d = `M${p[0][0]} ${p[0][1]}`;
  const last = closed ? p.length - 2 : p.length - 1;
  for (let i = 0; i < last; i++) {
    const p0 = p[i - 1] || (closed ? pts[pts.length - 1] : p[i]);
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0]} ${c1[1]} ${c2[0]} ${c2[1]} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

// ---------------------------------------------------------------- primitives
export function Pen({ d, show = true, delay = 0, tone, w = 2, dash }) {
  const cls = tone ? `pen pen--${tone}` : 'pen';
  if (dash) {
    return (
      <motion.path d={d} className={cls} strokeWidth={w} strokeDasharray={dash}
        initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.4, delay: show ? delay : 0 }} />
    );
  }
  return (
    <motion.path d={d} className={cls} strokeWidth={w}
      initial={{ pathLength: 0, opacity: 0 }}
      animate={show ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={{ pathLength: { duration: 0.8, delay, ease: 'easeInOut' }, opacity: { duration: 0.15, delay: show ? delay : 0 } }} />
  );
}

export function Fill({ d, show = true, delay = 0, tone = 'ink', opacity = 1 }) {
  return (
    <motion.path d={d} fill={`url(#h-${tone})`} stroke="none"
      initial={{ opacity: 0 }} animate={{ opacity: show ? opacity : 0 }} transition={{ duration: 0.4, delay: show ? delay : 0 }} />
  );
}

export function T({ x, y, children, show = true, delay = 0, size = 18, f = 'body', tone, anchor = 'middle', rotate }) {
  return (
    <motion.text x={x} y={y} className={tone ? `tx tx--${tone} f-${f}` : `tx f-${f}`} fontSize={size} textAnchor={anchor}
      dominantBaseline="middle" transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.35, delay: show ? delay : 0 }}>
      {children}
    </motion.text>
  );
}

export function Arrow({ x1, y1, x2, y2, bend = 0, show = true, delay = 0, tone, w = 2.2, dash, s = 12 }) {
  let d;
  let ang;
  if (bend) {
    const len = Math.hypot(x2 - x1, y2 - y1) || 1;
    const cx = (x1 + x2) / 2 - ((y2 - y1) / len) * bend;
    const cy = (y1 + y2) / 2 + ((x2 - x1) / len) * bend;
    d = `M${x1} ${y1}Q${cx} ${cy} ${x2} ${y2}`;
    ang = Math.atan2(y2 - cy, x2 - cx);
  } else {
    d = L(x1, y1, x2, y2);
    ang = Math.atan2(y2 - y1, x2 - x1);
  }
  return (
    <g>
      <Pen d={d} show={show} delay={delay} tone={tone} w={w} dash={dash} />
      <Pen d={head(x2, y2, ang, s)} show={show} delay={delay + 0.6} tone={tone} w={w} />
    </g>
  );
}

export function Box({ x, y, w, h, show = true, delay = 0, tone, fill, title, sub, size = 20, subSize = 16, pen }) {
  const soft = !tone && !fill;
  const titleTone = tone === 'design' || tone === 'red' || tone === 'blue' ? tone : undefined;
  return (
    <g>
      {soft && (
        <motion.path d={R(x, y, w, h)} className="box-soft"
          initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.35, delay: show ? delay : 0 }} />
      )}
      {fill && <Fill d={R(x, y, w, h)} tone={fill} show={show} delay={delay + 0.3} />}
      <Pen d={R(x, y, w, h)} tone={soft ? 'line' : tone} show={show} delay={delay} w={pen ?? (soft ? 1.2 : 2.2)} />
      {title && (
        <T x={x + w / 2} y={sub ? y + h / 2 - 12 : y + h / 2} f="display" size={size} tone={titleTone} show={show} delay={delay + 0.3}>
          {title}
        </T>
      )}
      {sub && (
        <T x={x + w / 2} y={y + h / 2 + 15} f="hand" size={subSize} tone="ink2" show={show} delay={delay + 0.4}>
          {sub}
        </T>
      )}
    </g>
  );
}

function Dot({ x, y, r = 6, show = true, delay = 0, tone = 'ink' }) {
  return (
    <motion.circle cx={x} cy={y} r={r} className={`dot dot--${tone}`}
      initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0.4 }}
      transition={{ duration: 0.3, delay: show ? delay : 0 }} />
  );
}

function Figure({ x, y, s = 1, show = true, delay = 0, tone }) {
  const p = (dx, dy) => [x + dx * s, y + dy * s];
  const seg = (a, b) => L(...p(...a), ...p(...b));
  return (
    <g>
      <Pen d={E(...p(0, -34), 9 * s, 9 * s)} show={show} delay={delay} tone={tone} w={2} />
      <Pen d={seg([0, -25], [0, 0])} show={show} delay={delay + 0.1} tone={tone} w={2} />
      <Pen d={seg([0, 0], [-9, 20])} show={show} delay={delay + 0.15} tone={tone} w={2} />
      <Pen d={seg([0, 0], [9, 20])} show={show} delay={delay + 0.15} tone={tone} w={2} />
      <Pen d={seg([0, -17], [-13, -7])} show={show} delay={delay + 0.2} tone={tone} w={2} />
      <Pen d={seg([0, -17], [13, -10])} show={show} delay={delay + 0.2} tone={tone} w={2} />
    </g>
  );
}

function Svg({ w, h, label, children }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="dia" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

const blob = (cx, cy, r, n = 10, seed = 1) =>
  smoothPath(
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2;
      const k = r * (1 + 0.12 * Math.sin(i * 2.3 + seed));
      return [cx + Math.cos(a) * k * 1.15, cy + Math.sin(a) * k * 0.85];
    }),
    true,
  );

// ---------------------------------------------------------------- Module 1
function GameExperience({ step }) {
  return (
    <Svg w={560} h={400} label="The game enables the experience">
      <Box x={30} y={145} w={170} h={110} title="The game" sub="rules · content" />
      <Arrow x1={210} y1={200} x2={320} y2={200} delay={0.5} />
      <T x={265} y={176} f="hand" size={18} tone="ink2" delay={0.7}>enables</T>
      <Fill d={blob(430, 200, 95)} tone="design" delay={0.9} />
      <Pen d={blob(430, 200, 95)} tone="design" delay={0.8} w={2.6} />
      <T x={430} y={190} f="display" size={22} tone="design" delay={1.1}>Experience</T>
      <T x={430} y={218} f="hand" size={17} tone="ink2" delay={1.2}>what players feel</T>
      <Arrow x1={330} y1={350} x2={410} y2={300} bend={-20} tone="design" show={step >= 1} />
      <T x={250} y={356} f="hand" size={19} tone="design" show={step >= 1}>the board draws this side</T>
    </Svg>
  );
}

function SecondOrder({ step }) {
  return (
    <Svg w={560} h={400} label="Designers write rules; play emerges">
      <Box x={30} y={140} w={180} h={110} title="Rules" sub="you write these" />
      <Arrow x1={220} y1={195} x2={310} y2={195} delay={0.5} />
      <Fill d={blob(425, 195, 92, 12, 3)} tone="ink" opacity={0.5} delay={0.9} />
      <Pen d={blob(425, 195, 92, 12, 3)} delay={0.8} w={2.6} />
      <T x={425} y={185} f="display" size={22} delay={1.1}>Play</T>
      <T x={425} y={213} f="hand" size={17} tone="ink2" delay={1.2}>emerges</T>
      <T x={425} y={70} f="hand" size={19} tone="design" show={step >= 1}>can’t be drawn directly</T>
      <Arrow x1={400} y1={300} x2={140} y2={262} bend={-50} dash="7 7" tone="blue" show={step >= 1} />
      <T x={270} y={345} f="hand" size={19} tone="blue" show={step >= 1}>playtest, then revise</T>
    </Svg>
  );
}

function Mda({ step }) {
  const boxes = [
    { x: 100, title: 'Mechanics', sub: 'rules · verbs' },
    { x: 450, title: 'Dynamics', sub: 'behaviour in play' },
    { x: 800, title: 'Aesthetics', sub: 'what players feel', tone: 'design' },
  ];
  return (
    <Svg w={1160} h={440} label="Mechanics, dynamics, aesthetics">
      {boxes.map((b, i) => (
        <Box key={b.title} x={b.x} y={150} w={260} h={115} title={b.title} sub={b.sub} tone={b.tone} fill={b.tone ? 'design' : undefined} delay={i * 0.35} size={24} />
      ))}
      <Arrow x1={366} y1={207} x2={444} y2={207} delay={0.9} />
      <Arrow x1={716} y1={207} x2={794} y2={207} delay={1.1} />
      <Arrow x1={120} y1={100} x2={1040} y2={100} show={step >= 1} />
      <T x={580} y={74} f="hand" size={22} show={step >= 1}>the designer builds this way</T>
      <Arrow x1={1040} y1={318} x2={120} y2={318} tone="design" show={step >= 2} />
      <T x={580} y={344} f="hand" size={22} tone="design" show={step >= 2}>the player meets it this way</T>
      {KINDS.map((k, i) => (
        <T key={k} x={150 + i * 123} y={406} f="hand" size={19} tone="ink2" show={step >= 3} delay={i * 0.06}>{k}</T>
      ))}
      <Pen d={L(90, 384, 1070, 384)} tone="line" w={1.4} show={step >= 3} />
    </Svg>
  );
}

function FlowChannel({ step }) {
  const X0 = 70;
  const Y0 = 350;
  const X1 = 530;
  const Y1 = 30;
  const k = (Y0 - Y1) / (X1 - X0);
  const c = (x) => Y0 - (x - X0) * k;
  const half = 44;
  const band = `M${X0} ${c(X0) - half}L${X1} ${c(X1) - half}L${X1} ${c(X1) + half}L${X0} ${c(X0) + half}Z`;
  const good = Array.from({ length: 10 }, (_, i) => {
    const x = 92 + i * 46;
    return [x, c(x) + (i % 2 ? -24 : 18)];
  });
  const fast = [[92, 334], [150, 250], [200, 150], [240, 60]];
  const slow = [[92, 332], [220, 326], [360, 318], [500, 310]];
  const ang = (-Math.atan(k) * 180) / Math.PI;
  return (
    <Svg w={560} h={420} label="The flow channel, with well-paced and badly paced paths">
      <defs>
        <clipPath id="flow-plot"><rect x={X0} y={Y1} width={X1 - X0} height={Y0 - Y1} /></clipPath>
      </defs>
      <g clipPath="url(#flow-plot)">
        <Fill d={band} tone="design" opacity={0.55} delay={0.4} />
        <Pen d={L(X0, c(X0) - half, X1, c(X1) - half)} tone="design" w={1.6} delay={0.3} />
        <Pen d={L(X0, c(X0) + half, X1, c(X1) + half)} tone="design" w={1.6} delay={0.35} />
        <Pen d={smoothPath(fast)} tone="ink2" w={2} dash="6 6" show={step >= 1} />
        <Pen d={smoothPath(slow)} tone="ink2" w={2} dash="6 6" show={step >= 1} />
        <Pen d={smoothPath(good)} w={3} show={step >= 1} delay={0.2} />
      </g>
      <Pen d={L(X0, Y0, X1 + 10, Y0)} w={2} />
      <Pen d={head(X1 + 10, Y0, 0, 9)} w={2} delay={0.6} />
      <Pen d={L(X0, Y0, X0, Y1 - 10)} w={2} delay={0.1} />
      <Pen d={head(X0, Y1 - 10, -Math.PI / 2, 9)} w={2} delay={0.7} />
      <T x={X1 + 10} y={Y0 + 26} f="mono" size={13} tone="ink2" anchor="end">SKILL</T>
      <T x={X0 - 18} y={(Y0 + Y1) / 2} f="mono" size={13} tone="ink2" rotate={-90}>CHALLENGE</T>
      <T x={150} y={90} f="mono" size={14} tone="ink2" delay={0.8}>ANXIETY</T>
      <T x={450} y={230} f="mono" size={14} tone="ink2" delay={0.9}>BOREDOM</T>
      <T x={300} y={c(300) - half - 14} f="mono" size={13} tone="design" rotate={ang} delay={1}>FLOW CHANNEL</T>
      <T x={250} y={44} f="body" size={15} tone="ink2" anchor="start" show={step >= 1}>too fast → anxiety</T>
      <T x={520} y={292} f="body" size={15} tone="ink2" anchor="end" show={step >= 1}>too slow → boredom</T>
      <T x={X0 + 6} y={Y0 + 50} f="body" size={15} anchor="start" show={step >= 1}>━ well paced: a new idea, then mastery, then the next idea</T>
    </Svg>
  );
}

function IterationLoop({ step }) {
  const cx = 280;
  const cy = 200;
  const r = 128;
  const labels = [['Prototype', 0, -1], ['Playtest', 1, 0], ['Evaluate', 0, 1], ['Revise', -1, 0]];
  const pt = (deg) => [cx + Math.cos((deg * Math.PI) / 180) * r, cy + Math.sin((deg * Math.PI) / 180) * r];
  return (
    <Svg w={560} h={400} label="The iteration loop">
      {labels.map(([name, ux, uy], i) => {
        const a0 = -90 + i * 90 + 16;
        const a1 = -90 + (i + 1) * 90 - 16;
        const [sx, sy] = pt(a0);
        const [ex, ey] = pt(a1);
        const tang = ((a1 + 90) * Math.PI) / 180;
        return (
          <g key={name}>
            <Pen d={`M${sx} ${sy}A${r} ${r} 0 0 1 ${ex} ${ey}`} delay={i * 0.3} />
            <Pen d={head(ex, ey, tang)} delay={i * 0.3 + 0.6} />
            <Dot x={cx + ux * r} y={cy + uy * r} delay={i * 0.3} />
            <T x={cx + ux * (r + 18)} y={cy + uy * (r + 18)} f="display" size={18} anchor={ux > 0 ? 'start' : ux < 0 ? 'end' : 'middle'} delay={i * 0.3 + 0.2}>
              {name}
            </T>
          </g>
        );
      })}
      <T x={cx} y={cy - 12} f="display" size={22} tone="design" show={step >= 1}>Storyboard</T>
      <T x={cx} y={cy + 16} f="hand" size={18} tone="ink2" show={step >= 1}>the cheapest prototype</T>
    </Svg>
  );
}

function Lens({ step }) {
  return (
    <Svg w={560} h={400} label="A lens is a set of questions">
      <Pen d={R(60, 70, 300, 230)} tone="ink2" w={1.8} />
      {[110, 150, 190, 230, 260].map((y, i) => (
        <Pen key={y} d={L(85, y, 330 - (i % 2) * 60, y)} tone="line" w={2} delay={0.1 * i} />
      ))}
      <Pen d={E(300, 190, 95, 95)} tone="design" w={3} delay={0.5} />
      <Pen d={L(368, 258, 450, 340)} tone="design" w={6} delay={0.9} />
      <T x={300} y={170} f="hand" size={20} tone="design" delay={1.1}>Where is the hook?</T>
      <T x={300} y={200} f="hand" size={20} tone="design" delay={1.2}>Where does it rest?</T>
      <T x={300} y={230} f="hand" size={20} tone="design" delay={1.3}>Where is the peak?</T>
      <T x={470} y={60} f="display" size={16} tone="ink2" anchor="end" show={step >= 1}>Lens: the interest curve</T>
    </Svg>
  );
}

// ---------------------------------------------------------------- Module 2
function Pipeline({ step }) {
  const stages = [['Thumbnails', 'tiny, fast'], ['Storyboard', 'panels in order'], ['Story reel', 'panels + timing + sound'], ['Previz', 'rough 3D'], ['Production', 'final']];
  const fid = [[70, 404], [300, 392], [530, 372], [760, 348], [990, 318], [1100, 304]];
  const cost = [[70, 408], [300, 404], [530, 392], [760, 360], [930, 300], [1100, 214]];
  return (
    <Svg w={1160} h={440} label="The storyboarding pipeline">
      {stages.map(([name, sub], i) => (
        <g key={name}>
          <Box x={30 + i * 226} y={70} w={196} h={110} title={name} sub={sub} size={19} subSize={15} delay={i * 0.25} />
          {i < stages.length - 1 && <Arrow x1={30 + i * 226 + 200} y1={125} x2={30 + (i + 1) * 226 - 4} y2={125} delay={i * 0.25 + 0.4} s={9} />}
        </g>
      ))}
      <Pen d={L(60, 420, 1110, 420)} tone="ink2" w={1.6} show={step >= 1} />
      <Pen d={smoothPath(fid)} tone="blue" w={2.6} show={step >= 1} delay={0.2} />
      <Pen d={smoothPath(cost)} tone="design" w={3} show={step >= 1} delay={0.4} />
      <T x={1100} y={326} f="hand" size={18} tone="blue" anchor="end" show={step >= 1} delay={0.8}>fidelity</T>
      <T x={1090} y={196} f="hand" size={18} tone="design" anchor="end" show={step >= 1} delay={0.9}>cost of a change</T>
      <T x={170} y={250} f="hand" size={20} show={step >= 1} delay={1}>change things here ↓</T>
    </Svg>
  );
}

function CostOfChange({ step }) {
  const pts = [[70, 340], [170, 332], [270, 314], [350, 278], [420, 210], [470, 130], [505, 60]];
  return (
    <Svg w={560} h={400} label="The cost of a change rises through production">
      <Pen d={L(60, 350, 530, 350)} />
      <Pen d={L(60, 350, 60, 40)} delay={0.2} />
      <T x={525} y={375} f="hand" size={17} tone="ink2" anchor="end">production time →</T>
      <T x={70} y={40} f="hand" size={17} tone="ink2" anchor="start">cost of a change ↑</T>
      <Pen d={smoothPath(pts)} tone="design" w={3} delay={0.5} />
      <Dot x={170} y={332} tone="design" show={step >= 1} />
      <T x={170} y={300} f="hand" size={18} show={step >= 1}>story reel: redraw</T>
      <Dot x={470} y={130} tone="design" show={step >= 1} delay={0.2} />
      <T x={420} y={100} f="hand" size={18} anchor="end" show={step >= 1} delay={0.2}>final animation: weeks</T>
    </Svg>
  );
}

function Align({ step }) {
  const roles = [['Design', 80, 70, 215, 150], ['Art', 480, 70, 345, 150], ['Engineering', 80, 330, 215, 250], ['Audio', 480, 330, 345, 250]];
  return (
    <Svg w={560} h={400} label="One board, a whole team">
      <Box x={205} y={140} w={150} h={120} />
      <Figure x={262} y={225} s={1.1} delay={0.3} />
      <Pen d={L(215, 247, 345, 247)} tone="ink2" w={1.6} delay={0.4} />
      {roles.map(([name, x, y, tx, ty], i) => (
        <g key={name}>
          <T x={x} y={y} f="display" size={18} delay={0.5 + i * 0.15}>{name}</T>
          <Arrow x1={x} y1={y + (y < 200 ? 16 : -16)} x2={tx} y2={ty} delay={0.6 + i * 0.15} tone="ink2" w={1.8} s={9} />
        </g>
      ))}
      <T x={280} y={385} f="hand" size={20} tone="design" show={step >= 1}>one moment everyone can point at</T>
    </Svg>
  );
}

function ShotGrammar({ step }) {
  const frames = [['Wide', 40], ['Medium', 420], ['Close-up', 800]];
  return (
    <Svg w={1160} h={440} label="Shot sizes and the 180 degree rule">
      {frames.map(([name, x], i) => (
        <g key={name}>
          <Pen d={R(x, 30, 320, 190)} delay={i * 0.3} />
          <T x={x + 160} y={244} f="display" size={18} delay={i * 0.3 + 0.3}>{name}</T>
        </g>
      ))}
      <Pen d={L(60, 190, 340, 190)} tone="ink2" w={1.6} delay={0.3} />
      <Figure x={150} y={170} s={0.8} delay={0.4} />
      <Pen d={R(230, 140, 60, 50)} tone="ink2" w={1.6} delay={0.5} />
      <Pen d={`M220 140L260 112L300 140`} tone="ink2" w={1.6} delay={0.6} />
      <Pen d={E(580, 92, 30, 30)} delay={0.7} w={2.4} />
      <Pen d={L(580, 122, 580, 136)} delay={0.8} w={2.4} />
      <Pen d="M506 220Q506 146 580 136Q654 146 654 220" delay={0.9} w={2.4} />
      <Pen d={E(960, 130, 70, 78)} delay={1} w={2.6} />
      <Pen d={E(935, 118, 9, 6)} delay={1.2} w={2} />
      <Pen d={E(985, 118, 9, 6)} delay={1.2} w={2} />
      <Pen d={`M940 165Q960 178 980 165`} delay={1.3} w={2} />
      <Pen d={L(380, 360, 780, 360)} tone="blue" dash="8 7" w={1.8} show={step >= 1} />
      <Dot x={500} y={360} r={9} show={step >= 1} />
      <Dot x={660} y={360} r={9} show={step >= 1} />
      <T x={500} y={388} f="hand" size={16} tone="ink2" show={step >= 1}>A</T>
      <T x={660} y={388} f="hand" size={16} tone="ink2" show={step >= 1}>B</T>
      <Pen d="M568 428L592 428L580 408Z" tone="blue" w={2.2} show={step >= 1} />
      <Pen d="M568 292L592 292L580 312Z" tone="ink2" w={2} show={step >= 1} />
      <Pen d={L(562, 286, 598, 318)} tone="ink2" w={2} show={step >= 1} />
      <T x={250} y={360} f="hand" size={19} tone="blue" show={step >= 1}>keep the camera on one side</T>
      <T x={960} y={360} f="hand" size={20} tone="design" show={step >= 2}>in games, the player</T>
      <T x={960} y={386} f="hand" size={20} tone="design" show={step >= 2}>may hold this camera</T>
    </Svg>
  );
}

function ContrastAffinity({ step }) {
  const pts = [[60, 300], [130, 298], [200, 292], [250, 262], [285, 120], [320, 250], [370, 282], [420, 252], [455, 80], [490, 240], [525, 282]];
  return (
    <Svg w={560} h={400} label="Contrast raises intensity; affinity lowers it">
      <Pen d={L(50, 320, 535, 320)} />
      <T x={60} y={40} f="hand" size={17} tone="ink2" anchor="start">intensity ↑</T>
      <T x={530} y={344} f="hand" size={17} tone="ink2" anchor="end">time →</T>
      <Pen d={smoothPath(pts)} tone="design" w={3} delay={0.3} />
      <T x={130} y={276} f="hand" size={19} tone="ink2" delay={0.8}>affinity</T>
      <T x={285} y={98} f="hand" size={19} tone="design" delay={0.9}>contrast</T>
      <T x={455} y={58} f="hand" size={19} tone="design" delay={1}>contrast</T>
      <T x={290} y={378} f="hand" size={18} tone="ink2" show={step >= 1}>space · line · shape · tone · colour · movement · rhythm</T>
    </Svg>
  );
}

function Fidelity({ step }) {
  return (
    <Svg w={560} h={400} label="Rough invites critique; polish signals done">
      <Pen d={R(40, 60, 220, 230)} tone="ink2" w={1.8} />
      <Figure x={150} y={220} s={1.4} />
      <Pen d="M70 270C100 262 130 276 160 266S220 262 240 270" tone="ink2" w={1.6} delay={0.4} />
      <T x={150} y={318} f="display" size={18} delay={0.5}>Rough</T>
      <T x={150} y={346} f="hand" size={18} tone="ink2" delay={0.6}>invites critique</T>
      <Fill d={R(300, 60, 220, 230)} tone="ink" opacity={0.6} delay={0.6} />
      <Pen d={R(300, 60, 220, 230)} w={3} delay={0.5} />
      <Pen d={R(325, 85, 170, 180)} w={2} delay={0.7} />
      <Figure x={410} y={220} s={1.4} delay={0.8} />
      <T x={410} y={318} f="display" size={18} delay={0.9}>Polished</T>
      <T x={410} y={346} f="hand" size={18} tone="ink2" delay={1}>signals “done”</T>
      <T x={150} y={36} f="hand" size={20} tone="design" show={step >= 1}>“what if…?”</T>
      <T x={410} y={36} f="hand" size={20} tone="ink2" show={step >= 1}>“looks finished”</T>
    </Svg>
  );
}

// ---------------------------------------------------------------- Module 3
function FilmGame({ step }) {
  const nodes = [[680, 210], [780, 140], [780, 280], [880, 110], [880, 200], [880, 300], [980, 160], [980, 270], [1080, 210]];
  const edges = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7], [6, 8], [7, 8], [7, 2]];
  return (
    <Svg w={1160} h={400} label="Film: a sequence. Game: a graph.">
      <T x={300} y={50} f="display" size={24}>Film</T>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <Pen d={R(60 + i * 100, 150, 84, 64)} delay={i * 0.15} />
          {i < 4 && <Arrow x1={148 + i * 100} y1={182} x2={156 + i * 100} y2={182} delay={i * 0.15 + 0.3} s={6} w={1.6} />}
        </g>
      ))}
      <T x={300} y={260} f="hand" size={20} tone="ink2" delay={0.9}>one order · the director’s camera</T>
      <T x={880} y={50} f="display" size={24} delay={0.4}>Game</T>
      {edges.map(([a, b], i) => (
        <Pen key={i} d={L(...nodes[a], ...nodes[b])} tone="ink2" w={1.8} delay={0.6 + i * 0.05} />
      ))}
      {nodes.map(([x, y], i) => (
        <Dot key={i} x={x} y={y} r={9} delay={0.6 + i * 0.05} tone={i === 4 ? 'design' : 'ink'} />
      ))}
      <T x={880} y={360} f="hand" size={20} tone="ink2" delay={1.2}>a graph of states · the player’s camera</T>
      <Pen d={`M880 200L940 150A80 80 0 0 1 950 240Z`} tone="blue" w={1.6} show={step >= 1} />
      <T x={1000} y={120} f="hand" size={18} tone="blue" show={step >= 1}>what the player sees</T>
    </Svg>
  );
}

function UnitsToReps({ step }) {
  const units = ['Beat', 'Choice', 'Intensity', 'Room', 'Panel', 'Shot', 'Screen', 'Playtest'];
  const reps = ['Text', 'Graph', 'Curve', 'Map', 'Image', 'Video', 'Flow', 'Play'];
  return (
    <Svg w={1160} h={420} label="Each unit has its own representation">
      <T x={300} y={24} f="display" size={18} tone="ink2">Unit</T>
      <T x={860} y={24} f="display" size={18} tone="ink2" show={step >= 1}>Representation</T>
      {units.map((u, i) => {
        const y = 66 + i * 47;
        return (
          <g key={u}>
            <T x={300} y={y} f="hand" size={24} delay={i * 0.08}>{u}</T>
            <Arrow x1={380} y1={y} x2={780} y2={y} tone="ink2" w={1.6} s={9} show={step >= 1} delay={i * 0.08} />
            <T x={860} y={y} f="hand" size={24} tone="design" show={step >= 1} delay={0.5 + i * 0.08}>{reps[i]}</T>
          </g>
        );
      })}
    </Svg>
  );
}

function BeatChart({ step }) {
  const curve = [[60, 200], [130, 95], [200, 175], [300, 150], [360, 175], [470, 120], [530, 165], [650, 100], [710, 150], [860, 45], [940, 150], [1100, 178]];
  const measured = [[60, 205], [130, 120], [200, 168], [300, 170], [360, 190], [470, 160], [530, 150], [650, 120], [710, 135], [860, 70], [940, 140], [1100, 180]];
  const cols = ['Level 1', 'Level 2', 'Level 3', 'Level 4', 'Level 5'];
  const rows = [
    ['New mechanic', ['run, jump', 'wall jump', 'grapple', '—', 'all of them']],
    ['Threat', ['slimes', 'bats', 'turrets', 'mixed', 'the boss']],
    ['Story beat', ['leave home', 'meet the guide', 'the bridge falls', 'the guide is lost', 'return home']],
  ];
  return (
    <Svg w={1160} h={440} label="Interest curve and beat chart">
      <Pen d={L(50, 215, 1110, 215)} tone="ink2" w={1.6} />
      <Pen d={smoothPath(curve)} tone="design" w={3} delay={0.2} />
      <T x={130} y={74} f="hand" size={18} tone="ink2" delay={0.8}>hook</T>
      <T x={860} y={26} f="hand" size={18} tone="ink2" delay={0.9}>climax</T>
      <T x={1100} y={198} f="hand" size={18} tone="ink2" anchor="end" delay={1}>resolution</T>
      <T x={58} y={26} f="hand" size={17} tone="ink2" anchor="start">interest ↑</T>
      {cols.map((c, i) => (
        <T key={c} x={260 + i * 190} y={248} f="display" size={15} show={step >= 1} delay={i * 0.08}>{c}</T>
      ))}
      {rows.map(([label, cells], r) => (
        <g key={label}>
          <T x={60} y={292 + r * 46} f="display" size={14} tone="ink2" anchor="start" show={step >= 1}>{label}</T>
          {cells.map((cell, i) => (
            <T key={i} x={260 + i * 190} y={292 + r * 46} f="hand" size={18} show={step >= 1} delay={0.2 + i * 0.05}>{cell}</T>
          ))}
          <Pen d={L(50, 270 + r * 46, 1110, 270 + r * 46)} tone="line" w={1.2} show={step >= 1} />
        </g>
      ))}
      <T x={1110} y={428} f="hand" size={15} tone="ink2" anchor="end" show={step >= 1}>sample beat chart</T>
      <Pen d={smoothPath(measured)} tone="blue" w={2.2} dash="6 6" show={step >= 2} />
      <T x={600} y={26} f="hand" size={18} tone="blue" show={step >= 2}>- - measured in playtests</T>
    </Svg>
  );
}

function MiniGraph({ x, y, pattern, show, delay }) {
  const g = BRANCH_PATTERNS[pattern];
  return (
    <g>
      <T x={x} y={y + 14} f="display" size={16} anchor="start" show={show} delay={delay}>{g.name}</T>
      {g.edges.map(([a, b, kind], i) => (
        <Pen key={i} d={L(x + g.nodes[a][0], y + g.nodes[a][1], x + g.nodes[b][0], y + g.nodes[b][1])}
          tone={kind === 'dash' ? 'blue' : 'ink2'} dash={kind === 'dash' ? '5 5' : undefined} w={1.7} show={show} delay={delay + 0.2 + i * 0.03} />
      ))}
      {g.nodes.map(([nx, ny], i) => (
        <Dot key={i} x={x + nx} y={y + ny} r={g.end?.includes(i) ? 7 : 5.5} tone={g.end?.includes(i) ? 'design' : 'ink'} show={show} delay={delay + 0.2 + i * 0.03} />
      ))}
    </g>
  );
}

function Branching({ step }) {
  const order = ['timeCave', 'gauntlet', 'bottleneck', 'quest', 'sortingHat', 'loopGrow'];
  return (
    <Svg w={1160} h={460} label="Branching patterns">
      {order.map((key, i) => (
        <MiniGraph key={key} pattern={key} x={30 + (i % 3) * 385} y={10 + Math.floor(i / 3) * 230} show={i < 3 || step >= 1} delay={(i % 3) * 0.25} />
      ))}
    </Svg>
  );
}

function FourStep({ step }) {
  const panels = [
    ['1 · Introduce', 'ki · safely'],
    ['2 · Develop', 'shō · add risk'],
    ['3 · Twist', 'ten · change the rule'],
    ['4 · Conclude', 'ketsu · test it all'],
  ];
  return (
    <Svg w={1160} h={420} label="Four-step level design">
      {panels.map(([name, sub], i) => {
        const x = 30 + i * 285;
        const show = step >= i;
        return (
          <g key={name}>
            <Pen d={R(x, 30, 255, 230)} show={show} />
            <T x={x + 127} y={290} f="display" size={19} show={show} delay={0.3}>{name}</T>
            <T x={x + 127} y={318} f="hand" size={18} tone="ink2" show={show} delay={0.4}>{sub}</T>
            {i === 0 && (
              <g>
                <Pen d={L(x + 15, 220, x + 240, 220)} tone="ink2" w={1.8} show={show} />
                <Fill d={R(x + 90, 195, 80, 18)} tone="blue" show={show} delay={0.3} />
                <Pen d={R(x + 90, 195, 80, 18)} tone="blue" w={2} show={show} delay={0.2} />
                <Figure x={x + 130} y={170} s={0.7} show={show} delay={0.3} />
              </g>
            )}
            {i === 1 && (
              <g>
                <Pen d={L(x + 15, 220, x + 70, 220)} tone="ink2" w={1.8} show={show} />
                <Pen d={L(x + 185, 220, x + 240, 220)} tone="ink2" w={1.8} show={show} />
                <Fill d={R(x + 92, 165, 72, 16)} tone="blue" show={show} delay={0.3} />
                <Pen d={R(x + 92, 165, 72, 16)} tone="blue" w={2} show={show} delay={0.2} />
                <Pen d={`M${x + 45} 200Q${x + 90} 110 ${x + 128} 160`} tone="ink2" dash="5 5" w={1.6} show={show} />
                <Figure x={x + 45} y={196} s={0.6} show={show} delay={0.3} />
              </g>
            )}
            {i === 2 && (
              <g>
                <Pen d={L(x + 15, 220, x + 60, 220)} tone="ink2" w={1.8} show={show} />
                <Pen d={L(x + 195, 220, x + 240, 220)} tone="ink2" w={1.8} show={show} />
                <Fill d={R(x + 92, 150, 72, 16)} tone="blue" show={show} delay={0.3} />
                <Pen d={R(x + 92, 150, 72, 16)} tone="blue" w={2} show={show} delay={0.2} />
                <Arrow x1={x + 100} y1={128} x2={x + 60} y2={128} tone="blue" w={1.6} s={8} show={show} delay={0.4} />
                <Arrow x1={x + 156} y1={128} x2={x + 196} y2={128} tone="blue" w={1.6} s={8} show={show} delay={0.4} />
                <T x={x + 128} y={100} f="hand" size={16} tone="blue" show={show} delay={0.5}>now it moves</T>
              </g>
            )}
            {i === 3 && (
              <g>
                <Pen d={L(x + 15, 220, x + 45, 220)} tone="ink2" w={1.8} show={show} />
                <Pen d={L(x + 215, 220, x + 240, 220)} tone="ink2" w={1.8} show={show} />
                {[[x + 60, 175], [x + 110, 140], [x + 160, 170]].map(([px, py], k) => (
                  <g key={k}>
                    <Fill d={R(px, py, 44, 14)} tone="blue" show={show} delay={0.3 + k * 0.1} />
                    <Pen d={R(px, py, 44, 14)} tone="blue" w={2} show={show} delay={0.2 + k * 0.1} />
                  </g>
                ))}
                <Pen d={L(x + 228, 220, x + 228, 160)} w={2} show={show} delay={0.5} />
                <Pen d={`M${x + 228} 160L${x + 248} 168L${x + 228} 176`} tone="design" w={2} show={show} delay={0.6} />
              </g>
            )}
          </g>
        );
      })}
    </Svg>
  );
}

function ThreeCs({ step }) {
  return (
    <Svg w={1160} h={440} label="A gameplay panel annotated with the 3Cs">
      <Pen d={R(50, 30, 620, 370)} w={2.8} />
      <Pen d={L(70, 340, 300, 340)} tone="ink2" w={2} delay={0.2} />
      <Pen d={L(450, 340, 650, 340)} tone="ink2" w={2} delay={0.3} />
      <Fill d={R(330, 250, 100, 20)} tone="ink" opacity={0.6} delay={0.4} />
      <Pen d={R(330, 250, 100, 20)} w={2} delay={0.4} />
      <Figure x={230} y={250} s={1.3} delay={0.5} />
      <Pen d="M245 220Q300 120 360 230" tone="ink2" dash="6 6" w={1.8} />
      <Pen d={L(670, 120, 760, 110)} tone="ink2" w={1.4} />
      <T x={780} y={96} f="display" size={18} anchor="start">Character</T>
      <T x={780} y={124} f="hand" size={20} anchor="start" tone="ink2">can jump, and jump again in the air</T>
      <Pen d={R(90, 60, 470, 310)} tone="blue" dash="8 7" w={1.8} show={step >= 1} />
      <Arrow x1={420} y1={70} x2={520} y2={70} tone="blue" w={1.8} s={9} show={step >= 1} />
      <Pen d={L(670, 220, 760, 215)} tone="blue" w={1.4} show={step >= 1} />
      <T x={780} y={200} f="display" size={18} anchor="start" tone="blue" show={step >= 1}>Camera</T>
      <T x={780} y={228} f="hand" size={20} anchor="start" tone="ink2" show={step >= 1}>side view, leads to the right</T>
      <Pen d={E(600, 360, 20, 20)} tone="design" w={2.4} show={step >= 2} />
      <T x={600} y={361} f="display" size={18} tone="design" show={step >= 2}>A</T>
      <Pen d={L(670, 320, 760, 318)} tone="design" w={1.4} show={step >= 2} />
      <T x={780} y={304} f="display" size={18} anchor="start" tone="design" show={step >= 2}>Controls</T>
      <T x={780} y={332} f="hand" size={20} anchor="start" tone="ink2" show={step >= 2}>A to jump · A again in the air</T>
    </Svg>
  );
}

function OtherBoards({ step }) {
  const rooms = [['Start', 40, 170], ['Hall', 170, 170], ['Key', 170, 50], ['Door', 300, 170], ['Boss', 430, 170]];
  const flow = [['Title', 640, 60], ['Menu', 820, 60], ['Levels', 1000, 60], ['Play', 1000, 200], ['Pause', 820, 200], ['Results', 1000, 330]];
  return (
    <Svg w={1160} h={420} label="A lock-and-key map and a screen flow">
      <T x={290} y={24} f="display" size={18} tone="ink2">Level map · where?</T>
      {rooms.map(([name, x, y], i) => (
        <Box key={name} x={x} y={y} w={100} h={70} title={name} size={16} tone={name === 'Key' || name === 'Door' ? 'design' : undefined} fill={name === 'Door' ? 'design' : undefined} delay={i * 0.15} />
      ))}
      <Pen d={L(140, 205, 170, 205)} delay={0.6} />
      <Pen d={L(220, 170, 220, 120)} delay={0.7} />
      <Pen d={L(270, 205, 300, 205)} delay={0.8} />
      <Pen d={L(400, 205, 430, 205)} delay={0.9} />
      <Arrow x1={270} y1={90} x2={330} y2={160} bend={-20} tone="design" dash="5 5" w={1.6} />
      <T x={250} y={320} f="hand" size={19} tone="design" delay={1}>the key must be reachable before the door</T>
      <T x={880} y={24} f="display" size={18} tone="ink2" show={step >= 1}>Screen flow · what next?</T>
      {flow.map(([name, x, y], i) => (
        <Box key={name} x={x - 60} y={y} w={120} h={56} title={name} size={15} show={step >= 1} delay={i * 0.12} />
      ))}
      <Arrow x1={700} y1={88} x2={756} y2={88} s={8} w={1.6} show={step >= 1} delay={0.4} />
      <Arrow x1={880} y1={88} x2={936} y2={88} s={8} w={1.6} show={step >= 1} delay={0.5} />
      <Arrow x1={1000} y1={118} x2={1000} y2={196} s={8} w={1.6} show={step >= 1} delay={0.6} />
      <Arrow x1={940} y1={220} x2={884} y2={220} s={8} w={1.6} show={step >= 1} delay={0.7} />
      <Arrow x1={884} y1={240} x2={940} y2={240} s={8} w={1.6} show={step >= 1} delay={0.8} />
      <Arrow x1={1000} y1={258} x2={1000} y2={326} s={8} w={1.6} show={step >= 1} delay={0.9} />
      <Arrow x1={1062} y1={350} x2={1062} y2={92} bend={-50} s={8} w={1.6} tone="ink2" show={step >= 1} delay={1} />
    </Svg>
  );
}

// ---------------------------------------------------------------- Module 4
function Collapse({ step }) {
  const events = [['2024', 'Genie', 'worlds from internet video'], ['2024', 'GameNGen', 'DOOM, simulated by a model'], ['2025', 'Muse', 'gameplay ideation'], ['2025', 'Genie 3', 'real-time worlds']];
  return (
    <Svg w={1160} h={400} label="From storyboard to playable world">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Pen d={R(60 + i * 95, 70, 80, 60)} delay={i * 0.15} />
          <Figure x={100 + i * 95} y={115} s={0.45} delay={0.2 + i * 0.15} />
        </g>
      ))}
      <T x={195} y={160} f="display" size={18} delay={0.5}>Storyboard</T>
      <Arrow x1={360} y1={100} x2={780} y2={100} tone="red" w={2.6} delay={0.6} />
      <T x={570} y={74} f="hand" size={20} tone="red" delay={1}>world models</T>
      <Pen d={R(820, 50, 250, 110)} tone="blue" w={2.4} delay={0.8} />
      <Pen d={`M870 150L940 95A90 90 0 0 1 950 160Z`} tone="blue" w={1.8} delay={1} />
      <Dot x={870} y={150} delay={1.1} />
      <T x={945} y={186} f="display" size={18} tone="blue" delay={1.1}>Playable</T>
      <Pen d={L(80, 300, 1090, 300)} tone="ink2" w={1.6} show={step >= 1} />
      {events.map(([year, name, line], i) => {
        const x = 170 + i * 270;
        return (
          <g key={name}>
            <Dot x={x} y={300} r={8} tone="red" show={step >= 1} delay={i * 0.15} />
            <T x={x} y={272} f="display" size={15} tone="ink2" show={step >= 1} delay={i * 0.15}>{year}</T>
            <T x={x} y={332} f="display" size={18} show={step >= 1} delay={0.1 + i * 0.15}>{name}</T>
            <T x={x} y={360} f="hand" size={17} tone="ink2" show={step >= 1} delay={0.2 + i * 0.15}>{line}</T>
          </g>
        );
      })}
    </Svg>
  );
}

function CostFidelity({ step }) {
  const trad = [[90, 330], [180, 300], [280, 250], [380, 180], [470, 90]];
  const names = ['thumbnail', 'storyboard', 'story reel', 'previz', 'final'];
  return (
    <Svg w={560} h={420} label="Traditionally, fidelity costs more. AI makes polish cheap.">
      <Pen d={L(60, 360, 530, 360)} />
      <Pen d={L(60, 360, 60, 40)} delay={0.2} />
      <T x={525} y={386} f="hand" size={17} tone="ink2" anchor="end">fidelity: rough → polished</T>
      <T x={70} y={34} f="hand" size={17} tone="ink2" anchor="start">cost ↑</T>
      <Pen d={smoothPath(trad)} tone="ink2" w={2} delay={0.4} />
      {trad.map(([x, y], i) => (
        <g key={i}>
          <Dot x={x} y={y} delay={0.4 + i * 0.1} />
          <T x={x - 12} y={y - 20} f="hand" size={16} tone="ink2" anchor="end" delay={0.5 + i * 0.1}>{names[i]}</T>
        </g>
      ))}
      <Dot x={470} y={330} r={9} tone="red" show={step >= 1} />
      <T x={470} y={302} f="display" size={16} tone="red" show={step >= 1}>AI board</T>
      <T x={300} y={410} f="hand" size={18} tone="red" show={step >= 1}>polished and cheap: will people still critique it?</T>
    </Svg>
  );
}

function Threads({ step }) {
  const rows = [
    { name: 'Intensity', y: 70, steps: ['Interest curve', 'Contrast & affinity', 'Beat chart', 'Can AI model it?'], from: ['Schell', 'Block', 'Rogers', ''] },
    { name: 'Cost of failure', y: 230, steps: ['Fail cheaply', 'Rough invites critique', 'AI: cheap + polished', 'What happens to critique?'], from: ['Catmull', 'Buxton', '', ''] },
  ];
  return (
    <Svg w={1160} h={360} label="Two threads through the four modules">
      {rows.map((r, ri) => {
        const show = ri === 0 || step >= 1;
        return (
          <g key={r.name}>
            <T x={40} y={r.y - 24} f="display" size={18} tone="ink2" anchor="start" show={show}>{r.name}</T>
            {r.steps.map((s, i) => {
              const x = 40 + i * 280;
              const ai = i === 3 || (ri === 1 && i === 2);
              return (
                <g key={s}>
                  <Box x={x} y={r.y} w={240} h={78} tone={ai ? 'red' : undefined} show={show} delay={i * 0.25} />
                  <T x={x + 120} y={r.y + (r.from[i] ? 30 : 39)} f="hand" size={20} tone={ai ? 'red' : undefined} show={show} delay={i * 0.25 + 0.2}>{s}</T>
                  {r.from[i] && <T x={x + 120} y={r.y + 56} f="display" size={13} tone="ink2" show={show} delay={i * 0.25 + 0.3}>{r.from[i]}</T>}
                  {i < 3 && <Arrow x1={x + 244} y1={r.y + 39} x2={x + 276} y2={r.y + 39} s={8} w={1.8} show={show} delay={i * 0.25 + 0.4} />}
                </g>
              );
            })}
          </g>
        );
      })}
    </Svg>
  );
}


// ---------------------------------------------------------------- craft figures

// A standing person, feet at (cx, feetY), scaled by s. Returns path strings.
function person(cx, feetY, s) {
  const P = (x, y) => [cx + x * s, feetY + y * s];
  const seg = (a, b) => L(...P(...a), ...P(...b));
  const [hx, hy] = P(0, -232);
  return {
    head: E(hx, hy, 26 * s, 26 * s),
    neck: seg([0, -206], [0, -194]),
    torso: `M${P(-46, -186).join(' ')}Q${P(0, -200).join(' ')} ${P(46, -186).join(' ')}L${P(36, -100).join(' ')}L${P(-36, -100).join(' ')}Z`,
    armL: seg([-46, -186], [-58, -110]),
    armR: seg([46, -186], [58, -110]),
    legL: seg([-24, -100], [-26, 0]),
    legR: seg([24, -100], [26, 0]),
    eyeL: E(...P(-9, -236), 3.2 * s, 3.2 * s),
    eyeR: E(...P(9, -236), 3.2 * s, 3.2 * s),
    mouth: seg([-8, -219], [8, -219]),
  };
}

function ShotSizes() {
  const fw = 150;
  const fh = 100;
  const y0 = 30;
  const frames = [
    { code: 'ELS', name: 'extreme long', s: 0.13, feet: 78, extra: 'horizon' },
    { code: 'LS', name: 'long', s: 0.33, feet: 94 },
    { code: 'MLS', name: 'medium long', s: 0.45, feet: 122 },
    { code: 'MS', name: 'medium', s: 0.6, feet: 160 },
    { code: 'MCU', name: 'medium close-up', s: 1, feet: 262 },
    { code: 'CU', name: 'close-up', s: 1.9, feet: 491 },
    { code: 'ECU', name: 'extreme close-up', s: 4.5, feet: 1112 },
  ];
  return (
    <Svg w={1160} h={210} label="Shot sizes from extreme long to extreme close-up">
      <defs>
        {frames.map((f, i) => (
          <clipPath key={f.code} id={`ss-${i}`}>
            <rect x={10 + i * 165} y={y0} width={fw} height={fh} />
          </clipPath>
        ))}
      </defs>
      {frames.map((f, i) => {
        const x = 10 + i * 165;
        const pp = person(x + fw / 2, y0 + f.feet, f.s);
        const d = i * 0.12;
        const close = f.s >= 1;
        return (
          <g key={f.code}>
            <g clipPath={`url(#ss-${i})`}>
              {f.extra && <Pen d={L(x, y0 + 78, x + fw, y0 + 78)} tone="ink2" w={1.2} delay={d} />}
              {f.extra && <Pen d={`M${x + 96} ${y0 + 78}V${y0 + 58}L${x + 110} ${y0 + 48}L${x + 124} ${y0 + 58}V${y0 + 78}`} tone="ink2" w={1.2} delay={d} />}
              {['head', 'neck', 'torso', 'armL', 'armR', 'legL', 'legR'].map((k) => (
                <Pen key={k} d={pp[k]} w={close ? 2 : 1.6} delay={d + 0.1} />
              ))}
              {close && ['eyeL', 'eyeR', 'mouth'].map((k) => <Pen key={k} d={pp[k]} w={2} delay={d + 0.3} />)}
            </g>
            <Pen d={R(x, y0, fw, fh)} w={2} delay={d} />
            <T x={x + fw / 2} y={y0 + fh + 24} f="mono" size={16} tone="design" delay={d + 0.2}>{f.code}</T>
            <T x={x + fw / 2} y={y0 + fh + 46} size={14} tone="ink2" delay={d + 0.25}>{f.name}</T>
          </g>
        );
      })}
    </Svg>
  );
}

function Cam({ x, y, rot = 0, tone, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <Pen d={R(-18, -12, 30, 24)} tone={tone} w={2} delay={delay} />
      <Pen d="M12 -7L24 -12V12L12 7Z" tone={tone} w={2} delay={delay + 0.1} />
    </g>
  );
}

function CameraMoves() {
  const cells = [
    { name: 'Pan', desc: ['turns left or right', 'on the spot'] },
    { name: 'Tilt', desc: ['turns up or down', 'on the spot'] },
    { name: 'Track / dolly', desc: ['the camera itself', 'travels'] },
    { name: 'Crane', desc: ['the camera rises', 'or lowers'] },
    { name: 'Zoom', desc: ['the lens changes;', 'the camera stays'] },
  ];
  const arc = (cx, cy, r, a0, a1) => {
    const p0 = [cx + Math.cos(a0) * r, cy + Math.sin(a0) * r];
    const p1 = [cx + Math.cos(a1) * r, cy + Math.sin(a1) * r];
    return { d: `M${p0[0]} ${p0[1]}A${r} ${r} 0 0 1 ${p1[0]} ${p1[1]}`, end: p1, ang: a1 + Math.PI / 2 };
  };
  const pan = arc(115, 140, 48, Math.PI * 1.15, Math.PI * 1.85);
  const tilt = arc(345, 140, 50, -Math.PI * 0.35, Math.PI * 0.35);
  return (
    <Svg w={1160} h={290} label="Camera moves">
      {cells.map((c, i) => {
        const x = 10 + i * 232;
        return (
          <g key={c.name}>
            <Pen d={R(x, 10, 212, 270)} tone="line" w={1.2} />
            <T x={x + 106} y={36} f="display" size={18} delay={i * 0.1}>{c.name}</T>
            {c.desc.map((line, k) => (
              <T key={line} x={x + 106} y={238 + k * 20} size={15} tone="ink2" delay={i * 0.1 + 0.3}>{line}</T>
            ))}
          </g>
        );
      })}
      <Cam x={115} y={140} />
      <Pen d={L(140, 140, 200, 112)} tone="ink2" w={1.4} dash="5 5" />
      <Pen d={L(140, 140, 200, 168)} tone="ink2" w={1.4} dash="5 5" />
      <Pen d={pan.d} tone="design" w={2.2} delay={0.4} />
      <Pen d={head(...pan.end, pan.ang)} tone="design" w={2.2} delay={1} />

      <Cam x={330} y={140} delay={0.1} />
      <Pen d={tilt.d} tone="design" w={2.2} delay={0.5} />
      <Pen d={head(...tilt.end, tilt.ang)} tone="design" w={2.2} delay={1.1} />

      <Pen d={L(480, 190, 680, 190)} w={2} delay={0.2} />
      {[495, 525, 555, 585, 615, 645, 675].map((x) => <Pen key={x} d={L(x, 190, x - 8, 200)} tone="ink2" w={1.2} delay={0.3} />)}
      <Cam x={515} y={160} tone="ink2" delay={0.2} />
      <Cam x={640} y={160} delay={0.4} />
      <Arrow x1={530} y1={118} x2={625} y2={118} tone="design" w={2.2} delay={0.6} />

      <Pen d={L(805, 215, 805, 80)} tone="ink2" w={2} delay={0.3} />
      <Cam x={805} y={190} tone="ink2" delay={0.3} />
      <Cam x={805} y={95} delay={0.5} />
      <Arrow x1={850} y1={190} x2={850} y2={100} tone="design" w={2.2} delay={0.7} />

      <Pen d={R(965, 80, 140, 100)} w={2} delay={0.4} />
      <Pen d={R(1000, 105, 70, 50)} tone="design" w={2.2} delay={0.6} />
      {[[965, 80, 1000, 105], [1105, 80, 1070, 105], [965, 180, 1000, 155], [1105, 180, 1070, 155]].map(([a, b, c2, d2], k) => (
        <Arrow key={k} x1={a} y1={b} x2={c2} y2={d2} tone="design" w={1.6} s={7} delay={0.8 + k * 0.05} />
      ))}
    </Svg>
  );
}

function Marker({ n, x, y, show = true, delay = 0 }) {
  return (
    <g>
      <motion.circle cx={x} cy={y} r={11} className="dot dot--design" initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.3, delay: show ? delay : 0 }} />
      <T x={x} y={y + 1} f="mono" size={13} tone="paper" show={show} delay={delay}>{n}</T>
    </g>
  );
}

function PanelAnatomy() {
  const legend = [
    'ID: scene · shot · panel',
    'Frame: what the camera sees (16:9)',
    'Subject movement: arrow in the frame',
    'Camera move: end frame + corner arrows',
    'Action: one line',
    'Dialogue and sound',
    'Timing: seconds or frames',
    'Transition: cut, dissolve, fade',
  ];
  return (
    <Svg w={1160} h={430} label="Anatomy of a storyboard panel">
      <T x={70} y={26} f="mono" size={15} anchor="start">SC 04 · SH 12 · P 03</T>
      <Pen d={R(60, 44, 544, 306)} w={2.4} />
      <Pen d={L(72, 300, 592, 300)} tone="ink2" w={1.6} delay={0.2} />
      <Pen d={R(500, 180, 60, 120)} w={2} delay={0.3} />
      <Figure x={180} y={270} s={1.4} delay={0.3} />
      <Arrow x1={222} y1={232} x2={320} y2={232} w={2} delay={0.5} />
      <Pen d={R(330, 120, 240, 135)} tone="design" w={2} delay={0.7} />
      {[[60, 44, 330, 120], [604, 44, 570, 120], [60, 350, 330, 255], [604, 350, 570, 255]].map(([a, b, c2, d2], k) => (
        <Arrow key={k} x1={a} y1={b} x2={c2} y2={d2} tone="design" w={1.3} s={8} delay={0.9 + k * 0.05} />
      ))}
      <T x={70} y={378} f="mono" size={13} tone="ink2" anchor="start">ACTION</T>
      <T x={150} y={378} size={17} anchor="start">Mara crosses to the door and stops.</T>
      <T x={70} y={406} f="mono" size={13} tone="ink2" anchor="start">SOUND</T>
      <T x={150} y={406} size={17} anchor="start">A floorboard creaks.</T>
      <T x={604} y={378} f="mono" size={14} anchor="end">2.5 s · 60 f @ 24 fps</T>
      <T x={604} y={406} f="mono" size={14} anchor="end">CUT →</T>
      {[[44, 26], [604, 44], [270, 214], [570, 120], [56, 378], [56, 406], [620, 378], [620, 406]].map(([x, y], i) => (
        <Marker key={i} n={i + 1} x={x} y={y} delay={0.4 + i * 0.08} />
      ))}
      {legend.map((line, i) => (
        <g key={line}>
          <Marker n={i + 1} x={690} y={70 + i * 42} delay={0.4 + i * 0.08} />
          <T x={712} y={71 + i * 42} size={17} anchor="start" delay={0.45 + i * 0.08}>{line}</T>
        </g>
      ))}
    </Svg>
  );
}

const ghostPath = (x, y, r = 13) =>
  `M${x - r} ${y + r}V${y - 2}A${r} ${r} 0 0 1 ${x + r} ${y - 2}V${y + r}L${x + r * 0.6} ${y + r * 0.65}L${x + r * 0.2} ${y + r}L${x - r * 0.2} ${y + r * 0.65}L${x - r * 0.6} ${y + r}Z`;
const pacPath = (x, y, r = 14) => {
  const a = 0.6;
  return `M${x} ${y}L${x + r * Math.cos(a)} ${y - r * Math.sin(a)}A${r} ${r} 0 1 0 ${x + r * Math.cos(a)} ${y + r * Math.sin(a)}Z`;
};
const xMark = (x, y, s = 9) => `M${x - s} ${y - s}L${x + s} ${y + s}M${x + s} ${y - s}L${x - s} ${y + s}`;

function Ghosts({ step }) {
  const C = 36;
  const T0 = (c, r) => [40 + c * C + C / 2, 20 + r * C + C / 2];
  const pac = T0(5, 4);
  const pivot = T0(7, 4);
  const ghosts = [
    { n: 'B', name: 'Blinky', at: T0(9, 1), target: T0(5, 4), line: 'targets your tile' },
    { n: 'P', name: 'Pinky', at: T0(12, 6), target: T0(9, 4), line: 'targets four tiles ahead of you' },
    { n: 'I', name: 'Inky', at: T0(1, 1), target: T0(5, 7), line: 'doubles the line from Blinky to two tiles ahead of you' },
    { n: 'C', name: 'Clyde', at: T0(3, 6), target: T0(0, 7), line: 'chases when far; retreats to his corner when close' },
  ];
  return (
    <Svg w={1160} h={330} label="How each Pac-Man ghost picks its target">
      {Array.from({ length: 15 }, (_, i) => <Pen key={`v${i}`} d={L(40 + i * C, 20, 40 + i * C, 20 + 8 * C)} tone="line" w={1} />)}
      {Array.from({ length: 9 }, (_, i) => <Pen key={`h${i}`} d={L(40, 20 + i * C, 40 + 14 * C, 20 + i * C)} tone="line" w={1} />)}
      <Pen d={pacPath(...pac)} w={2.4} delay={0.2} />
      <Arrow x1={pac[0] + 20} y1={pac[1] - 22} x2={pac[0] + 48} y2={pac[1] - 22} w={1.4} s={7} tone="ink2" delay={0.3} />
      {ghosts.map((g, i) => {
        const show = step >= i;
        return (
          <g key={g.n}>
            {g.n === 'I' && (
              <>
                <Dot x={pivot[0]} y={pivot[1]} r={4} tone="ink2" show={show} />
                <Pen d={L(...ghosts[0].at, ...g.target)} tone="design" w={1.2} dash="3 5" show={show} />
              </>
            )}
            <Pen d={L(...g.at, ...g.target)} tone="ink2" w={1.4} dash="6 6" show={show} />
            <Pen d={ghostPath(...g.at)} w={2.2} show={show} delay={0.1} />
            <T x={g.at[0]} y={g.at[1] - 22} f="mono" size={13} show={show} delay={0.2}>{g.n}</T>
            <Pen d={xMark(...g.target)} tone="design" w={2.6} show={show} delay={0.3} />
            <Pen d={ghostPath(640, 44 + i * 74, 12)} w={2} show={show} delay={0.1} />
            <T x={668} y={40 + i * 74} f="display" size={18} anchor="start" show={show} delay={0.2}>{g.name}</T>
            <T x={668} y={64 + i * 74} size={16} tone="ink2" anchor="start" show={show} delay={0.25}>{g.line}</T>
          </g>
        );
      })}
      <Pen d={xMark(1060, 316, 6)} tone="design" w={2.2} />
      <T x={1074} y={316} f="mono" size={12} tone="ink2" anchor="start">target tile</T>
    </Svg>
  );
}

function World11({ step }) {
  const block = (x, y, q, show, delay) => (
    <g key={`${x}-${y}`}>
      <Pen d={R(x, y, 34, 34)} w={2} show={show} delay={delay} tone={q ? 'design' : undefined} />
      {q && <T x={x + 17} y={y + 18} f="display" size={18} tone="design" show={show} delay={delay + 0.2}>?</T>}
    </g>
  );
  const legend = ['Start on the left, open space ahead', 'A lone ? block invites a bump', 'The first enemy is easy to jump on', 'The mushroom rolls away, hits the pipe, comes back'];
  return (
    <Svg w={1160} h={320} label="World 1-1's first screen as a teaching sequence (schematic)">
      <Fill d={R(20, 280, 820, 22)} tone="ink" opacity={0.6} />
      <Pen d={L(20, 280, 840, 280)} w={2.4} />
      <Figure x={80} y={265} s={0.75} />
      <Marker n={1} x={80} y={196} />
      {block(300, 170, true, step >= 1, 0)}
      <Marker n={2} x={317} y={146} show={step >= 1} delay={0.2} />
      {[[440, false], [474, true], [508, false], [542, true], [576, false]].map(([x, q], i) => block(x, 170, q, step >= 1, 0.1 + i * 0.05))}
      {block(508, 60, true, step >= 1, 0.4)}
      <Pen d={`M370 280V266A16 16 0 0 1 402 266V280`} w={2.2} show={step >= 2} />
      <Pen d={L(378, 280, 372, 286)} w={2} show={step >= 2} delay={0.2} />
      <Pen d={L(394, 280, 400, 286)} w={2} show={step >= 2} delay={0.2} />
      <Arrow x1={366} y1={252} x2={336} y2={252} w={1.4} s={7} tone="ink2" show={step >= 2} delay={0.3} />
      <Marker n={3} x={386} y={226} show={step >= 2} delay={0.3} />
      <Pen d={R(760, 200, 64, 80)} w={2.2} delay={0.2} />
      <Pen d={R(752, 186, 80, 18)} w={2.2} delay={0.3} />
      <Pen d="M491 160H612Q636 164 644 262H748" tone="design" w={2} dash="7 6" show={step >= 3} />
      <Arrow x1={748} y1={250} x2={600} y2={250} tone="design" w={2} show={step >= 3} delay={0.3} />
      <Pen d="M572 258V250A12 12 0 0 1 596 250V258Z" tone="design" w={2} show={step >= 3} delay={0.5} />
      <Marker n={4} x={700} y={226} show={step >= 3} delay={0.4} />
      {legend.map((line, i) => (
        <g key={line}>
          <Marker n={i + 1} x={880} y={60 + i * 50} show={step >= i} />
          <T x={900} y={61 + i * 50} size={15} anchor="start" show={step >= i} delay={0.1}>{line}</T>
        </g>
      ))}
      <T x={20} y={314} f="mono" size={12} tone="ink2" anchor="start">schematic, not to scale</T>
    </Svg>
  );
}

function Director({ step }) {
  const states = [['Build up', 'threats spawn'], ['Sustain peak', 'held for a few seconds'], ['Peak fade', 'spawning stops'], ['Relax', 'players recover']];
  const curve = [[40, 292], [140, 262], [230, 210], [300, 166], [380, 158], [460, 164], [540, 158], [600, 190], [700, 250], [820, 286], [900, 290], [1000, 290], [1060, 268], [1120, 238]];
  const bands = [[40, 300, 'Build up'], [300, 560, 'Sustain peak'], [560, 820, 'Peak fade'], [820, 1000, 'Relax'], [1000, 1120, 'Build up']];
  return (
    <Svg w={1160} h={330} label="Left 4 Dead's AI Director: four states and the intensity they produce">
      {states.map(([name, sub], i) => (
        <g key={name}>
          <Box x={40 + i * 280} y={14} w={240} h={60} title={name} sub={sub} size={17} subSize={13} delay={i * 0.2} tone={i === 1 ? 'design' : undefined} />
          {i < 3 && <Arrow x1={284 + i * 280} y1={44} x2={316 + i * 280} y2={44} s={8} w={1.8} delay={i * 0.2 + 0.3} />}
        </g>
      ))}
      <Pen d="M1000 74V96H160V82" w={1.6} tone="ink2" delay={1} />
      <Pen d={head(160, 78, -Math.PI / 2, 8)} w={1.6} tone="ink2" delay={1.4} />
      <Pen d={L(40, 304, 1120, 304)} tone="ink2" w={1.6} show={step >= 1} />
      {bands.slice(1).map(([x], i) => <Pen key={i} d={L(x, 130, x, 304)} tone="line" w={1.2} show={step >= 1} />)}
      {bands.map(([a, b, name], i) => (
        <T key={i} x={(a + b) / 2} y={140} f="mono" size={12} tone="ink2" show={step >= 1} delay={0.1}>{name.toUpperCase()}</T>
      ))}
      <Pen d={L(40, 172, 1120, 172)} tone="design" w={1.4} dash="6 6" show={step >= 1} />
      <T x={1116} y={162} f="mono" size={12} tone="design" anchor="end" show={step >= 1}>peak threshold</T>
      <Pen d={smoothPath(curve)} w={2.8} show={step >= 1} delay={0.2} />
      <T x={44} y={322} f="mono" size={12} tone="ink2" anchor="start" show={step >= 1}>player intensity over time</T>
    </Svg>
  );
}


// ---------------------------------------------------------------- exemplar figures (560 × 400)

function Node({ x, y, label, w = 86, h = 30, state = 'normal', show = true, delay = 0 }) {
  const locked = state === 'locked';
  const on = state === 'on';
  return (
    <g>
      {!locked && (
        <motion.path d={R(x - w / 2, y - h / 2, w, h)} className={on ? 'box-accent' : 'box-soft'}
          initial={{ opacity: 0 }} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.3, delay: show ? delay : 0 }} />
      )}
      <Pen d={R(x - w / 2, y - h / 2, w, h)} tone={on ? 'design' : locked ? 'ink2' : 'line'} w={on ? 2 : 1.2} dash={locked ? '4 4' : undefined} show={show} delay={delay} />
      <T x={x} y={y + 1} f="mono" size={12} tone={locked ? 'ink2' : on ? 'design' : undefined} show={show} delay={delay + 0.1}>{locked ? '?' : label}</T>
    </g>
  );
}

function ExDetroit() {
  const N = {
    s: [280, 34, 'START'], a: [170, 100, 'CHOICE A'], b: [390, 100, 'CHOICE B'], a1: [110, 170, 'A1'], a2: [230, 170, 'A2'],
    b1: [330, 170, 'B1'], b2: [450, 170, 'B2'], c: [230, 240, 'MEET'], d: [450, 240, 'ESCAPE'], e1: [150, 310, 'ENDING 1'], e2: [290, 310, 'ENDING 2'], e3: [450, 310, 'ENDING 3'],
  };
  const edges = [['s', 'a'], ['s', 'b'], ['a', 'a1'], ['a', 'a2'], ['b', 'b1'], ['b', 'b2'], ['a1', 'c'], ['a2', 'c'], ['b1', 'c'], ['b2', 'd'], ['c', 'e1'], ['c', 'e2'], ['d', 'e3']];
  const path = ['s', 'a', 'a2', 'c', 'e2'];
  const onPath = (a, b) => path.includes(a) && path.includes(b) && Math.abs(path.indexOf(a) - path.indexOf(b)) === 1;
  const locked = ['b2', 'd', 'e3'];
  const pct = { a: '64%', b: '36%', a1: '41%', a2: '59%', e1: '47%', e2: '38%' };
  // Each share sits beside the middle of the edge into its node, on the outer side of the fork.
  const from = { a: 's', b: 's', a1: 'a', a2: 'a', e1: 'c', e2: 'c' };
  const pctLabel = (k) => {
    const [px, py] = N[from[k]];
    const [x, y] = N[k];
    const left = x < px;
    return { x: (px + x) / 2 + (left ? -10 : 10), y: (py + y) / 2, anchor: left ? 'end' : 'start' };
  };
  return (
    <Svg w={560} h={400} label="A chapter flowchart with the player's path and the share of players per choice">
      {edges.map(([a, b], i) => (
        <Pen key={i} d={L(N[a][0], N[a][1] + 15, N[b][0], N[b][1] - 15)} tone={onPath(a, b) ? 'design' : locked.includes(b) ? 'ink2' : 'line'}
          w={onPath(a, b) ? 2.6 : 1.4} dash={locked.includes(b) ? '4 4' : undefined} delay={0.1 + i * 0.04} />
      ))}
      {Object.entries(N).map(([k, [x, y, label]], i) => (
        <g key={k}>
          <Node x={x} y={y} label={label} state={locked.includes(k) ? 'locked' : path.includes(k) ? 'on' : 'normal'} delay={0.2 + i * 0.04} />
          {pct[k] && <T {...pctLabel(k)} f="mono" size={11} tone="ink2" delay={0.8}>{pct[k]}</T>}
        </g>
      ))}
      <T x={20} y={372} f="mono" size={11} tone="ink2" anchor="start">ILLUSTRATIVE CHAPTER FLOWCHART · % = SHARE OF PLAYERS · DASHED = NOT YET FOUND</T>
    </Svg>
  );
}

function ExOuterWilds() {
  const N = {
    ruins: [90, 90, 'RUINS'], mural: [235, 58, 'MURAL'], obs: [395, 96, 'OBSERVATORY'], crash: [110, 228, 'CRASH SITE'],
    archive: [275, 196, 'ARCHIVE'], signal: [470, 210, 'SIGNAL'], q1: [420, 310, '?'], q2: [190, 320, '?'],
  };
  const known = [['ruins', 'mural'], ['mural', 'obs'], ['ruins', 'crash'], ['crash', 'archive'], ['archive', 'obs'], ['obs', 'signal']];
  const rumor = [['archive', 'q1'], ['signal', 'q1'], ['crash', 'q2']];
  return (
    <Svg w={560} h={400} label="A knowledge graph: discoveries linked by rumours">
      {known.map(([a, b], i) => <Pen key={`k${i}`} d={L(N[a][0], N[a][1], N[b][0], N[b][1])} w={1.8} delay={0.1 + i * 0.06} />)}
      {rumor.map(([a, b], i) => <Pen key={`r${i}`} d={L(N[a][0], N[a][1], N[b][0], N[b][1])} tone="design" w={2} dash="6 5" delay={0.6} />)}
      {Object.entries(N).map(([k, [x, y, label]], i) => (
        <Node key={k} x={x} y={y} label={label} w={label.length > 8 ? 110 : 90} state={label === '?' ? 'locked' : 'normal'} delay={0.2 + i * 0.05} />
      ))}
      <Pen d={L(24, 372, 54, 372)} w={1.8} />
      <T x={62} y={372} f="mono" size={11} tone="ink2" anchor="start">LINK FOUND</T>
      <Pen d={L(170, 372, 200, 372)} tone="design" w={2} dash="6 5" />
      <T x={208} y={372} f="mono" size={11} tone="ink2" anchor="start">RUMOUR</T>
      <T x={300} y={372} f="mono" size={11} tone="ink2" anchor="start">? = NOT FOUND YET · ILLUSTRATIVE</T>
    </Svg>
  );
}

function ExHades() {
  const cx = 140;
  const cy = 190;
  const r = 92;
  const stops = [['ESCAPE ATTEMPT', 0, -1], ['DEATH', 1, 0], ['HOME', 0, 1], ['TRY AGAIN', -1, 0]];
  const cards = [['IF died to boss X', 'they comment on the fight'], ['IF relationship ≥ 3', 'a new conversation'], ['IF first time out', 'a scene that moves the story']];
  return (
    <Svg w={560} h={400} label="A run loop whose home base serves dialogue chosen by state">
      <Pen d={E(cx, cy, r, r)} tone="ink2" w={1.6} />
      {[0, 1, 2, 3].map((i) => {
        const a = -Math.PI / 2 + (i + 0.5) * (Math.PI / 2);
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        return <Pen key={i} d={head(x, y, a + Math.PI / 2, 9)} w={1.8} delay={0.4} />;
      })}
      {stops.map(([label, ux, uy], i) => (
        <g key={label}>
          <Dot x={cx + ux * r} y={cy + uy * r} r={label === 'HOME' ? 9 : 6} tone={label === 'HOME' ? 'design' : 'ink'} delay={0.2 + i * 0.1} />
          <T x={cx + ux * (r + 16)} y={cy + uy * (r + 16)} f="mono" size={11} tone={label === 'HOME' ? 'design' : 'ink2'} anchor={ux > 0 ? 'start' : ux < 0 ? 'end' : 'middle'} delay={0.3}>{label}</T>
        </g>
      ))}
      <Arrow x1={cx + 12} y1={cy + r + 6} x2={300} y2={200} bend={-30} tone="design" w={1.8} s={8} delay={0.7} />
      <T x={250} y={300} f="body" size={13} tone="design" delay={0.9}>picks a line by state</T>
      {cards.map(([cond, out], i) => (
        <g key={cond}>
          <Box x={305} y={50 + i * 66} w={230} h={54} delay={0.5 + i * 0.12} />
          <T x={318} y={68 + i * 66} f="mono" size={11} tone="design" anchor="start" delay={0.6 + i * 0.12}>{cond}</T>
          <T x={318} y={88 + i * 66} f="body" size={14} anchor="start" delay={0.65 + i * 0.12}>{out}</T>
        </g>
      ))}
      {['Character A', 'Character B', 'Character C'].map((name, i) => (
        <g key={name}>
          <T x={305} y={268 + i * 30} f="mono" size={11} tone="ink2" anchor="start">{name.toUpperCase()}</T>
          {Array.from({ length: 6 }, (_, k) => (
            <motion.rect key={k} x={420 + k * 19} y={260 + i * 30} width={15} height={12}
              className={k < [4, 2, 5][i] ? 'box-accent' : 'box-soft'} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 + k * 0.05 }} />
          ))}
        </g>
      ))}
      <T x={20} y={384} f="mono" size={11} tone="ink2" anchor="start">ILLUSTRATIVE · ARCS (BARS) ADVANCE EACH TIME THE LOOP COMES HOME</T>
    </Svg>
  );
}

function ExBotW() {
  const tri = (x0, x1, apexX, apexY, base = 330) => `M${x0} ${base}L${apexX} ${apexY}L${x1} ${base}`;
  return (
    <Svg w={560} h={400} label="The triangle rule: terrain that hides and reveals a landmark">
      <Pen d={L(20, 330, 545, 330)} w={2} />
      <Fill d={`${tri(400, 545, 472, 80)}Z`} tone="design" opacity={0.5} delay={0.3} />
      <Pen d={tri(400, 545, 472, 80)} tone="design" w={2.4} delay={0.2} />
      <Pen d={`${tri(230, 370, 300, 160)}Z`} w={2.2} delay={0.4} />
      <Pen d={`${tri(118, 172, 145, 300)}Z`} w={2} delay={0.5} />
      <Figure x={62} y={312} s={0.55} delay={0.3} />
      <Pen d={L(66, 296, 290, 183)} tone="ink2" w={1.6} dash="5 5" delay={0.8} />
      <Pen d="M282 176L298 190M298 176L282 190" tone="ink2" w={2} delay={1} />
      <Pen d={L(300, 160, 472, 80)} tone="design" w={2} dash="6 5" delay={1.1} />
      <Figure x={300} y={146} s={0.42} delay={1.1} />
      <T x={472} y={360} f="mono" size={11} tone="design">LARGE · LANDMARK</T>
      <T x={300} y={360} f="mono" size={11} tone="ink2">MEDIUM · HIDES, THEN REVEALS</T>
      <T x={145} y={360} f="mono" size={11} tone="ink2">SMALL · TEMPO</T>
      <T x={160} y={226} f="body" size={13} tone="ink2" delay={1}>view blocked</T>
      <T x={390} y={104} f="body" size={13} tone="design" delay={1.2}>revealed from the top</T>
      <T x={20} y={388} f="mono" size={11} tone="ink2" anchor="start">SIDE VIEW · AFTER NINTENDO’S CEDEC 2017 TALK</T>
    </Svg>
  );
}

function ExGoW() {
  const beats = [['EXPLORE', 70], ['FIGHT', 170], ['TALK', 270], ['PUZZLE', 370], ['CINEMATIC', 470]];
  const wave = Array.from({ length: 13 }, (_, i) => [40 + i * 40, 250 + Math.sin(i * 0.9) * 26]);
  return (
    <Svg w={560} h={400} label="Shots and cuts compared with one continuous take">
      <T x={30} y={50} f="mono" size={12} tone="ink2" anchor="start">MOST GAMES · SHOTS AND CUTS</T>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <Pen d={L(40 + i * 100, 92, 118 + i * 100, 92)} w={6} delay={i * 0.12} />
          {i < 4 && <T x={129 + i * 100} y={92} f="mono" size={12} tone="ink2">|</T>}
        </g>
      ))}
      {beats.map(([b, x]) => <T key={b} x={x + 10} y={118} f="mono" size={10} tone="ink2">{b}</T>)}
      <T x={30} y={190} f="mono" size={12} tone="design" anchor="start">GOD OF WAR (2018) · ONE CONTINUOUS TAKE</T>
      <Pen d={smoothPath(wave)} tone="design" w={4} delay={0.6} />
      {beats.map(([b, x]) => (
        <g key={b}>
          <Dot x={x + 10} y={250 + Math.sin(((x - 30) / 40) * 0.9) * 26} r={5} tone="design" delay={0.9} />
          <T x={x + 10} y={300} f="mono" size={10} tone="ink2">{b}</T>
        </g>
      ))}
      <T x={30} y={350} f="body" size={15} anchor="start">No cuts and no loading screens: every transition has to be designed.</T>
    </Svg>
  );
}

function ExEdith() {
  const spokes = [
    [100, 76, 'BECOME', 'a girl turns into an animal'],
    [460, 76, 'FLY', 'a child who wants to fly'],
    [100, 316, 'CHOP + DREAM', 'a cannery worker’s daydream'],
    [460, 316, 'NEW VERB', 'and so on, one per story'],
  ];
  return (
    <Svg w={560} h={400} label="A house hub with a different mechanic for each family member's story">
      {spokes.map(([x, y], i) => <Pen key={i} d={L(280, 196, x, y)} tone="ink2" w={1.4} delay={0.3 + i * 0.1} />)}
      <Fill d="M230 230V180L280 140L330 180V230Z" tone="design" opacity={0.5} delay={0.3} />
      <Pen d="M230 230V180L280 140L330 180V230Z" tone="design" w={2.4} delay={0.2} />
      <T x={280} y={252} f="mono" size={12} tone="design">THE HOUSE · EXPLORE</T>
      {spokes.map(([x, y, verb, line], i) => (
        <g key={verb}>
          <Box x={x - 80} y={y - 30} w={160} h={60} delay={0.5 + i * 0.12} />
          <T x={x} y={y - 8} f="mono" size={13} delay={0.6 + i * 0.12}>{verb}</T>
          <T x={x} y={y + 13} f="body" size={13} tone="ink2" delay={0.65 + i * 0.12}>{line}</T>
        </g>
      ))}
      <T x={20} y={388} f="mono" size={11} tone="ink2" anchor="start">HUB AND SPOKES · EACH STORY HAS ITS OWN RULES</T>
    </Svg>
  );
}

function ExDisco() {
  const skills = [[110, 90, 'LOGIC', true], [450, 90, 'EMPATHY', true], [110, 300, 'HALF LIGHT', false], [450, 300, 'SHIVERS', false]];
  return (
    <Svg w={560} h={400} label="Skills speaking as voices around a dialogue line">
      {skills.map(([x, y, , on], i) => <Pen key={i} d={L(x, y, 280, 170)} tone={on ? 'design' : 'line'} w={on ? 2 : 1.4} delay={0.3 + i * 0.1} />)}
      <Box x={180} y={145} w={200} h={50} delay={0.1} />
      <T x={280} y={170} f="body" size={15} delay={0.2}>“So who are you, then?”</T>
      {skills.map(([x, y, name, on], i) => (
        <g key={name}>
          {on && <Fill d={E(x, y, 40, 40)} tone="design" opacity={0.5} delay={0.4} />}
          <Pen d={E(x, y, 40, 40)} tone={on ? 'design' : 'ink2'} w={on ? 2.2 : 1.4} delay={0.3 + i * 0.1} />
          <T x={x} y={y + 1} f="mono" size={11} tone={on ? 'design' : 'ink2'} delay={0.4 + i * 0.1}>{name}</T>
        </g>
      ))}
      {[[210, 42], [350, 42], [40, 196], [520, 196], [210, 352], [350, 352]].map(([x, y], i) => <Dot key={i} x={x} y={y} r={4} tone="ink2" delay={0.6} />)}
      <T x={280} y={232} f="body" size={14} tone="design" delay={0.8}>[Logic] Point out the contradiction.</T>
      <T x={280} y={256} f="body" size={14} tone="design" delay={0.9}>[Empathy] Ask what they are afraid of.</T>
      <T x={20} y={388} f="mono" size={11} tone="ink2" anchor="start">24 SKILLS · 4 ATTRIBUTES · PASSED CHECKS OPEN OPTIONS · ILLUSTRATIVE</T>
    </Svg>
  );
}

function ExCeleste() {
  const toggles = [['GAME SPEED', 90], ['INFINITE STAMINA', 280], ['INVINCIBILITY', 470]];
  return (
    <Svg w={560} h={400} label="Celeste's mechanics, dynamics and aesthetics, aligned with the character's arc, plus assist options">
      <Pen d="M20 120L120 70L180 95L270 30L350 85L420 55L540 120" tone="ink2" w={1.6} />
      <Pen d={L(270, 30, 270, 10)} w={1.6} delay={0.3} />
      <Pen d="M270 10L288 15L270 20" tone="design" w={1.8} delay={0.4} />
      <T x={20} y={22} f="mono" size={11} tone="ink2" anchor="start">THE CLIMB = FACING HER ANXIETY</T>
      <Box x={20} y={150} w={160} h={78} title="Mechanics" sub="jump · dash · climb · retry" size={16} subSize={12} delay={0.2} />
      <Box x={200} y={150} w={160} h={78} title="Dynamics" sub="fail, retry, small wins" size={16} subSize={12} delay={0.35} />
      <Box x={380} y={150} w={160} h={78} title="Aesthetics" sub="challenge · perseverance" tone="design" fill="design" size={16} subSize={12} delay={0.5} />
      <Arrow x1={182} y1={189} x2={198} y2={189} s={6} w={1.6} delay={0.6} />
      <Arrow x1={362} y1={189} x2={378} y2={189} s={6} w={1.6} delay={0.7} />
      <T x={20} y={270} f="mono" size={11} tone="ink2" anchor="start">ASSIST MODE · TUNE THE CHALLENGE, KEEP THE STORY</T>
      {toggles.map(([name, x], i) => (
        <g key={name}>
          <Pen d={`M${x - 26} 312H${x + 26}A14 14 0 0 1 ${x + 26} 340H${x - 26}A14 14 0 0 1 ${x - 26} 312Z`} tone={i === 1 ? 'design' : 'ink2'} w={1.8} delay={0.8 + i * 0.1} />
          <Dot x={i === 1 ? x + 26 : x - 26} y={326} r={10} tone={i === 1 ? 'design' : 'ink2'} delay={0.9 + i * 0.1} />
          <T x={x} y={362} f="mono" size={11} tone="ink2">{name}</T>
        </g>
      ))}
    </Svg>
  );
}

function ExPapers() {
  const days = [1, 2, 3, 4, 5];
  const rules = ['PASSPORT', 'ENTRY PERMIT', 'ID CARD', 'WORK PASS', 'VACCINE CERT'];
  return (
    <Svg w={560} h={400} label="Papers, Please: rules pile up day by day while the family needs money">
      <Box x={20} y={20} w={160} h={70} title="Mechanics" sub="rules · quota · wages" size={15} subSize={12} />
      <Box x={200} y={20} w={160} h={70} title="Dynamics" sub="time pressure · bribes" size={15} subSize={12} delay={0.15} />
      <Box x={380} y={20} w={160} h={70} title="Aesthetics" sub="tension · guilt · empathy" tone="design" fill="design" size={15} subSize={12} delay={0.3} />
      <Arrow x1={182} y1={55} x2={198} y2={55} s={6} w={1.6} delay={0.4} />
      <Arrow x1={362} y1={55} x2={378} y2={55} s={6} w={1.6} delay={0.5} />
      {days.map((d, i) => (
        <g key={d}>
          <T x={60 + i * 100} y={124} f="mono" size={11} tone="ink2">DAY {d}</T>
          {rules.slice(0, i + 1).map((r, k) => (
            <g key={r}>
              <motion.rect x={14 + i * 100} y={138 + k * 26} width={92} height={20} className={k === i ? 'box-accent' : 'box-soft'}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.12 + k * 0.03 }} />
              <T x={60 + i * 100} y={149 + k * 26} f="mono" size={9} tone={k === i ? 'design' : 'ink2'} delay={0.55 + i * 0.12}>{r}</T>
            </g>
          ))}
        </g>
      ))}
      <T x={20} y={300} f="mono" size={11} tone="ink2" anchor="start">EACH EVENING</T>
      {['RENT', 'FOOD', 'HEAT', 'MEDICINE'].map((c2, i) => (
        <g key={c2}>
          <Pen d={E(150 + i * 100, 330, 14, 14)} tone={i === 3 ? 'design' : 'ink2'} w={1.6} delay={0.9 + i * 0.1} />
          <T x={150 + i * 100} y={360} f="mono" size={10} tone="ink2">{c2}</T>
        </g>
      ))}
      <T x={20} y={388} f="mono" size={11} tone="ink2" anchor="start">ILLUSTRATIVE · RULES GROW DAILY; WAGES MUST COVER THE FAMILY</T>
    </Svg>
  );
}

export const DIAGRAMS = {
  gameExperience: GameExperience,
  secondOrder: SecondOrder,
  mda: Mda,
  flowChannel: FlowChannel,
  iterationLoop: IterationLoop,
  lens: Lens,
  pipeline: Pipeline,
  costOfChange: CostOfChange,
  align: Align,
  shotGrammar: ShotGrammar,
  contrastAffinity: ContrastAffinity,
  fidelity: Fidelity,
  filmGame: FilmGame,
  unitsToReps: UnitsToReps,
  beatChart: BeatChart,
  branching: Branching,
  fourStep: FourStep,
  threeCs: ThreeCs,
  otherBoards: OtherBoards,
  collapse: Collapse,
  costFidelity: CostFidelity,
  threads: Threads,
  shotSizes: ShotSizes,
  cameraMoves: CameraMoves,
  panelAnatomy: PanelAnatomy,
  ghosts: Ghosts,
  world11: World11,
  director: Director,
  exDetroit: ExDetroit,
  exOuterWilds: ExOuterWilds,
  exHades: ExHades,
  exBotW: ExBotW,
  exGoW: ExGoW,
  exEdith: ExEdith,
  exDisco: ExDisco,
  exCeleste: ExCeleste,
  exPapers: ExPapers,
};
