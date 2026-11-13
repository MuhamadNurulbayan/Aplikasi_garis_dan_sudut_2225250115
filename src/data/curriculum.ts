import { QuizQuestion, StepSolverItem } from '../types';

export interface BasicGeometryConcept {
  id: 'titik' | 'ruas-garis' | 'sinar-garis' | 'garis';
  title: string;
  symbol: string;
  shortRule: string;
  explanation: string;
  realLifeExample: string;
}

export const BASIC_LINE_CONCEPTS: BasicGeometryConcept[] = [
  {
    id: 'titik',
    title: 'Titik',
    symbol: '• A',
    shortRule: 'Penanda lokasi, tidak punya panjang maupun lebar',
    explanation:
      'Titik adalah penanda posisi paling dasar dalam geometri. Biasanya ditulis dengan huruf kapital seperti Titik A atau Titik P.',
    realLifeExample: 'Ujung jarum kompas atau noktah persimpangan di peta.',
  },
  {
    id: 'ruas-garis',
    title: 'Ruas Garis (Segmen)',
    symbol: 'A —— B',
    shortRule: 'Punya titik awal dan titik akhir (panjangnya bisa diukur)',
    explanation:
      'Ruas garis adalah bagian dari garis yang dibatasi dua titik ujung. Karena ada batasnya, panjang ruas garis AB bisa kamu ukur dengan penggaris.',
    realLifeExample: 'Panjang sisi penggaris atau batang pensil.',
  },
  {
    id: 'sinar-garis',
    title: 'Sinar Garis',
    symbol: 'A ——→',
    shortRule: 'Punya 1 titik pangkal dan memanjang tak terbatas ke satu arah',
    explanation:
      'Sinar garis berawal dari satu titik pangkal (misalnya titik A), lalu memanjang terus tanpa ujung ke satu arah panah. Dua sinar garis yang pangkalnya sama akan membentuk sudut!',
    realLifeExample: 'Sorot lampu senter yang memancar dari satu titik sumber.',
  },
  {
    id: 'garis',
    title: 'Garis Lurus',
    symbol: '←——→',
    shortRule: 'Memanjang lurus tak terbatas ke dua arah berlawanan',
    explanation:
      'Garis lurus ditandai panah di kedua ujungnya yang artinya terus memanjang tanpa batas ke kiri maupun ke kanan.',
    realLifeExample: 'Garis cakrawala lurus di tengah laut atau rel kereta lurus panjang.',
  },
];

export interface LinePositionConcept {
  id: 'sejajar' | 'berpotongan' | 'tegak-lurus' | 'berimpit';
  title: string;
  notation: string;
  summary: string;
  example: string;
}

export const LINE_POSITIONS: LinePositionConcept[] = [
  {
    id: 'sejajar',
    title: 'Dua Garis Sejajar',
    notation: 'g ∥ h',
    summary:
      'Terletak pada satu bidang datar dan jaraknya selalu sama. Jika diperpanjang sejauh apa pun, keduanya tidak akan pernah bertemu.',
    example: 'Dua rel kereta api atau garis tepi kiri dan kanan buku tulis.',
  },
  {
    id: 'berpotongan',
    title: 'Dua Garis Berpotongan',
    notation: 'g × h',
    summary:
      'Dua garis bertemu tepat di satu titik persekutuan (titik potong). Perpotongan ini otomatis membentuk empat buah sudut di sekelilingnya.',
    example: 'Bilah gunting yang terbuka atau persimpangan jalan.',
  },
  {
    id: 'tegak-lurus',
    title: 'Garis Tegak Lurus',
    notation: 'g ⊥ h',
    summary:
      'Bentuk khusus dari garis berpotongan yang membentuk sudut siku-siku tepat 90° di keempat sudut pertemuannya.',
    example: 'Sudut pertemuan dinding tembok dengan lantai datar.',
  },
  {
    id: 'berimpit',
    title: 'Dua Garis Berimpit',
    notation: 'g = h',
    summary:
      'Dua garis terletak pada posisi yang sama persis sehingga terlihat seperti satu garis tunggal.',
    example: 'Jarum jam panjang dan pendek tepat pukul 12.00.',
  },
];

export interface AnglePairModeInfo {
  id: 'berpenyiku' | 'berpelurus' | 'bertolak-belakang';
  title: string;
  memoryTrick: string;
  formulaRule: string;
  studentTrap: string;
  explanation: string;
}

