import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { PrintSlide } from './Deck.jsx';
import { SLIDES } from './slides.js';
import { IMAGES } from './images.js';
import { TITLE } from './content.js';

// #/learn/print: every slide at its last step, one page each, for sharing as a PDF.
// `npm run pdf` prints this page with Chrome; a browser's own Print → Save as PDF gives the same file.
// The page ends with the photo credits, so a shared PDF carries its CC BY / BY-SA attributions.

const licenseUrl = (license) => {
  const m = license.match(/^CC (BY(?:-SA)?) ([\d.]+)$/);
  return m ? `https://creativecommons.org/licenses/${m[1].toLowerCase()}/${m[2]}/` : null;
};

const fileName = (page) => decodeURIComponent(page.split('File:')[1] ?? page).replace(/_/g, ' ');

function CreditsPage() {
  const list = Object.values(IMAGES);
  return (
    <section className="slide slide--print" aria-label="Image credits">
      <header className="s-top">
        <span className="s-module">Credits</span>
        <span className="s-top-right"><span>{TITLE}</span></span>
      </header>
      <div className="s-content">
        <div className="s-body">
          <p className="s-kicker">Image credits</p>
          <h2 className="s-h">Photographs in this deck</h2>
          <p className="p-credits-lead">
            From Wikimedia Commons. Each title links to its source page; each licence links to its terms.
            Figures are drawn for this course and show structure, not screenshots.
          </p>
          <ol className="p-credits">
            {list.map((img) => {
              const url = licenseUrl(img.license);
              return (
                <li key={img.src}>
                  <a href={img.page}>{fileName(img.page)}</a>
                  <span>
                    {img.author} · {url ? <a href={url}>{img.license}</a> : img.license}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <span />
    </section>
  );
}

export default function Print() {
  const [ready, setReady] = useState(false);

  // Load every picture now (the deck lazy-loads them), then mark the page ready for the exporter.
  useEffect(() => {
    let alive = true;
    const imgs = [...document.querySelectorAll('.print img')];
    imgs.forEach((img) => { img.loading = 'eager'; });
    const loaded = imgs.map((img) => (img.complete ? null : new Promise((done) => {
      img.addEventListener('load', done, { once: true });
      img.addEventListener('error', done, { once: true });
    })));
    Promise.all([document.fonts.ready, ...loaded]).then(() => { if (alive) setReady(true); });
    return () => { alive = false; };
  }, []);

  return (
    <MotionConfig skipAnimations>
      <div className="print" data-ready={ready || undefined}>
        <div className="print-bar">
          <span>{TITLE} · {SLIDES.length} slides and a credits page, each at its last step</span>
          <span className="print-bar-actions">
            <a href="#/learn/slides/1">Back to slides</a>
            <button type="button" onClick={() => window.print()} disabled={!ready}>{ready ? 'Print / Save as PDF' : 'Loading pictures…'}</button>
          </span>
        </div>
        {SLIDES.map((s, i) => <PrintSlide key={s.id} index={i} />)}
        <CreditsPage />
      </div>
    </MotionConfig>
  );
}
