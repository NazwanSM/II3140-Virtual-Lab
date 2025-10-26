"use client";

import ModulPage, { type TableSection, type PointsSection } from "@/components/modulPage";

export default function Materi2Modul() {
  const materiData: { materiNumber: number; title: string; content: { sections: (TableSection | PointsSection)[] } } = {
    materiNumber: 2,
    title: "Kata Baku dan Tidak Baku",
    content: {
      sections: [
        {
          type: "points",
          title: "Pengertian Kata Baku",
          description:
            "Kata baku adalah kata yang penulisan dan penggunaannya sesuai dengan kaidah Bahasa Indonesia (KBBI dan PUEBI) serta dipakai pada konteks resmi.",
          points: [
            "Kata baku mengikuti kaidah KBBI dan PUEBI.",
            "Dipakai pada: dokumen pemerintahan & surat resmi; karya ilmiah & laporan akademik; pidato, seminar, komunikasi profesional; buku pelajaran, berita, atau artikel formal.",
          ],
        },
        {
          type: "points",
          title: "Pengertian Kata Tidak Baku",
          description:
            "Kata tidak baku menyimpang dari aturan baku (penulisan/pelafalan). Umumnya muncul pada konteks non-formal.",
          points: [
            "Sering muncul dalam: percakapan sehari-hari; media sosial; karya sastra atau konteks non-formal.",
            "Tidak disarankan dipakai pada situasi resmi karena menurunkan kredibilitas dan kejelasan makna.",
          ],
        },
        {
          type: "points",
          title: "Faktor Penyebab Munculnya Kata Tidak Baku",
          description: "Beberapa penyebab umum munculnya bentuk tidak baku.",
          points: [
            "1) Pengaruh dialek daerah → perbedaan pengucapan memicu variasi ejaan (contoh: atlit → atlet).",
            "2) Kurangnya pemahaman kaidah bahasa (PUEBI & KBBI) → salah tulis tanpa disadari.",
            "3) Pengaruh media sosial & gaya bahasa informal (ngga, trus, bgt).",
            "4) Kesalahan pengucapan yang terulang → terbiasa lalu dianggap benar (apotik → apotek).",
          ],
        },
        {
          type: "table",
          title: "Contoh Kata Baku dan Tidak Baku",
          description:
            "Berikut perbandingan kata baku dan tidak baku seperti pada tabel di bawah.",
          table: {
            headers: ["Kata Baku", "Kata Tidak Baku"],
            rows: [
              ["Risiko", "Resiko"],
              ["Aktivitas", "Aktifitas"],
              ["Atlet", "Atlit"],
              ["Apotek", "Apotik"],
              ["Kualitas", "Kwalitas"],
              ["Februari", "Pebruari"],
              ["Analisis", "Analisa"],
              ["Antena", "Antene"],
              ["Cenderamata", "Cinderamata"],
              ["Hemat", "Irit (tidak setara makna)"],
            ],
          },
        },
        {
          type: "points",
          title: "Pentingnya Penggunaan Kata Baku",
          description:
            "Alasan kenapa penulisan baku perlu dibiasakan, terutama di ranah resmi.",
          points: [
            "1) Meningkatkan kredibilitas & keseriusan (lamaran kerja, laporan, karya ilmiah).",
            "2) Menjaga kejelasan & ketepatan makna (mengurangi salah paham).",
            "3) Mencerminkan pendidikan & profesionalisme.",
            "4) Melestarikan Bahasa Indonesia sebagai identitas nasional.",
          ],
        },
        {
          type: "points",
          title: "Cara Membiasakan Penggunaan Kata Baku",
          description:
            "Langkah praktis agar konsisten menulis sesuai kaidah bahasa.",
          points: [
            "1) Mempelajari & menggunakan KBBI (termasuk versi daring).",
            "2) Berlatih menulis dalam bahasa formal (surat, artikel, laporan).",
            "3) Mengamati bahasa di media resmi (berita, dokumen pemerintah, tulisan akademik).",
            "4) Membaca buku sastra & nonfiksi berkualitas untuk memperkaya kosakata.",
            "5) Mengoreksi kesalahan sehari-hari secara bertahap hingga terbiasa.",
          ],
        },
      ],
    },
  };

  return <ModulPage {...materiData} />;
}
