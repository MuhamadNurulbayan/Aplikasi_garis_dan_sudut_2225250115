import { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { SectionId, StudentProfile, StudentProgress } from './types';
import LoginScreen from './components/LoginScreen';
import Navbar from './components/Navbar';
import OverviewHome from './components/OverviewHome';
import BasicLineExplorer from './components/diagrams/BasicLineExplorer';
import ProtractorLab from './components/diagrams/ProtractorLab';
import AnglePairLab from './components/diagrams/AnglePairLab';
import ParallelTransversalLab from './components/diagrams/ParallelTransversalLab';
import StepByStepSolver from './components/StepByStepSolver';
import PracticeArena from './components/PracticeArena';
import QuickDictionary from './components/QuickDictionary';

const STORAGE_STUDENT_KEY = 'sudutkita_student_profile_v1';
const STORAGE_PROGRESS_KEY = 'sudutkita_student_progress_v1';

const DEFAULT_PROGRESS: StudentProgress = {
  visitedSections: ['beranda'],
  completedModules: [],
  solvedQuestions: {},
};

export function App() {
  const [student, setStudent] = useState<StudentProfile | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_STUDENT_KEY);
      return raw ? (JSON.parse(raw) as StudentProfile) : null;
    } catch {
      return null;
    }
  });

  const [progress, setProgress] = useState<StudentProgress>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_PROGRESS_KEY);
      return raw ? (JSON.parse(raw) as StudentProgress) : DEFAULT_PROGRESS;
    } catch {
      return DEFAULT_PROGRESS;
    }
  });

  const [activeSection, setActiveSection] = useState<SectionId>('beranda');

  useEffect(() => {
    try {
      if (student) {
        localStorage.setItem(STORAGE_STUDENT_KEY, JSON.stringify(student));
      } else {
        localStorage.removeItem(STORAGE_STUDENT_KEY);
      }
    } catch {
      // Ignore storage quota errors
    }
  }, [student]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(progress));
    } catch {
      // Ignore storage quota errors
    }
  }, [progress]);

  const handleNavigate = (section: SectionId) => {
    setActiveSection(section);
    setProgress((prev) => {
      if (prev.visitedSections.includes(section)) return prev;
      return {
        ...prev,
        visitedSections: [...prev.visitedSections, section],
      };
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteModule = (moduleId: SectionId, nextSection: SectionId) => {
    setProgress((prev) => {
      const nextCompleted = prev.completedModules.includes(moduleId)
        ? prev.completedModules
        : [...prev.completedModules, moduleId];
      return {
        ...prev,
        completedModules: nextCompleted,
      };
    });
    handleNavigate(nextSection);
  };

  const handleRecordAnswer = (
    questionId: string,
    isCorrect: boolean,
    hintsUsed: number,
    reflectionChecked: boolean
  ) => {
    setProgress((prev) => {
      const existing = prev.solvedQuestions[questionId];
      const nowCorrect = existing?.correct || isCorrect;
      const nextSolved = {
        ...prev.solvedQuestions,
        [questionId]: {
          correct: nowCorrect,
          attempts: (existing?.attempts ?? 0) + 1,
          hintsUsed: Math.max(existing?.hintsUsed ?? 0, hintsUsed),
          reflectionChecked: existing?.reflectionChecked || reflectionChecked,
        },
      };

      const totalSolved = Object.values(nextSolved).filter((s) => s.correct).length;
      const nextCompleted =
        totalSolved >= 7 && !prev.completedModules.includes('latihan')
          ? [...prev.completedModules, 'latihan' as SectionId]
          : prev.completedModules;

      return {
        ...prev,
        solvedQuestions: nextSolved,
        completedModules: nextCompleted,
      };
    });
  };

  const handleResetProgress = () => {
    setProgress(DEFAULT_PROGRESS);
    setActiveSection('beranda');
  };

  const handleLogout = () => {
    setStudent(null);
    setProgress(DEFAULT_PROGRESS);
    setActiveSection('beranda');
  };

  if (!student) {
    return <LoginScreen onLogin={(profile) => setStudent(profile)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} student={student} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {activeSection === 'beranda' && (
          <OverviewHome student={student} progress={progress} onNavigate={handleNavigate} />
        )}

        {activeSection === 'dasar' && (
          <div className="space-y-8">
            <header className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
              <div className="text-xs font-semibold text-sky-700">Tahap 1 dari 4 · Prasyarat Dasar</div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Mengenal Garis, Kedudukan Garis &amp; Busur Derajat
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2 max-w-3xl">
                Sebelum masuk ke perhitungan hubungan sudut, pastikan kamu sudah akrab dengan perbedaan
                bentuk garis serta cara membaca besar sudut menggunakan busur derajat.
              </p>
            </header>

            <BasicLineExplorer />
            <ProtractorLab />

            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm text-slate-700">
                Sudah paham bentuk garis dan jenis sudut? Lanjut ke hubungan dua sudut!
              </div>
              <button
                type="button"
                onClick={() => handleCompleteModule('dasar', 'hubungan')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Selesai &amp; Lanjut ke Tahap 2</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeSection === 'hubungan' && (
          <div className="space-y-8">
            <header className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
              <div className="text-xs font-semibold text-sky-700">Tahap 2 dari 4 · Hubungan Sudut Dasar</div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Berpenyiku, Berpelurus, dan Bertolak Belakang
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2 max-w-3xl">
                Banyak siswa sering tertukar antara sudut berpenyiku (90°) dan berpelurus (180°). Di
                sini kita pisahkan satu per satu dengan kode warna biru dan oranye agar langsung
                terlihat bedanya.
              </p>
            </header>

            <AnglePairLab />

            {/* Quick Comparison Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="text-xs font-mono font-bold text-sky-700">TOTAL 90°</div>
                <h3 className="font-display text-base font-bold text-slate-900">
                  Berpenyiku (Siku-siku)
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Dua sudut bergabung membentuk pojok huruf L (90°). Kalau satu sudut 30°, pasangannya 90° − 30° = 60°.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="text-xs font-mono font-bold text-amber-700">TOTAL 180°</div>
                <h3 className="font-display text-base font-bold text-slate-900">
                  Berpelurus (Garis Lurus)
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Dua sudut duduk berdampingan di atas satu garis lurus (180°). Kalau satu sudut 110°, pasangannya 180° − 110° = 70°.
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="text-xs font-mono font-bold text-emerald-700">SAMA BESAR</div>
                <h3 className="font-display text-base font-bold text-slate-900">
                  Bertolak Belakang (Huruf X)
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Dua sudut saling membelakangi di titik potong. Tidak perlu dikurangi—besarnya langsung sama persis!
                </p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm text-slate-700">
                Sudah mantap membedakan 90°, 180°, dan bertolak belakang? Ayo ke dua garis sejajar!
              </div>
              <button
                type="button"
                onClick={() => handleCompleteModule('hubungan', 'sejajar')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Selesai &amp; Lanjut ke Tahap 3</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeSection === 'sejajar' && (
          <div className="space-y-8">
            <header className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
              <div className="text-xs font-semibold text-sky-700">Tahap 3 dari 4 · Fokus Utama Materi</div>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Sudut pada Dua Garis Sejajar &amp; Garis Transversal
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-2 max-w-3xl">
                Jika dua garis sejajar dipotong satu garis miring (transversal), terbentuk 8 sudut.
                Kuncinya ada dua: lihat <strong>posisinya</strong> (sehadap / berseberangan / sepihak)
                lalu ingat sifatnya (<strong>Sama Besar</strong> atau <strong>Jumlah 180°</strong>).
              </p>
            </header>

            <ParallelTransversalLab />
            <StepByStepSolver />

            <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-sm text-slate-700">
                Sekarang saatnya menguji pemahamanmu sendiri di arena latihan bertingkat!
              </div>
              <button
                type="button"
                onClick={() => handleCompleteModule('sejajar', 'latihan')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Selesai &amp; Lanjut ke Latihan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {activeSection === 'latihan' && (
          <PracticeArena
            progress={progress}
            onRecordAnswer={handleRecordAnswer}
            onGoSummary={() => handleNavigate('ringkasan')}
          />
        )}

        {activeSection === 'ringkasan' && (
          <QuickDictionary
            student={student}
            progress={progress}
            onResetProgress={handleResetProgress}
            onLogout={handleLogout}
            onGoPractice={() => handleNavigate('latihan')}
          />
        )}
      </main>

      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <span>SudutKita · Media Edukasi Garis &amp; Sudut SMP</span>
          <span>
            Dikembangkan oleh <strong className="text-slate-700">Muhamad Nurul Bayan</strong> ·
            Berbasis Cognitive Load Theory &amp; ADDIE
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
