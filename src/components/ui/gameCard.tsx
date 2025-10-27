'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export interface GameCardProps {
    title: string;
    imageSrc: string;
    href?: string;
    onClick?: (e: React.MouseEvent) => void; 
    actionLabel?: string;
    className?: string;
}

export default function GameCard({
    title,
    imageSrc,
    href,
    onClick,
    actionLabel = 'Mainkan',
}: GameCardProps) {
    const content = (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl duration-300 w-full max-w-2xl transition-all hover:scale-105">
            <div className="relative w-full h-48 md:h-56">
                <Image src={imageSrc} alt={title} fill className="object-cover" />
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>

                        <div className="flex justify-center">
                            {href ? (
                                <Link
                                    href={href}
                                    className="block w-full text-center px-4 py-2 rounded-xl border-2 border-gray-300 text-[#1F2D4A] font-medium bg-[#EDF4FE] hover:scale-103 transition-all"
                                >
                                    {actionLabel}
                                </Link>
                            ) : (
                    <button
                    onClick={onClick}
                    className="w-full text-center px-4 py-2 rounded-xl border-2 border-gray-300 text-[#1F2D4A] font-medium bg-[#EDF4FE] hover:scale-103 transition-all"
                    type="button"
                    >
                    {actionLabel}
                    </button>
                )}
                </div>
            </div>
        </div>
    );

    return content;
}
