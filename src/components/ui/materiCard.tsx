'use client';

import Image from 'next/image';
import Link from 'next/link';
import ProgressLink from '../shared/progressLink';

interface MateriCardProps {
    materiId: string;
    materiNumber: number;
    title: string;
    thumbnail: string;
    progress: number;
}

export default function MateriCard({
    materiId,
    materiNumber,
    title,
    thumbnail,
    progress,
}: MateriCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl duration-300 w-full max-w-sm transition-all hover:scale-105">
            <div className="relative h-48 w-full">
                <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 flex items-center gap-2 shadow-md">
                    <span className="text-sm font-bold text-gray-800">Materi {materiNumber}</span>
                    <Image src="/book3.png" alt="book" width={16} height={16} />
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-4 line-clamp-2 min-h-14">
                    {title}
                </h3>

                <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                            className="bg-gray-800 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-gray-600">Selesai : {progress}%</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                        <ProgressLink
                            href={`/modul/${materiId}`}
                            moduleId={materiId}
                            progressType="modul"
                            className="px-4 py-2 border-2 bg-[#F5E6E8] border-[#D4A5B0] rounded-lg text-sm font-semibold text-[#8B4A5E] hover:bg-[#EDD5D9] transition-all duration-200 cursor-pointer text-center hover:scale-103"
                        >
                            Modul
                        </ProgressLink>
                        <ProgressLink
                            href={`/video/${materiId}`}
                            moduleId={materiId}
                            progressType="video"
                            className="px-4 py-2 border-2 bg-[#F5E6E8] border-[#D4A5B0] rounded-lg text-sm font-semibold text-[#8B4A5E] hover:bg-[#EDD5D9] transition-all duration-200 cursor-pointer text-center hover:scale-103"
                        >
                            Video
                        </ProgressLink>
                    </div>
                    
                    <Link
                        href={`/latihan/${materiNumber}`}
                        className="block w-full px-4 py-2 bg-[#F5E6E8] border-2 border-[#D4A5B0] rounded-lg text-sm font-semibold text-[#8B4A5E] hover:bg-[#EDD5D9] transition-all duration-200 cursor-pointer text-center hover:scale-103"
                    >
                        Latihan Soal
                    </Link>
                </div>
            </div>
        </div>
    );
}
