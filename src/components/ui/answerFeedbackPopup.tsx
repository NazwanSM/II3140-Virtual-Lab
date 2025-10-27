'use client';

import Image from 'next/image';

interface AnswerFeedbackPopupProps {
    isCorrect: boolean;
    onContinue: () => void;
}

export default function AnswerFeedbackPopup({ isCorrect, onContinue }: AnswerFeedbackPopupProps) {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl border-4 border-gray-800 shadow-2xl max-w-md w-full p-8 space-y-6 animate-fadeIn">
                <div className={`rounded-3xl border-4 border-gray-800 py-4 px-6 ${
                    isCorrect ? 'bg-linear-to-r from-[#66BB6A] to-[#43A047]' : 'bg-linear-to-r from-[#E57373] to-[#C62828]'
                }`}>
                    <h2 className="text-2xl font-bold text-white text-center">
                        {isCorrect ? 'JAWABAN BENAR !' : 'JAWABAN SALAH !'}
                    </h2>
                </div>

                <div className="bg-white rounded-3xl border-4 border-gray-800 p-6 space-y-4">
                    <div className={`flex justify-center py-4 ${isCorrect ? 'pr-10' : ''}`}>
                        <Image
                            src={isCorrect ? "/true.png" : "/false.png"}
                            alt={isCorrect ? "Benar" : "Salah"}
                            width={150}
                            height={150}
                            className={`object-contain`}
                        />
                    </div>

                    <div className="text-center">
                        <p className="text-lg font-semibold text-gray-900">
                            {isCorrect 
                                ? "Jawaban kamu Benar! Lanjutkan soal berikutnya"
                                : "Jawaban kamu salah, coba lagi ingat materinya !"
                            }
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={onContinue}
                            className={`px-12 py-3 rounded-3xl border-4 border-gray-800 font-bold text-xl text-white transition-all hover:scale-105 cursor-pointer shadow-lg ${
                                isCorrect 
                                    ? 'bg-linear-to-r from-[#66BB6A] to-[#43A047] hover:from-[#57A95B] hover:to-[#388E3C]'
                                    : 'bg-linear-to-r from-[#E57373] to-[#C62828] hover:from-[#D35B5B] hover:to-[#B71C1C]'
                            }`}
                        >
                            Lanjutkan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
