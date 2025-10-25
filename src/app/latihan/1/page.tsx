"use client";

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function InfoSoalLatihan1() {
    const router = useRouter();

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

            <div className="max-w-5xl mx-auto space-y-6">
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
                                    <span className="font-bold text-black">10 Soal</span>
                                </p>
                            </div>
                            <div className="bg-[#FFEBEE] border-3 border-gray-800 rounded-2xl px-8 py-4 shadow-md flex-1 max-w-xs">
                                <p className="text-center text-base md:text-lg">
                                    <span className="font-normal text-black">Salah : </span>
                                    <span className="font-bold text-black">0 Soal</span>
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
