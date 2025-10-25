"use client";

import DashboardCard from '@/components/dashboardCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    return (
        <div className="dashboard-page p-6 md:p-10 font-sans" >
        <header className="flex justify-between items-center mb-8 relative z-10">
            <div className="top-8 left-8">
                <Image src="/LogoAksaraSmall.png" alt="Logo" width={128} height={32} />
            </div>

            <button className="mr-8">
                <Image src="/plusButton.png" alt="Tambah" width={60} height={60} />
            </button>
        </header>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0 md:-space-x-10 px-4 relative z-10">
            <DashboardCard
                title="Latih"
                bgColor="bg-linear-to-br from-[#d45272] to-[#632222]"
                textColor="text-white"
                progress="1/3"
                level={10}
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

            <DashboardCard
                title="Belajar"
                bgColor="bg-linear-to-br from-[#7b96e4] to-[#4A92F3]"
                textColor="text-white"
                progress="1/5"
                level={15}
                description="Pelajari modul - modul Aksara yang menarik!"
                rotationClass=""
                zIndexClass="z-20"
                image='/card.png'
                imageSize="full"
                imagePosition="bottom"
                imageObjectFit="contain"
                imageAlign="right"
                imageScale={1.1}
                onClick={() => router.push('/belajar')}
            />

            <DashboardCard
                title="Main"
                bgColor="bg-linear-to-br from-[#DEC27B] to-[#BD920E]"
                textColor="text-white"
                progress="0/2"
                level={5}
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
        </div>
        </div>
    );
}