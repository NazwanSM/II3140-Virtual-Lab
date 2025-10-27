"use client";

import { ArrowLeft} from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import PageHeader from '../ui/pageHeader';


interface Profile {
    full_name: string | null;
    tinta: number;
}

const formatText = (text: string): React.ReactNode => {
    const boldPattern = /\*\*(.*?)\*\*/g;
    const parts = text.split(boldPattern);
    
    const formattedParts = parts.map((part, index) => {
        const withArrow = part.replace(/--/g, "→");
        return index % 2 === 0 ? withArrow : <strong key={index}>{withArrow}</strong>;
    });
    
    return <>{formattedParts}</>;
};

export type TableSection = {
    type: "table";
    title: string;
    description?: string;
    table: {
        headers: string[];
        rows: (string | React.ReactNode)[][];
    };
};

export type PointsSection = {
    type: "points";
    title: string;
    description?: string;
    points: string[];
};

export type Section = TableSection | PointsSection;

interface ModulPageProps {
    materiId: number;
    materiNumber: number;
    title: string;
    content: {
        sections: Section[];
    };
    profile?: Profile;
}

export default function ModulPage({ materiId, materiNumber, title, content, profile }: ModulPageProps) {
    const router = useRouter();

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = `/modul/Modul-${materiNumber}.pdf`;
        link.download = `Modul-${materiNumber}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="dashboard-page p-6 md:p-10 font-sans" >
            <PageHeader 
                userName={profile?.full_name}
                tinta={profile?.tinta || 0}
                showUserInfo={true}
            />

            <div className="max-w-5xl mx-auto space-y-6">
                <div className="bg-linear-to-r from-[#E57373] to-[#C62828] rounded-4xl border-4 border-gray-800 p-4 flex items-center gap-4 shadow-lg relative z-50">
                    <button 
                        onClick={() => router.back()}
                        className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={28} strokeWidth={2.5} />
                    </button>
                    <h1 className="text-xl md:text-2xl font-bold text-white flex-1 text-center pr-12 relative z-50">
                        {title}
                    </h1>
                </div>

                <div className="bg-white border-4 border-gray-800 rounded-4xl p-8 shadow-xl relative z-10">
                    <div className="space-y-6">
                        {content.sections.map((section, index) => (
                            <div key={index} className="space-y-3">
                                <h2 className="text-lg font-bold text-gray-900">
                                    {section.title}
                                </h2>
                                {section.description && (
                                    <p className="text-gray-700 leading-relaxed">
                                        {section.description}
                                    </p>
                                )}
                                {section.type === "points" && section.points.length > 0 && (
                                    <ol className="space-y-2 ml-4">
                                        {section.points.map((point: string, pointIndex: number) => (
                                            <li key={pointIndex} className="text-gray-700 leading-relaxed">
                                                {formatText(point)}
                                            </li>
                                        ))}
                                    </ol>
                                )}
                                {section.type === "table" && (
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full border-2 border-gray-800">
                                            <thead>
                                                <tr>
                                                    {section.table.headers.map((header, headerIndex) => (
                                                        <th key={headerIndex} className="border-b-2 border-gray-800 bg-gray-100 px-4 py-2 text-center text-gray-900 font-bold">
                                                            {header}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {section.table.rows.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {row.map((cell, cellIndex) => (
                                                            <td key={cellIndex} className="border-b border-gray-800 px-4 py-2 text-gray-900 text-center">
                                                                {cell}
                                                            </td>
                                                        ))}
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 relative z-20">
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button 
                            onClick={handleDownload}
                            className="transition-all hover:scale-105 cursor-pointer"
                        >
                            <Image src="/button-unduh.png" alt="Unduh" width={180} height={180} className="inline-block mr-2" />
                        </button>
                        <button 
                            onClick={() => router.push(`/latihan`)}
                            className="transition-all hover:scale-105 cursor-pointer"
                        >
                            <Image src="/button-latihan.png" alt="Latihan" width={180} height={180} className="inline-block mr-2" />
                        </button>
                    </div>
                    <button 
                        onClick={() => router.push(`/video/${materiId}`)}
                        className="transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
                    >
                        <Image src="/button-video.png" alt="Video" width={180} height={180} className="inline-block mr-2" />
                    </button>
                </div>
            </div>
        </div>
    );
}
