"use client";

import Image from 'next/image';
import MateriCard from '@/components/materiCard';

export default function Belajar() {
    const materiList = [
        {
            id: 1,
            title: "Kaidah Ejaan dan Tanda Baca Berdasarkan PUEBI",
            thumbnail: "/materi1-thumbnail.png",
            progress: 75,
        },
        {
            id: 2,
            title: "Bahasa yang Tepat Berawal dari Diksi Baku",
            thumbnail: "/materi2-thumbnail.png",
            progress: 75,
        },
        {
            id: 3,
            title: "Menulis Jelas, Padat, dan Tepat dengan Kalimat Efektif",
            thumbnail: "/materi3-thumbnail.png",
            progress: 75,
        },
    ];

    const handleModulClick = (materiId: number) => {
        console.log(`Modul clicked for materi ${materiId}`);
        // Tambahkan navigasi atau logic di sini
    };

    const handleVideoClick = (materiId: number) => {
        console.log(`Video clicked for materi ${materiId}`);
        // Tambahkan navigasi atau logic di sini
    };

    const handleLatihanClick = (materiId: number) => {
        console.log(`Latihan clicked for materi ${materiId}`);
        // Tambahkan navigasi atau logic di sini
    };

    return (
        <div className="dashboard-page min-h-screen p-6 md:p-10 font-sans">
            <header className="flex justify-between items-center mb-8 relative z-10">
                <div>
                    <Image src="/LogoAksaraSmall.png" alt="Logo" width={128} height={32} />
                </div>

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

            <div className="max-w-5xl mx-auto bg-linear-to-tr from-[#d7b352] to-[#9db181] rounded-3xl p-6 md:p-8 mb-10 shadow-lg relative z-10 overflow-hidden">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="shrink-0">
                            <Image 
                                src="/book1.png" 
                                alt="Books" 
                                width={120} 
                                height={120}
                                className="drop-shadow-lg w-20 h-20 md:w-32 md:h-32"
                            />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 text-center">
                                Halo, Nazwan Siddqi Muttaqin
                            </h1>
                            <p className="text-sm md:text-base text-white text-center">
                                Berikut merupakan bagian <span className="font-bold">&quot;Aku Siap Belajar&quot;</span> agar kamu dapat 
                                belajar lebih banyak sesuai dengan materi yang sudah kami siapkan
                            </p>
                        </div>
                    </div>
                    <div className="shrink-0 hidden lg:block">
                        <Image 
                            src="/book2.png" 
                            alt="Notebook" 
                            width={120} 
                            height={120}
                            className="drop-shadow-lg"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {materiList.map((materi) => (
                    <MateriCard
                        key={materi.id}
                        materiNumber={materi.id}
                        title={materi.title}
                        thumbnail= "/frameMateri.png"
                        progress={materi.progress}
                        onModulClick={() => handleModulClick(materi.id)}
                        onVideoClick={() => handleVideoClick(materi.id)}
                        onLatihanClick={() => handleLatihanClick(materi.id)}
                    />
                ))}
            </div>
        </div>
    );
}
