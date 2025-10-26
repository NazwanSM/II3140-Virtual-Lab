"use client";

import ModulPage from "@/components/modulPage";

export default function Materi3Modul() {
  const materiData = {
    materiNumber: 3,
    title: "Menulis Jelas, Padat, dan Tepat dengan Kalimat Efektif",
    content: {
      sections: [
        {
          type: "points" as const,
          title: "1. Pengertian Kalimat Efektif",
          description:
            "Kalimat efektif adalah kalimat yang mampu menyampaikan gagasan atau pesan secara tepat, sehingga pembaca atau pendengar memahami makna yang sama dengan maksud penulis atau pembicara. Menurut Razak (1988), Keraf (1993), Badudu (1991), dan Natawidjaja (1986), kalimat efektif mencakup beberapa aspek berikut:",
          points: [
            "   • Kesesuaian struktur dengan kaidah tata bahasa Indonesia.",
            "   • Kemampuan membangkitkan gagasan yang sama dalam pikiran pembaca atau pendengar.",
            "   • Ketepatan dan kejelasan dalam mengungkapkan isi pikiran atau perasaan.",
            "",
          ],
        },
        {
          type: "points" as const,
          title: "2. Tujuan dan Fungsi Kalimat Efektif",
          description: "Agar komunikasi berlangsung efisien dan jelas.",
          points: [
            "• Menyampaikan gagasan dengan tepat dan tanpa tafsir ganda.",
            "• Memperlihatkan kemampuan berpikir logis dan sistematis.",
            "• Menunjukkan penguasaan bahasa yang baik dan benar dalam komunikasi tulis maupun lisan.",
          ],
        },
        {
          type: "points" as const,
          title: "3. Ciri-Ciri Kalimat Efektif",
          description:
            "Berdasarkan pedoman dari Pusat Pembinaan dan Pengembangan Bahasa, kalimat efektif memiliki ciri-ciri berikut.",
          points: [
            "a. **Keutuhan (Kesatuan Gagasan)** — Kalimat harus memiliki subjek (S) dan predikat (P) yang jelas dan saling berkaitan.",
            "   Efektif: Siswa belajar di kelas.",
            "   Tidak efektif: Di kelas sedang belajar.",
            "",
            "b. **Kepaduan (Koherensi)** — Unsur kalimat harus tersusun logis dan gramatikal.",
            "   Efektif: Karena hujan, kami tidak berangkat.",
            "   Tidak efektif: Karena hujan, maka kami tidak berangkat.",
            "",
            "c. **Ketepatan** — Pilihan kata (diksi) tepat dan tidak menimbulkan makna ganda.",
            "   Efektif: Dia menaiki rumah panggung itu.",
            "   Tidak efektif: Dia naik ke atas rumah panggung itu.",
            "",
            "d. **Kehematan** — Hindari pengulangan atau kata tidak perlu.",
            "   Efektif: Para siswa mengikuti lomba.",
            "   Tidak efektif: Para siswa-siswa mengikuti lomba.",
            "",
            "e. **Kesejajaran (Paralelisme)** — Bentuk kata dalam perincian harus seragam.",
            "   Efektif: Dia rajin, disiplin, dan bertanggung jawab.",
            "   Tidak efektif: Dia rajin, disiplin, dan tanggung jawab.",
            "",
            "f. **Kelogisan** — Kalimat dapat diterima akal sehat.",
            "   Efektif: Mahasiswa itu rajin meneliti di laboratorium.",
            "   Tidak efektif: Laboratorium meneliti mahasiswa yang rajin.",
            "",
            "g. **Ketegasan (Penekanan Gagasan)** — Bagian penting diberi penekanan (urutan, posisi, partikel -lah, pun).",
            "   Contoh: Merekalah yang membantu kami saat itu.",
          ],
        },
        {
          type: "points" as const,
          title: "4. Kesalahan Umum dalam Kalimat Tidak Efektif",
          points: [
            "• Tidak memiliki subjek atau predikat yang jelas.",
            "  Contoh: Sedang bekerja di kantor.",
            "• Penggunaan kata depan yang salah.",
            "  Salah: Di Bandung akan mengadakan seminar.",
            "  Benar: Pemerintah akan mengadakan seminar di Bandung.",
            "• Subjek atau predikat ganda.",
            "  Contoh: Kami semua mereka hadir di rapat itu.",
            "• Pengulangan makna.",
            "  Contoh: Agar supaya semua paham. → Agar semua paham.",
            "• Urutan kata tidak logis atau ambigu.",
            "  Contoh: Rumah sang jutawan yang aneh itu akan dijual. (tidak jelas yang aneh rumah atau jutawan)",
          ],
        },
        {
          type: "table" as const,
          title: "5. Contoh Kalimat Efektif dan Tidak Efektif",
          description: "Perhatikan perbandingan berikut.",
          table: {
            headers: ["Tidak Efektif", "Efektif"],
            rows: [
              ["Para siswa-siswa mengikuti lomba.", "Para siswa mengikuti lomba."],
              [
                "Karena ayah libur, maka kami pergi ke pasar.",
                "Karena ayah libur, kami pergi ke pasar.",
              ],
              [
                "Di ruang itu sedang dilaksanakan ujian.",
                "Ujian sedang dilaksanakan di ruang itu.",
              ],
              ["Adalah merupakan kewajiban kita.", "Merupakan kewajiban kita."],
              [
                "Tahun ini SPP mahasiswa baru saja dinaikkan.",
                "Tahun ini SPP mahasiswa-baru saja yang dinaikkan.",
              ],
            ],
          },
        },
      ],
    },
  };

  return <ModulPage {...materiData} />;
}
