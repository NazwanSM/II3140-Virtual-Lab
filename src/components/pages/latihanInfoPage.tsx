'use client';

import { ArrowLeft} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface Profile {
    full_name: string | null;
    tinta: number;
}

interface QuizInfoPageProps {
    moduleId: string;
    moduleTitle: string;
    difficulty: string;
    totalQuestions: number;
    lastCorrect: number;
    lastWrong: number;
    profile: Profile;
}

export default function QuizInfoPage({
    moduleId,
    moduleTitle,
    difficulty,
    totalQuestions,
    lastCorrect,
    lastWrong,
    profile
}: QuizInfoPageProps) {
    const router = useRouter();

    const difficultyColors = {
        mudah: 'from-[#66BB6A] to-[#43A047]',
        sedang: 'from-[#FFA726] to-[#FB8C00]',
        sulit: 'from-[#E57373] to-[#C62828]'
    };

    const bgColor = difficultyColors[difficulty as keyof typeof difficultyColors] || difficultyColors.mudah;

    return (
        <div className="dashboard-page p-6 md:p-10 font-sans" >
            <header className="flex justify-between items-center mb-8 relative z-10 mx-auto">
                <div className="flex items-center gap-4 md:gap-6">
                    <button onClick={() => router.push("/dashboard")} className="cursor-pointer hover:opacity-90 transition-opacity">
                        <Image src="/LogoAksaraSmall.png" alt="Logo" width={128} height={32} />
                    </button>
                    <div className="text-left">
                        <p className="text-base md:text-lg">
                            <span className="text-gray-600 italic">Halo, </span>
                            <button onClick={() => router.push("/profile")} className="font-bold text-gray-900 hover:underline">
                                {profile?.full_name || 'Aksara Learner'}
                            </button>
                        </p>
                        <div className="bg-[#d4af378a] rounded-full px-4 py-1 flex items-center gap-2 shadow-md">
                            <Image src="/bulu.png" alt="tinta" width={20} height={20} />
                            <span className="text-sm font-bold text-white">{profile?.tinta || 0} tinta</span>
                        </div>
                    </div>
                </div>
                <div className="shrink-0">
                    <button className="cursor-pointer hover:scale-105 transition-transform">
                        <Image src="/plusButton.png" alt="Tambah" width={56} height={56} />
                    </button>
                </div>
            </header>

            <div className="max-w-5xl mx-auto space-y-6">
                <div className={`bg-linear-to-r ${bgColor} rounded-3xl border-4 border-gray-800 p-4 flex items-center gap-4 shadow-lg relative z-50`}>
                    <button 
                        onClick={() => router.back()}
                        className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={28} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold text-white flex-1 text-center pr-12 relative z-50">
                        {moduleTitle}
                    </h1>
                </div>

                <div className="bg-white border-4 border-gray-800 rounded-3xl p-8 md:p-12 shadow-xl relative z-10">
                    <div className="max-w-2xl mx-auto space-y-6">
                        <div className="flex justify-center">
                            <div className="bg-[#fff9e7] border-3 border-gray-800 rounded-2xl px-8 py-4 shadow-md">
                                <p className="text-center text-base md:text-lg">
                                    <span className="font-normal text-black">Tipe Soal : </span>
                                    <span className="font-bold text-black capitalize">{difficulty}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="bg-[#fff9e7] border-3 border-gray-800 rounded-2xl px-8 py-4 shadow-md">
                                <p className="text-center text-base md:text-lg">
                                    <span className="font-normal text-black">Jumlah : </span>
                                    <span className="font-bold text-black">{totalQuestions} Soal</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <div className="bg-[#edf4fe] border-3 border-gray-800 rounded-2xl px-8 py-4 shadow-md flex-1 max-w-xs">
                                <p className="text-center text-base md:text-lg">
                                    <span className="font-normal text-black">Benar : </span>
                                    <span className="font-bold text-black">{lastCorrect} Soal</span>
                                </p>
                            </div>
                            <div className="bg-[#FFEBEE] border-3 border-gray-800 rounded-2xl px-8 py-4 shadow-md flex-1 max-w-xs">
                                <p className="text-center text-base md:text-lg">
                                    <span className="font-normal text-black">Salah : </span>
                                    <span className="font-bold text-black">{lastWrong} Soal</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex justify-center pt-4">
                            <button 
                                onClick={() => router.push(`/latihan/${moduleId}/${difficulty}/kerjakan`)}
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
