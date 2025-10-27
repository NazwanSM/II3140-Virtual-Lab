'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface MenuItem {
    label: string;
    icon: string;
    action: () => void;
}

interface RadialMenuProps {
    className?: string;
}

export default function RadialMenu({ className = '' }: RadialMenuProps) {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems: MenuItem[] = [
        { label: 'Profile', icon: '/profile.png', action: () => router.push('/profile') },
        { label: 'Home', icon: '/home.png', action: () => router.push('/dashboard') },
        { label: 'Logout', icon: '/logout.png', action: () => router.push('/login') },
    ];

    return (
        <div className={`shrink-0 relative ${className} z-50`}>
            {isMenuOpen && (
                <div 
                    className="fixed inset-0 z-50 transition-opacity duration-300"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {menuItems.map((item, index) => {
                const startAngle = 90; 
                const endAngle = 180;
                const angleRange = endAngle - startAngle;
                const angle = startAngle + (index * (angleRange / (menuItems.length - 1)));
                const radius = 90; 
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius + 30;
                
                return (
                    <button
                        key={index}
                        onClick={() => {
                            item.action();
                            setIsMenuOpen(false);
                        }}
                        className={`absolute flex items-center justify-center cursor-pointer transition-all duration-500 ease-out hover:scale-110 z-50 ${
                            isMenuOpen 
                                ? 'opacity-100 pointer-events-auto' 
                                : 'opacity-0 pointer-events-none scale-0'
                        }`}
                        style={{
                            transform: isMenuOpen 
                                ? `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` 
                                : 'translate(-50%, -50%)',
                            transitionDelay: isMenuOpen ? `${index * 50}ms` : '0ms'
                        }}
                        title={item.label}
                    >
                        <Image src={item.icon} alt={item.label} width={109} height={109} />
                    </button>
                );
            })}
            
            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`cursor-pointer hover:scale-105 transition-all duration-300 relative z-50 ${
                    isMenuOpen ? 'rotate-45' : 'rotate-0'
                }`}
            >
                <Image src="/plusButton.png" alt="Menu" width={56} height={56} />
            </button>
        </div>
    );
}
