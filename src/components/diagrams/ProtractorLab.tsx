import { useState } from 'react';
import { Eye, EyeOff, RotateCcw } from 'lucide-react';

function classifyAngle(deg: number) {
  if (deg < 90) {
    return {
      name: 'Sudut Lancip',
      range: '0° < sudut < 90°',
      color: 'text-sky-700',
      bg: 'bg-sky-50 border-sky-200',
      desc: 'Ukurannya lebih kecil dari sudut siku-siku (terlihat runcing).',
      example: 'Ujung potongan pizza atau ujung gunting yang terbuka sedikit.',
    };
  }
  if (deg === 90) {
    return {
      name: 'Sudut Siku-Siku',
      range: 'Tepat 90°',
      color: 'text-emerald-700',
      bg: 'bg-emerald-50 border-emerald-200',
      desc: 'Kedua sinar garis berdiri tegak lurus membentuk huruf L sempurna.',
      example: 'Pojok buku tulis atau pertemuan tembok dengan lantai.',
    };
  }
  if (deg < 180) {
    return {
      name: 'Sudut Tumpul',
      range: '90° < sudut < 180°',
      color: 'text-amber-700',
      bg: 'bg-amber-50 border-amber-200',
      desc: 'Lebih lebar dari sudut siku-siku, tetapi belum terbuka menjadi garis lurus.',
      example: 'Kursi santai yang disandarkan atau jarum jam pukul 04.00.',
    };
  }
  if (deg === 180) {
    return {
      name: 'Sudut Lurus',
      range: 'Tepat 180°',
      color: 'text-violet-700',
      bg: 'bg-violet-50 border-violet-200',
      desc: 'Kedua sinar garis terbuka berlawanan arah membentuk satu garis lurus datar.',
      example: 'Penggaris lurus atau jarum jam pukul 06.00.',
    };
  }
  return {
    name: 'Sudut Refleks',
    range: '180° < sudut < 360°',
    color: 'text-rose-700',
    bg: 'bg-rose-50 border-rose-200',
    desc: 'Sudut yang terbuka sangat lebar melebihi setengah putaran (lebih dari 180°).',
    example: 'Bukaan sudut luar jarum jam pada pukul 08.00.',
  };
}

