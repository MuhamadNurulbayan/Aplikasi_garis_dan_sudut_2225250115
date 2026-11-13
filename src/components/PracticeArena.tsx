import { useState } from 'react';
import {
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Highlighter,
  RotateCcw,
} from 'lucide-react';
import { PRACTICE_QUESTIONS } from '../data/curriculum';
import { QuizDifficulty, StudentProgress } from '../types';
import QuestionDiagram from './diagrams/QuestionDiagram';

interface PracticeArenaProps {
  progress: StudentProgress;
  onRecordAnswer: (
    questionId: string,
    isCorrect: boolean,
    hintsUsed: number,
    reflectionChecked: boolean
  ) => void;
  onGoSummary: () => void;
}

export default function PracticeArena({
  progress,
  onRecordAnswer,
  onGoSummary,
}: PracticeArenaProps) {
  const [filterDiff, setFilterDiff] = useState<'all' | QuizDifficulty>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submittedOption, setSubmittedOption] = useState<string | null>(null);
  const [hintsShown, setHintsShown] = useState(0);
  const [showStoryBreakdown, setShowStoryBreakdown] = useState(false);
  const [reflectionRevealed, setReflectionRevealed] = useState(false);

  const filteredQuestions =
    filterDiff === 'all'
      ? PRACTICE_QUESTIONS
      : PRACTICE_QUESTIONS.filter((q) => q.difficulty === filterDiff);

  const safeIndex = Math.min(currentIndex, filteredQuestions.length - 1);
  const question = filteredQuestions[safeIndex];

  const isSubmittedCorrect =
    submittedOption !== null && submittedOption === question.correctOptionId;

  const savedRecord = progress.solvedQuestions[question.id];
  const alreadyMastered = savedRecord?.correct ?? false;

  const resetQuestionUi = () => {
    setSelectedOption(null);
    setSubmittedOption(null);
    setHintsShown(0);
    setShowStoryBreakdown(false);
    setReflectionRevealed(false);
  };

  const handleFilterChange = (next: 'all' | QuizDifficulty) => {
    setFilterDiff(next);
    setCurrentIndex(0);
    resetQuestionUi();
  };

  const handleNavigateQuestion = (nextIdx: number) => {
    setCurrentIndex(nextIdx);
    resetQuestionUi();
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) return;
    setSubmittedOption(selectedOption);
    const isCorrect = selectedOption === question.correctOptionId;
    onRecordAnswer(question.id, isCorrect, hintsShown, reflectionRevealed);
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setSubmittedOption(null);
  };

  const handleRevealHint = () => {
    if (hintsShown < question.hints.length) {
      setHintsShown((h) => h + 1);
    }
  };

  const handleConfirmReflection = () => {
    setReflectionRevealed(true);
    if (isSubmittedCorrect) {
      onRecordAnswer(question.id, true, hintsShown, true);
    }
  };

  const submittedOptionObj = question.options.find((o) => o.id === submittedOption);
  const correctCount = Object.values(progress.solvedQuestions).filter((s) => s.correct).length;

  return (
    <div className="space-y-6">
      {/* Header & Filter Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="text-xs font-semibold text-sky-700">
              Latihan Mandiri · Petunjuk Bertahap &amp; Umpan Balik Diagnostik
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mt-1">
              Uji Pemahaman Garis &amp; Sudut
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Kalau masih ragu atau salah, manfaatkan tombol <strong>Petunjuk Bertahap</strong> lalu coba perbaiki jawabanmu sendiri.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0">
            <div className="text-xs font-mono font-semibold text-slate-700 tabular-nums">
              Tuntas: {correctCount} / {PRACTICE_QUESTIONS.length} soal
            </div>

            <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg">
              {(
                [
                  { id: 'all', label: 'Semua (10)' },
                  { id: 1, label: 'Tingkat 1' },
                  { id: 2, label: 'Tingkat 2' },
                  { id: 3, label: 'Tingkat 3' },
                ] as const
              ).map((tab) => (
                <button
                  key={String(tab.id)}
                  type="button"
                  onClick={() => handleFilterChange(tab.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    filterDiff === tab.id
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Question Step Dots / Quick Jump */}
        <div className="flex flex-wrap items-center gap-2 pt-5 mt-5 border-t border-slate-100">
          <span className="text-xs text-slate-500 mr-1">Nomor soal:</span>
          {filteredQuestions.map((q, idx) => {
            const solved = progress.solvedQuestions[q.id]?.correct;
            const isCurrent = idx === safeIndex;
            return (
              <button
                key={q.id}
                type="button"
                onClick={() => handleNavigateQuestion(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-mono font-bold border transition-colors cursor-pointer tabular-nums ${
                  isCurrent
                    ? 'bg-sky-600 text-white border-sky-600'
                    : solved
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
                aria-label={`Buka soal ${idx + 1}`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Split Stage */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Prompt, Story Breakdown Toggle & Diagram */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="text-xs font-medium text-slate-500">
                <span>{question.difficultyLabel}</span>
                <span aria-hidden="true" className="mx-1.5">·</span>
                <span className="text-slate-700">{question.topicTag}</span>
              </div>

              {alreadyMastered && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Sudah Benar
                </span>
              )}
            </div>

            <h3 className="text-lg font-bold text-slate-900">{question.title}</h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">{question.prompt}</p>

            {/* Story Problem Info Highlighter (EL05) */}
            {question.isStoryProblem && question.storyBreakdown && (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setShowStoryBreakdown((v) => !v)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                    showStoryBreakdown
                      ? 'bg-amber-50 border-amber-300 text-amber-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Highlighter className="w-3.5 h-3.5" />
                  <span>
                    {showStoryBreakdown ? 'Tutup Sorotan Info' : 'Sorot Info Penting Soal Cerita'}
                  </span>
                </button>

                {showStoryBreakdown && (
                  <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 space-y-2 text-xs text-slate-800">
                    <div>
                      <span className="font-bold text-slate-900">Diketahui: </span>
                      {question.storyBreakdown.known}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Hubungan Sudut: </span>
                      {question.storyBreakdown.relation}
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">Ditanyakan: </span>
                      {question.storyBreakdown.asked}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Labeled Diagram */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <QuestionDiagram
                type={question.diagramType}
                emphasizeKnown={hintsShown > 0 || showStoryBreakdown}
                revealAnswerValue={
                  isSubmittedCorrect
                    ? question.options.find((o) => o.id === question.correctOptionId)?.label
                    : undefined
                }
              />
            </div>
          </div>

          {/* Right: Options, Fading Hints, Feedback & Reflection */}
          <div className="lg:col-span-6 space-y-5">
            <div className="space-y-2.5">
              <div className="text-xs font-semibold text-slate-600">Pilih jawaban yang paling tepat:</div>
              {question.options.map((opt, idx) => {
                const isSelected = selectedOption === opt.id;
                const isSubmittedThis = submittedOption === opt.id;
                const isCorrectChoice = opt.id === question.correctOptionId;

                let cardStyle =
                  'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300';
                if (submittedOption !== null) {
                  if (isSubmittedThis && isCorrectChoice) {
                    cardStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950';
                  } else if (isSubmittedThis && !isCorrectChoice) {
                    cardStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                  } else {
                    cardStyle = 'bg-slate-50 border-slate-200 text-slate-500';
                  }
                } else if (isSelected) {
                  cardStyle = 'bg-sky-50 border-sky-500 text-sky-950';
                }

                const letter = ['A', 'B', 'C', 'D'][idx];

                return (
                  <button
                    key={opt.id}
                    type="button"
                    disabled={submittedOption !== null}
                    onClick={() => setSelectedOption(opt.id)}
                    className={`w-full text-left px-4 py-3.5 rounded-xl border transition-colors flex items-center gap-3 cursor-pointer disabled:cursor-default ${cardStyle}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg text-xs font-mono font-bold flex items-center justify-center shrink-0 border ${
                        isSelected && submittedOption === null
                          ? 'bg-sky-600 text-white border-sky-600'
                          : 'bg-white text-slate-700 border-slate-300'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-sm font-semibold">{opt.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              {submittedOption === null ? (
                <button
                  type="button"
                  onClick={handleCheckAnswer}
                  disabled={!selectedOption}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  Periksa Jawaban
                </button>
              ) : !isSubmittedCorrect ? (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Coba Pilih Lagi</span>
                </button>
              ) : null}

              {!isSubmittedCorrect && (
                <button
                  type="button"
                  onClick={handleRevealHint}
                  disabled={hintsShown >= question.hints.length}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-semibold transition-colors disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>
                    Minta Petunjuk ({hintsShown}/{question.hints.length})
                  </span>
                </button>
              )}
            </div>

            {/* Progressive Fading Hints List */}
            {hintsShown > 0 && (
              <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 space-y-2">
                <div className="text-xs font-bold text-amber-900">Petunjuk Bertahap:</div>
                {question.hints.slice(0, hintsShown).map((hint, hIdx) => (
                  <p key={hIdx} className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                    <span className="font-mono font-bold text-amber-800 mr-1.5">
                      #{hIdx + 1}
                    </span>
                    {hint}
                  </p>
                ))}
              </div>
            )}

            {/* Diagnostic Feedback */}
            {submittedOptionObj && (
              <div
                className={`rounded-xl border p-4 space-y-2 ${
                  isSubmittedCorrect
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 text-sm font-bold">
                  {isSubmittedCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>Jawaban Kamu Benar!</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
                      <span>Belum Tepat, Yuk Cek Kenapa:</span>
                    </>
                  )}
                </div>
                <p className="text-sm leading-relaxed">{submittedOptionObj.diagnosticFeedback}</p>
              </div>
            )}

            {/* Germane Load Reflection Prompt (GL02) after solving correctly */}
            {isSubmittedCorrect && (
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-900">
                  <Sparkles className="w-3.5 h-3.5 text-sky-700" />
                  <span>Cek Masuk Akal (Refleksi Singkat)</span>
                </div>
                <p className="text-sm font-medium text-slate-900">{question.reflectionPrompt}</p>
                {!reflectionRevealed ? (
                  <button
                    type="button"
                    onClick={handleConfirmReflection}
                    className="px-3.5 py-2 rounded-lg bg-white border border-sky-300 text-xs font-semibold text-sky-800 hover:bg-sky-100 transition-colors cursor-pointer"
                  >
                    Lihat Alasan Logisnya
                  </button>
                ) : (
                  <p className="text-xs sm:text-sm text-sky-950 bg-white border border-sky-200 rounded-lg p-3 leading-relaxed">
                    {question.reflectionAnswer}
                  </p>
                )}
              </div>
            )}

            {/* Prev / Next Navigation */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => handleNavigateQuestion(Math.max(0, safeIndex - 1))}
                disabled={safeIndex === 0}
                className="inline-flex items-center gap-1 px-3.5 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Soal Sebelumnya</span>
              </button>

              {safeIndex < filteredQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={() => handleNavigateQuestion(safeIndex + 1)}
                  className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-lg bg-slate-900 hover:bg-slate-800 text-white cursor-pointer"
                >
                  <span>Soal Berikutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onGoSummary}
                  className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                >
                  <span>Lihat Rapor &amp; Kamus Cepat</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
