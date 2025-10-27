"use client";

import Image from 'next/image';
import Link from 'next/link';

interface LatihanInfoCardProps {
    moduleId: string;
    moduleNumber: number;
    title: string;
    thumbnail: string;
    difficulty: 'Mudah' | 'Sedang' | 'Sulit';
    status: 'available' | 'locked';
    lastScore?: number | null;
}

export default function LatihanInfoCard({
    moduleId,
    moduleNumber,
    title,
    thumbnail,
    difficulty,
    status,
    lastScore,
}: LatihanInfoCardProps) {
    const isLocked = status === 'locked';
    const difficultyLower = difficulty.toLowerCase();

    const getDifficultyColor = () => {
        switch(difficulty) {
            case 'Mudah':
                return 'bg-green-100 text-green-700 border-green-300';
            case 'Sedang':
                return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'Sulit':
                return 'bg-red-100 text-red-700 border-red-300';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    const getScoreColor = () => {
        if (!lastScore) return 'bg-gray-100 text-gray-700';
        if (lastScore >= 80) return 'bg-green-100 text-green-700';
        if (lastScore >= 60) return 'bg-yellow-100 text-yellow-700';
        return 'bg-red-100 text-red-700';
    };

    if (isLocked) {
        return (
            <div 
                className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 w-full max-w-sm relative opacity-60 cursor-not-allowed"
            >
                <div className="absolute inset-0 bg-gray-900/50 z-10 flex items-center justify-center rounded-2xl">
                    <div className="bg-white rounded-full p-4">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-12 w-12 text-gray-600" 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                        >
                            <path 
                                fillRule="evenodd" 
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" 
                                clipRule="evenodd" 
                            />
                        </svg>
                    </div>
                </div>

                <div className="relative h-48 w-full">
                    <Image
                        src={thumbnail}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 flex items-center gap-2 shadow-md">
                        <span className="text-sm font-bold text-gray-800">Modul {moduleNumber}</span>
                        <Image src="/book3.png" alt="book" width={16} height={16} />
                    </div>
                    <div className={`absolute top-4 right-4 rounded-full px-3 py-1 border-2 ${getDifficultyColor()} shadow-md`}>
                        <span className="text-xs font-bold">{difficulty}</span>
                    </div>
                </div>

                <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 line-clamp-2 min-h-14">
                        {title}
                    </h3>
                </div>
            </div>
        );
    }

    return (
        <Link
            href={`/latihan/${moduleId}/${difficultyLower}`}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 w-full max-w-sm relative hover:shadow-xl hover:scale-105 block"
        >
            <div className="relative h-48 w-full">
                <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-4 left-4 bg-white rounded-full px-3 py-1 flex items-center gap-2 shadow-md">
                    <span className="text-sm font-bold text-gray-800">Modul {moduleNumber}</span>
                    <Image src="/book3.png" alt="book" width={16} height={16} />
                </div>
                <div className={`absolute top-4 right-4 rounded-full px-3 py-1 border-2 ${getDifficultyColor()} shadow-md`}>
                    <span className="text-xs font-bold">{difficulty}</span>
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-4 line-clamp-2 min-h-14">
                    {title}
                </h3>

                {lastScore !== null && lastScore !== undefined && (
                    <div className={`mb-3 px-3 py-2 rounded-lg ${getScoreColor()} border-2 border-gray-200`}>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold">Nilai Terakhir:</span>
                            <span className="text-xl font-bold">{lastScore}%</span>
                        </div>
                    </div>
                )}

                <div
                    className="w-full px-4 py-3 bg-linear-to-r from-[#5C6BC0] to-[#3949AB] hover:from-[#4A5AB8] hover:to-[#2838A0] rounded-xl text-sm font-bold text-white transition-all duration-200 shadow-md hover:shadow-lg text-center"
                >
                    {lastScore !== null && lastScore !== undefined ? 'Ulangi Latihan' : 'Mulai Latihan'}
                </div>
            </div>
        </Link>
    );
}
