"use client";

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function KerjakanLatihan1() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<(string | null)[]>(Array(10).fill(null));

    const questions = [
        {
            question: "Huruf kapital digunakan pada awal ....",
            options: [
                "setiap kata",
                "setiap kalimat",
                "setiap baris",
                "kata yang panjang"
            ],
            correctAnswer: "B"
        },
        {
            question: "Tanda baca yang tepat untuk melengkapi kalimat 'Dia membeli buku__ pensil__ dan penggaris' adalah...",
            options: [
                "koma, koma",
                "titik koma, koma",
                "koma, titik koma",
                "titik, koma"
            ],
            correctAnswer: "A"
        },
        {
            question: "Penulisan huruf kapital yang benar adalah...",
            options: [
                "hari minggu",
                "Hari Minggu",
                "hari Minggu",
                "HARI MINGGU"
            ],
            correctAnswer: "C"
        },
        {
            question: "Tanda baca titik digunakan pada akhir....",
            options: [
                "kalimat tanya",
                "kalimat seru",
                "kalimat berita",
                "kalimat perintah"
            ],
            correctAnswer: "C"
        },
        {
            question: "Penulisan singkatan yang benar adalah...",
            options: [
                "Dr",
                "Dr.",
                "dr",
                "DR"
            ],
            correctAnswer: "B"
        },
        {
            question: "Kata depan 'di' ditulis terpisah jika berfungsi sebagai...",
            options: [
                "awalan",
                "imbuhan",
                "kata depan",
                "akhiran"
            ],
            correctAnswer: "C"
        },
        {
            question: "Tanda koma digunakan untuk memisahkan...",
            options: [
                "kalimat majemuk",
                "anak kalimat",
                "unsur dalam perincian",
                "semua benar"
            ],
            correctAnswer: "D"
        },
        {
            question: "Penulisan angka yang benar dalam kalimat adalah...",
            options: [
                "3 orang siswa",
                "tiga orang siswa",
                "III orang siswa",
                "ke-3 orang siswa"
            ],
            correctAnswer: "B"
        },
        {
            question: "Huruf miring digunakan untuk menuliskan...",
            options: [
                "nama orang",
                "kata asing",
                "nama tempat",
                "kata sifat"
            ],
            correctAnswer: "B"
        },
        {
            question: "Tanda hubung (-) digunakan untuk...",
            options: [
                "menyambung kata ulang",
                "memisahkan suku kata",
                "menyambung unsur kata",
                "semua benar"
            ],
            correctAnswer: "D"
        }
    ];

    const handleAnswerSelect = (questionIndex: number, answer: string) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answer;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        const correctCount = answers.filter((answer, index) => 
            answer === questions[index]?.correctAnswer
        ).length;
        
        alert(`Anda menjawab ${correctCount} dari ${questions.length} soal dengan benar!`);
        router.push('/latihan/1');
    };

    return (
        <div className="dashboard-page min-h-screen p-6 md:p-10 font-sans">
            <header className="flex justify-between items-center mb-8 relative z-10">
                <button onClick={() => router.push("/dashboard")} className="cursor-pointer">
                    <Image src="/LogoAksaraSmall.png" alt="Logo" width={128} height={32} />
                </button>
        
                <div className="flex items-center gap-4">
                    <div className="bg-[#d4af3771] rounded-full px-4 py-2 flex items-center gap-2">
                        <Image src="/bulu.png" alt="coin" width={20} height={20} />
                        <span className="text-sm font-bold text-white">211.000</span>
                        <span className="text-xs text-white">Koin</span>
                    </div>
                    <button className="mr-8 cursor-pointer">
                        <Image src="/plusButton.png" alt="Tambah" width={60} height={60} />
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-linear-to-r from-[#E57373] to-[#C62828] rounded-3xl border-4 border-gray-800 p-4 flex items-center gap-4 shadow-lg">
                    <button 
                        onClick={() => router.back()}
                        className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors cursor-pointer z-10"
                    >
                        <ArrowLeft size={28} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold text-white flex-1 text-center pr-12">
                        Kaidah Ejaan dan Tanda Baca Berdasarkan PUEBI
                    </h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white border-4 border-gray-800 rounded-3xl p-8 shadow-xl">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Soal</h2>
                            <p className="text-lg text-gray-800 mb-8">
                                {questions[currentQuestion]?.question || "Soal tidak tersedia"}
                            </p>

                            <div className="space-y-3">
                                {questions[currentQuestion]?.options.map((option, index) => {
                                    const optionLetters = ['A', 'B', 'C', 'D'];
                                    const optionLetter = optionLetters[index];
                                    const isSelected = answers[currentQuestion] === optionLetter;
                                    
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswerSelect(currentQuestion, optionLetter)}
                                            className={`w-full text-left p-4 rounded-2xl border-4 border-gray-800 transition-all cursor-pointer flex items-center gap-3 ${
                                                isSelected 
                                                    ? 'bg-[#E3F2FD] shadow-lg' 
                                                    : 'bg-[#FFF9E6] hover:bg-[#FFF3CD]'
                                            }`}
                                        >
                                            <div className={`w-12 h-12 rounded-xl border-3 border-gray-800 flex items-center justify-center font-bold text-lg ${
                                                isSelected ? 'bg-[#2196F3] text-white' : 'bg-white text-gray-800'
                                            }`}>
                                                {optionLetter}
                                            </div>
                                            <span className="text-base flex-1">{option}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex justify-between items-center gap-4">
                            <button
                                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                disabled={currentQuestion === 0}
                                className={`px-8 py-3 rounded-2xl border-4 border-gray-800 font-bold text-lg transition-all ${
                                    currentQuestion === 0
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-linear-to-r from-[#5C6BC0] to-[#3949AB] text-white hover:from-[#4A5AB8] hover:to-[#2838A0] cursor-pointer hover:scale-105'
                                }`}
                            >
                                Sebelumnya
                            </button>

                            <button
                                onClick={() => {
                                    if (currentQuestion === questions.length - 1) {
                                        handleSubmit();
                                    } else {
                                        setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1));
                                    }
                                }}
                                className="px-8 py-3 bg-linear-to-r from-[#5C6BC0] to-[#3949AB] hover:from-[#4A5AB8] hover:to-[#2838A0] border-4 border-gray-800 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105 cursor-pointer"
                            >
                                {currentQuestion === questions.length - 1 ? 'Selesai' : 'Selanjutnya'}
                            </button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white border-4 border-gray-800 rounded-3xl p-6 shadow-xl">
                            <h2 className="text-2xl font-bold text-[#3949AB] text-center mb-6">
                                Soal {currentQuestion + 1}
                            </h2>
                            
                            <div className="mb-6">
                                <div className="bg-[#E8EAF6] border-3 border-gray-800 rounded-2xl px-6 py-3">
                                    <p className="text-center text-base">
                                        <span className="font-normal">Tipe Soal : </span>
                                        <span className="font-bold">Mudah</span>
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3 mb-6">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => setCurrentQuestion(num - 1)}
                                        className={`aspect-square rounded-xl border-3 border-gray-800 font-bold text-lg transition-all cursor-pointer ${
                                            currentQuestion === num - 1
                                                ? 'bg-[#2196F3] text-white shadow-lg scale-105'
                                                : answers[num - 1] !== null
                                                ? 'bg-[#66BB6A] text-white hover:bg-[#57A95B]'
                                                : 'bg-white text-gray-800 hover:bg-gray-100'
                                        }`}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
