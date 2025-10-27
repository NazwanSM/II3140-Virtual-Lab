'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RadialMenu from './radialMenu';

interface PageHeaderProps {
    userName?: string | null;
    tinta?: number;
    showUserInfo?: boolean;
    logoLink?: string;
}

export default function PageHeader({ 
    userName, 
    tinta, 
    showUserInfo = true,
    logoLink = '/dashboard' 
}: PageHeaderProps) {
    const router = useRouter();

    return (
        <header className="flex justify-between items-center mb-8 relative z-50 mx-auto">
            <div className="flex items-center gap-4 md:gap-6">
                <div className="shrink-0">
                    <button 
                        onClick={() => router.push(logoLink)} 
                        className="cursor-pointer hover:opacity-90 transition-opacity"
                    >
                        <Image src="/LogoAksaraSmall.png" alt="Logo" width={128} height={32} />
                    </button>
                </div>
                {showUserInfo && (
                    <div className="text-left">
                        <p className="text-base md:text-lg">
                            <span className="text-gray-600 italic">Halo, </span>
                            <Link href="/profile" className="font-bold text-gray-900 hover:underline">
                                {userName || 'Aksara Learner'}
                            </Link>
                        </p>
                        {tinta !== undefined && (
                            <div className="bg-[#d4af378a] rounded-full px-4 py-1 flex items-center gap-2 shadow-md">
                                <Image src="/bulu.png" alt="tinta" width={20} height={20} />
                                <span className="text-sm font-bold text-white">{tinta} tinta</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
            <RadialMenu />
        </header>
    );
}
