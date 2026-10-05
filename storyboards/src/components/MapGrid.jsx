import { MAP, PILLARS } from '../boards/aiAndGames.js';

// FR 07 · Master shot: the whole map as a grid you can read across and down.
export default function MapGrid() {
  return (
    <div className="map">
      <div className="map-grid" role="table" aria-label="Where AI meets each part of making games">
        <div role="row" className="map-row map-row--head">
          <span role="columnheader" className="map-corner">
            Part of the work
          </span>
          {MAP.cols.map((col) => (
            <span role="columnheader" key={col.key} className="map-colhead">
              <span className="map-colname">{col.name}</span>
              <span className="map-colsub">{col.sub}</span>
            </span>
          ))}
        </div>
        {MAP.rows.map((row) => (
          <div role="row" key={row.key} className="map-row" style={{ '--pillar': `var(--${row.key})` }}>
            <span role="rowheader" className="map-rowhead">
              <span className="map-rowname">{PILLARS[row.key].name}</span>
              <span className="map-rowsub">{PILLARS[row.key].tagline}</span>
            </span>
            {MAP.cols.map((col) => (
              <ul role="cell" key={col.key} className={`map-cell map-cell--${col.key}`}>
                {row[col.key].map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
      <p className="map-back">
        <span className="map-back-label">Games for AI</span>
        <span className="map-back-text">{MAP.back}</span>
      </p>
    </div>
  );
}