export const ANGLE_PAIR_MODES: AnglePairModeInfo[] = [
  {
    id: 'berpenyiku',
    title: 'Sudut Berpenyiku (Komplemen)',
    memoryTrick: 'Ingat kata SIKU → Totalnya 90°',
    formulaRule: '∠A + ∠B = 90°',
    studentTrap:
      'Sering tertukar dengan berpelurus! Perhatikan tanda kotak siku-siku atau garis berbentuk huruf L.',
    explanation:
      'Dua sudut dikatakan saling berpenyiku jika digabungkan akan membentuk sudut siku-siku tepat 90°.',
  },
  {
    id: 'berpelurus',
    title: 'Sudut Berpelurus (Suplemen)',
    memoryTrick: 'Ingat kata LURUS → Totalnya 180°',
    formulaRule: '∠A + ∠B = 180°',
    studentTrap:
      'Jangan terkecoh mengira 90°. Ciri khasnya adalah kedua sudut menempel di atas satu garis lurus.',
    explanation:
      'Dua sudut dikatakan saling berpelurus jika keduanya menempel berdampingan di atas sebuah garis lurus sehingga jumlahnya 180°.',
  },
  {
    id: 'bertolak-belakang',
    title: 'Sudut Bertolak Belakang',
    memoryTrick: 'Saling membelakangi di huruf X → Besar sudutnya KEMBAR',
    formulaRule: '∠A = ∠B (Sama Besar)',
    studentTrap:
      'Jangan dikurangi 180°! Sudut yang berhadapan saling membelakangi pada dua garis berpotongan selalu sama besar.',
    explanation:
      'Ketika dua garis lurus berpotongan membentuk huruf X, pasangan sudut yang saling membelakangi selalu memiliki ukuran derajat yang sama persis.',
  },
];

export type TransversalRelationId =
  | 'sehadap'
  | 'dalam-berseberangan'
  | 'luar-berseberangan'
  | 'dalam-sepihak'
  | 'luar-sepihak';

export interface TransversalRelationInfo {
  id: TransversalRelationId;
  title: string;
  propertyLabel: 'Sama Besar' | 'Jumlah 180°';
  formulaHint: string;
  easyClue: string;
  explanation: string;
  pairs: {
    a: 'A1' | 'A2' | 'A3' | 'A4';
    b: 'B1' | 'B2' | 'B3' | 'B4';
    label: string;
  }[];
}

export const TRANSVERSAL_RELATIONS: TransversalRelationInfo[] = [
  {
    id: 'sehadap',
    title: 'Sudut Sehadap',
    propertyLabel: 'Sama Besar',
    formulaHint: '∠1 = ∠2',
    easyClue: 'Menghadap ke arah pojok yang sama persis (seperti digeser turun).',
    explanation:
      'Sudut sehadap berada di posisi pojok yang sama pada masing-masing titik potong (misalnya sama-sama di kanan atas). Karena garis sejajar kemiringannya sama, ukurannya pasti sama besar.',
    pairs: [
      { a: 'A1', b: 'B1', label: '∠A₁ & ∠B₁ (Kiri Atas)' },
      { a: 'A2', b: 'B2', label: '∠A₂ & ∠B₂ (Kanan Atas)' },
      { a: 'A3', b: 'B3', label: '∠A₃ & ∠B₃ (Kanan Bawah)' },
      { a: 'A4', b: 'B4', label: '∠A₄ & ∠B₄ (Kiri Bawah)' },
    ],
  },
  {
    id: 'dalam-berseberangan',
    title: 'Sudut Dalam Berseberangan',
    propertyLabel: 'Sama Besar',
    formulaHint: '∠1 = ∠2',
    easyClue: 'Keduanya di dalam antara 2 garis sejajar, tapi menyeberangi garis miring (membentuk huruf Z).',
    explanation:
      'Kata "Dalam" berarti berada di antara dua garis sejajar. Kata "Berseberangan" berarti satu di sisi kiri dan satunya menyeberang ke sisi kanan garis transversal. Pasangan ini selalu sama besar.',
    pairs: [
      { a: 'A4', b: 'B2', label: '∠A₄ & ∠B₂ (Kiri Dalam ↔ Kanan Dalam)' },
      { a: 'A3', b: 'B1', label: '∠A₃ & ∠B₁ (Kanan Dalam ↔ Kiri Dalam)' },
    ],
  },
  {
    id: 'luar-berseberangan',
    title: 'Sudut Luar Berseberangan',
    propertyLabel: 'Sama Besar',
    formulaHint: '∠1 = ∠2',
    easyClue: 'Keduanya di luar area garis sejajar, dan saling menyeberangi garis transversal.',
    explanation:
      'Kata "Luar" berarti berada di atas garis g atau di bawah garis h. Karena berseberangan sisi kiri dan kanan terhadap garis transversal, besar kedua sudut ini sama besar.',
    pairs: [
      { a: 'A1', b: 'B3', label: '∠A₁ & ∠B₃ (Kiri Luar ↔ Kanan Luar)' },
      { a: 'A2', b: 'B4', label: '∠A₂ & ∠B₄ (Kanan Luar ↔ Kiri Luar)' },
    ],
  },
  {
    id: 'dalam-sepihak',
    title: 'Sudut Dalam Sepihak',
    propertyLabel: 'Jumlah 180°',
    formulaHint: '∠1 + ∠2 = 180°',
    easyClue: 'Keduanya di dalam antara 2 garis sejajar dan berada di sisi yang SAMA (kiri saja atau kanan saja).',
    explanation:
      'Berbeda dari sudut sehadap dan berseberangan! Sudut dalam sepihak selalu memiliki satu sudut lancip dan satu sudut tumpul yang berpasangan di sisi sama. Jika dijumlahkan hasilnya selalu 180°.',
    pairs: [
      { a: 'A4', b: 'B1', label: '∠A₄ & ∠B₁ (Sama-sama di Sisi Kiri Dalam)' },
      { a: 'A3', b: 'B2', label: '∠A₃ & ∠B₂ (Sama-sama di Sisi Kanan Dalam)' },
    ],
  },
  {
    id: 'luar-sepihak',
    title: 'Sudut Luar Sepihak',
    propertyLabel: 'Jumlah 180°',
    formulaHint: '∠1 + ∠2 = 180°',
    easyClue: 'Keduanya di area luar garis sejajar dan berada di sisi yang SAMA.',
    explanation:
      'Terletak di luar area dua garis sejajar dan berada di satu pihak yang sama (kiri dengan kiri, atau kanan dengan kanan). Jumlah kedua sudutnya selalu 180°.',
    pairs: [
      { a: 'A1', b: 'B4', label: '∠A₁ & ∠B₄ (Sama-sama di Sisi Kiri Luar)' },
      { a: 'A2', b: 'B3', label: '∠A₂ & ∠B₃ (Sama-sama di Sisi Kanan Luar)' },
    ],
  },
];

