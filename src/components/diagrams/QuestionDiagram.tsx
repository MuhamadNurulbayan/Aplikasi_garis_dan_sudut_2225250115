import { QuestionDiagramType } from '../../types';

export type DiagramKind =
  | QuestionDiagramType
  | 'dalam-sepihak-112'
  | 'berpenyiku-example'
  | 'berpelurus-example';

interface QuestionDiagramProps {
  type: DiagramKind;
  emphasizeKnown?: boolean;
  revealAnswerValue?: string;
}

type CornerCode = 'A1' | 'A2' | 'A3' | 'A4' | 'B1' | 'B2' | 'B3' | 'B4';

interface TransversalDiagramConfig {
  tiltDeg: number; // angle of transversal from +X going up-right
  lineALabel: string;
  lineBLabel: string;
  transLabel: string;
  blueAngle?: { code: CornerCode; label: string };
  amberAngle?: { code: CornerCode; label: string };
  showRailTie?: boolean;
}

function renderTransversalSvg(cfg: TransversalDiagramConfig, emphasizeKnown: boolean) {
  const yA = 75;
  const yB = 180;
  const cx = 210;
  const cy = (yA + yB) / 2;
  const rad = (cfg.tiltDeg * Math.PI) / 180;
  const cot = Math.cos(rad) / Math.sin(rad);

  const xA = cx + (cy - yA) * cot;
  const xB = cx - (yB - cy) * cot;
  const xTop = cx + (cy - 20) * cot;
  const xBot = cx - (235 - cy) * cot;

  const buildSector = (ix: number, iy: number, corner: 1 | 2 | 3 | 4, r: number) => {
    const upRay = (-cfg.tiltDeg * Math.PI) / 180;
    const downRay = ((180 - cfg.tiltDeg) * Math.PI) / 180;
    let sx = ix;
    let sy = iy;
    let ex = ix;
    let ey = iy;
    if (corner === 2) {
      sx = ix + r;
      sy = iy;
      ex = ix + r * Math.cos(upRay);
      ey = iy + r * Math.sin(upRay);
    } else if (corner === 1) {
      sx = ix + r * Math.cos(upRay);
      sy = iy + r * Math.sin(upRay);
      ex = ix - r;
      ey = iy;
    } else if (corner === 4) {
      sx = ix - r;
      sy = iy;
      ex = ix + r * Math.cos(downRay);
      ey = iy + r * Math.sin(downRay);
    } else {
      sx = ix + r * Math.cos(downRay);
      sy = iy + r * Math.sin(downRay);
      ex = ix + r;
      ey = iy;
    }
    return `M ${ix} ${iy} L ${sx} ${sy} A ${r} ${r} 0 0 0 ${ex} ${ey} Z`;
  };

  const getPos = (ix: number, iy: number, corner: 1 | 2 | 3 | 4, dist: number) => {
    let midDeg = 0;
    if (corner === 2) midDeg = -cfg.tiltDeg / 2;
    else if (corner === 1) midDeg = (-cfg.tiltDeg - 180) / 2;
    else if (corner === 4) midDeg = (180 + (180 - cfg.tiltDeg)) / 2;
    else midDeg = (180 - cfg.tiltDeg) / 2;
    const mRad = (midDeg * Math.PI) / 180;
    return { x: ix + dist * Math.cos(mRad), y: iy + dist * Math.sin(mRad) };
  };

  const parseCode = (code: CornerCode) => {
    const isA = code.startsWith('A');
    const corner = Number(code[1]) as 1 | 2 | 3 | 4;
    return { ix: isA ? xA : xB, iy: isA ? yA : yB, corner };
  };

  const blueMeta = cfg.blueAngle ? parseCode(cfg.blueAngle.code) : null;
  const amberMeta = cfg.amberAngle ? parseCode(cfg.amberAngle.code) : null;

  return (
    <svg viewBox="0 0 420 250" className="w-full h-56 select-none" role="img" aria-label="Diagram dua garis sejajar dan garis transversal">
      {/* Subtle rail sleepers for story problem */}
      {cfg.showRailTie &&
        [65, 115, 165, 255, 305, 355].map((rx) => (
          <line key={rx} x1={rx} y1={yA - 8} x2={rx} y2={yB + 8} stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
        ))}

      {/* Blue Sector */}
      {blueMeta && cfg.blueAngle && (
        <g>
          <path
            d={buildSector(blueMeta.ix, blueMeta.iy, blueMeta.corner, emphasizeKnown ? 40 : 34)}
            fill="#0284c7"
            fillOpacity={emphasizeKnown ? 0.34 : 0.24}
            stroke="#0284c7"
            strokeWidth={emphasizeKnown ? 2.8 : 2}
          />
        </g>
      )}

      {/* Amber Sector */}
      {amberMeta && cfg.amberAngle && (
        <g>
          <path
            d={buildSector(amberMeta.ix, amberMeta.iy, amberMeta.corner, 34)}
            fill="#d97706"
            fillOpacity="0.24"
            stroke="#d97706"
            strokeWidth="2"
          />
        </g>
      )}

      {/* Parallel Lines */}
      <line x1="40" y1={yA} x2="380" y2={yA} stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1={yB} x2="380" y2={yB} stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />

      {/* Parallel symbols */}
      <polyline points="68,69 77,75 68,81" fill="none" stroke="#0284c7" strokeWidth="2" />
      <polyline points="68,174 77,180 68,186" fill="none" stroke="#0284c7" strokeWidth="2" />

      {/* Transversal */}
      <line x1={xTop} y1="20" x2={xBot} y2="235" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

      {/* Intersection points */}
      <circle cx={xA} cy={yA} r="4.5" fill="#0f172a" />
      <circle cx={xB} cy={yB} r="4.5" fill="#0f172a" />

      {/* Line names */}
      <text x="388" y={yA + 5} className="font-mono font-bold fill-slate-800 text-[13px]">{cfg.lineALabel}</text>
      <text x="388" y={yB + 5} className="font-mono font-bold fill-slate-800 text-[13px]">{cfg.lineBLabel}</text>
      <text x={xTop + 10} y="27" className="font-mono font-bold fill-slate-700 text-[13px]">{cfg.transLabel}</text>

      {/* Labels inside/near sectors */}
      {blueMeta && cfg.blueAngle && (() => {
        const p = getPos(blueMeta.ix, blueMeta.iy, blueMeta.corner, 46);
        return (
          <text x={p.x} y={p.y + 4} textAnchor="middle" className="font-mono font-bold fill-sky-800 text-[13px]">
            {cfg.blueAngle.label}
          </text>
        );
      })()}
      {amberMeta && cfg.amberAngle && (() => {
        const p = getPos(amberMeta.ix, amberMeta.iy, amberMeta.corner, 46);
        return (
          <text x={p.x} y={p.y + 4} textAnchor="middle" className="font-mono font-bold fill-amber-800 text-[13px]">
            {cfg.amberAngle.label}
          </text>
        );
      })()}
    </svg>
  );
}

