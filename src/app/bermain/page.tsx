import Image from 'next/image';
import { redirect} from 'next/navigation';
import Link from 'next/dist/client/link';
import { createClient } from '@/lib/supabase/server';
import GameCard from '@/components/ui/gameCard';

interface Profile {
    full_name: string | null;
    tinta: number;
}

export default async function Bermain() {
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
    

    return (
        <div className="dashboard-page p-6 md:p-10 font-sans" >
            <header className="flex justify-between items-center mb-8 relative z-10 mx-auto">
                <div className="flex items-center gap-4 md:gap-6">
                    <Link href="/dashboard" className="cursor-pointer hover:opacity-90 transition-opacity">
                        <Image src="/LogoAksaraSmall.png" alt="Logo" width={128} height={32} />
                    </Link>
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
                    <button className="cursor-pointer hover:scale-105 transition-transform">
                        <Image src="/plusButton.png" alt="Tambah" width={56} height={56} />
                    </button>
                </div>
            </header>

            <div className="max-w-5xl mx-auto bg-linear-to-tr from-[#d7b352] to-[#9db181] rounded-3xl p-6 md:p-8 mb-10 shadow-lg relative z-10 overflow-hidden">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 md:gap-6">
                        <div className="shrink-0">
                            <Image 
                                src="/brick.png" 
                                alt="Books" 
                                width={130} 
                                height={130}
                                className="drop-shadow-lg w-20 h-20 md:w-32 md:h-32"
                            />
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2 text-center">
                                Halo, {profile?.full_name || 'Aksara Learner'}
                            </h1>
                            <p className="text-sm md:text-base text-white text-center">
                                Ga hanya berlatih, tapi kamu bisa <span className="font-bold">&quot;Bermain&quot;</span> untuk meningkatkan kemampuan kamu di sini!
                            </p>
                        </div>
                    </div>
                    <div className="shrink-0 hidden lg:block">
                        <Image 
                            src="/medal2.png" 
                            alt="Notebook" 
                            width={100} 
                            height={10}
                            className="drop-shadow-lg"
                        />
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 relative z-10">
                <GameCard
                    title="Teka - Teki Silang"
                    imageSrc="/tts.png"
                    href="/bermain/tts"
                />
                <GameCard
                    title="Drag and Drop"
                    imageSrc="/dad.png"
                    href="/bermain/dragAndDrop"
                />
            </div>
        </div>
    );
}
