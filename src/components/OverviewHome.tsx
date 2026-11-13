import { ArrowRight, CheckCircle2, Compass, Layers, GitBranch, Target, BookOpen } from 'lucide-react';
import { PRACTICE_QUESTIONS } from '../data/curriculum';
import { SectionId, StudentProfile, StudentProgress } from '../types';

interface OverviewHomeProps {
  student: StudentProfile;
  progress: StudentProgress;
  onNavigate: (section: SectionId) => void;
}

export default function OverviewHome({
  student,
  progress,
  onNavigate,
}: OverviewHomeProps) {
  const firstName = student.fullName.split(' ')[0];
  const solvedCount = Object.values(progress.solvedQuestions).filter((s) => s.correct).length;
  const completedCount = progress.completedModules.length;

  const learningPath: {
    id: SectionId;
    step: string;
    title: string;
    description: string;
    focusSolved: string;
    icon: typeof Compass;
  }[] = [
    {
      id: 'dasar',
      step: '01',
      title: 'Dasar Garis & Busur Derajat',
      description:
        'Segarkan ingatan tentang titik, ruas garis, sinar garis, kedudukan garis, serta ukur sudut pakai busur virtual.',
      focusSolved: 'Menguatkan konsep prasyarat & membaca ukuran sudut',
      icon: Compass,
    },
    {
      id: 'hubungan',
      step: '02',
      title: 'Sudut Berpenyiku, Berpelurus & Bertolak Belakang',
      description:
        'Latih cara membedakan pasangan 90°, 180°, dan sudut kembar agar tidak lagi tertukar saat melihat gambar.',
      focusSolved: 'Trik ingat cepat Siku 90° vs Lurus 180°',
      icon: Layers,
    },
    {
      id: 'sejajar',
      step: '03',
      title: 'Dua Garis Sejajar & Transversal',
      description:
        'Nyalakan warna sehadap, dalam berseberangan, dan dalam sepihak, lalu pelajari contoh soal langkah demi langkah.',
      focusSolved: 'Visualisasi 8 sudut berwarna & penyelesai bertahap',
      icon: GitBranch,
    },
    {
      id: 'latihan',
      step: '04',
      title: 'Latihan Mandiri & Petunjuk Bertahap',
      description:
        'Kerjakan 10 soal berjenjang dari mudah hingga soal cerita dengan fitur sorot info penting dan petunjuk 3 tingkat.',
      focusSolved: 'Umpan balik diagnostik & refleksi masuk akal',
      icon: Target,
    },
  ];

  // Suggest next uncompleted step
  const nextStep =
    learningPath.find((item) => !progress.completedModules.includes(item.id)) ?? learningPath[0];

  return (
    <div className="space-y-8">
      {/* Personal Welcome Banner */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 lg:p-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="text-xs font-medium text-slate-500">
              <span>Kelas {student.grade}</span>
              <span aria-hidden="true" className="mx-1.5">·</span>
              <span>{student.school}</span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight text-balance">
              Halo {firstName}, yuk kuasai Garis &amp; Sudut secara bertahap!
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Kamu bisa belajar mandiri mengikuti alur 4 tahap di bawah ini. Setiap diagram sudah
              diberi label dan warna khusus supaya kamu mudah melihat pasangan sudutnya tanpa
              bingung.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onNavigate(nextStep.id)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition-colors cursor-pointer"
              >
                <span>Lanjutkan: {nextStep.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('ringkasan')}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Buka Kamus Anti-Tertukar</span>
              </button>
            </div>
          </div>

          {/* Right: Compact Progress Snapshot */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="text-xs font-semibold text-slate-500">Kemajuan Belajarmu</div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border border-slate-200 rounded-lg p-3.5">
                <div className="text-xs text-slate-500">Tahap Selesai</div>
                <div className="font-mono text-2xl font-bold text-slate-900 mt-1 tabular-nums">
                  {completedCount}/4
                </div>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-3.5">
                <div className="text-xs text-slate-500">Latihan Benar</div>
                <div className="font-mono text-2xl font-bold text-sky-700 mt-1 tabular-nums">
                  {solvedCount}/{PRACTICE_QUESTIONS.length}
                </div>
              </div>
            </div>
            <div className="text-xs text-slate-600 leading-relaxed">
              Tips belajar: Gunakan slider di setiap lab gambar untuk mengamati perubahan ukuran sudut secara langsung.
            </div>
          </div>
        </div>
      </section>

      {/* 4-Stage Guided Path */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-bold text-slate-900">
            Alur Belajar Mandiri (4 Tahap)
          </h2>
          <span className="text-xs text-slate-500">Pilih tahap mana saja untuk mulai</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {learningPath.map((item) => {
            const Icon = item.icon;
            const isDone = progress.completedModules.includes(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className="group text-left bg-white border border-slate-200 hover:border-sky-300 rounded-2xl p-6 transition-colors flex flex-col justify-between gap-4 cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-500">
                        Tahap {item.step}
                      </span>
                    </div>

                    {isDone && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Selesai
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-display text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mt-1.5">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                  <span className="text-slate-500">{item.focusSolved}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-sky-700 shrink-0">
                    Buka <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
