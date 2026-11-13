export interface StudentProfile {
  fullName: string;
  grade: string;
  school: string;
  loggedInAt: string;
}

export type SectionId =
  | 'beranda'
  | 'dasar'
  | 'hubungan'
  | 'sejajar'
  | 'latihan'
  | 'ringkasan';

export type QuizDifficulty = 1 | 2 | 3;

export type QuestionDiagramType =
  | 'transversal-sehadap'
  | 'transversal-dalam-berseberangan'
  | 'berpenyiku-identify'
  | 'berpenyiku-calc'
  | 'berpelurus-calc'
  | 'bertolak-belakang-calc'
  | 'transversal-dalam-sepihak-112'
  | 'story-rail-sehadap'
  | 'story-fence-two-step'
  | 'algebra-berpelurus';

export interface QuizQuestion {
  id: string;
  difficulty: QuizDifficulty;
  difficultyLabel: string;
  topicTag: string;
  title: string;
  prompt: string;
  isStoryProblem?: boolean;
  storyBreakdown?: {
    known: string;
    relation: string;
    asked: string;
  };
  diagramType: QuestionDiagramType;
  options: {
    id: string;
    label: string;
    diagnosticFeedback: string;
  }[];
  correctOptionId: string;
  hints: [string, string, string];
  reflectionPrompt: string;
  reflectionAnswer: string;
}

export interface StepSolverItem {
  id: string;
  title: string;
  sourceNote: string;
  problemText: string;
  diagramType: 'berpenyiku-example' | 'berpelurus-example' | 'dalam-sepihak-112';
  steps: {
    stepNumber: number;
    label: string;
    explanation: string;
    formula?: string;
    highlightTarget: 'given' | 'relation' | 'formula' | 'result';
  }[];
}

export interface StudentProgress {
  visitedSections: SectionId[];
  completedModules: SectionId[];
  solvedQuestions: Record<
    string,
    {
      correct: boolean;
      attempts: number;
      hintsUsed: number;
      reflectionChecked: boolean;
    }
  >;
}
