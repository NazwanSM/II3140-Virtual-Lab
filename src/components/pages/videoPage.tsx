"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft} from 'lucide-react';

interface Profile {
    full_name: string | null;
    tinta: number;
}

interface VideoPageProps {
    materiId: string;
    title: string;
    videoUrl: string;
    videoTitle: string;
    profile?: Profile;
}

export default function VideoPage({ materiId, title, videoUrl, videoTitle, profile }: VideoPageProps) {
    const router = useRouter();

    return (
        <div className="dashboard-page p-6 md:p-10 font-sans" >
            <header className="flex justify-between items-center mb-8 relative z-10 mx-auto">
                <div className="flex items-center gap-4 md:gap-6">
                    <button onClick={() => router.push("/dashboard")} className="cursor-pointer hover:opacity-90 transition-opacity">
                        <Image src="/LogoAksaraSmall.png" alt="Logo" width={128} height={32} />
                    </button>
                    <div className="text-left">
                        <p className="text-base md:text-lg">
                            <span className="text-gray-600">Halo, </span>
                            <button onClick={() => router.push("/profile")} className="font-bold text-gray-900 hover:underline cursor-pointer">
                                {profile?.full_name || 'Aksara Learner'}
                            </button>
                        </p>
                        <div className="bg-[#d4af378a] rounded-full px-4 py-0 flex items-center gap-2 shadow-md">
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

            <div className="max-w-5xl mx-auto space-y-6 relative z-10">
                <div className="bg-linear-to-r from-[#E57373] to-[#C62828] border-4 border-gray-800 rounded-4xl p-4 flex items-center gap-4 shadow-lg relative z-30">
                    <button 
                        onClick={() => router.back()}
                        className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={28} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold text-white flex-1 text-center pr-12">
                        {title}
                    </h1>
                </div>

                <div className="bg-white border-4 border-gray-800 rounded-4xl p-8 shadow-xl relative z-10">
                    <div className="bg-linear-to-r from-[#A8D08D] to-[#70AD47] border-4 border-gray-800 rounded-4xl p-4 mb-6 text-center">
                        <h2 className="text-xl md:text-2xl font-bold text-white">
                            {videoTitle}
                        </h2>
                    </div>

                    <div className="relative w-full aspect-video bg-gray-900 rounded-4xl overflow-hidden shadow-lg">
                        {videoUrl ? (
                            <iframe
                                src={videoUrl}
                                title={videoTitle}
                                className="absolute inset-0 w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
                                Video Player Placeholder
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 relative z-20">
                    <button 
                        onClick={() => router.push(`/modul/${materiId}`)}
                        className="transition-all hover:scale-105 cursor-pointer"
                    >
                        <Image src="/button-materi.png" alt="Materi" width={180} height={180} className="inline-block mr-2" />
                    </button>
                </div>
            </div>
        </div>
    );
}
