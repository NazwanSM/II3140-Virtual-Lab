"use client";

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const formatText = (text: string): React.ReactNode => {
    // Replace bold text
    const boldPattern = /\*\*(.*?)\*\*/g;
    const parts = text.split(boldPattern);
    
    // Replace -- with -->
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
    materiNumber: number;
    title: string;
    content: {
        sections: Section[];
    };
}

export default function ModulPage({ materiNumber, title, content }: ModulPageProps) {
    const router = useRouter();

    return (
        <div className="dashboard-page min-h-screen p-6 md:p-10 font-sans">
            <header className="flex justify-between items-center mb-8 relative z-50 bg-white/5 backdrop-blur-sm">
                <button onClick={() => router.push("/dashboard")} className="cursor-pointer relative z-50">
                    <Image src="/LogoAksaraSmall.png" alt="Logo" width={128} height={32} priority />
                </button>
        
                <div className="flex items-center gap-4 relative z-50">
                    <div className="bg-[#d4af3771] rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                        <Image src="/bulu.png" alt="coin" width={20} height={20} priority />
                        <span className="text-sm font-bold text-white">211.000</span>
                        <span className="text-xs text-white">Koin</span>
                    </div>
                    <button className="mr-8 cursor-pointer hover:scale-105 transition-transform">
                        <Image src="/plusButton.png" alt="Tambah" width={60} height={60} priority />
                    </button>
                </div>
            </header>

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
                                                        <th key={headerIndex} className="border-b-2 border-gray-800 bg-gray-100 px-4 py-2 text-left text-gray-900 font-bold">
                                                            {header}
                                                        </th>
                                                    ))}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {section.table.rows.map((row, rowIndex) => (
                                                    <tr key={rowIndex}>
                                                        {row.map((cell, cellIndex) => (
                                                            <td key={cellIndex} className="border-b border-gray-800 px-4 py-2 text-gray-900">
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
                            onClick={() => router.back()}
                            className="transition-all hover:scale-105 cursor-pointer"
                        >
                            <Image src="/button-unduh.png" alt="Unduh" width={180} height={180} className="inline-block mr-2" />
                        </button>
                        <button 
                            onClick={() => router.push(`/belajar/${materiNumber}/latihan`)}
                            className="transition-all hover:scale-105 cursor-pointer"
                        >
                            <Image src="/button-latihan.png" alt="Latihan" width={180} height={180} className="inline-block mr-2" />
                        </button>
                    </div>
                    <button 
                        onClick={() => router.push(`/belajar/${materiNumber}/video`)}
                        className="transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
                    >
                        <Image src="/button-video.png" alt="Video" width={180} height={180} className="inline-block mr-2" />
                    </button>
                </div>
            </div>
        </div>
    );
}
