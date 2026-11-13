import { useState } from 'react';
import { TRANSVERSAL_RELATIONS, TransversalRelationId } from '../../data/curriculum';

type AngleCode = 'A1' | 'A2' | 'A3' | 'A4' | 'B1' | 'B2' | 'B3' | 'B4';

export default function ParallelTransversalLab() {
  const [relationId, setRelationId] = useState<TransversalRelationId>('sehadap');
  const [pairIndex, setPairIndex] = useState<number>(0);
  const [tiltDeg, setTiltDeg] = useState<number>(64); // angle of transversal from horizontal (50..130, avoiding 90? 90 works too!)
  const [showZoneShading, setShowZoneShading] = useState<boolean>(true);

  const relation =
    TRANSVERSAL_RELATIONS.find((r) => r.id === relationId) ?? TRANSVERSAL_RELATIONS[0];
  const currentPair = relation.pairs[pairIndex] ?? relation.pairs[0];

  const handleSelectRelation = (id: TransversalRelationId) => {
    setRelationId(id);
    setPairIndex(0);
  };

  // Geometry layout
  // Two horizontal parallel lines at yA = 90, yB = 200
  const yA = 90;
  const yB = 200;
  const centerX = 240;
  const centerY = (yA + yB) / 2;

  // Transversal line passing through (centerX, centerY) with angle tiltDeg (from +X going up-right to down-left if < 90, or let's make it go bottom-left to top-right when tiltDeg < 90)
  // Let's parameterize direction vector: dx = cos(tilt), dy = -sin(tilt) (pointing up-right for tilt in 45..135)
  const rad = (tiltDeg * Math.PI) / 180;
  const cot = Math.cos(rad) / Math.sin(rad);

  // Intersection A (on yA = 90, dy = yA - centerY = -55) -> xA = centerX - (yA - centerY) * cot = centerX + 55 * cot
  const xA = centerX + (centerY - yA) * cot;
  // Intersection B (on yB = 200) -> xB = centerX - (yB - centerY) * cot = centerX - 55 * cot
  const xB = centerX - (yB - centerY) * cot;

  // Top and bottom ends of transversal (y = 20 and y = 270)
  const xTop = centerX + (centerY - 22) * cot;
  const xBot = centerX - (268 - centerY) * cot;

  // Acute/obtuse measures at intersection:
  // If transversal goes bottom-left to top-right (tiltDeg < 90):
  // Top-Right (2) = tiltDeg, Top-Left (1) = 180 - tiltDeg, Bottom-Right (3) = 180 - tiltDeg, Bottom-Left (4) = tiltDeg
  const degMap: Record<AngleCode, number> = {
    A1: 180 - tiltDeg,
    A2: tiltDeg,
    A3: 180 - tiltDeg,
    A4: tiltDeg,
    B1: 180 - tiltDeg,
    B2: tiltDeg,
    B3: 180 - tiltDeg,
    B4: tiltDeg,
  };

  // Helper to build wedge sector at (ix, iy) for corner 1(TL), 2(TR), 3(BR), 4(BL)
  // Using standard screen angles (clockwise from +X right):
  // +X (right) = 0°
  // -X (left) = 180°
  // Up-right transversal ray = -tiltDeg (i.e., 360 - tiltDeg)
  // Down-left transversal ray = 180 - tiltDeg
  const buildSectorPath = (ix: number, iy: number, corner: 1 | 2 | 3 | 4, r: number) => {
    const upRayRad = (-tiltDeg * Math.PI) / 180;
    const downRayRad = ((180 - tiltDeg) * Math.PI) / 180;

    let startX = ix;
    let startY = iy;
    let endX = ix;
    let endY = iy;
    let sweep = 0; // 0 = counter-clockwise in SVG screen coords, 1 = clockwise

    if (corner === 2) {
      // Top-Right: between +X (0) and up-right ray (-tiltDeg), going counter-clockwise (sweep=0)
      startX = ix + r;
      startY = iy;
      endX = ix + r * Math.cos(upRayRad);
      endY = iy + r * Math.sin(upRayRad);
      sweep = 0;
    } else if (corner === 1) {
      // Top-Left: between up-right ray and -X (180°), going counter-clockwise (sweep=0)
      startX = ix + r * Math.cos(upRayRad);
      startY = iy + r * Math.sin(upRayRad);
      endX = ix - r;
      endY = iy;
      sweep = 0;
    } else if (corner === 4) {
      // Bottom-Left: between -X (180°) and down-left ray, going counter-clockwise (sweep=0)
      startX = ix - r;
      startY = iy;
      endX = ix + r * Math.cos(downRayRad);
      endY = iy + r * Math.sin(downRayRad);
      sweep = 0;
    } else {
      // Bottom-Right (3): between down-left ray and +X (0), going counter-clockwise (sweep=0)
      startX = ix + r * Math.cos(downRayRad);
      startY = iy + r * Math.sin(downRayRad);
      endX = ix + r;
      endY = iy;
      sweep = 0;
    }

    return `M ${ix} ${iy} L ${startX} ${startY} A ${r} ${r} 0 0 ${sweep} ${endX} ${endY} Z`;
  };

  // Label coordinates around (ix, iy)
  const getLabelPos = (ix: number, iy: number, corner: 1 | 2 | 3 | 4, dist: number) => {
    let midDeg = 0;
    if (corner === 2) midDeg = -tiltDeg / 2;
    else if (corner === 1) midDeg = (-tiltDeg - 180) / 2;
    else if (corner === 4) midDeg = (180 + (180 - tiltDeg)) / 2;
    else midDeg = (180 - tiltDeg) / 2;

    const mRad = (midDeg * Math.PI) / 180;
    return {
      x: ix + dist * Math.cos(mRad),
      y: iy + dist * Math.sin(mRad),
    };
  };

  const angleMeta: { code: AngleCode; ix: number; iy: number; corner: 1 | 2 | 3 | 4; label: string }[] = [
    { code: 'A1', ix: xA, iy: yA, corner: 1, label: 'A₁' },
    { code: 'A2', ix: xA, iy: yA, corner: 2, label: 'A₂' },
    { code: 'A3', ix: xA, iy: yA, corner: 3, label: 'A₃' },
    { code: 'A4', ix: xA, iy: yA, corner: 4, label: 'A₄' },
    { code: 'B1', ix: xB, iy: yB, corner: 1, label: 'B₁' },
    { code: 'B2', ix: xB, iy: yB, corner: 2, label: 'B₂' },
    { code: 'B3', ix: xB, iy: yB, corner: 3, label: 'B₃' },
    { code: 'B4', ix: xB, iy: yB, corner: 4, label: 'B₄' },
  ];

  const valA = degMap[currentPair.a];
  const valB = degMap[currentPair.b];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Eksplorasi 8 Sudut pada Dua Garis Sejajar
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Pilih jenis hubungan sudut di bawah untuk menyalakan warna pasangannya (biru &amp; oranye) secara langsung.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowZoneShading((v) => !v)}
          className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors self-start whitespace-nowrap cursor-pointer ${
            showZoneShading
              ? 'bg-sky-50 border-sky-200 text-sky-800'
              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
          }`}
        >
          {showZoneShading ? 'Area Dalam/Luar: Aktif' : 'Area Dalam/Luar: Nonaktif'}
        </button>
      </div>

      {/* 5 Relation Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 pt-5">
        {TRANSVERSAL_RELATIONS.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => handleSelectRelation(r.id)}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors whitespace-nowrap cursor-pointer ${
              relationId === r.id
                ? 'bg-sky-600 text-white border-sky-600'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {r.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 items-stretch">
        {/* Interactive SVG Canvas */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 mb-2">
            <span className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 font-semibold text-sky-700">
                <span className="w-3 h-3 rounded-sm bg-sky-600 inline-block" />
                ∠{currentPair.a.replace('1', '₁').replace('2', '₂').replace('3', '₃').replace('4', '₄')} ({valA}°)
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-amber-700">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" />
                ∠{currentPair.b.replace('1', '₁').replace('2', '₂').replace('3', '₃').replace('4', '₄')} ({valB}°)
              </span>
            </span>

            <span className="font-mono font-semibold text-slate-800">
              {relation.propertyLabel === 'Sama Besar'
                ? `${valA}° = ${valB}° (Sama Besar)`
                : `${valA}° + ${valB}° = ${valA + valB}°`}
            </span>
          </div>

          <svg
            viewBox="0 0 480 290"
            className="w-full h-72 select-none"
            role="img"
            aria-label={`Diagram ${relation.title}`}
          >
            {/* Optional Interior/Exterior Shading */}
            {showZoneShading && (
              <g>
                <rect x="20" y={yA} width="440" height={yB - yA} fill="#0284c7" fillOpacity="0.06" />
                <text x="30" y="55" className="fill-slate-400 text-[10px] font-semibold">
                  AREA LUAR ATAS
                </text>
                <text x="30" y="148" className="fill-sky-700/70 text-[10px] font-semibold">
                  AREA DALAM (DI ANTARA g &amp; h)
                </text>
                <text x="30" y="250" className="fill-slate-400 text-[10px] font-semibold">
                  AREA LUAR BAWAH
                </text>
              </g>
            )}

            {/* Highlighted Angle Sectors */}
            {angleMeta.map((item) => {
              const isFirst = item.code === currentPair.a;
              const isSecond = item.code === currentPair.b;
              if (!isFirst && !isSecond) return null;
              const fill = isFirst ? '#0284c7' : '#d97706';
              return (
                <path
                  key={`sec-${item.code}`}
                  d={buildSectorPath(item.ix, item.iy, item.corner, 34)}
                  fill={fill}
                  fillOpacity="0.28"
                  stroke={fill}
                  strokeWidth="2.2"
                />
              );
            })}

            {/* Parallel Lines g and h */}
            <line x1="45" y1={yA} x2="435" y2={yA} stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
            <line x1="45" y1={yB} x2="435" y2={yB} stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />

            {/* Parallel chevron markers */}
            <polyline points="82,84 91,90 82,96" fill="none" stroke="#0284c7" strokeWidth="2.2" />
            <polyline points="82,194 91,200 82,206" fill="none" stroke="#0284c7" strokeWidth="2.2" />

            {/* Transversal Line t */}
            <line x1={xTop} y1="22" x2={xBot} y2="268" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

            {/* Line Labels */}
            <text x="444" y={yA + 5} className="font-mono font-bold fill-slate-900 text-[14px]">g</text>
            <text x="444" y={yB + 5} className="font-mono font-bold fill-slate-900 text-[14px]">h</text>
            <text x={xTop + 10} y="28" className="font-mono font-bold fill-slate-700 text-[14px]">t</text>

            {/* Intersection Center Dots */}
            <circle cx={xA} cy={yA} r="4.5" fill="#0f172a" />
            <circle cx={xB} cy={yB} r="4.5" fill="#0f172a" />

            {/* 8 Clear Angle Labels */}
            {angleMeta.map((item) => {
              const isFirst = item.code === currentPair.a;
              const isSecond = item.code === currentPair.b;
              const pos = getLabelPos(item.ix, item.iy, item.corner, isFirst || isSecond ? 24 : 25);
              return (
                <text
                  key={`lbl-${item.code}`}
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  className={`font-display text-[12px] ${
                    isFirst
                      ? 'font-extrabold fill-sky-700'
                      : isSecond
                        ? 'font-extrabold fill-amber-700'
                        : 'font-medium fill-slate-400'
                  }`}
                >
                  {item.label}
                </text>
              );
            })}
          </svg>

          {/* Pair Switcher & Tilt Slider */}
          <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-500 mr-1">Pasangan:</span>
              {relation.pairs.map((p, idx) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setPairIndex(idx)}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold border transition-colors cursor-pointer ${
                    pairIndex === idx
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {p.a} &amp; {p.b}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 min-w-[170px]">
              <label htmlFor="tilt-slider" className="text-xs text-slate-600 whitespace-nowrap">
                Miring garis t:
              </label>
              <input
                id="tilt-slider"
                type="range"
                min={50}
                max={130}
                step={1}
                value={tiltDeg}
                onChange={(e) => setTiltDeg(Number(e.target.value))}
                className="w-full angle-slider"
              />
            </div>
          </div>
        </div>

        {/* Right Explanation & Property Deck */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-sky-700">Sifat Hubungan</span>
              <span
                className={`text-xs font-mono font-bold px-2.5 py-1 rounded-md ${
                  relation.propertyLabel === 'Sama Besar'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}
              >
                {relation.propertyLabel} ({relation.formulaHint})
              </span>
            </div>

            <h4 className="text-lg font-bold text-slate-900">{relation.title}</h4>
            <p className="text-sm text-slate-700 leading-relaxed">{relation.explanation}</p>

            <div className="bg-white border border-slate-200 rounded-lg p-3.5 mt-2">
              <div className="text-xs font-semibold text-slate-900">Cara Cepat Mengingat:</div>
              <p className="text-xs text-slate-600 leading-relaxed mt-1">{relation.easyClue}</p>
            </div>
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-xl p-4">
            <div className="text-xs font-semibold text-sky-900">Pasangan yang Sedang Disorot:</div>
            <div className="text-sm font-bold text-slate-900 mt-1">{currentPair.label}</div>
            <div className="font-mono text-xs text-sky-800 mt-1 tabular-nums">
              {relation.propertyLabel === 'Sama Besar'
                ? `Karena sama besar: ${valA}° = ${valB}°`
                : `Karena berjumlah 180°: ${valA}° + ${valB}° = 180°`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
