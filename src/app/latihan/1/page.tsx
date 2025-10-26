"use client";

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function InfoSoalLatihan1() {
    const router = useRouter();
    const [lastCorrect, setLastCorrect] = useState<number | null>(null);
    const [lastWrong, setLastWrong] = useState<number | null>(null);

    useEffect(() => {
        // load last result from localStorage
        try {
            const raw = localStorage.getItem('latihan-1-last-result');
            if (raw) {
                const parsed = JSON.parse(raw);
                setLastCorrect(typeof parsed.correct === 'number' ? parsed.correct : 0);
                setLastWrong(typeof parsed.wrong === 'number' ? parsed.wrong : 0);
            } else {
                setLastCorrect(0);
                setLastWrong(0);
            }
        } catch (e) {
            setLastCorrect(0);
            setLastWrong(0);
        }
    }, []);

    const displayCorrect = lastCorrect ?? 0;
    const displayWrong = lastWrong ?? 0;

    return (
        <div className="dashboard-page min-h-screen p-6 md:p-10 font-sans">
            <header className="flex justify-between items-center mb-8 relative z-50 bg-white/5 backdrop-blur-sm">
                <button onClick={() => router.push("/dashboard")} className="cursor-pointer relative z-50">
                    <Image src="/LogoAksaraSmall.png" alt="Logo" width={128} height={32} priority />
                </button>
        
                <div className="flex items-center gap-4 relative z-50">
                    <div className="bg-[#d4af3771] rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                        <Image src="/bulu.png" alt="coin" width={20} height={20} priority />
                        <span className="text-sm font-bold text-white">211.000</span>
                        <span className="text-xs text-white">Koin</span>
                    </div>
                    <button className="mr-8 cursor-pointer hover:scale-105 transition-transform">
                        <Image src="/plusButton.png" alt="Tambah" width={60} height={60} priority />
                    </button>
                </div>
            </header>

            <div className="max-w-5xl mx-auto space-y-6">
                <div className="bg-linear-to-r from-[#E57373] to-[#C62828] rounded-3xl border-4 border-gray-800 p-4 flex items-center gap-4 shadow-lg relative z-50">
                    <button 
                        onClick={() => router.back()}
                        className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={28} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold text-white flex-1 text-center pr-12 relative z-50">
                        Kaidah Ejaan dan Tanda Baca Berdasarkan PUEBI
                    </h1>
                </div>

                <div className="bg-white border-4 border-gray-800 rounded-3xl p-8 md:p-12 shadow-xl relative z-10">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="flex justify-center">
                            <div className="bg-[#fff9e7] border-3 border-gray-800 rounded-2xl px-8 py-4 shadow-md">
                                <p className="text-center text-base md:text-lg">
                                    <span className="font-normal text-black">Tipe Soal : </span>
                                    <span className="font-bold text-black">Mudah</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="bg-[#fff9e7] border-3 border-gray-800 rounded-2xl px-8 py-4 shadow-md">
                                <p className="text-center text-base md:text-lg">
                                    <span className="font-normal text-black">Jumlah : </span>
                                    <span className="font-bold text-black">10 Soal</span>
                                </p>
                            </div>
                        </div>

                        {/* Benar dan Salah */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <div className="bg-[#edf4fe] border-3 border-gray-800 rounded-2xl px-8 py-4 shadow-md flex-1 max-w-xs">
                                <p className="text-center text-base md:text-lg">
                                    <span className="font-normal text-black">Benar : </span>
                                    <span className="font-bold text-black">{displayCorrect} Soal</span>
                                </p>
                            </div>
                            <div className="bg-[#FFEBEE] border-3 border-gray-800 rounded-2xl px-8 py-4 shadow-md flex-1 max-w-xs">
                                <p className="text-center text-base md:text-lg">
                                    <span className="font-normal text-black">Salah : </span>
                                    <span className="font-bold text-black">{displayWrong} Soal</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center pt-4">
                            <button 
                                onClick={() => router.push(`/latihan/1/kerjakan`)}
                                className="transition-all hover:scale-105 cursor-pointer"
                            >
                                <Image src="/button-kerjakan.png" alt="Kerjakan" width={180} height={180} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
