"use client";

import ModulPage from '@/components/modulPage';

export default function Materi1Modul() {
    const materiData = {
        materiNumber: 1,
        title: "Kaidah Ejaan dan Tanda Baca Berdasarkan PUEBI",
        content: {
            sections: [
                {
                    title: "I. Pemakaian Huruf",
                    description: "Mengatur cara penulisan huruf dan penggunaannya.",
                    points: [
                        "1. Huruf Abjad: 26 huruf (A—Z).",
                        "2. Huruf Vokal: a, e, i, o, u (dengan variasi pelafalan é, è, ê).",
                        "3. Huruf Konsonan: b—z (termasuk penggunaan q dan x untuk nama ilmiah).",
                        "4. Huruf Diftong: ai, au, ei, oi.",
                        "5. Gabungan Huruf Konsonan: kh, ng, ny, sy.",
                        "6. Huruf Kapital digunakan di awal kalimat, nama diri, jabatan, agama, peristiwa sejarah, geografi, lembaga, judul, dan sapaan resmi.",
                        "7. Huruf Miring: untuk penegasan, bahasa asing, atau judul buku.",
                        "8. Huruf Tebal: untuk penekanan atau penanda bagian tulisan (judul/bab)."
                    ]
                },
                {
                    title: "II. Penulisan Kata",
                    description: "Menjelaskan cara menulis kata dasar, berimbuhan, ulang, gabungan, dan sebagainya.",
                    points: [
                        "1. Kata Dasar ditulis serangkai (contoh: pergi, belajar).",
                        "2. Kata Berimbuhan (awalan, sisipan, akhiran) ditulis menyatu (contoh: berjalan, perbaikan).",
                        "3. Bentuk Ulang menggunakan tanda hubung (contoh: anak-anak).",
                        "   Gabungan Kata ditulis terpisah kecuali sudah padu (contoh: orang tua, acapkali).",
                        "4. Pemenggalan Kata mengikuti aturan vokal-konsonan dan tidak boleh menyisakan satu huruf di akhir baris.",
                        "5. Kata Depan (di, ke, dari) ditulis terpisah, bukan serangkai."
                    ]
                }
            ]
        }
    };

    return <ModulPage {...materiData} />;
}
