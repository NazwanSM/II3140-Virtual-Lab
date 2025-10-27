'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

interface SubmitQuizResult {
    success: boolean;
    correctAnswers: number;
    wrongAnswers: number;
    score: number;
    error?: string;
}

export async function submitQuiz(
    moduleId: string,
    difficulty: string,
    answers: Record<number, string>,
    questions: Array<{ question_number: number; correct_answer: string }>
): Promise<SubmitQuizResult> {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, correctAnswers: 0, wrongAnswers: 0, score: 0, error: 'User not authenticated' };
    }

    try {
        let correctAnswers = 0;
        questions.forEach((q, index) => {
            if (answers[index] === q.correct_answer) {
                correctAnswers++;
            }
        });

        const wrongAnswers = questions.length - correctAnswers;
        const score = Math.round((correctAnswers / questions.length) * 100);

        await supabase
            .from('quiz_results')
            .upsert({
                user_id: user.id,
                module_id: moduleId,
                difficulty: difficulty,
                score: score,
                correct_answers: correctAnswers,
                wrong_answers: wrongAnswers,
                total_questions: questions.length,
                completed_at: new Date().toISOString()
            } as any, {
                onConflict: 'user_id,module_id,difficulty'
            });

        const tintaPerQuestion: Record<string, number> = {
            'mudah': 1000,
            'sedang': 3000,
            'sulit': 5000
        };
        
        const tintaReward = correctAnswers * (tintaPerQuestion[difficulty] || 1000);

        if (score >= 60) {
            const { data: existingProgress } = await supabase
                .from('learning_progress')
                .select('*')
                .eq('user_id', user.id)
                .eq('module_id', moduleId)
                .single();

            if (existingProgress) {
                const currentProgress = (existingProgress as any).progress || 0;
                const quizCompleted = (existingProgress as any)[`${difficulty}_completed`] || false;
                
                if (!quizCompleted) {
                    const newProgress = Math.min(100, currentProgress + 20);
                    
                    await supabase
                        .from('learning_progress')
                        .update({
                            progress: newProgress,
                            [`${difficulty}_completed`]: true,
                            completed: newProgress >= 100
                        } as any)
                        .eq('user_id', user.id)
                        .eq('module_id', moduleId);
                }
            }
        }

        if (correctAnswers > 0) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('tinta')
                .eq('id', user.id)
                .single();

            if (profile) {
                const currentTinta = (profile as any).tinta || 0;
                await supabase
                    .from('profiles')
                    .update({ tinta: currentTinta + tintaReward } as any)
                    .eq('id', user.id);
            }
        }

        revalidatePath('/latihan');
        revalidatePath('/dashboard');
        revalidatePath('/belajar');

        return { success: true, correctAnswers, wrongAnswers, score };
    } catch (error) {
        return { success: false, correctAnswers: 0, wrongAnswers: 0, score: 0, error: 'Failed to submit quiz' };
    }
}
