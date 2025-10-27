'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AnswerFeedbackPopup from '../ui/answerFeedbackPopup';
import PageHeader from '../ui/pageHeader';

interface Profile {
    full_name: string | null;
    tinta: number;
}

interface Question {
    id: string;
    question_number: number;
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: string;
    explanation: string;
}

interface QuizPageProps {
    moduleId: string;
    moduleTitle: string;
    difficulty: string;
    questions: Question[];
    profile: Profile;
    onSubmit: (answers: Record<number, string>) => Promise<void>;
}

export default function QuizPage({
    moduleTitle,
    difficulty,
    questions,
    profile,
    onSubmit
}: QuizPageProps) {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

    const difficultyColors = {
        mudah: 'from-[#66BB6A] to-[#43A047]',
        sedang: 'from-[#FFA726] to-[#FB8C00]',
        sulit: 'from-[#E57373] to-[#C62828]'
    };

    const bgColor = difficultyColors[difficulty as keyof typeof difficultyColors] || difficultyColors.mudah;

    const handleAnswerSelect = (questionIndex: number, answer: string) => {
        const currentQuestion = questions[questionIndex];
        const isCorrect = answer === currentQuestion.correct_answer;
        
        setAnswers((prev) => ({
            ...prev,
            [questionIndex]: answer
        }));

        setIsCorrectAnswer(isCorrect);
        setShowFeedback(true);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await onSubmit(answers);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleContinue = () => {
        setShowFeedback(false);
        
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const currentQ = questions[currentQuestion];
    if (!currentQ) return null;

    return (
        <>
            {showFeedback && (
                <AnswerFeedbackPopup 
                    isCorrect={isCorrectAnswer}
                    onContinue={handleContinue}
                />
            )}
            
            <div className="dashboard-page p-6 md:p-10 font-sans" >
            <PageHeader 
                userName={profile?.full_name}
                tinta={profile?.tinta || 0}
                showUserInfo={true}
            />

            <div className="max-w-7xl mx-auto space-y-6">
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        <div className="bg-white border-4 border-gray-800 rounded-3xl p-8 shadow-xl relative z-50">
                            <h2 className="text-2xl font-bold text-[#3949AB] mb-6">Soal {currentQ.question_number}</h2>
                            <p className="text-lg text-gray-800 mb-8">
                                {currentQ.question_text}
                            </p>

                            <div className="space-y-4">
                                {['A', 'B', 'C', 'D'].map((letter) => {
                                    const optionKey = `option_${letter.toLowerCase()}` as keyof Question;
                                    const optionText = currentQ[optionKey] as string;
                                    const isSelected = answers[currentQuestion] === letter;
                                    
                                    return (
                                        <button
                                            key={letter}
                                            onClick={() => handleAnswerSelect(currentQuestion, letter)}
                                            className={`w-full text-left p-4 rounded-2xl border-3 border-gray-800 transition-all cursor-pointer relative ${
                                                isSelected 
                                                    ? 'bg-[#2196F3] text-white shadow-lg' 
                                                    : 'bg-[#FFF9E6] hover:bg-[#FFF3CD] text-black'
                                            }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-8 h-8 rounded-lg border-2 border-gray-800 flex items-center justify-center font-bold ${
                                                    isSelected ? 'bg-white text-[#2196F3]' : 'bg-white text-gray-800'
                                                }`}>
                                                    {letter}
                                                </div>
                                                <span className="text-base flex-1">{optionText}</span>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex justify-between items-center gap-4 relative z-50 pointer-events-auto">
                            {currentQuestion > 0 ? (
                                <button
                                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                    className="px-8 py-3 rounded-2xl border-4 border-gray-800 font-bold text-lg transition-all bg-linear-to-r from-[#5C6BC0] to-[#3949AB] text-white hover:from-[#4A5AB8] hover:to-[#2838A0] cursor-pointer hover:scale-105 relative z-50 pointer-events-auto"
                                    disabled={isSubmitting}
                                >
                                    Sebelumnya
                                </button>
                            ) : (
                                <div />
                            )}

                            <button
                                onClick={() => {
                                    if (currentQuestion === questions.length - 1) {
                                        handleSubmit();
                                    } else {
                                        setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1));
                                    }
                                }}
                                className="px-8 py-3 bg-linear-to-r from-[#5C6BC0] to-[#3949AB] hover:from-[#4A5AB8] hover:to-[#2838A0] border-4 border-gray-800 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105 cursor-pointer relative z-50 pointer-events-auto disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Menyimpan...' : currentQuestion === questions.length - 1 ? 'Submit' : 'Selanjutnya'}
                            </button>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="bg-white border-4 border-gray-800 rounded-3xl p-6 shadow-xl relative z-50">
                            <h2 className="text-2xl font-bold text-[#3949AB] text-center mb-6">
                                Soal {currentQ.question_number}
                            </h2>

                            <div className="mb-6">
                                <div className="bg-[#E8EAF6] border-3 border-gray-800 rounded-2xl px-6 py-3 text-black">
                                    <p className="text-center text-base text-black">
                                        <span className="font-normal text-black">Tipe Soal : </span>
                                        <span className="font-bold text-black capitalize">{difficulty}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-5 gap-3 mb-6 justify-items-center">
                                {questions.map((q, idx) => (
                                    <button
                                        key={q.id}
                                        onClick={() => setCurrentQuestion(idx)}
                                        className={`rounded-xl border-3 border-gray-800 font-bold text-lg transition-all cursor-pointer flex items-center justify-center ${
                                            currentQuestion === idx
                                                ? 'bg-[#2196F3] text-white shadow-lg scale-105'
                                                : answers[idx]
                                                ? 'bg-[#66BB6A] text-white hover:bg-[#57A95B]'
                                                : 'bg-white text-black hover:bg-gray-100'
                                        } relative z-50`}
                                        style={{ width: '68px', height: '68px' }}
                                        disabled={isSubmitting}
                                    >
                                        {q.question_number}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