export const STEP_SOLVER_EXAMPLES: StepSolverItem[] = [
  {
    id: 'contoh-dalam-sepihak',
    title: 'Contoh 1: Sudut Dalam Sepihak pada Garis Sejajar',
    sourceNote: 'Diadaptasi langsung dari soal pemicu wawancara siswa',
    problemText:
      'Dua garis sejajar g dan h dipotong oleh sebuah garis transversal t. Jika besar sudut dalam sepihak ∠A₃ = 112°, berapakah besar sudut dalam sepihak pasangannya (∠B₂)?',
    diagramType: 'dalam-sepihak-112',
    steps: [
      {
        stepNumber: 1,
        label: '1. Catat Informasi yang Diketahui',
        explanation:
          'Lihat gambar dengan teliti: garis g sejajar garis h (g ∥ h). Sudut yang diketahui adalah ∠A₃ = 112°, dan yang ditanyakan adalah pasangannya ∠B₂.',
        formula: 'Diketahui: ∠A₃ = 112°  |  Ditanya: ∠B₂',
        highlightTarget: 'given',
      },
      {
        stepNumber: 2,
        label: '2. Tentukan Hubungan Kedua Sudut',
        explanation:
          'Perhatikan posisinya: ∠A₃ dan ∠B₂ sama-sama berada di DALAM area antara garis g dan h, serta berada di sisi KANAN yang sama terhadap garis transversal t. Jadi hubungannya adalah Sudut Dalam Sepihak.',
        formula: 'Hubungan: Dalam Sepihak → Jumlah kedua sudut = 180°',
        highlightTarget: 'relation',
      },
      {
        stepNumber: 3,
        label: '3. Susun Persamaan Hitung',
        explanation:
          'Karena jumlah sudut dalam sepihak selalu 180°, kita tuliskan penjumlahannya terlebih dahulu sebelum mengurangi.',
        formula: '∠A₃ + ∠B₂ = 180°  →  112° + ∠B₂ = 180°',
        highlightTarget: 'formula',
      },
      {
        stepNumber: 4,
        label: '4. Hitung & Periksa Kewajaran Jawaban',
        explanation:
          'Hitung pengurangannya dengan teliti: 180° − 112° = 68°. Cek di gambar: ∠A₃ tampak tumpul (112°) dan ∠B₂ tampak lancip (68°). Masuk akal!',
        formula: '∠B₂ = 180° − 112° = 68°',
        highlightTarget: 'result',
      },
    ],
  },
  {
    id: 'contoh-berpenyiku',
    title: 'Contoh 2: Membedakan Sudut Berpenyiku',
    sourceNote: 'Mengatasi kekeliruan antara 90° dan 180°',
    problemText:
      'Sudut ∠ABD dan ∠CBD saling membentuk sudut siku-siku di titik B. Jika besar ∠CBD = 35°, berapakah besar ∠ABD?',
    diagramType: 'berpenyiku-example',
    steps: [
      {
        stepNumber: 1,
        label: '1. Kenali Bentuk Siku-Siku pada Gambar',
        explanation:
          'Perhatikan tanda kotak kecil di titik sudut B. Tanda itu menunjukkan garis AB dan BC membentuk sudut siku-siku (90°). Diketahui bagian bawah ∠CBD = 35°.',
        formula: 'Diketahui: ∠ABC = 90°, ∠CBD = 35°',
        highlightTarget: 'given',
      },
      {
        stepNumber: 2,
        label: '2. Tentukan Hubungan Sudutnya',
        explanation:
          'Karena kedua sudut bergabung membentuk sudut siku-siku 90° (bukan garis lurus), keduanya saling Berpenyiku.',
        formula: 'Hubungan: Berpenyiku → ∠ABD + ∠CBD = 90°',
        highlightTarget: 'relation',
      },
      {
        stepNumber: 3,
        label: '3. Hitung Besar ∠ABD',
        explanation:
          'Kurangkan total sudut siku-siku 90° dengan sudut yang sudah diketahui yaitu 35°.',
        formula: '∠ABD = 90° − 35° = 55°',
        highlightTarget: 'formula',
      },
      {
        stepNumber: 4,
        label: '4. Cek Ulang Hasilnya',
        explanation:
          'Jumlahkan kembali: 55° + 35° = 90°. Tepat membentuk sudut siku-siku!',
        formula: 'Terbukti: 55° + 35° = 90°',
        highlightTarget: 'result',
      },
    ],
  },
  {
    id: 'contoh-berpelurus',
    title: 'Contoh 3: Sudut Berpelurus pada Garis Lurus',
    sourceNote: 'Latihan ketelitian menentukan sudut pelurus',
    problemText:
      'Titik P, O, dan Q berada pada satu garis lurus. Jika besar ∠POR = 128°, berapakah besar ∠ROQ?',
    diagramType: 'berpelurus-example',
    steps: [
      {
        stepNumber: 1,
        label: '1. Cek Garis Lurus POQ',
        explanation:
          'Garis PQ adalah garis lurus datar, berarti sudut total dari P ke Q adalah 180°. Sudut sebelah kiri ∠POR sudah diketahui 128°.',
        formula: 'Diketahui: ∠POQ = 180°, ∠POR = 128°',
        highlightTarget: 'given',
      },
      {
        stepNumber: 2,
        label: '2. Tentukan Hubungan Sudut',
        explanation:
          'Karena ∠POR dan ∠ROQ menempel berdampingan di atas garis lurus, maka keduanya saling Berpelurus.',
        formula: 'Hubungan: Berpelurus → ∠POR + ∠ROQ = 180°',
        highlightTarget: 'relation',
      },
      {
        stepNumber: 3,
        label: '3. Lakukan Pengurangan',
        explanation:
          'Kurangi 180° dengan 128° secara bertahap (180 − 120 = 60, lalu 60 − 8 = 52).',
        formula: '∠ROQ = 180° − 128° = 52°',
        highlightTarget: 'formula',
      },
      {
        stepNumber: 4,
        label: '4. Verifikasi Masuk Akal',
        explanation:
          '∠POR (128°) lebih besar dari 90° (tumpul), sedangkan ∠ROQ (52°) lebih kecil dari 90° (lancip). Cocok dengan gambar!',
        formula: 'Cek jumlah: 128° + 52° = 180°',
        highlightTarget: 'result',
      },
    ],
  },
];

