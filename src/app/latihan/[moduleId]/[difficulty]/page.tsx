import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import QuizInfoPage from '@/components/pages/latihanInfoPage';

interface Profile {
    full_name: string | null;
    tinta: number;
}

interface QuizResult {
    correct_answers: number;
    wrong_answers: number;
}

export default async function QuizInfo({
    params,
}: {
    params: Promise<{ moduleId: string; difficulty: string }>;
}) {
    const { moduleId, difficulty } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, tinta')
        .eq('id', user.id)
        .single() as { data: Profile | null };

    const { data: module } = await supabase
        .from('modules')
        .select('id, title')
        .eq('id', moduleId)
        .single() as { data: { id: string; title: string } | null };

    if (!module) {
        redirect('/latihan');
    }

    const { count: totalQuestions } = await supabase
        .from('quiz_questions')
        .select('*', { count: 'exact', head: true })
        .eq('module_id', moduleId)
        .eq('difficulty', difficulty);

    // Ambil hasil quiz terbaru (berdasarkan completed_at)
    const { data: lastResult } = await supabase
        .from('quiz_results')
        .select('correct_answers, wrong_answers, completed_at')
        .eq('user_id', user.id)
        .eq('module_id', moduleId)
        .eq('difficulty', difficulty)
        .order('completed_at', { ascending: false })
        .limit(1)
        .single() as { data: QuizResult | null };

    return (
        <QuizInfoPage
            moduleId={moduleId}
            moduleTitle={module.title}
            difficulty={difficulty}
            totalQuestions={totalQuestions || 0}
            lastCorrect={lastResult?.correct_answers || 0}
            lastWrong={lastResult?.wrong_answers || 0}
            profile={profile || { full_name: null, tinta: 0 }}
        />
    );
}
