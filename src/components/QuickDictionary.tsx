import { LogOut, RotateCcw, CheckCircle2, BookOpen } from 'lucide-react';
import { PRACTICE_QUESTIONS, TRANSVERSAL_RELATIONS, ANGLE_PAIR_MODES } from '../data/curriculum';
import { StudentProfile, StudentProgress } from '../types';

interface QuickDictionaryProps {
  student: StudentProfile;
  progress: StudentProgress;
  onResetProgress: () => void;
  onLogout: () => void;
  onGoPractice: () => void;
}

export default function QuickDictionary({
  student,
  progress,
  onResetProgress,
  onLogout,
  onGoPractice,
}: QuickDictionaryProps) {
  const totalQuestions = PRACTICE_QUESTIONS.length;
  const solvedEntries = Object.entries(progress.solvedQuestions);
  const correctCount = solvedEntries.filter(([, val]) => val.correct).length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const reflectionsDone = solvedEntries.filter(([, val]) => val.reflectionChecked).length;

  const moduleLabels = [
    { id: 'dasar', name: 'Modul 1 · Dasar Garis & Busur Derajat' },
    { id: 'hubungan', name: 'Modul 2 · Berpenyiku, Berpelurus & Bertolak Belakang' },
    { id: 'sejajar', name: 'Modul 3 · Dua Garis Sejajar & Transversal' },
    { id: 'latihan', name: 'Modul 4 · Latihan Mandiri Bertingkat' },
  ] as const;

  return (
    <div className="space-y-8">
      {/* Student Progress Report Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="text-xs font-semibold text-sky-700">Rapor Belajar Mandiri</div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
              {student.fullName}
            </h2>
            <p className="text-sm text-slate-600 mt-0.5">
              Kelas {student.grade} <span aria-hidden="true">·</span> {student.school}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onResetProgress}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Progres</span>
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-rose-200 bg-rose-50 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Ganti Siswa / Keluar</span>
            </button>
          </div>
        </div>

        {/* 4-Metric Tabular Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6 border-b border-slate-100">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="text-xs text-slate-500">Skor Latihan</div>
            <div className="font-mono text-2xl font-bold text-slate-900 mt-1 tabular-nums">
              {scorePercent}%
            </div>
            <div className="text-xs text-slate-600 mt-0.5 tabular-nums">
              {correctCount} dari {totalQuestions} soal benar
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="text-xs text-slate-500">Modul Dipelajari</div>
            <div className="font-mono text-2xl font-bold text-slate-900 mt-1 tabular-nums">
              {progress.completedModules.length} / 4
            </div>
            <div className="text-xs text-slate-600 mt-0.5">Tahap materi selesai</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="text-xs text-slate-500">Refleksi Dijawab</div>
            <div className="font-mono text-2xl font-bold text-slate-900 mt-1 tabular-nums">
              {reflectionsDone}
            </div>
            <div className="text-xs text-slate-600 mt-0.5">Cek alasan masuk akal</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="text-xs text-slate-500">Status Penguasaan</div>
            <div className="font-display text-lg font-bold text-sky-700 mt-1.5">
              {scorePercent >= 80
                ? 'Sangat Mantap'
                : scorePercent >= 50
                  ? 'Terus Berlatih'
                  : 'Baru Memulai'}
            </div>
            <div className="text-xs text-slate-600 mt-0.5">Target mandiri ≥ 80%</div>
          </div>
        </div>

        {/* Module Completion Checklist */}
        <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
          {moduleLabels.map((m) => {
            const done = progress.completedModules.includes(m.id);
            return (
              <div
                key={m.id}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border ${
                  done ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="text-sm font-medium text-slate-800">{m.name}</span>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold whitespace-nowrap ${
                    done ? 'text-emerald-700' : 'text-slate-500'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {done ? 'Selesai' : 'Belum ditandai'}
                </span>
              </div>
            );
          })}
        </div>

        {correctCount < totalQuestions && (
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
            <span className="text-xs text-slate-600">
              Masih ada {totalQuestions - correctCount} soal yang belum diselesaikan. Yuk lanjutkan latihan!
            </span>
            <button
              type="button"
              onClick={onGoPractice}
              className="px-4 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-semibold cursor-pointer"
            >
              Lanjut ke Latihan Soal
            </button>
          </div>
        )}
      </div>

      {/* Kamus Cepat Anti-Tertukar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 space-y-6">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Ringkasan Saku</span>
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 mt-1">
              Kamus Cepat Anti-Tertukar
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Bandingkan sifat semua hubungan sudut secara berdampingan supaya tidak tertukar saat mengerjakan soal.
            </p>
          </div>
        </div>

        {/* Section 1: 3 Basic Pair Rules */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-3">A. Hubungan 2 Sudut Dasar</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ANGLE_PAIR_MODES.map((m) => (
              <div key={m.id} className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                <div className="text-sm font-bold text-slate-900">{m.title}</div>
                <div className="font-mono text-xs font-bold text-sky-700">{m.formulaRule}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{m.memoryTrick}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: 5 Transversal Rules Table */}
        <div>
          <h4 className="text-sm font-bold text-slate-900 mb-3">
            B. Hubungan Sudut pada Garis Sejajar &amp; Transversal
          </h4>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                  <th className="py-3 px-4">Nama Hubungan</th>
                  <th className="py-3 px-4">Sifat Ukuran</th>
                  <th className="py-3 px-4">Ciri Posisi Anti-Tertukar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {TRANSVERSAL_RELATIONS.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      {r.title}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`font-mono text-xs font-bold px-2.5 py-1 rounded-md ${
                          r.propertyLabel === 'Sama Besar'
                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                            : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {r.propertyLabel} ({r.formulaHint})
                      </span>
                    </td>
                    <td className="py-3 px-4 text-xs sm:text-sm text-slate-600">{r.easyClue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
