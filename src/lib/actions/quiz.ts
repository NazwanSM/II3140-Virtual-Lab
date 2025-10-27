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

interface ExistingProgress {
    progress: number;
    [key: string]: boolean | number;
}

interface Profile {
    tinta: number;
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
            // @ts-expect-error Supabase type generation issue
            .upsert({
                user_id: user.id,
                module_id: moduleId,
                difficulty: difficulty,
                score: score,
                correct_answers: correctAnswers,
                wrong_answers: wrongAnswers,
                total_questions: questions.length,
                completed_at: new Date().toISOString()
            }, {
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
                const progress = existingProgress as unknown as ExistingProgress;
                const currentProgress = progress.progress || 0;
                const quizCompleted = progress[`${difficulty}_completed`] as boolean || false;
                
                if (!quizCompleted) {
                    const newProgress = Math.min(100, currentProgress + 20);
                    
                    await supabase
                        .from('learning_progress')
                        // @ts-expect-error Supabase type generation issue
                        .update({
                            progress: newProgress,
                            [`${difficulty}_completed`]: true,
                            completed: newProgress >= 100
                        })
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
                const profileData = profile as unknown as Profile;
                const currentTinta = profileData.tinta || 0;
                await supabase
                    .from('profiles')
                    // @ts-expect-error Supabase type generation issue
                    .update({ tinta: currentTinta + tintaReward })
                    .eq('id', user.id);
            }
        }

        revalidatePath('/latihan');
        revalidatePath('/dashboard');
        revalidatePath('/belajar');

        return { success: true, correctAnswers, wrongAnswers, score };
    } catch {
        return { success: false, correctAnswers: 0, wrongAnswers: 0, score: 0, error: 'Failed to submit quiz' };
    }
}
