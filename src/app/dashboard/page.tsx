import DashboardCard from '@/components/ui/dashboardCard';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

interface Profile {
    full_name: string | null;
    tinta: number;
}

interface LearningProgress {
    module_id: string;
    progress: number;
    completed: boolean;
    modul_viewed: boolean;
    video_viewed: boolean;
    quiz_score?: number | null;
}

export default async function Dashboard() {
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

    const { data: learningProgress } = await supabase
        .from('learning_progress')
        .select('module_id, progress, completed, modul_viewed, video_viewed')
        .eq('user_id', user.id) as { data: LearningProgress[] | null };

    const { data: quizResults } = await supabase
        .from('quiz_results')
        .select('module_id, difficulty, score')
        .eq('user_id', user.id) as { data: { module_id: string; difficulty: string; score: number }[] | null };

    const completedModules = learningProgress?.filter((p) => p.modul_viewed === true).length || 0;
    const totalModules = 3;
    const belajarProgress = `${completedModules}/${totalModules}`;

    const completedQuizzes = quizResults?.filter((q) => q.score !== null && q.score !== undefined).length || 0;
    const totalQuiz = 9;
    const latihProgress = `${completedQuizzes}/${totalQuiz}`;

    const level = Math.floor((profile?.tinta || 0) / 100) + 1;

    return (
        <div className="dashboard-page p-6 md:p-10 font-sans" >
            <header className="flex justify-between items-center mb-8 relative z-10 mx-auto">
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="shrink-0">
                        <Image src="/LogoAksaraSmall.png" alt="Logo" width={128} height={32} />
                    </div>
                    <div className="text-left">
                        <p className="text-base md:text-lg">
                            <span className="text-gray-600 italic">Halo, </span>
                            <Link href="/profile" className="font-bold text-gray-900 hover:underline">
                                {profile?.full_name || 'Aksara Learner'}
                            </Link>
                        </p>
                        <div className="bg-[#d4af378a] rounded-full px-4 py-1 flex items-center gap-2 shadow-md">
                            <Image src="/bulu.png" alt="tinta" width={20} height={20} />
                            <span className="text-sm font-bold text-white">{profile?.tinta || 0} tinta</span>
                        </div>
                    </div>
                </div>
                <div className="shrink-0">
                    <button className="cursor-pointer hover:scale-105 transition-all hover:rotate-30">
                        <Image src="/plusButton.png" alt="Tambah" width={56} height={56} />
                    </button>
                </div>
            </header>

            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 md:-space-x-10 px-4 py-10 relative z-10">
                <Link href="/latihan">
                    <DashboardCard
                        title="Latih"
                        bgColor="bg-linear-to-br from-[#d45272] to-[#632222]"
                        textColor="text-white"
                        progress={latihProgress}
                        level={level}
                        description="Latih pemahamanmu dengan kuis menantang by Aksara"
                        rotationClass="md:-rotate-6"
                        zIndexClass="z-10"
                        image="/cardLatih.png"
                        imageSize="full"
                        imagePosition="bottom"
                        imageObjectFit="contain"
                        imageAlign="right"
                        imageScale={1}
                    />
                </Link>

                <Link href="/belajar">
                    <DashboardCard
                        title="Belajar"
                        bgColor="bg-linear-to-br from-[#7b96e4] to-[#4A92F3]"
                        textColor="text-white"
                        progress={belajarProgress}
                        level={level}
                        description="Pelajari modul - modul Aksara yang menarik!"
                        rotationClass=""
                        zIndexClass="z-20"
                        image='/card.png'
                        imageSize="full"
                        imagePosition="bottom"
                        imageObjectFit="contain"
                        imageAlign="right"
                        imageScale={1.1}
                    />
                </Link>

                <Link href="/bermain">
                    <DashboardCard
                        title="Main"
                        bgColor="bg-linear-to-br from-[#DEC27B] to-[#BD920E]"
                        textColor="text-white"
                        progress="0/2"
                        level={level}
                        description="Latih pemahamanmu dengan bermain bersama Aksara"
                        rotationClass="md:rotate-6"
                        zIndexClass="z-10"
                        image='/cardMain.png'
                        imageSize="full"
                        imagePosition="bottom"
                        imageObjectFit="contain"
                        imageAlign="right"
                        imageScale={1}
                    />
                </Link>
            </div>
        </div>
    );
}