import Image from 'next/image';
import LatihanInfoCard from '@/components/ui/latihanCard';
import { redirect} from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PageHeader from '@/components/ui/pageHeader';

interface Profile {
    full_name: string | null;
    tinta: number;
}

interface Module {
    id: string;
    module_number: number;
    title: string;
    thumbnail_url: string | null;
}

interface QuizResult {
    module_id: string;
    difficulty: string;
    score: number;
}

export default async function Latihan() {
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

    const { data: modules } = await supabase
        .from('modules')
        .select('id, module_number, title, thumbnail_url')
        .order('module_number') as { data: Module[] | null };

    const { data: quizResults } = await supabase
        .from('quiz_results')
        .select('module_id, difficulty, score')
        .eq('user_id', user.id) as { data: QuizResult[] | null };

    const scoreMap = new Map<string, number>();
    quizResults?.forEach((result) => {
        const key = `${result.module_id}-${result.difficulty}`;
        scoreMap.set(key, result.score);
    });

    const latihanList = modules?.flatMap((module) => [
        {
            id: module.id,
            moduleNumber: module.module_number,
            title: module.title,
            thumbnail: module.thumbnail_url || "/frameMateri.png",
            difficulty: 'Mudah' as const,
            status: 'available' as const,
            lastScore: scoreMap.get(`${module.id}-mudah`) || null,
        },
        {
            id: module.id,
            moduleNumber: module.module_number,
            title: module.title,
            thumbnail: module.thumbnail_url || "/frameMateri.png",
            difficulty: 'Sedang' as const,
            status: 'available' as const,
            lastScore: scoreMap.get(`${module.id}-sedang`) || null,
        },
        {
            id: module.id,
            moduleNumber: module.module_number,
            title: module.title,
            thumbnail: module.thumbnail_url || "/frameMateri.png",
            difficulty: 'Sulit' as const,
            status: 'available' as const,
            lastScore: scoreMap.get(`${module.id}-sulit`) || null,
        },
    ]) || [];

    

    return (
        <div className="dashboard-page p-6 md:p-10 font-sans" >
            <PageHeader 
                userName={profile?.full_name}
                tinta={profile?.tinta || 0}
                showUserInfo={true}
            />

            <div className="max-w-5xl mx-auto bg-linear-to-tr from-[#d7b352] to-[#9db181] rounded-3xl p-6 md:p-8 mb-10 shadow-lg relative z-10 overflow-hidden">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="shrink-0">
                            <Image 
                                src="/book4.png" 
                                alt="Books" 
                                width={120} 
                                height={120}
                                className="drop-shadow-lg w-20 h-20 md:w-32 md:h-32"
                            />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 text-center">
                                Halo, {profile?.full_name || 'Aksara Learner'}
                            </h1>
                            <p className="text-sm md:text-base text-white text-center">
                                Berikut merupakan bagian <span className="font-bold">&quot;Asah Kemampuan&quot;</span> untuk kamu dapat 
                                melatih kemampuan kamu setelah belajar pada modul kami
                            </p>
                        </div>
                    </div>
                    <div className="shrink-0 hidden lg:block">
                        <Image 
                            src="/book5.png" 
                            alt="Notebook" 
                            width={120} 
                            height={120}
                            className="drop-shadow-lg"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {latihanList.map((latihan) => (
                    <LatihanInfoCard
                        key={`${latihan.id}-${latihan.difficulty}`}
                        moduleId={latihan.id}
                        moduleNumber={latihan.moduleNumber}
                        title={latihan.title}
                        thumbnail={latihan.thumbnail}
                        difficulty={latihan.difficulty}
                        status={latihan.status}
                        lastScore={latihan.lastScore}
                    />
                ))}
            </div>
        </div>
    );
}
