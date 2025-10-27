import Image from 'next/image';
import MateriCard from '@/components/ui/materiCard';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PageHeader from '@/components/ui/pageHeader';

interface Profile {
    full_name: string | null;
    tinta: number;
}

interface Module {
    id: string;
    module_number : number;
    title: string;
    description: string;
    thumbnail_url: string | null;
}

interface LearningProgress {
    module_id: string;
    progress: number;
    completed: boolean;
}

export default async function Belajar() {
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
        .select('*')
        .order('module_number', { ascending: true }) as { data: Module[] | null };

    const { data: progressData } = await supabase
        .from('learning_progress')
        .select('module_id, progress, completed')
        .eq('user_id', user.id) as { data: LearningProgress[] | null };

    const modulesWithProgress = modules?.map((module) => {
        const progressRecord = progressData?.find((p) => p.module_id === module.id);
        return {
            id: module.id,
            materiNumber: module.module_number,
            title: module.title,
            description: module.description,
            thumbnail: module.thumbnail_url || "/frameMateri.png",
            progress: progressRecord?.progress || 0,
        };
    }) || [];

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
                                src="/book1.png" 
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
                                Berikut merupakan bagian <span className="font-bold">&quot;Aku Siap Belajar&quot;</span> agar kamu dapat 
                                belajar lebih banyak sesuai dengan materi yang sudah kami siapkan
                            </p>
                        </div>
                    </div>
                    <div className="shrink-0 hidden lg:block">
                        <Image 
                            src="/book2.png" 
                            alt="Notebook" 
                            width={120} 
                            height={120}
                            className="drop-shadow-lg"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
                {modulesWithProgress.map((materi) => (
                    <MateriCard
                        key={materi.id}
                        materiId={materi.id}
                        materiNumber={materi.materiNumber}
                        title={materi.title}
                        thumbnail="/frameMateri.png"
                        progress={materi.progress}
                    />
                ))}
            </div>
        </div>
    );
}
