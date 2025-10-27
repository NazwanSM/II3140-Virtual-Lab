import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import QuizWrapper from '@/components/wrappers/latihanWrapper';

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

export default async function KerjakanQuiz({
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
        .single();

    if (!module) {
        redirect('/latihan');
    }

    const { data: questions } = await supabase
        .from('quiz_questions')
        .select('*')
        .eq('module_id', moduleId)
        .eq('difficulty', difficulty)
        .order('question_number') as { data: Question[] | null };

    if (!questions || questions.length === 0) {
        redirect(`/latihan/${moduleId}/${difficulty}`);
    }

    return (
        <QuizWrapper
            moduleId={moduleId}
            moduleTitle={(module as any).title}
            difficulty={difficulty}
            questions={questions}
            profile={profile || { full_name: null, tinta: 0 }}
        />
    );
}