export default function QuestionDiagram({
  type,
  emphasizeKnown = false,
  revealAnswerValue,
}: QuestionDiagramProps) {
  if (type === 'transversal-sehadap') {
    return renderTransversalSvg(
      {
        tiltDeg: 65,
        lineALabel: 'g',
        lineBLabel: 'h',
        transLabel: 't',
        blueAngle: { code: 'A2', label: '∠A₂' },
        amberAngle: { code: 'B2', label: '∠B₂' },
      },
      emphasizeKnown
    );
  }

  if (type === 'transversal-dalam-berseberangan') {
    return renderTransversalSvg(
      {
        tiltDeg: 62,
        lineALabel: 'g',
        lineBLabel: 'h',
        transLabel: 't',
        blueAngle: { code: 'A4', label: '∠A₄' },
        amberAngle: { code: 'B2', label: '∠B₂' },
      },
      emphasizeKnown
    );
  }

  if (type === 'dalam-sepihak-112' || type === 'transversal-dalam-sepihak-112') {
    return renderTransversalSvg(
      {
        tiltDeg: 68,
        lineALabel: 'g',
        lineBLabel: 'h',
        transLabel: 't',
        blueAngle: { code: 'A3', label: '112°' },
        amberAngle: { code: 'B2', label: revealAnswerValue ? revealAnswerValue : '∠B₂ = ?' },
      },
      emphasizeKnown
    );
  }

  if (type === 'story-rail-sehadap') {
    return renderTransversalSvg(
      {
        tiltDeg: 65,
        lineALabel: 'rel 1',
        lineBLabel: 'rel 2',
        transLabel: 'jalan',
        blueAngle: { code: 'A2', label: '65°' },
        amberAngle: { code: 'B2', label: revealAnswerValue ? revealAnswerValue : '?' },
        showRailTie: true,
      },
      emphasizeKnown
    );
  }

  if (type === 'story-fence-two-step') {
    return renderTransversalSvg(
      {
        tiltDeg: 125, // top-right (2) is obtuse 125°, bottom-right (3) is acute 55°
        lineALabel: 'palang 1',
        lineBLabel: 'palang 2',
        transLabel: 'penyangga',
        blueAngle: { code: 'A3', label: '55°' },
        amberAngle: { code: 'B2', label: revealAnswerValue ? revealAnswerValue : '∠B₂ = ?' },
      },
      emphasizeKnown
    );
  }

  // Berpenyiku (Identify, Calc, Example)
  if (
    type === 'berpenyiku-identify' ||
    type === 'berpenyiku-calc' ||
    type === 'berpenyiku-example'
  ) {
    const knownDeg = type === 'berpenyiku-calc' ? 38 : 35;
    const rad = (knownDeg * Math.PI) / 180;
    const cx = 140;
    const cy = 195;
    const len = 140;
    const dx = cx + len * Math.cos(rad);
    const dy = cy - len * Math.sin(rad);
    const rArc = 54;
    const ax = cx + rArc * Math.cos(rad);
    const ay = cy - rArc * Math.sin(rad);

    const topLabel =
      type === 'berpenyiku-identify'
        ? '∠ABD'
        : revealAnswerValue
          ? revealAnswerValue
          : '?';
    const botLabel = type === 'berpenyiku-identify' ? '∠CBD' : `${knownDeg}°`;

    return (
      <svg viewBox="0 0 420 240" className="w-full h-56 select-none" role="img" aria-label="Diagram sudut berpenyiku">
        <rect
          x={cx}
          y={cy - 22}
          width="22"
          height="22"
          fill={emphasizeKnown ? '#059669' : 'none'}
          fillOpacity="0.16"
          stroke="#475569"
          strokeWidth="1.8"
        />
        {/* Bottom angle (Blue known) */}
        <path
          d={`M ${cx} ${cy} L ${cx + rArc} ${cy} A ${rArc} ${rArc} 0 0 0 ${ax} ${ay} Z`}
          fill="#0284c7"
          fillOpacity={emphasizeKnown ? 0.34 : 0.22}
          stroke="#0284c7"
          strokeWidth="2"
        />
        {/* Top angle (Amber asked) */}
        <path
          d={`M ${cx} ${cy} L ${ax} ${ay} A ${rArc} ${rArc} 0 0 0 ${cx} ${cy - rArc} Z`}
          fill="#d97706"
          fillOpacity="0.22"
          stroke="#d97706"
          strokeWidth="2"
        />

        <line x1={cx} y1={cy} x2={cx + len + 16} y2={cy} stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={cx} y2={cy - len - 10} stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={dx} y2={dy} stroke="#334155" strokeWidth="3" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="5.5" fill="#0f172a" />

        <text x={cx - 16} y={cy + 16} className="font-display font-bold fill-slate-900 text-[13px]">B</text>
        <text x={cx - 16} y={cy - len - 4} className="font-display font-bold fill-slate-900 text-[13px]">A</text>
        <text x={cx + len + 22} y={cy + 5} className="font-display font-bold fill-slate-900 text-[13px]">C</text>
        <text x={dx + 10} y={dy - 4} className="font-display font-bold fill-slate-900 text-[13px]">D</text>

        <text x={cx + 88} y={cy - 22} className="font-mono font-bold fill-sky-800 text-[13px]">{botLabel}</text>
        <text x={cx + 34} y={cy - 76} className="font-mono font-bold fill-amber-800 text-[13px]">{topLabel}</text>
      </svg>
    );
  }

  // Berpelurus (Example, Calc, Algebra)
  if (
    type === 'berpelurus-example' ||
    type === 'berpelurus-calc' ||
    type === 'algebra-berpelurus'
  ) {
    const rightDeg = type === 'berpelurus-example' ? 52 : type === 'berpelurus-calc' ? 55 : 100;
    const rad = (rightDeg * Math.PI) / 180;
    const cx = 210;
    const cy = 185;
    const len = 135;
    const dx = cx + len * Math.cos(rad);
    const dy = cy - len * Math.sin(rad);
    const rArc = 54;
    const ax = cx + rArc * Math.cos(rad);
    const ay = cy - rArc * Math.sin(rad);

    const leftText =
      type === 'algebra-berpelurus'
        ? revealAnswerValue
          ? '2(40)° = 80°'
          : '2x°'
        : type === 'berpelurus-example'
          ? '128°'
          : '125°';

    const rightText =
      type === 'algebra-berpelurus'
        ? '100°'
        : revealAnswerValue
          ? revealAnswerValue
          : '?';

    return (
      <svg viewBox="0 0 420 230" className="w-full h-56 select-none" role="img" aria-label="Diagram sudut berpelurus">
        {/* Right sector */}
        <path
          d={`M ${cx} ${cy} L ${cx + rArc} ${cy} A ${rArc} ${rArc} 0 0 0 ${ax} ${ay} Z`}
          fill={type === 'algebra-berpelurus' ? '#0284c7' : '#d97706'}
          fillOpacity="0.22"
          stroke={type === 'algebra-berpelurus' ? '#0284c7' : '#d97706'}
          strokeWidth="2"
        />
        {/* Left sector */}
        <path
          d={`M ${cx} ${cy} L ${ax} ${ay} A ${rArc} ${rArc} 0 0 0 ${cx - rArc} ${cy} Z`}
          fill={type === 'algebra-berpelurus' ? '#d97706' : '#0284c7'}
          fillOpacity={emphasizeKnown ? 0.34 : 0.22}
          stroke={type === 'algebra-berpelurus' ? '#d97706' : '#0284c7'}
          strokeWidth="2"
        />

        <line x1={cx - 155} y1={cy} x2={cx + 155} y2={cy} stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={dx} y2={dy} stroke="#334155" strokeWidth="3" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r="5.5" fill="#0f172a" />

        <text x={cx - 168} y={cy + 5} className="font-display font-bold fill-slate-900 text-[13px]">P</text>
        <text x={cx} y={cy + 22} textAnchor="middle" className="font-display font-bold fill-slate-900 text-[13px]">O</text>
        <text x={cx + 164} y={cy + 5} className="font-display font-bold fill-slate-900 text-[13px]">Q</text>
        <text x={dx + (dx >= cx ? 10 : -18)} y={dy - 6} className="font-display font-bold fill-slate-900 text-[13px]">R</text>

        <text
          x={cx - 72}
          y={cy - 44}
          textAnchor="middle"
          className={`font-mono font-bold text-[13px] ${type === 'algebra-berpelurus' ? 'fill-amber-800' : 'fill-sky-800'}`}
        >
          {leftText}
        </text>
        <text
          x={cx + 78}
          y={cy - 34}
          textAnchor="middle"
          className={`font-mono font-bold text-[13px] ${type === 'algebra-berpelurus' ? 'fill-sky-800' : 'fill-amber-800'}`}
        >
          {rightText}
        </text>
      </svg>
    );
  }

  // Bertolak belakang
  const cx = 210;
  const cy = 125;
  const deg = 74;
  const rad = (deg * Math.PI) / 180;
  const len = 115;
  const x1 = cx + len * Math.cos(rad);
  const y1 = cy - len * Math.sin(rad);
  const x2 = cx - len * Math.cos(rad);
  const y2 = cy + len * Math.sin(rad);
  const rArc = 44;
  const ax = cx + rArc * Math.cos(rad);
  const ay = cy - rArc * Math.sin(rad);
  const bx = cx - rArc * Math.cos(rad);
  const by = cy + rArc * Math.sin(rad);

  return (
    <svg viewBox="0 0 420 240" className="w-full h-56 select-none" role="img" aria-label="Diagram sudut bertolak belakang">
      <path
        d={`M ${cx} ${cy} L ${cx + rArc} ${cy} A ${rArc} ${rArc} 0 0 0 ${ax} ${ay} Z`}
        fill="#0284c7"
        fillOpacity={emphasizeKnown ? 0.34 : 0.24}
        stroke="#0284c7"
        strokeWidth="2"
      />
      <path
        d={`M ${cx} ${cy} L ${cx - rArc} ${cy} A ${rArc} ${rArc} 0 0 0 ${bx} ${by} Z`}
        fill="#d97706"
        fillOpacity="0.24"
        stroke="#d97706"
        strokeWidth="2"
      />

      <line x1={cx - 140} y1={cy} x2={cx + 140} y2={cy} stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
      <line x1={x2} y1={y2} x2={x1} y2={y1} stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r="5.5" fill="#0f172a" />

      <text x={cx + 58} y={cy - 34} className="font-mono font-bold fill-sky-800 text-[13px]">∠P₁ = 74°</text>
      <text x={cx - 102} y={cy + 46} className="font-mono font-bold fill-amber-800 text-[13px]">
        {revealAnswerValue ? `∠P₃ = ${revealAnswerValue}` : '∠P₃ = ?'}
      </text>
    </svg>
  );
}
