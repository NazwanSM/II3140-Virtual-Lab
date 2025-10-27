import Image from 'next/image';

interface DashboardCardProps {
    title: string;
    bgColor: string;
    textColor: string;
    progress: string;
    level: number;
    description: string;
    image?: string;
    imageSize?: 'small' | 'medium' | 'large' | 'full';
    imagePosition?: 'bottom' | 'center' | 'top';
    imageObjectFit?: 'contain' | 'cover' | 'fill';
    imageAlign?: 'left' | 'right';
    imageScale?: number;
    rotationClass?: string;
    zIndexClass?: string;
    onClick?: () => void;
}

export default function DashboardCard({
    title,
    bgColor,
    textColor,
    progress,
    description,
    image,
    imageSize = 'full',
    imagePosition = 'bottom',
    imageObjectFit = 'contain',
    imageAlign = 'right',
    imageScale = 1,
    rotationClass = '',
    zIndexClass = 'z-10',
    onClick,
}: DashboardCardProps) {
    const sizeClasses = {
        small: 'h-32',
        medium: 'h-48',
        large: 'h-64',
        full: 'flex-1'
    };

    const positionClasses = {
        top: 'object-top',
        center: 'object-center',
        bottom: 'object-bottom'
    };

    const alignClasses = {
        left: 'object-left',
        right: 'object-right'
    };

    const fitClasses = {
        contain: 'object-contain',
        cover: 'object-cover',
        fill: 'object-fill'
    };

    return (
        <div
            onClick={onClick}
            className={`group relative w-full max-w-xs md:w-80 h-[500px] ${bgColor} rounded-3xl shadow-xl overflow-hidden
                        transform ${rotationClass} transition-all duration-300 ease-in-out
                        hover:rotate-0 hover:scale-105 hover:-translate-y-4 hover:z-30 ${zIndexClass} cursor-pointer`}
        >
            <div className="absolute top-4 right-4 bg-white/47 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-md z-10">
                <Image src="/medal.png" alt="Medal" width={14} height={14} />
                <span className="text-sm font-bold text-white">{progress}</span>
            </div>

            <div className="relative h-full flex flex-col">
                <div className="p-6 pb-4">
                    <h2 className={`text-5xl font-bold ${textColor} mb-2`}>{title}</h2>
                    <p className={`text-sm ${textColor} opacity-90 leading-relaxed`}>
                        {description}
                    </p>
                </div>

                <div className={`relative mt-auto ${sizeClasses[imageSize]}`}>
                    {image ? (
                        <div 
                            className="relative w-full h-full"
                            style={{
                                transform: `scale(${imageScale})`,
                                transformOrigin: imageAlign === 'right' ? 'right bottom' : imageAlign === 'left' ? 'left bottom' : 'center bottom'
                            }}
                        >
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className={`${fitClasses[imageObjectFit]} ${positionClasses[imagePosition]} ${alignClasses[imageAlign]}`}
                                priority
                            />
                        </div>
                    ) : (
                        <div className="absolute inset-0 flex items-end justify-center pb-8">
                            <div className={`text-6xl ${textColor} opacity-20`}>
                                {title.charAt(0)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}