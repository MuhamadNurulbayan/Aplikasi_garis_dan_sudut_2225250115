import { useState } from 'react';
import { ANGLE_PAIR_MODES } from '../../data/curriculum';

type PairMode = 'berpenyiku' | 'berpelurus' | 'bertolak-belakang';

export default function AnglePairLab() {
  const [mode, setMode] = useState<PairMode>('berpenyiku');
  const [alpha, setAlpha] = useState<number>(35);

  const activeInfo = ANGLE_PAIR_MODES.find((m) => m.id === mode) ?? ANGLE_PAIR_MODES[0];

  const handleModeChange = (nextMode: PairMode) => {
    setMode(nextMode);
    if (nextMode === 'berpenyiku' && alpha > 75) setAlpha(35);
    if (nextMode === 'berpenyiku' && alpha < 15) setAlpha(35);
    if (nextMode !== 'berpenyiku' && (alpha < 25 || alpha > 155)) setAlpha(55);
  };

  const partnerAngle =
    mode === 'berpenyiku'
      ? 90 - alpha
      : mode === 'berpelurus'
        ? 180 - alpha
        : alpha;

  const minSlider = mode === 'berpenyiku' ? 15 : 25;
  const maxSlider = mode === 'berpenyiku' ? 75 : 155;

  // Geometry coordinates
  const cx = 220;
  const cy = mode === 'bertolak-belakang' ? 140 : 210;
  const rayLen = 140;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Lab Interaktif Hubungan 2 Sudut (Anti-Tertukar)
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Bandingkan warna biru (sudut diketahui) dan warna oranye (pasangannya) saat besar sudut kamu geser.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start shrink-0">
          {ANGLE_PAIR_MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => handleModeChange(m.id)}
              className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                mode === m.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {m.title.split(' (')[0]}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-stretch">
        {/* Left/Top SVG Stage */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
            <span className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 font-medium text-sky-700">
                <span className="w-3 h-3 rounded-sm bg-sky-600 inline-block" />
                Sudut Biru (α)
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-amber-700">
                <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block" />
                Sudut Oranye (β)
              </span>
            </span>
            <span className="font-mono font-semibold text-slate-800">{activeInfo.formulaRule}</span>
          </div>

          <svg
            viewBox="0 0 440 270"
            className="w-full h-64 select-none"
            role="img"
            aria-label={`Diagram interaktif ${activeInfo.title}`}
          >
            {mode === 'berpenyiku' && (() => {
              const rad = (alpha * Math.PI) / 180;
              const divX = cx + rayLen * Math.cos(rad);
              const divY = cy - rayLen * Math.sin(rad);
              const rArc = 58;
              const aX = cx + rArc * Math.cos(rad);
              const aY = cy - rArc * Math.sin(rad);

              const mid1 = (alpha / 2) * (Math.PI / 180);
              const mid2 = ((alpha + 90) / 2) * (Math.PI / 180);

              return (
                <g>
                  {/* Right-angle 90° indicator box */}
                  <rect
                    x={cx}
                    y={cy - 24}
                    width="24"
                    height="24"
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="1.5"
                    strokeDasharray="3 2"
                  />

                  {/* Sector 1 (Blue: alpha from 0 to alpha) */}
                  <path
                    d={`M ${cx} ${cy} L ${cx + rArc} ${cy} A ${rArc} ${rArc} 0 0 0 ${aX} ${aY} Z`}
                    fill="#0284c7"
                    fillOpacity="0.22"
                    stroke="#0284c7"
                    strokeWidth="2"
                  />

                  {/* Sector 2 (Amber: beta from alpha to 90) */}
                  <path
                    d={`M ${cx} ${cy} L ${aX} ${aY} A ${rArc} ${rArc} 0 0 0 ${cx} ${cy - rArc} Z`}
                    fill="#d97706"
                    fillOpacity="0.22"
                    stroke="#d97706"
                    strokeWidth="2"
                  />

                  {/* Vertical & Horizontal L-lines */}
                  <line x1={cx} y1={cy} x2={cx + rayLen + 10} y2={cy} stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1={cx} y1={cy} x2={cx} y2={cy - rayLen - 10} stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                  {/* Dividing ray */}
                  <line x1={cx} y1={cy} x2={divX} y2={divY} stroke="#334155" strokeWidth="3" strokeLinecap="round" />

                  <circle cx={cx} cy={cy} r="5.5" fill="#0f172a" />

                  {/* Point labels */}
                  <text x={cx - 16} y={cy + 16} className="font-display font-bold fill-slate-900 text-[14px]">B</text>
                  <text x={cx - 18} y={cy - rayLen - 6} className="font-display font-bold fill-slate-900 text-[14px]">A</text>
                  <text x={cx + rayLen + 16} y={cy + 5} className="font-display font-bold fill-slate-900 text-[14px]">C</text>
                  <text x={divX + 10} y={divY - 6} className="font-display font-bold fill-slate-900 text-[14px]">D</text>

                  {/* Angle values */}
                  <text
                    x={cx + 88 * Math.cos(mid1)}
                    y={cy - 88 * Math.sin(mid1) + 4}
                    textAnchor="middle"
                    className="font-mono font-bold fill-sky-700 text-[14px]"
                  >
                    {alpha}°
                  </text>
                  <text
                    x={cx + 88 * Math.cos(mid2)}
                    y={cy - 88 * Math.sin(mid2) + 4}
                    textAnchor="middle"
                    className="font-mono font-bold fill-amber-700 text-[14px]"
                  >
                    {partnerAngle}°
                  </text>
                </g>
              );
            })()}

            {mode === 'berpelurus' && (() => {
              const rad = (alpha * Math.PI) / 180;
              const divX = cx + rayLen * Math.cos(rad);
              const divY = cy - rayLen * Math.sin(rad);
              const rArc = 58;
              const aX = cx + rArc * Math.cos(rad);
              const aY = cy - rArc * Math.sin(rad);

              const mid1 = (alpha / 2) * (Math.PI / 180);
              const mid2 = ((alpha + 180) / 2) * (Math.PI / 180);

              return (
                <g>
                  {/* Sector 1 (Blue: right angle alpha from 0 to alpha) */}
                  <path
                    d={`M ${cx} ${cy} L ${cx + rArc} ${cy} A ${rArc} ${rArc} 0 0 0 ${aX} ${aY} Z`}
                    fill="#0284c7"
                    fillOpacity="0.22"
                    stroke="#0284c7"
                    strokeWidth="2"
                  />

                  {/* Sector 2 (Amber: left angle beta from alpha to 180) */}
                  <path
                    d={`M ${cx} ${cy} L ${aX} ${aY} A ${rArc} ${rArc} 0 0 0 ${cx - rArc} ${cy} Z`}
                    fill="#d97706"
                    fillOpacity="0.22"
                    stroke="#d97706"
                    strokeWidth="2"
                  />

                  {/* Straight base line */}
                  <line x1={cx - 160} y1={cy} x2={cx + 160} y2={cy} stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                  {/* Dividing ray */}
                  <line x1={cx} y1={cy} x2={divX} y2={divY} stroke="#334155" strokeWidth="3" strokeLinecap="round" />

                  <circle cx={cx} cy={cy} r="5.5" fill="#0f172a" />

                  <text x={cx - 172} y={cy + 5} className="font-display font-bold fill-slate-900 text-[14px]">P</text>
                  <text x={cx} y={cy + 22} textAnchor="middle" className="font-display font-bold fill-slate-900 text-[14px]">O</text>
                  <text x={cx + 168} y={cy + 5} className="font-display font-bold fill-slate-900 text-[14px]">Q</text>
                  <text x={divX + (divX >= cx ? 10 : -18)} y={divY - 8} className="font-display font-bold fill-slate-900 text-[14px]">R</text>

                  <text
                    x={cx + 92 * Math.cos(mid1)}
                    y={cy - 92 * Math.sin(mid1) + 4}
                    textAnchor="middle"
                    className="font-mono font-bold fill-sky-700 text-[14px]"
                  >
                    {alpha}°
                  </text>
                  <text
                    x={cx + 92 * Math.cos(mid2)}
                    y={cy - 92 * Math.sin(mid2) + 4}
                    textAnchor="middle"
                    className="font-mono font-bold fill-amber-700 text-[14px]"
                  >
                    {partnerAngle}°
                  </text>
                </g>
              );
            })()}

            {mode === 'bertolak-belakang' && (() => {
              const rad = (alpha * Math.PI) / 180;
              const len = 130;
              const x1 = cx + len * Math.cos(rad);
              const y1 = cy - len * Math.sin(rad);
              const x2 = cx - len * Math.cos(rad);
              const y2 = cy + len * Math.sin(rad);

              const rArc = 48;
              const aX = cx + rArc * Math.cos(rad);
              const aY = cy - rArc * Math.sin(rad);
              const bX = cx - rArc * Math.cos(rad);
              const bY = cy + rArc * Math.sin(rad);

              const mid1 = (alpha / 2) * (Math.PI / 180);
              const midOpp = ((alpha / 2 + 180) * Math.PI) / 180;

              return (
                <g>
                  {/* Sector 1 (Blue: top-right) */}
                  <path
                    d={`M ${cx} ${cy} L ${cx + rArc} ${cy} A ${rArc} ${rArc} 0 0 0 ${aX} ${aY} Z`}
                    fill="#0284c7"
                    fillOpacity="0.22"
                    stroke="#0284c7"
                    strokeWidth="2"
                  />

                  {/* Sector 2 (Amber: bottom-left, opposite) */}
                  <path
                    d={`M ${cx} ${cy} L ${cx - rArc} ${cy} A ${rArc} ${rArc} 0 0 0 ${bX} ${bY} Z`}
                    fill="#d97706"
                    fillOpacity="0.22"
                    stroke="#d97706"
                    strokeWidth="2"
                  />

                  {/* Horizontal line */}
                  <line x1={cx - len - 20} y1={cy} x2={cx + len + 20} y2={cy} stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                  {/* Intersecting line */}
                  <line x1={x2} y1={y2} x2={x1} y2={y1} stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />

                  <circle cx={cx} cy={cy} r="5.5" fill="#0f172a" />

                  <text x={cx + 80 * Math.cos(mid1)} y={cy - 80 * Math.sin(mid1) + 4} textAnchor="middle" className="font-mono font-bold fill-sky-700 text-[14px]">
                    {alpha}°
                  </text>
                  <text x={cx + 80 * Math.cos(midOpp)} y={cy - 80 * Math.sin(midOpp) + 4} textAnchor="middle" className="font-mono font-bold fill-amber-700 text-[14px]">
                    {partnerAngle}°
                  </text>

                  <text x={cx} y={248} textAnchor="middle" className="fill-slate-600 text-[12px]">
                    Dua sudut yang saling membelakangi di titik pusat selalu kembar
                  </text>
                </g>
              );
            })()}
          </svg>
        </div>

        {/* Right Control & Formula Deck */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="pair-slider" className="text-sm font-semibold text-slate-800">
                Ubah Besar Sudut Biru (α)
              </label>
              <span className="font-mono text-lg font-bold text-sky-700 tabular-nums">
                {alpha}°
              </span>
            </div>

            <input
              id="pair-slider"
              type="range"
              min={minSlider}
              max={maxSlider}
              step={1}
              value={alpha}
              onChange={(e) => setAlpha(Number(e.target.value))}
              className="w-full angle-slider"
            />

            {/* Real-time calculation box */}
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-1.5">
              <div className="text-xs font-medium text-slate-500">Perhitungan Otomatis:</div>
              {mode === 'berpenyiku' && (
                <div className="font-mono text-sm sm:text-base font-bold text-slate-900 tabular-nums">
                  β = 90° − <span className="text-sky-700">{alpha}°</span> ={' '}
                  <span className="text-amber-600">{partnerAngle}°</span>
                </div>
              )}
              {mode === 'berpelurus' && (
                <div className="font-mono text-sm sm:text-base font-bold text-slate-900 tabular-nums">
                  β = 180° − <span className="text-sky-700">{alpha}°</span> ={' '}
                  <span className="text-amber-600">{partnerAngle}°</span>
                </div>
              )}
              {mode === 'bertolak-belakang' && (
                <div className="font-mono text-sm sm:text-base font-bold text-slate-900 tabular-nums">
                  β = α = <span className="text-amber-600">{partnerAngle}°</span> (Sama Besar)
                </div>
              )}
            </div>
          </div>

          {/* Anti-confusion Explanation & Memory Trick */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 flex-1 flex flex-col justify-center">
            <div>
              <div className="text-xs font-semibold text-sky-700">Trik Cepat Anti-Tertukar</div>
              <div className="text-base font-bold text-slate-900 mt-0.5">{activeInfo.memoryTrick}</div>
              <p className="text-sm text-slate-700 leading-relaxed mt-1.5">{activeInfo.explanation}</p>
            </div>
            <div className="pt-2.5 border-t border-slate-200 text-xs text-slate-600">
              <span className="font-semibold text-amber-700">Waspada Kesalahan Umum: </span>
              {activeInfo.studentTrap}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
