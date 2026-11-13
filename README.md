# SudutKita — Belajar Garis & Sudut SMP

Aplikasi web edukasi matematika interaktif untuk materi **Garis dan Sudut tingkat SMP (Kelas VII)** yang dirancang berdasarkan hasil wawancara analisis kebutuhan dan kesulitan belajar siswa menggunakan kerangka **ADDIE** (*Analysis, Design, Development, Implementation, Evaluation*) serta **Cognitive Load Theory**.

**Pengembang:** Muhamad Nurul Bayan

---

## Latar Belakang & Pemetaan Masalah Belajar

Berdasarkan hasil wawancara mendalam dengan siswa SMP (kode informan `S07`), ditemukan tiga sumber beban kognitif yang diterjemahkan langsung menjadi solusi fitur di dalam aplikasi:

| Dimensi Beban Kognitif | Temuan Kesulitan Siswa di Lapangan | Solusi Fitur di SudutKita |
| :--- | :--- | :--- |
| **Intrinsic Load** | Sering tertukar membedakan sudut **berpenyiku** ($90^\circ$), **berpelurus** ($180^\circ$), dan **bertolak belakang**; serta bingung membedakan sudut **sehadap**, **dalam berseberangan**, dan **dalam sepihak** pada dua garis sejajar. | Pemisahan materi dalam 4 tahap terstruktur, trik ingat cepat anti-tertukar, serta lab interaktif dengan kode warna kontras (**Biru** & **Oranye**) untuk setiap pasangan sudut. |
| **Extraneous Load** | Gambar tanpa label sudut membingungkan, penjelasan terlalu cepat, warna/animasi berlebihan memecah fokus, dan kesulitan menangkap informasi inti dari soal cerita panjang. | Diagram SVG berlabel jelas ($\angle A_1 \dots B_4$), tampilan bersih bebas distraksi, **Penyelesai Contoh Soal Bertahap** yang kecepatannya diatur siswa sendiri, serta tombol **Sorot Info Penting** pada soal cerita. |
| **Germane Load** | Siswa terbantu ketika ada visualisasi berwarna, petunjuk saat melakukan kesalahan, dan pengecekan apakah jawaban masuk akal. | **Latihan Mandiri Bertingkat (10 Soal)** dengan **Petunjuk Bertahap 3 Tingkat (*Fading Hints*)**, umpan balik diagnostik pada setiap pilihan salah, serta bagian **Cek Masuk Akal (Refleksi)**. |

---

## Fitur Utama

1. **Login Identitas Siswa**
   - Meminta **Nama Lengkap**, **Kelas**, dan **Asal Sekolah** di awal akses.
   - Data profil dan progres belajar tersimpan otomatis di `localStorage` peramban.
2. **Tahap 1 — Dasar Garis & Lab Busur Derajat Virtual**
   - Eksplorasi interaktif perbedaan *Titik, Ruas Garis, Sinar Garis, Garis Lurus*, serta kedudukan dua garis (*Sejajar, Berpotongan, Tegak Lurus, Berimpit*).
   - Busur derajat virtual untuk melatih pengukuran dan klasifikasi sudut (*Lancip, Siku-Siku, Tumpul, Lurus, Refleks*).
3. **Tahap 2 — Lab Hubungan 2 Sudut Dasar**
   - Slider sudut interaktif dengan perhitungan otomatis untuk membandingkan **Berpenyiku ($90^\circ$)**, **Berpelurus ($180^\circ$)**, dan **Bertolak Belakang (sama besar)**.
4. **Tahap 3 — Lab 8 Sudut Garis Sejajar & Contoh Soal Bertahap**
   - Eksplorasi interaktif 5 pasangan sudut (*Sehadap, Dalam Berseberangan, Luar Berseberangan, Dalam Sepihak, Luar Sepihak*), slider kemiringan garis transversal, serta sorotan area dalam/luar.
   - Contoh soal *step-by-step* termasuk soal pemicu wawancara ($112^\circ$ dalam sepihak $\rightarrow 68^\circ$).
5. **Tahap 4 — Latihan Mandiri Bertingkat**
   - 10 soal terbagi dalam 3 tingkat kesulitan:
     - **Tingkat 1:** Identifikasi posisi & nama pasangan sudut.
     - **Tingkat 2:** Perhitungan sudut berpenyiku, berpelurus, bertolak belakang, dan dalam sepihak.
     - **Tingkat 3:** Soal cerita kontekstual (dengan fitur *Sorot Info Penting*) dan aljabar sudut ringan.
6. **Rapor Belajar & Kamus Cepat Anti-Tertukar**
   - Ringkasan skor latihan, daftar tahap yang sudah selesai, tombol ulangi progres/ganti siswa, serta tabel ringkasan perbandingan sifat sudut.

---

## Teknologi yang Digunakan

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4, Lucide Icons
- **Mobile Wrapper (APK):** Capacitor (`@capacitor/core`, `@capacitor/cli`, `@capacitor/android`)
- **CI/CD Build APK:** GitHub Actions

---

## Cara Menjalankan di Komputer Lokal

Pastikan **Node.js versi 22+** sudah terpasang di komputer Anda.

```bash
# 1. Pasang seluruh dependensi
npm install

# 2. Jalankan server pengembangan (mode dev)
npm run dev

# 3. Cek tipe TypeScript
npm run lint

# 4. Build versi produksi (menghasilkan folder dist/)
npm run build
```

Aplikasi akan berjalan di `http://localhost:3000`.

---

## Cara Build APK Android lewat GitHub Actions

Proyek ini sudah dilengkapi konfigurasi `capacitor.config.ts` dan workflow `.github/workflows/build-android-apk.yml` untuk mengompilasi aplikasi menjadi file `.apk` secara otomatis di GitHub:

1. Unggah (*push*) seluruh proyek ini ke repositori GitHub Anda (termasuk folder `.github`).
2. Buka tab **Actions** pada repositori GitHub Anda dan tunggu workflow **Build Android APK** selesai dijalankan.
3. Unduh file `SudutKita-Garis-dan-Sudut.apk` pada bagian **Artifacts**.
4. *(Opsional)* Untuk membuat halaman **Releases** dengan tautan unduhan publik, buat dan dorong tag versi:
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```
   GitHub Actions akan otomatis melampirkan file `.apk` di menu **Releases**.

---

## Lisensi & Kredit

Dikembangkan oleh **Muhamad Nurul Bayan** sebagai bagian dari pengembangan media pembelajaran matematika SMP berbasis analisis beban kognitif (*Cognitive Load Theory*) dan model **ADDIE**.
