import { useState, FormEvent } from 'react';
import { ArrowRight, Compass, CheckCircle2 } from 'lucide-react';
import { StudentProfile } from '../types';

interface LoginScreenProps {
  onLogin: (profile: StudentProfile) => void;
}

const QUICK_CLASSES = ['VII-A', 'VII-B', 'VII-C', 'VII-D', 'VIII-A', 'VIII-B'];

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [fullName, setFullName] = useState('');
  const [grade, setGrade] = useState('VII-A');
  const [school, setSchool] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim();
    const cleanGrade = grade.trim();
    const cleanSchool = school.trim();

    if (!cleanName || !cleanGrade || !cleanSchool) {
      setError('Mohon lengkapi Nama Lengkap, Kelas, dan Asal Sekolah terlebih dahulu ya.');
      return;
    }

    onLogin({
      fullName: cleanName,
      grade: cleanGrade,
      school: cleanSchool,
      loggedInAt: new Date().toISOString(),
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      {/* Minimal Top Brand Strip */}
      <header className="w-full max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-slate-900">
            SudutKita
          </span>
        </div>
        <div className="text-xs text-slate-500 hidden sm:block">
          Matematika SMP · Materi Garis dan Sudut
        </div>
      </header>

      {/* Main 2-Column Balanced Container */}
      <main className="w-full max-w-6xl mx-auto px-6 py-6 lg:py-10 flex-1 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Friendly Overview & Interactive Visual Preview */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10">
            <div className="space-y-4">
              <div className="text-xs font-semibold text-sky-700">
                Media Belajar Mandiri · Kelas VII SMP
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight text-balance">
                Pahami Garis dan Sudut Tanpa Bingung dan Tanpa Tertukar
              </h1>
              <p className="text-base text-slate-600 leading-relaxed max-w-xl">
                Dirancang khusus dari hasil observasi kesulitan belajar siswa SMP: lengkap dengan
                gambar berlabel jelas, pasangan sudut berwarna, penjelasan bertahap, serta petunjuk
                saat kamu mencoba soal latihan.
              </p>
            </div>

            {/* Clean Visual Preview Diagram (Parallel + Transversal Color Coding) */}
            <div className="my-6 bg-slate-50 border border-slate-200 rounded-xl p-4 sm:p-5">
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span>Contoh Visualisasi Pasangan Sudut Berwarna</span>
                <span className="font-mono font-semibold text-slate-700">Dalam Sepihak = 180°</span>
              </div>
              <svg
                viewBox="0 0 460 150"
                className="w-full h-36 select-none"
                role="img"
                aria-label="Ilustrasi dua garis sejajar dan pasangan sudut berwarna"
              >
                {/* Blue sector */}
                <path
                  d="M 248 45 L 234 74 A 32 32 0 0 0 280 45 Z"
                  fill="#0284c7"
                  fillOpacity="0.24"
                  stroke="#0284c7"
                  strokeWidth="2"
                />
                {/* Amber sector */}
                <path
                  d="M 214 115 L 246 115 A 32 32 0 0 0 228 86 Z"
                  fill="#d97706"
                  fillOpacity="0.24"
                  stroke="#d97706"
                  strokeWidth="2"
                />
                <line x1="50" y1="45" x2="410" y2="45" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                <line x1="50" y1="115" x2="410" y2="115" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                <polyline points="82,39 91,45 82,51" fill="none" stroke="#0284c7" strokeWidth="2" />
                <polyline points="82,109 91,115 82,121" fill="none" stroke="#0284c7" strokeWidth="2" />
                <line x1="265" y1="10" x2="195" y2="145" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
                <circle cx="248" cy="45" r="4" fill="#0f172a" />
                <circle cx="214" cy="115" r="4" fill="#0f172a" />

                <text x="292" y="68" className="font-mono font-bold fill-sky-700 text-[13px]">112°</text>
                <text x="256" y="102" className="font-mono font-bold fill-amber-700 text-[13px]">68°</text>
                <text x="418" y="49" className="font-mono font-bold fill-slate-700 text-[13px]">g</text>
                <text x="418" y="119" className="font-mono font-bold fill-slate-700 text-[13px]">h</text>
              </svg>
            </div>

            {/* Key Benefits List */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Busur derajat virtual &amp; label titik yang jelas</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Trik cepat bedakan berpenyiku, berpelurus &amp; sejajar</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>Latihan bertingkat dengan petunjuk step-by-step</span>
              </div>
            </div>
          </div>

          {/* Right Column: Student Identity Login Form */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-500">Masuk Siswa</div>
              <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
                Isi Identitas Belajarmu
              </h2>
              <p className="text-sm text-slate-600 mt-1.5">
                Data ini digunakan untuk menyapa dan menyimpan rapor kemajuan belajarmu di perangkat ini.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                <div>
                  <label
                    htmlFor="student-name"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    id="student-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Contoh: Dinda Ayu Lestari"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="student-grade"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Kelas
                  </label>
                  <input
                    id="student-grade"
                    type="text"
                    value={grade}
                    onChange={(e) => {
                      setGrade(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Contoh: VII-A"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {QUICK_CLASSES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setGrade(c)}
                        className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                          grade === c
                            ? 'bg-sky-50 border-sky-300 text-sky-800'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="student-school"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Asal Sekolah
                  </label>
                  <input
                    id="student-school"
                    type="text"
                    value={school}
                    onChange={(e) => {
                      setSchool(e.target.value);
                      if (error) setError('');
                    }}
                    placeholder="Contoh: SMP Negeri 1 Bandung"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    required
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="text-xs font-medium text-rose-700 bg-rose-50 border border-rose-200 rounded-lg px-3.5 py-2.5"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-sm transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
                >
                  <span>Mulai Belajar Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex flex-col gap-0.5">
              <span>Pengembang Aplikasi: <strong className="text-slate-800">Muhamad Nurul Bayan</strong></span>
              <span>Pendekatan ADDIE · Cognitive Load Theory</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full max-w-6xl mx-auto px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>SudutKita · Media Edukasi Matematika SMP</span>
        <span>Dikembangkan oleh Muhamad Nurul Bayan</span>
      </footer>
    </div>
  );
}