export default function ProtractorLab() {
  const [angle, setAngle] = useState<number>(50);
  const [showProtractor, setShowProtractor] = useState<boolean>(true);

  const info = classifyAngle(angle);

  // SVG center (220, 190), radius 135
  const cx = 220;
  const cy = 190;
  const rayLen = 140;
  const rad = (angle * Math.PI) / 180;
  // Counter-clockwise from positive X axis (right)
  const endX = cx + rayLen * Math.cos(rad);
  const endY = cy - rayLen * Math.sin(rad);

  // Arc path for angle sector (radius 54)
  const arcR = 54;
  const arcEndX = cx + arcR * Math.cos(rad);
  const arcEndY = cy - arcR * Math.sin(rad);
  const largeArcFlag = angle > 180 ? 1 : 0;

  const presets = [35, 90, 130, 180, 235];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            1B. Lab Busur Derajat Virtual &amp; Jenis Sudut
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Geser ukuran sudut di bawah ini untuk melatih mata mengenal sudut lancip, siku-siku, tumpul, lurus, dan refleks.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowProtractor((v) => !v)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
          >
            {showProtractor ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showProtractor ? 'Sembunyikan Busur' : 'Tampilkan Busur'}</span>
          </button>
          <button
            type="button"
            onClick={() => setAngle(50)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors whitespace-nowrap cursor-pointer"
            title="Reset ke 50°"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-stretch">
        {/* Left/Top Interactive Canvas */}
        <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
          <svg
            viewBox="0 0 440 310"
            className="w-full h-72 select-none"
            role="img"
            aria-label={`Busur derajat interaktif menunjukkan sudut ${angle} derajat`}
          >
            {/* Optional Translucent Protractor Overlay (0 to 180 deg) */}
            {showProtractor && (
              <g opacity="0.9">
                <path
                  d={`M ${cx - 130} ${cy} A 130 130 0 0 1 ${cx + 130} ${cy} Z`}
                  fill="#ffffff"
                  fillOpacity="0.72"
                  stroke="#94a3b8"
                  strokeWidth="1.5"
                />
                <path
                  d={`M ${cx - 88} ${cy} A 88 88 0 0 1 ${cx + 88} ${cy}`}
                  fill="none"
                  stroke="#cbd5e1"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                {/* Tick marks every 10 deg */}
                {Array.from({ length: 19 }, (_, idx) => {
                  const deg = idx * 10;
                  const tRad = (deg * Math.PI) / 180;
                  const innerR = deg % 30 === 0 ? 112 : 120;
                  const outerR = 130;
                  const x1 = cx + innerR * Math.cos(tRad);
                  const y1 = cy - innerR * Math.sin(tRad);
                  const x2 = cx + outerR * Math.cos(tRad);
                  const y2 = cy - outerR * Math.sin(tRad);
                  const tx = cx + 101 * Math.cos(tRad);
                  const ty = cy - 101 * Math.sin(tRad);
                  return (
                    <g key={deg}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={deg % 30 === 0 ? '#475569' : '#94a3b8'}
                        strokeWidth={deg % 30 === 0 ? 1.5 : 1}
                      />
                      {deg % 30 === 0 && (
                        <text
                          x={tx}
                          y={ty + 3}
                          textAnchor="middle"
                          className="font-mono fill-slate-600 text-[9px] font-semibold"
                        >
                          {deg}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            )}

            {/* Angle Filled Sector */}
            <path
              d={`M ${cx} ${cy} L ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 ${largeArcFlag} 0 ${arcEndX} ${arcEndY} Z`}
              fill="#0284c7"
              fillOpacity="0.16"
            />
            <path
              d={`M ${cx + arcR} ${cy} A ${arcR} ${arcR} 0 ${largeArcFlag} 0 ${arcEndX} ${arcEndY}`}
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
            />

            {/* Right angle indicator when exactly 90° */}
            {angle === 90 && (
              <rect
                x={cx}
                y={cy - 22}
                width="22"
                height="22"
                fill="#059669"
                fillOpacity="0.18"
                stroke="#059669"
                strokeWidth="2"
              />
            )}

            {/* Base Ray (0°) */}
            <line
              x1={cx}
              y1={cy}
              x2={cx + rayLen}
              y2={cy}
              stroke="#0f172a"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <polygon
              points={`${cx + rayLen + 10},${cy} ${cx + rayLen - 4},${cy - 6} ${cx + rayLen - 4},${cy + 6}`}
              fill="#0f172a"
            />

            {/* Movable Ray */}
            <line
              x1={cx}
              y1={cy}
              x2={endX}
              y2={endY}
              stroke="#0284c7"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx={endX} cy={endY} r="6" fill="#0284c7" stroke="#ffffff" strokeWidth="2" />

            {/* Vertex Point B */}
            <circle cx={cx} cy={cy} r="6" fill="#0f172a" />
            <text
              x={cx - 14}
              y={cy + 20}
              className="font-display font-bold fill-slate-900 text-[14px]"
            >
              B
            </text>
            <text
              x={cx + rayLen + 14}
              y={cy + 5}
              className="font-display font-bold fill-slate-900 text-[14px]"
            >
              C
            </text>
            <text
              x={endX + (endX >= cx ? 12 : -18)}
              y={endY + (endY <= cy ? -10 : 18)}
              className="font-display font-bold fill-sky-700 text-[14px]"
            >
              A
            </text>

            {/* Live Angle Label */}
            <text
              x={cx}
              y="292"
              textAnchor="middle"
              className="font-mono font-bold fill-slate-900 text-[15px]"
            >
              ∠ABC = {angle}°
            </text>
          </svg>
        </div>

        {/* Right Control & Concept Deck */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-4">
          {/* Slider Control */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="protractor-slider" className="text-sm font-semibold text-slate-800">
                Ubah Besar Sudut ∠ABC
              </label>
              <span className="font-mono text-lg font-bold text-sky-700 tabular-nums">
                {angle}°
              </span>
            </div>

            <input
              id="protractor-slider"
              type="range"
              min={10}
              max={340}
              step={1}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full angle-slider"
            />

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span>10°</span>
              <span>90°</span>
              <span>180°</span>
              <span>270°</span>
              <span>340°</span>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <div className="text-xs text-slate-500 mb-2">Coba cepat sudut penting:</div>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setAngle(p)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold border transition-colors cursor-pointer ${
                      angle === p
                        ? 'bg-sky-600 text-white border-sky-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {p}°
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Classification Result */}
          <div className={`border rounded-xl p-4 space-y-2 ${info.bg}`}>
            <div className="flex items-center justify-between gap-2">
              <span className={`text-base font-bold ${info.color}`}>{info.name}</span>
              <span className="text-xs font-mono font-semibold text-slate-700">{info.range}</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{info.desc}</p>
            <p className="text-xs text-slate-600 pt-1">
              <span className="font-semibold text-slate-800">Contoh: </span>
              {info.example}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