export const PRACTICE_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    difficulty: 1,
    difficultyLabel: 'Tingkat 1 · Kenali Posisi',
    topicTag: 'Garis Sejajar & Transversal',
    title: 'Menentukan Nama Pasangan Sudut (1)',
    prompt:
      'Perhatikan garis sejajar g dan h yang dipotong garis transversal t. Pasangan sudut ∠A₂ (biru) dan ∠B₂ (oranye) sama-sama menghadap ke kanan atas. Disebut apakah hubungan kedua sudut tersebut?',
    diagramType: 'transversal-sehadap',
    options: [
      {
        id: 'a',
        label: 'Sudut Sehadap',
        diagnosticFeedback:
          'Tepat sekali! Keduanya berada di pojok yang sama (sama-sama kanan atas), jadi disebut sudut sehadap dan besarnya sama.',
      },
      {
        id: 'b',
        label: 'Sudut Dalam Berseberangan',
        diagnosticFeedback:
          'Belum tepat. Sudut dalam berseberangan harus berada di antara dua garis sejajar dan saling menyilang sisi kiri-kanan. Sedangkan ∠A₂ berada di area luar.',
      },
      {
        id: 'c',
        label: 'Sudut Dalam Sepihak',
        diagnosticFeedback:
          'Hampir mirip karena sama-sama di kanan, tetapi ∠A₂ berada di luar area antara garis g dan h.',
      },
      {
        id: 'd',
        label: 'Sudut Bertolak Belakang',
        diagnosticFeedback:
          'Kurang tepat. Sudut bertolak belakang hanya terjadi di satu titik potong yang sama, bukan berpindah dari titik A ke titik B.',
      },
    ],
    correctOptionId: 'a',
    hints: [
      'Amati posisi pojok sudut biru (∠A₂) di titik potong atas dan sudut oranye (∠B₂) di titik potong bawah.',
      'Keduanya sama-sama menghadap ke arah kanan atas (seperti digeser turun sejajar garis transversal).',
      'Pasangan sudut yang menghadap ke arah yang sama persis disebut Sudut Sehadap.',
    ],
    reflectionPrompt: 'Mengapa ∠A₂ dan ∠B₂ disebut sehadap?',
    reflectionAnswer:
      'Karena kedua sudut memiliki arah hadap dan posisi pojok yang sama persis (kanan atas) pada dua garis sejajar.',
  },
  {
    id: 'q2',
    difficulty: 1,
    difficultyLabel: 'Tingkat 1 · Kenali Posisi',
    topicTag: 'Garis Sejajar & Transversal',
    title: 'Membedakan Dalam Berseberangan & Dalam Sepihak',
    prompt:
      'Lihat posisi ∠A₄ (kiri bawah di dalam) dan ∠B₂ (kanan atas di dalam). Keduanya berada di dalam area dua garis sejajar, tetapi saling menyeberangi garis t. Apa nama hubungan kedua sudut ini?',
    diagramType: 'transversal-dalam-berseberangan',
    options: [
      {
        id: 'a',
        label: 'Sudut Dalam Sepihak',
        diagnosticFeedback:
          'Hati-hati tertukar! "Sepihak" artinya berada di sisi yang sama (kiri semua atau kanan semua). Di gambar ini, ∠A₄ di kiri sedangkan ∠B₂ menyeberang ke kanan.',
      },
      {
        id: 'b',
        label: 'Sudut Sehadap',
        diagnosticFeedback:
          'Belum tepat. ∠A₄ menghadap kiri bawah, sedangkan ∠B₂ menghadap kanan atas — arah hadapnya berlawanan.',
      },
      {
        id: 'c',
        label: 'Sudut Dalam Berseberangan',
        diagnosticFeedback:
          'Benar! Keduanya berada di dalam area sejajar dan saling menyeberang sisi kiri–kanan garis transversal (membentuk pola huruf Z).',
      },
      {
        id: 'd',
        label: 'Sudut Luar Berseberangan',
        diagnosticFeedback:
          'Belum tepat. Kedua sudut berada di antara garis g dan h (area dalam), bukan di area luar.',
      },
    ],
    correctOptionId: 'c',
    hints: [
      'Cek dulu areanya: apakah ∠A₄ dan ∠B₂ berada di antara garis g dan h (dalam) atau di luar?',
      'Keduanya di area DALAM. Sekarang cek sisinya: apakah di sisi yang sama atau berseberangan melewati garis t?',
      'Satu di kiri dan satu di kanan melewati garis transversal → Dalam Berseberangan.',
    ],
    reflectionPrompt: 'Bagaimana sifat ukuran sudut Dalam Berseberangan?',
    reflectionAnswer:
      'Sudut dalam berseberangan selalu memiliki besar yang SAMA (∠A₄ = ∠B₂).',
  },
  {
    id: 'q3',
    difficulty: 1,
    difficultyLabel: 'Tingkat 1 · Kenali Posisi',
    topicTag: 'Hubungan Sudut Dasar',
    title: 'Berpenyiku vs Berpelurus',
    prompt:
      'Perhatikan sudut ∠ABD dan ∠CBD yang dibatasi tanda siku-siku di titik B. Jika keduanya digabungkan menjadi sudut siku-siku, hubungan keduanya adalah...',
    diagramType: 'berpenyiku-identify',
    options: [
      {
        id: 'a',
        label: 'Saling Berpelurus (jumlah 180°)',
        diagnosticFeedback:
          'Hati-hati tertukar! Berpelurus membentuk garis lurus (180°). Di gambar terlihat bentuk huruf L dengan tanda siku-siku 90°.',
      },
      {
        id: 'b',
        label: 'Saling Berpenyiku (jumlah 90°)',
        diagnosticFeedback:
          'Mantap! Kata "Siku" pada berpenyiku langsung mengingatkan kita pada sudut siku-siku 90°.',
      },
      {
        id: 'c',
        label: 'Saling Bertolak Belakang (sama besar)',
        diagnosticFeedback:
          'Belum tepat. Sudut bertolak belakang tidak berbagi sisi yang sama, melainkan saling membelakangi di huruf X.',
      },
      {
        id: 'd',
        label: 'Sudut Sehadap (sama besar)',
        diagnosticFeedback:
          'Kurang tepat. Sudut sehadap hanya ada pada dua garis sejajar yang dipotong garis transversal.',
      },
    ],
    correctOptionId: 'b',
    hints: [
      'Perhatikan tanda kotak kecil berwarna di sudut B. Tanda itu melambangkan sudut berapa derajat?',
      'Sudut siku-siku besarnya selalu 90°.',
      'Dua sudut yang jumlahnya 90° disebut saling Berpenyiku.',
    ],
    reflectionPrompt: 'Apa kata kunci agar tidak tertukar antara berpenyiku dan berpelurus?',
    reflectionAnswer:
      'Berpen-SIKU = membentuk sudut siku-siku (90°), sedangkan Berpe-LURUS = membentuk garis lurus (180°).',
  },
  {
    id: 'q4',
    difficulty: 2,
    difficultyLabel: 'Tingkat 2 · Hitung Sudut',
    topicTag: 'Sudut Berpenyiku',
    title: 'Menghitung Pasangan Sudut Berpenyiku',
    prompt:
      'Diketahui ∠ABD dan ∠CBD saling berpenyiku (membentuk sudut 90°). Jika besar ∠CBD = 38°, berapakah besar ∠ABD?',
    diagramType: 'berpenyiku-calc',
    options: [
      {
        id: 'a',
        label: '52°',
        diagnosticFeedback:
          'Betul sekali! Karena berpenyiku jumlahnya 90°, maka ∠ABD = 90° − 38° = 52°.',
      },
      {
        id: 'b',
        label: '142°',
        diagnosticFeedback:
          'Ups, kamu mengurangkannya dari 180° (berpelurus). Ingat: gambar menunjukkan sudut siku-siku 90°, bukan garis lurus!',
      },
      {
        id: 'c',
        label: '38°',
        diagnosticFeedback:
          'Belum tepat. Besar kedua sudut berpenyiku tidak harus sama; jumlah keduanya harus 90°.',
      },
      {
        id: 'd',
        label: '62°',
        diagnosticFeedback:
          'Hampir benar! Coba cek lagi pengurangannya: 90 − 38. Jangan lupa meminjam puluhan saat mengurangi (62 + 38 = 100, kelebihan 10°).',
      },
    ],
    correctOptionId: 'a',
    hints: [
      'Perhatikan sudut total ∠ABC pada gambar yang ditandai siku-siku.',
      'Karena saling berpenyiku, berlaku: ∠ABD + 38° = 90°.',
      'Hitung dengan teliti: 90° − 38° = ...',
    ],
    reflectionPrompt: 'Cek kewajaran: apakah 52° + 38° benar menghasilkan 90°?',
    reflectionAnswer: 'Ya! 52 + 38 = 90°, dan kedua sudut sama-sama lancip (< 90°).',
  },
  {
    id: 'q5',
    difficulty: 2,
    difficultyLabel: 'Tingkat 2 · Hitung Sudut',
    topicTag: 'Sudut Berpelurus',
    title: 'Menghitung Pasangan Sudut Berpelurus',
    prompt:
      'Garis POQ adalah garis lurus. Jika besar sudut sebelah kiri ∠POR = 125°, berapakah besar sudut pelurusnya ∠ROQ?',
    diagramType: 'berpelurus-calc',
    options: [
      {
        id: 'a',
        label: '65°',
        diagnosticFeedback:
          'Hampir tepat, coba hitung ulang 180 − 125 dengan hati-hati (125 + 65 = 190, kelebihan 10°).',
      },
      {
        id: 'b',
        label: '55°',
        diagnosticFeedback:
          'Tepat! Garis lurus besarnya 180°, sehingga ∠ROQ = 180° − 125° = 55°.',
      },
      {
        id: 'c',
        label: '125°',
        diagnosticFeedback:
          'Belum tepat. ∠POR dan ∠ROQ tidak bertolak belakang melainkan berdampingan di garis lurus.',
      },
      {
        id: 'd',
        label: '45°',
        diagnosticFeedback:
          'Kurang tepat. Coba jumlahkan 125° + 45° = 170°, masih kurang 10° untuk menjadi garis lurus 180°.',
      },
    ],
    correctOptionId: 'b',
    hints: [
      'Garis POQ lurus mendatar, artinya sudut totalnya adalah 180°.',
      'Kedua sudut saling berpelurus: ∠POR + ∠ROQ = 180°.',
      'Hitung: 180° − 125° = ...',
    ],
    reflectionPrompt: 'Mengapa ∠ROQ harus lebih kecil dari 90°?',
    reflectionAnswer:
      'Karena ∠POR sudah 125° (tumpul), sisa pelurus menuju 180° pasti berupa sudut lancip yaitu 55°.',
  },
  {
    id: 'q6',
    difficulty: 2,
    difficultyLabel: 'Tingkat 2 · Hitung Sudut',
    topicTag: 'Sudut Bertolak Belakang',
    title: 'Menentukan Sudut Bertolak Belakang',
    prompt:
      'Dua garis lurus berpotongan membentuk huruf X. Jika besar ∠P₁ = 74°, berapakah besar ∠P₃ yang bertolak belakang dengannya?',
    diagramType: 'bertolak-belakang-calc',
    options: [
      {
        id: 'a',
        label: '106°',
        diagnosticFeedback:
          '106° adalah besar sudut pelurus di sebelahnya (∠P₂ atau ∠P₄), bukan sudut yang bertolak belakang dengan ∠P₁.',
      },
      {
        id: 'b',
        label: '16°',
        diagnosticFeedback:
          'Ups! Kamu mengurangkannya dengan 90°. Sudut bertolak belakang tidak perlu dikurangi 90°.',
      },
      {
        id: 'c',
        label: '74°',
        diagnosticFeedback:
          'Benar sekali! Sudut yang saling bertolak belakang ukurannya selalu kembar (sama besar), yaitu 74°.',
      },
      {
        id: 'd',
        label: '148°',
        diagnosticFeedback:
          'Tidak perlu dikali dua ya. Sudut bertolak belakang besarnya sama persis dengan pasangannya.',
      },
    ],
    correctOptionId: 'c',
    hints: [
      'Amati posisi ∠P₁ dan ∠P₃ pada perpotongan dua garis berbentuk huruf X.',
      'Keduanya saling membelakangi di titik potong yang sama, sehingga disebut bertolak belakang.',
      'Sifat sudut bertolak belakang adalah SAMA BESAR: ∠P₃ = ∠P₁.',
    ],
    reflectionPrompt: 'Apakah sudut bertolak belakang perlu dihitung dengan rumus 180° − sudut?',
    reflectionAnswer:
      'Tidak perlu! Jika benar-benar bertolak belakang, besar sudutnya langsung sama persis.',
  },
  {
    id: 'q7',
    difficulty: 2,
    difficultyLabel: 'Tingkat 2 · Hitung Sudut',
    topicTag: 'Garis Sejajar & Transversal',
    title: 'Soal Tantangan Dalam Sepihak',
    prompt:
      'Dua garis sejajar dipotong oleh sebuah garis transversal. Jika salah satu sudut dalam sepihak (∠A₃) besarnya 112°, berapakah besar sudut dalam sepihak pasangannya (∠B₂)?',
    diagramType: 'transversal-dalam-sepihak-112',
    options: [
      {
        id: 'a',
        label: '112°',
        diagnosticFeedback:
          'Hati-hati! Besar sudut menjadi 112° jika hubungannya Sehadap atau Berseberangan. Di gambar ini, ∠A₃ tumpul sedangkan ∠B₂ lancip karena Dalam Sepihak.',
      },
      {
        id: 'b',
        label: '68°',
        diagnosticFeedback:
          'Sempurna! Sudut dalam sepihak berjumlah 180°, jadi 180° − 112° = 68°.',
      },
      {
        id: 'c',
        label: '78°',
        diagnosticFeedback:
          'Hampir benar, cek lagi hitungan pengurangannya: 180 − 112. (112 + 78 = 190, kelebihan 10°).',
      },
      {
        id: 'd',
        label: '22°',
        diagnosticFeedback:
          'Kurang tepat. Sudut dalam sepihak jumlahnya 180°, bukan 90° atau 134°.',
      },
    ],
    correctOptionId: 'b',
    hints: [
      'Lihat sudut biru (112°) dan sudut oranye di bawahnya. Keduanya ada di dalam garis sejajar pada sisi kanan yang sama.',
      'Hubungan sudut dalam sepihak memiliki jumlah 180° (bukan sama besar).',
      'Hitung dengan teliti: 180° − 112° = ...',
    ],
    reflectionPrompt: 'Mengapa jawaban 112° tidak mungkin benar untuk ∠B₂?',
    reflectionAnswer:
      'Karena secara visual ∠B₂ terlihat lancip (< 90°), dan jumlah pasangan dalam sepihak harus 180° (112° + 68° = 180°).',
  },
  {
    id: 'q8',
    difficulty: 3,
    difficultyLabel: 'Tingkat 3 · Soal Cerita',
    topicTag: 'Aplikasi Garis Sejajar',
    title: 'Persimpangan Rel Kereta Api',
    isStoryProblem: true,
    storyBreakdown: {
      known: 'Dua rel sejajar (g ∥ h) · Jalan penyebrangan memotong miring · Sudut kanan atas di rel pertama = 65°.',
      relation: 'Posisi kedua sudut sama-sama di kanan atas (Sudut Sehadap).',
      asked: 'Besar sudut yang sehadap di rel kedua.',
    },
    prompt:
      'Dua jalur rel kereta api yang lurus dan sejajar dipotong oleh sebuah jalan penyeberangan lurus yang miring. Jika sudut di sisi kanan atas pada rel pertama terukur 65°, berapakah besar sudut di posisi yang sama (sehadap) pada rel kedua?',
    diagramType: 'story-rail-sehadap',
    options: [
      {
        id: 'a',
        label: '65°',
        diagnosticFeedback:
          'Tepat! Karena kedua rel sejajar, sudut sehadap di rel kedua memiliki besar yang sama persis yaitu 65°.',
      },
      {
        id: 'b',
        label: '115°',
        diagnosticFeedback:
          '115° adalah besar sudut pelurus di sebelahnya atau sudut dalam sepihak, padahal soal menanyakan sudut SEHADAP.',
      },
      {
        id: 'c',
        label: '25°',
        diagnosticFeedback:
          'Belum tepat. Sudut tidak dikurangi 90° karena dua rel sejajar dan jalan membentuk sudut sehadap.',
      },
      {
        id: 'd',
        label: '130°',
        diagnosticFeedback:
          'Sudut sehadap besarnya sama (tidak dikali dua).',
      },
    ],
    correctOptionId: 'a',
    hints: [
      'Gunakan tombol "Sorot Info Penting" di atas jika soal cerita terasa panjang.',
      'Kedua rel sejajar dan dipotong jalan lurus. Posisi sudut yang ditanya sama-sama di kanan atas (Sehadap).',
      'Sifat sudut sehadap adalah SAMA BESAR dengan sudut yang diketahui.',
    ],
    reflectionPrompt: 'Apa guna mengenali kata "sejajar" dan "sehadap" di soal cerita?',
    reflectionAnswer:
      'Dengan menandai dua informasi itu, kita langsung tahu sudutnya sama besar (65°) tanpa perlu menghitung pengurangan.',
  },
  {
    id: 'q9',
    difficulty: 3,
    difficultyLabel: 'Tingkat 3 · Soal Cerita Dua Langkah',
    topicTag: 'Penalaran Bertingkat',
    title: 'Rangka Pagar Sekolah',
    isStoryProblem: true,
    storyBreakdown: {
      known: 'Dua palang pagar sejajar · Kayu penyangga memotong miring · ∠A₃ = 55°.',
      relation: '∠A₂ berpelurus dengan ∠A₃ (total 180°), lalu ∠B₂ sehadap dengan ∠A₂ (atau ∠A₃ & ∠B₂ dalam sepihak).',
      asked: 'Besar sudut ∠B₂ pada palang bawah.',
    },
    prompt:
      'Sebuah pagar sekolah memiliki dua palang besi horizontal sejajar yang dipotong oleh kayu penyangga miring. Pada palang atas, besar ∠A₃ (kanan bawah) terukur 55°. Berapakah besar ∠B₂ (kanan atas pada palang bawah)?',
    diagramType: 'story-fence-two-step',
    options: [
      {
        id: 'a',
        label: '55°',
        diagnosticFeedback:
          'Perhatikan gambar baik-baik! ∠A₃ lancip (55°), sedangkan ∠B₂ berbentuk tumpul dan terletak sepihak di dalam bersama ∠A₃.',
      },
      {
        id: 'b',
        label: '35°',
        diagnosticFeedback:
          'Belum tepat. Palang atas dan palang bawah sejajar dengan jumlah sudut dalam sepihak 180°, bukan 90°.',
      },
      {
        id: 'c',
        label: '125°',
        diagnosticFeedback:
          'Hebat! Kamu bisa memakai 2 cara: lewat berpelurus ke ∠A₂ (180° − 55° = 125°) lalu sehadap ke ∠B₂, atau langsung lewat Dalam Sepihak (180° − 55° = 125°)!',
      },
      {
        id: 'd',
        label: '135°',
        diagnosticFeedback:
          'Hampir benar! Coba cek lagi pengurangan 180 − 55. (55 + 135 = 190, kelebihan 10°).',
      },
    ],
    correctOptionId: 'c',
    hints: [
      'Langkah 1: Cek posisi ∠A₃ (55°) dan sudut yang ditanya ∠B₂. Keduanya di sisi kanan di antara dua palang sejajar.',
      'Kamu boleh pakai hubungan Dalam Sepihak (jumlah 180°) atau cari ∠A₂ yang berpelurus dengan ∠A₃ lebih dulu.',
      'Hitung: 180° − 55° = ...',
    ],
    reflectionPrompt: 'Ternyata soal dua langkah bisa dicek lewat dua jalur berbeda. Mengapa hasilnya tetap sama?',
    reflectionAnswer:
      'Karena semua sifat sudut pada garis sejajar (berpelurus, sehadap, dan dalam sepihak) saling konsisten secara matematis.',
  },
  {
    id: 'q10',
    difficulty: 3,
    difficultyLabel: 'Tingkat 3 · Aljabar Sudut',
    topicTag: 'Aljabar pada Garis Lurus',
    title: 'Menemukan Nilai x pada Sudut Berpelurus',
    isStoryProblem: true,
    storyBreakdown: {
      known: 'Dua sudut menempel pada satu garis lurus · Sudut kiri = 2x° · Sudut kanan = 100°.',
      relation: 'Saling Berpelurus → Jumlah kedua sudut = 180°.',
      asked: 'Nilai x.',
    },
    prompt:
      'Dua buah sudut saling berpelurus di atas sebuah garis lurus masing-masing besarnya 2x° dan 100°. Berapakah nilai x yang memenuhi?',
    diagramType: 'algebra-berpelurus',
    options: [
      {
        id: 'a',
        label: 'x = 80',
        diagnosticFeedback:
          '80° adalah besar sudut di sebelah kiri (2x°), tetapi yang ditanya adalah nilai x-nya saja! Jangan lupa dibagi 2 ya.',
      },
      {
        id: 'b',
        label: 'x = 40',
        diagnosticFeedback:
          'Mantap sekali! 2x + 100 = 180 → 2x = 80 → x = 40.',
      },
      {
        id: 'c',
        label: 'x = 50',
        diagnosticFeedback:
          'Belum tepat. Jika x = 50, maka 2x + 100 = 100 + 100 = 200°, melebihi garis lurus 180°.',
      },
      {
        id: 'd',
        label: 'x = 45',
        diagnosticFeedback:
          'Coba uji balik: jika x = 45, maka 2(45) + 100 = 190°, bukan 180°.',
      },
    ],
    correctOptionId: 'b',
    hints: [
      'Karena kedua sudut berada di garis lurus, hubungannya adalah Berpelurus (total 180°).',
      'Tuliskan persamaannya: 2x + 100 = 180, maka 2x = 180 − 100 = 80.',
      'Jika 2x = 80, maka nilai x = 80 ÷ 2.',
    ],
    reflectionPrompt: 'Bagaimana cara membuktikan x = 40 itu benar?',
    reflectionAnswer:
      'Masukkan kembali ke sudutnya: 2(40°) = 80°. Lalu jumlahkan 80° + 100° = 180° (pas garis lurus!).',
  },
];
