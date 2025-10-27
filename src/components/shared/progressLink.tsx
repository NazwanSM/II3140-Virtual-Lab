'use client';

import Link from 'next/link';
import { updateModuleProgress } from '@/lib/actions/progress';
import { useRouter } from 'next/navigation';

interface ProgressLinkProps {
    href: string;
    moduleId: string;
    progressType: 'modul' | 'video';
    children: React.ReactNode;
    className?: string;
}

export default function ProgressLink({ href, moduleId, progressType, children, className }: ProgressLinkProps) {
    const router = useRouter();

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        const result = await updateModuleProgress(moduleId, progressType);
        console.log(result);
        router.push(href);
    };

    return (
        <Link href={href} onClick={handleClick} className={className}>
            {children}
        </Link>
    );
}
