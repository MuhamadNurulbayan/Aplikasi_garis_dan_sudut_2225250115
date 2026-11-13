import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, CheckCircle2 } from 'lucide-react';
import { STEP_SOLVER_EXAMPLES } from '../data/curriculum';
import QuestionDiagram from './diagrams/QuestionDiagram';

export default function StepByStepSolver() {
  const [selectedExampleIdx, setSelectedExampleIdx] = useState(0);
  const [visibleStepsCount, setVisibleStepsCount] = useState(1);

  const example = STEP_SOLVER_EXAMPLES[selectedExampleIdx];
  const totalSteps = example.steps.length;
  const currentStep = example.steps[visibleStepsCount - 1];

  const handleSelectExample = (idx: number) => {
    setSelectedExampleIdx(idx);
    setVisibleStepsCount(1);
  };

  const revealValue =
    visibleStepsCount === totalSteps
      ? example.diagramType === 'dalam-sepihak-112'
        ? '68°'
        : example.diagramType === 'berpenyiku-example'
          ? '55°'
          : '52°'
      : undefined;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Contoh Soal Bertahap (Atur Kecepatanmu Sendiri)
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Klik <strong>Langkah Berikutnya</strong> satu per satu agar alur berpikir tidak terasa terburu-buru.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start shrink-0">
          {STEP_SOLVER_EXAMPLES.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelectExample(idx)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                selectedExampleIdx === idx
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Contoh {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 items-stretch">
        {/* Left: Problem Statement & Diagram */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between gap-4">
          <div>
            <div className="text-xs font-medium text-sky-700">{example.sourceNote}</div>
            <h4 className="text-base font-bold text-slate-900 mt-1">{example.title}</h4>
            <p className="text-sm text-slate-700 leading-relaxed mt-2">{example.problemText}</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3">
            <QuestionDiagram
              type={example.diagramType}
              emphasizeKnown={currentStep?.highlightTarget === 'given'}
              revealAnswerValue={revealValue}
            />
          </div>
        </div>

        {/* Right: Step-by-Step Interactive Reveal */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            {example.steps.slice(0, visibleStepsCount).map((step, i) => {
              const isLatest = i === visibleStepsCount - 1;
              return (
                <div
                  key={step.stepNumber}
                  className={`rounded-xl border p-4 transition-colors ${
                    isLatest
                      ? 'bg-sky-50/70 border-sky-300'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold text-slate-900">{step.label}</span>
                    {step.stepNumber === totalSteps && (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Selesai
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed mt-1.5">
                    {step.explanation}
                  </p>
                  {step.formula && (
                    <div className="mt-2.5 bg-white border border-slate-200 rounded-lg px-3 py-2 font-mono text-xs sm:text-sm font-bold text-slate-900 tabular-nums">
                      {step.formula}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Stepper Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <div className="text-xs font-mono font-semibold text-slate-500 tabular-nums">
              Langkah {visibleStepsCount} dari {totalSteps}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setVisibleStepsCount(1)}
                disabled={visibleStepsCount === 1}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi</span>
              </button>

              <button
                type="button"
                onClick={() => setVisibleStepsCount((s) => Math.max(1, s - 1))}
                disabled={visibleStepsCount === 1}
                className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>

              <button
                type="button"
                onClick={() => setVisibleStepsCount((s) => Math.min(totalSteps, s + 1))}
                disabled={visibleStepsCount === totalSteps}
                className="inline-flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-lg bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <span>Langkah Berikutnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
