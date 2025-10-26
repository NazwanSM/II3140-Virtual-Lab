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
                        "5. Kata Depan (di, ke, dari) ditulis terpisah, bukan serangkai.",
                        "6. Partikel: ",
                        "   - 'lah', 'kah', 'tah' ditulis serangkai (contoh: marilah, siapakah).",
                        "   - 'ku', 'mu', 'nya' ditulis serangkai (contoh: bukuku, rumahmu).",
                        "   - 'pun' ditulis terpisah kecuali kata penghubung(contoh: meskipun).",
                        "7. Singkatan dan Akronim:",
                        "   - Nama diri : ditulis dengan huruf kapital tanpa titik (contoh: Soekarno, RI).",
                        "   - Gelar dan Jabatan : ditulis dengan huruf kapital di awal dan titik di akhir (contoh: Dr., Prof.).",
                        "8. Angka dan Bilangan: ",
                        "   - Angka 1-2 kata ditulis dengan huruf (contoh: satu, dua).",
                        "   - Angka 3 ke atas ditulis dengan angka (contoh: 10, 25).",
                        "   - Angka besar bisa digabung huruf agar mudah dibaca (contoh: 1 juta, 5 miliar).",
                        "9. Kata Ganti (ku, mu, nya) ditulis serangkai dengan kata yang digantikan.",
                        "10. Kata Sandang (si, sang) ditulis terpisah kecuali untuk Tuhan (Sang Pencipta)."
                    ]
                },
                {
                    title: "III. Pemakaian Tanda Baca",
                    description: "Menjelaskan fungsi dan penggunaan tanda baca:",
                    points: [
                        "1. Titik (.) untuk mengakhiri kalimat pernyataan, singkatan, dan angka desimal.",
                        "2. Koma (,) untuk memisahkan unsur dalam kalimat, anak kalimat, dan keterangan.",
                        "3. Tanda Tanya (?) untuk mengakhiri kalimat tanya.",
                        "4. Tanda Seru (!) untuk mengakhiri kalimat perintah, seruan, atau keheranan.",
                        "5. Titik Dua (:) untuk memperkenalkan daftar, kutipan, atau penjelasan.",
                        "6. Titik Tiga (...) untuk menunjukkan penghilangan kata atau jeda.",
                        "7. Tanda Hubung (-) untuk menghubungkan kata ulang, pemenggalan kata, dan rentang angka.",
                        "8. Garis Miring (/) untuk menunjukkan pilihan atau pembagian baris puisi.",
                        "9. Tanda Kurung (()) untuk menyisipkan keterangan tambahan.",
                        "10. Tanda Petik (“”) untuk mengapit kutipan langsung, judul karya, atau penekanan.",
                        "11. Titik Koma (;) untuk memisahkan bagian dalam kalimat yang sudah mengandung koma.",
                        "12. Tanda Pisah (—) untuk menandai jeda lebih kuat atau sisipan dalam kalimat.",
                        "13. Petik Tunggal (‘’) untuk mengapit kutipan dalam kutipan.",
                        "14. Apostrof (’) untuk menunjukkan penghilangan huruf atau kepemilikan."
                    ]
                },
                {
                    title: "IV. Penulisan Unsur Serapan",
                    description: "Mengatur cara penulisan kata serapan dari bahasa asing.",
                    points: [
                        "1. Unsur serapan dari bahasa asing atau daerah disesuaikan dengan kaidah fonologis dan ejaan Indonesia.",
                        "   Contoh: accident → aksiden, effect → efek, psychology → psikologi. ",
                        "2. Prinsip utama: disesuaikan dengan lafal Indonesia tanpa mengubah makna."
                    ]
                }
            ]
        }
    };

    return <ModulPage {...materiData} />;
}
