'use client';

import QuizPage from '@/components/pages/latihanPage';
import { useRouter } from 'next/navigation';
import { submitQuiz } from '@/lib/actions/quiz';

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

interface QuizWrapperProps {
    moduleId: string;
    moduleTitle: string;
    difficulty: string;
    questions: Question[];
    profile: Profile;
}

export default function QuizWrapper(props: QuizWrapperProps) {
    const router = useRouter();

    async function handleSubmit(answers: Record<number, string>) {
        let correctAnswers = 0;
        props.questions.forEach((q, index) => {
            if (answers[index] === q.correct_answer) {
                correctAnswers++;
            }
        });

        const wrongAnswers = props.questions.length - correctAnswers;
        const score = Math.round((correctAnswers / props.questions.length) * 100);

        const result = await submitQuiz(
            props.moduleId,
            props.difficulty,
            answers,
            props.questions.map(q => ({ 
                question_number: q.question_number, 
                correct_answer: q.correct_answer 
            }))
        );

        if (result.success) {
            alert(`Quiz Selesai!\n\nBenar: ${correctAnswers}\nSalah: ${wrongAnswers}\nSkor: ${score}%`);
            router.push(`/latihan/${props.moduleId}/${props.difficulty.toLowerCase()}`);
        } else {
            alert('Gagal menyimpan hasil quiz. Silakan coba lagi.');
        }
    }

    return <QuizPage {...props} onSubmit={handleSubmit} />;
}
