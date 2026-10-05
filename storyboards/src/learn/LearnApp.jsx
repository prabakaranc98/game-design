import { useCallback, useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import Deck from './Deck.jsx';
import Guide from './Guide.jsx';
import Print from './Print.jsx';
import { SLIDES, firstSlideOf } from './slides.js';
import { useTheme } from '../useTheme.js';

// #/learn/slides/12 → the deck at slide 12. #/learn/guide/m3 → the study guide at Module 3.
// #/learn/print → every slide on its own page, for the PDF.
const parse = () => {
  const h = window.location.hash;
  if (/^#\/learn\/print/.test(h)) return { view: 'print' };
  const g = h.match(/^#\/learn\/guide(?:\/([\w-]+))?/);
  if (g) return { view: 'guide', section: g[1] };
  const s = h.match(/^#\/learn\/slides\/(\d+)/);
  const n = s ? parseInt(s[1], 10) - 1 : 0;
  return { view: 'slides', index: Math.max(0, Math.min(SLIDES.length - 1, n)) };
};

// Hatch patterns shared by every figure.
function Defs() {
  const hatch = (id, cls, size = 7) => (
    <pattern id={id} patternUnits="userSpaceOnUse" width={size} height={size} patternTransform="rotate(45)">
      <line x1="0" y1="0" x2="0" y2={size} className={cls} />
    </pattern>
  );
  return (
    <svg className="defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        {hatch('h-ink', 'hatch hatch--grey')}
        {hatch('h-blue', 'hatch hatch--grey')}
        {hatch('h-design', 'hatch hatch--accent', 6)}
        {hatch('h-red', 'hatch hatch--accent', 6)}
      </defs>
    </svg>
  );
}

export default function LearnApp() {
  const { toggle } = useTheme();
  const [route, setRoute] = useState(() => ({ ...parse(), nav: 0 }));

  useEffect(() => {
    const onHash = () => setRoute((r) => ({ ...parse(), nav: r.nav + 1 }));
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.title = route.view === 'guide' ? 'Study Guide · AI and Storyboarding' : route.view === 'print' ? 'AI and Storyboarding for Game Design · Slides' : 'AI and Storyboarding for Game Design';
  }, [route.view]);

  const openGuide = useCallback((module) => {
    const section = module === 'intro' ? 'start' : module === 'syn' ? 'synthesis' : module;
    window.location.hash = `#/learn/guide/${section}`;
  }, []);

  const openSlides = useCallback((module) => {
    const i = Math.max(0, firstSlideOf(module));
    window.location.hash = `#/learn/slides/${i + 1}`;
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className={route.view === 'print' ? 'learn learn--print' : 'learn'}>
        <Defs />
        {route.view === 'print' ? (
          <Print />
        ) : route.view === 'guide' ? (
          <Guide section={route.section} openSlides={openSlides} toggleTheme={toggle} />
        ) : (
          <Deck key={route.nav} index={route.index} openGuide={openGuide} toggleTheme={toggle} />
        )}
      </div>
    </MotionConfig>
  );
}
