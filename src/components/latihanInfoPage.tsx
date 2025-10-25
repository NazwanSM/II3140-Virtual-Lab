"use client";

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

interface LatihanInfoPageProps {
    materiNumber: number;
    materiTitle: string;
    difficulty: string;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    onStartExercise?: () => void;
}

export default function LatihanInfoPage({ 
    materiNumber, 
    materiTitle,
    difficulty,
    totalQuestions,
    correctAnswers,
    wrongAnswers,
    onStartExercise
}: LatihanInfoPageProps) {
    const router = useRouter();

    const handleStartExercise = () => {
        if (onStartExercise) {
            onStartExercise();
        } else {
            router.push(`/latihan/${materiNumber}/${difficulty.toLowerCase()}/soal`);
        }
    };

    return (
        <div className="min-h-screen dashboard-page">
            <div className="container mx-auto px-4 py-8">
                <div className="bg-linear-to-r from-red-400 to-pink-400 rounded-2xl p-4 mb-8 shadow-lg">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="p-2 hover:bg-white/20 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-6 h-6 text-white" />
                        </button>
                        <h1 className="text-xl font-bold text-white">{materiTitle}</h1>
                    </div>
                </div>

                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
                    <div className="space-y-4 mb-8">
                        <div className="bg-yellow-50 border-2 border-gray-800 rounded-xl px-6 py-4 text-center">
                            <span className="text-base">Tipe Soal : </span>
                            <span className="text-base font-bold">{difficulty}</span>
                        </div>

                        <div className="bg-yellow-50 border-2 border-gray-800 rounded-xl px-6 py-4 text-center">
                            <span className="text-base">Jumlah : </span>
                            <span className="text-base font-bold">{totalQuestions} Soal</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 border-2 border-gray-800 rounded-xl px-6 py-4 text-center">
                                <span className="text-base">Benar : </span>
                                <span className="text-base font-bold">{correctAnswers} Soal</span>
                            </div>
                            <div className="bg-red-50 border-2 border-gray-800 rounded-xl px-6 py-4 text-center">
                                <span className="text-base">Salah : </span>
                                <span className="text-base font-bold">{wrongAnswers} Soal</span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleStartExercise}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors shadow-md text-lg"
                    >
                        Kerjakan
                    </button>
                </div>
            </div>
        </div>
    );
}
