"use client";

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft} from 'lucide-react';
import PageHeader from '../ui/PageHeader';

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
            <PageHeader 
                userName={profile?.full_name}
                tinta={profile?.tinta || 0}
                showUserInfo={true}
            />

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
