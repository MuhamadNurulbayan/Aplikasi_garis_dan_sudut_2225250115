import { useState } from 'react';
import { BASIC_LINE_CONCEPTS, LINE_POSITIONS } from '../../data/curriculum';

export default function BasicLineExplorer() {
  const [tab, setTab] = useState<'unsur' | 'kedudukan'>('unsur');
  const [selectedBasic, setSelectedBasic] = useState<
    'titik' | 'ruas-garis' | 'sinar-garis' | 'garis'
  >('titik');
  const [selectedPos, setSelectedPos] = useState<
    'sejajar' | 'berpotongan' | 'tegak-lurus' | 'berimpit'
  >('sejajar');

  const activeBasic =
    BASIC_LINE_CONCEPTS.find((c) => c.id === selectedBasic) ?? BASIC_LINE_CONCEPTS[0];
  const activePos =
    LINE_POSITIONS.find((p) => p.id === selectedPos) ?? LINE_POSITIONS[0];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            1A. Kenali Bentuk Dasar Garis &amp; Kedudukannya
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Klik setiap tombol di bawah untuk melihat perbedaan gambar, tanda panah, dan contohnya.
          </p>
        </div>

        <div className="inline-flex items-center p-1 bg-slate-100 rounded-lg self-start shrink-0">
          <button
            type="button"
            onClick={() => setTab('unsur')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              tab === 'unsur'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Unsur Dasar (4)
          </button>
          <button
            type="button"
            onClick={() => setTab('kedudukan')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              tab === 'kedudukan'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kedudukan 2 Garis (4)
          </button>
        </div>
      </div>

      {tab === 'unsur' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-stretch">
          {/* Interactive SVG Canvas */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between min-h-[260px]">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Kanvas Gambar Berlabel</span>
              <span className="font-mono text-slate-700 font-semibold">{activeBasic.symbol}</span>
            </div>

            <svg
              viewBox="0 0 460 180"
              className="w-full h-44 my-2 select-none"
              role="img"
              aria-label={`Diagram ${activeBasic.title}`}
            >
              {/* Subtle drafting grid */}
              <defs>
                <pattern id="gridBasic" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="0.7"
                  />
                </pattern>
              </defs>
              <rect width="460" height="180" fill="url(#gridBasic)" rx="8" />

              {selectedBasic === 'titik' && (
                <g>
                  <circle cx="150" cy="95" r="7" fill="#0284c7" />
                  <circle cx="150" cy="95" r="14" fill="#0284c7" fillOpacity="0.14" />
                  <text
                    x="150"
                    y="72"
                    textAnchor="middle"
                    className="font-display font-bold fill-slate-900 text-[16px]"
                  >
                    Titik A
                  </text>

                  <circle cx="310" cy="70" r="7" fill="#d97706" />
                  <circle cx="310" cy="70" r="14" fill="#d97706" fillOpacity="0.14" />
                  <text
                    x="310"
                    y="47"
                    textAnchor="middle"
                    className="font-display font-bold fill-slate-900 text-[16px]"
                  >
                    Titik P
                  </text>

                  <text
                    x="230"
                    y="150"
                    textAnchor="middle"
                    className="fill-slate-500 text-[12px]"
                  >
                    Menunjukkan posisi tepat tanpa panjang atau lebar
                  </text>
                </g>
              )}

              {selectedBasic === 'ruas-garis' && (
                <g>
                  <line
                    x1="100"
                    y1="90"
                    x2="360"
                    y2="90"
                    stroke="#0284c7"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="100" cy="90" r="7" fill="#0f172a" />
                  <circle cx="360" cy="90" r="7" fill="#0f172a" />
                  <text
                    x="100"
                    y="68"
                    textAnchor="middle"
                    className="font-display font-bold fill-slate-900 text-[16px]"
                  >
                    A
                  </text>
                  <text
                    x="360"
                    y="68"
                    textAnchor="middle"
                    className="font-display font-bold fill-slate-900 text-[16px]"
                  >
                    B
                  </text>
                  {/* Dimension bracket */}
                  <line
                    x1="100"
                    y1="122"
                    x2="360"
                    y2="122"
                    stroke="#64748b"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                  />
                  <line x1="100" y1="115" x2="100" y2="129" stroke="#64748b" strokeWidth="1.5" />
                  <line x1="360" y1="115" x2="360" y2="129" stroke="#64748b" strokeWidth="1.5" />
                  <text
                    x="230"
                    y="146"
                    textAnchor="middle"
                    className="fill-slate-600 text-[12px] font-medium"
                  >
                    Ada batas titik A dan B → panjangnya bisa diukur
                  </text>
                </g>
              )}

              {selectedBasic === 'sinar-garis' && (
                <g>
                  <line
                    x1="100"
                    y1="90"
                    x2="380"
                    y2="90"
                    stroke="#0284c7"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Arrowhead at right only */}
                  <polygon points="392,90 374,80 374,100" fill="#0284c7" />
                  <circle cx="100" cy="90" r="7" fill="#0f172a" />
                  <circle cx="250" cy="90" r="5" fill="#0284c7" />
                  <text
                    x="100"
                    y="68"
                    textAnchor="middle"
                    className="font-display font-bold fill-slate-900 text-[16px]"
                  >
                    A (Pangkal)
                  </text>
                  <text
                    x="250"
                    y="68"
                    textAnchor="middle"
                    className="font-display font-bold fill-slate-900 text-[16px]"
                  >
                    B
                  </text>
                  <text
                    x="245"
                    y="142"
                    textAnchor="middle"
                    className="fill-slate-600 text-[12px] font-medium"
                  >
                    Berawal di titik A, memanjang terus ke satu arah panah
                  </text>
                </g>
              )}

              {selectedBasic === 'garis' && (
                <g>
                  <line x1="65" y1="90" x2="395" y2="90" stroke="#0284c7" strokeWidth="4" />
                  <polygon points="50,90 68,80 68,100" fill="#0284c7" />
                  <polygon points="410,90 392,80 392,100" fill="#0284c7" />
                  <circle cx="155" cy="90" r="5" fill="#0f172a" />
                  <circle cx="305" cy="90" r="5" fill="#0f172a" />
                  <text
                    x="155"
                    y="68"
                    textAnchor="middle"
                    className="font-display font-bold fill-slate-900 text-[16px]"
                  >
                    A
                  </text>
                  <text
                    x="305"
                    y="68"
                    textAnchor="middle"
                    className="font-display font-bold fill-slate-900 text-[16px]"
                  >
                    B
                  </text>
                  <text
                    x="395"
                    y="72"
                    textAnchor="end"
                    className="font-mono italic fill-sky-700 text-[14px] font-bold"
                  >
                    garis g
                  </text>
                  <text
                    x="230"
                    y="142"
                    textAnchor="middle"
                    className="fill-slate-600 text-[12px] font-medium"
                  >
                    Panah di dua ujung = memanjang tanpa batas ke dua arah
                  </text>
                </g>
              )}
            </svg>

            <div className="text-xs text-slate-500">
              Ciri khas: <span className="font-medium text-slate-700">{activeBasic.shortRule}</span>
            </div>
          </div>

          {/* Selector & Bite-Sized Explanation */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="grid grid-cols-2 gap-2">
              {BASIC_LINE_CONCEPTS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedBasic(item.id)}
                  className={`text-left px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-colors cursor-pointer ${
                    selectedBasic === item.id
                      ? 'bg-sky-50 border-sky-300 text-sky-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 flex-1 flex flex-col justify-center">
              <div>
                <div className="text-xs font-semibold text-sky-700">Penjelasan Ringkas</div>
                <h4 className="text-lg font-bold text-slate-900 mt-0.5">{activeBasic.title}</h4>
                <p className="text-sm text-slate-700 leading-relaxed mt-1.5">
                  {activeBasic.explanation}
                </p>
              </div>
              <div className="pt-2.5 border-t border-slate-200 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Contoh di sekitar kita: </span>
                {activeBasic.realLifeExample}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-stretch">
          {/* Interactive SVG for 2-Line Positions */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between min-h-[260px]">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Kanvas Kedudukan Dua Garis</span>
              <span className="font-mono text-slate-700 font-semibold">{activePos.notation}</span>
            </div>

            <svg
              viewBox="0 0 460 180"
              className="w-full h-44 my-2 select-none"
              role="img"
              aria-label={`Diagram ${activePos.title}`}
            >
              <defs>
                <pattern id="gridPos" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path
                    d="M 20 0 L 0 0 0 20"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="0.7"
                  />
                </pattern>
              </defs>
              <rect width="460" height="180" fill="url(#gridPos)" rx="8" />

              {selectedPos === 'sejajar' && (
                <g>
                  <line x1="65" y1="62" x2="395" y2="62" stroke="#0284c7" strokeWidth="4" />
                  <polygon points="50,62 68,54 68,70" fill="#0284c7" />
                  <polygon points="410,62 392,54 392,70" fill="#0284c7" />
                  {/* Parallel markers */}
                  <polyline points="222,56 232,62 222,68" fill="none" stroke="#0f172a" strokeWidth="2.5" />

                  <line x1="65" y1="118" x2="395" y2="118" stroke="#d97706" strokeWidth="4" />
                  <polygon points="50,118 68,110 68,126" fill="#d97706" />
                  <polygon points="410,118 392,110 392,126" fill="#d97706" />
                  <polyline points="222,112 232,118 222,124" fill="none" stroke="#0f172a" strokeWidth="2.5" />

                  <text x="385" y="48" className="font-mono font-bold fill-sky-700 text-[14px]">
                    g
                  </text>
                  <text x="385" y="142" className="font-mono font-bold fill-amber-700 text-[14px]">
                    h
                  </text>
                  <text x="230" y="160" textAnchor="middle" className="fill-slate-600 text-[12px]">
                    Jarak kedua garis selalu sama, tidak pernah berpotongan
                  </text>
                </g>
              )}

              {selectedPos === 'berpotongan' && (
                <g>
                  <line x1="85" y1="135" x2="375" y2="45" stroke="#0284c7" strokeWidth="4" />
                  <line x1="85" y1="45" x2="375" y2="135" stroke="#d97706" strokeWidth="4" />
                  <circle cx="230" cy="90" r="7" fill="#0f172a" />
                  <text
                    x="230"
                    y="66"
                    textAnchor="middle"
                    className="font-display font-bold fill-slate-900 text-[13px]"
                  >
                    Titik Potong O
                  </text>
                  <text x="385" y="45" className="font-mono font-bold fill-sky-700 text-[14px]">
                    g
                  </text>
                  <text x="385" y="145" className="font-mono font-bold fill-amber-700 text-[14px]">
                    h
                  </text>
                  <text x="230" y="162" textAnchor="middle" className="fill-slate-600 text-[12px]">
                    Bertemu tepat di 1 titik dan membentuk 4 sudut
                  </text>
                </g>
              )}

              {selectedPos === 'tegak-lurus' && (
                <g>
                  <line x1="90" y1="115" x2="370" y2="115" stroke="#0284c7" strokeWidth="4" />
                  <line x1="230" y1="28" x2="230" y2="152" stroke="#d97706" strokeWidth="4" />
                  {/* Right angle square */}
                  <rect
                    x="230"
                    y="93"
                    width="22"
                    height="22"
                    fill="#0284c7"
                    fillOpacity="0.14"
                    stroke="#0f172a"
                    strokeWidth="2"
                  />
                  <text x="262" y="102" className="font-mono font-bold fill-slate-900 text-[13px]">
                    90°
                  </text>
                  <text x="378" y="119" className="font-mono font-bold fill-sky-700 text-[14px]">
                    g
                  </text>
                  <text x="242" y="38" className="font-mono font-bold fill-amber-700 text-[14px]">
                    h
                  </text>
                  <text x="230" y="168" textAnchor="middle" className="fill-slate-600 text-[12px]">
                    Berpotongan membentuk sudut siku-siku tepat 90°
                  </text>
                </g>
              )}

              {selectedPos === 'berimpit' && (
                <g>
                  <line x1="80" y1="90" x2="380" y2="90" stroke="#0284c7" strokeWidth="8" strokeOpacity="0.45" />
                  <line
                    x1="80"
                    y1="90"
                    x2="380"
                    y2="90"
                    stroke="#d97706"
                    strokeWidth="3"
                    strokeDasharray="10 6"
                  />
                  <text x="120" y="70" className="font-mono font-bold fill-sky-700 text-[13px]">
                    garis g
                  </text>
                  <text x="315" y="70" className="font-mono font-bold fill-amber-700 text-[13px]">
                    garis h
                  </text>
                  <text x="230" y="140" textAnchor="middle" className="fill-slate-600 text-[12px]">
                    Dua garis terletak di posisi yang sama persis
                  </text>
                </g>
              )}
            </svg>

            <div className="text-xs text-slate-500">
              Simbol matematika: <span className="font-mono font-semibold text-slate-800">{activePos.notation}</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-4">
            <div className="grid grid-cols-2 gap-2">
              {LINE_POSITIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedPos(item.id)}
                  className={`text-left px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-colors cursor-pointer ${
                    selectedPos === item.id
                      ? 'bg-sky-50 border-sky-300 text-sky-900'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {item.title.replace('Dua Garis ', '').replace('Garis ', '')}
                </button>
              ))}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 flex-1 flex flex-col justify-center">
              <div>
                <div className="text-xs font-semibold text-sky-700">Kedudukan Garis</div>
                <h4 className="text-lg font-bold text-slate-900 mt-0.5">{activePos.title}</h4>
                <p className="text-sm text-slate-700 leading-relaxed mt-1.5">{activePos.summary}</p>
              </div>
              <div className="pt-2.5 border-t border-slate-200 text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Contoh nyata: </span>
                {activePos.example}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
