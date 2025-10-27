'use client';

import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Profile {
    full_name: string | null;
    username: string | null;
    email: string | null;
    tinta: number;
    active_artwork_id: string | null;
    created_at: string;
}

interface Artworks {
    id: string;
    artwork_number: number;
    name: string;
    required_tinta: number;
    image_locked_url: string;
    image_url: string;
    description: string;
    is_unlocked: boolean;
}

interface ProfilePageProps {
    profile: Profile;
    artworks: Artworks[];
    onSelectArtwork: (artworkId: string) => Promise<{ success: boolean }>;
    onUpdateProfile: (data: { full_name?: string; username?: string }) => Promise<{ success: boolean }>;
}

export default function ProfilePage({ 
    profile, 
    artworks,
    onSelectArtwork,
    onUpdateProfile 
}: ProfilePageProps) {
    const router = useRouter();
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [fullName, setFullName] = useState(profile.full_name || '');
    const [username, setUsername] = useState(profile.username || '');
    const [selectedArtwork, setSelectedArtwork] = useState<string | null>(profile.active_artwork_id);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('id-ID', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    };

    const handleSaveName = async () => {
        await onUpdateProfile({ full_name: fullName });
        setIsEditingName(false);
    };

    const handleSaveUsername = async () => {
        await onUpdateProfile({ username });
        setIsEditingUsername(false);
    };

    const handleArtworkSelect = async (artworkId: string) => {
        const artwork = artworks.find(c => c.id === artworkId);
        if (artwork && artwork.is_unlocked) {
            await onSelectArtwork(artworkId);
            setSelectedArtwork(artworkId);
        }
    };

    const unlockedCount = artworks.filter(c => c.is_unlocked).length;

    return (
        <div className="dashboard-page p-6 md:p-10 font-sans" >
            <header className="flex justify-between items-center mb-8 relative z-10 mx-auto">
                <div className="flex items-center gap-4 md:gap-6">
                    <button onClick={() => router.push("/dashboard")} className="cursor-pointer hover:opacity-90 transition-opacity">
                        <Image src="/LogoAksaraSmall.png" alt="Logo" width={128} height={32} />
                    </button>
                </div>
                <div className="shrink-0">
                    <button className="cursor-pointer hover:scale-105 transition-transform">
                        <Image src="/plusButton.png" alt="Tambah" width={56} height={56} />
                    </button>
                </div>
            </header>

            <div className="max-w-6xl mx-auto space-y-6">
                <div className="bg-linear-to-r from-[#E57373] to-[#C62828] rounded-3xl border-4 border-gray-800 p-4 shadow-lg relative z-50">
                    <h1 className="text-2xl md:text-3xl font-bold text-white text-center">
                        PROFIL
                    </h1>
                </div>

                <div className="flex flex-col md:flex-row gap-6 items-start">
                    <div className="shrink-0 z-10">
                        <div className="w-49 h-65">
                            <Image
                                src={'/Profile-men.png'}
                                alt="Avatar"
                                width={278}
                                height={278}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="bg-white flex items-start gap-6 border-4 border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl relative z-10 justify-between w-full">
                        <div className="flex-1 space-y-4">
                            <div>
                                <p className="text-xl md:text-3xl">
                                    <span className="text-gray-600 italic">Halo, </span>
                                    <span className="font-bold text-gray-900">{profile.full_name || 'Aksara Learner'}!</span>
                                </p>
                                <p className="text-gray-700 font-semibold">{profile.username || profile.email}</p>
                                <p className="text-gray-600 text-sm">{profile.email}</p>
                            </div>

                            <div className="bg-[#d4af378a] rounded-full px-6 py-2 inline-flex items-center gap-2 shadow-md">
                                <Image src="/bulu.png" alt="tinta" width={24} height={24} />
                                <span className="text-lg font-bold text-white">{profile.tinta} Tinta</span>
                            </div>

                            <p className="text-gray-600 text-sm">
                                <span className="font-semibold">Bergabung sejak:</span> {formatDate(profile.created_at)}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => setIsEditingName(!isEditingName)}
                                className="px-6 py-2 border-2 bg-[#F5E6E8] border-[#D4A5B0] rounded-2xl font-semibold text-[#8B4A5E] hover:bg-[#EDD5D9] transition-colors duration-200 cursor-pointer text-center"
                            >
                                Ubah Nama Pengguna
                            </button>
                            <button
                                onClick={() => setIsEditingUsername(!isEditingUsername)}
                                className="px-6 py-2 border-2 bg-[#F5E6E8] border-[#D4A5B0] rounded-2xl font-semibold text-[#8B4A5E] hover:bg-[#EDD5D9] transition-colors duration-200 cursor-pointer text-center"
                            >
                                Ubah Nama Lengkap
                            </button>
                            <button
                                onClick={() => setIsEditingPassword(!isEditingPassword)}
                                className="px-6 py-5 border-2 bg-[#F5E6E8] border-[#D4A5B0] rounded-2xl font-semibold text-[#8B4A5E] hover:bg-[#EDD5D9] transition-colors duration-200 cursor-pointer text-center"
                            >
                                Ubah Kata Sandi
                            </button>
                        </div>
                    </div>

                    {isEditingName && (
                        <div className="mt-6 pt-6 border-t-4 border-gray-800">
                            <label className="block text-gray-900 font-semibold mb-2">Nama Lengkap Baru</label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className="flex-1 px-4 py-2 border-3 border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4A92F3]"
                                    placeholder="Masukkan nama lengkap"
                                />
                                <button
                                    onClick={handleSaveName}
                                    className="px-6 py-2 bg-linear-to-r from-[#66BB6A] to-[#43A047] border-3 border-gray-800 rounded-2xl font-semibold text-white hover:scale-105 transition-all cursor-pointer"
                                >
                                    Simpan
                                </button>
                                <button
                                    onClick={() => setIsEditingName(false)}
                                    className="px-6 py-2 bg-gray-200 border-3 border-gray-800 rounded-2xl font-semibold text-gray-900 hover:bg-gray-300 transition-all cursor-pointer"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    )}

                    {isEditingUsername && (
                        <div className="mt-6 pt-6 border-t-4 border-gray-800">
                            <label className="block text-gray-900 font-semibold mb-2">Username Baru</label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="flex-1 px-4 py-2 border-3 border-gray-800 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#4A92F3]"
                                    placeholder="Masukkan username"
                                />
                                <button
                                    onClick={handleSaveUsername}
                                    className="px-6 py-2 bg-linear-to-r from-[#66BB6A] to-[#43A047] border-3 border-gray-800 rounded-2xl font-semibold text-white hover:scale-105 transition-all cursor-pointer"
                                >
                                    Simpan
                                </button>
                                <button
                                    onClick={() => setIsEditingUsername(false)}
                                    className="px-6 py-2 bg-gray-200 border-3 border-gray-800 rounded-2xl font-semibold text-gray-900 hover:bg-gray-300 transition-all cursor-pointer"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    )}

                    {isEditingPassword && (
                        <div className="mt-6 pt-6 border-t-4 border-gray-800">
                            <p className="text-gray-700 text-center py-4">
                                Fitur ubah password akan segera tersedia.
                            </p>
                        </div>
                    )}
                </div>

                <div className="bg-linear-to-r from-[#E57373] to-[#C62828] rounded-3xl border-4 border-gray-800 p-4 shadow-lg relative z-50">
                    <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
                        KOLEKSI KARAKTER
                    </h2>
                </div>

                <div className="bg-white border-4 border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl relative z-10">
                    <div className="mb-6 text-center">
                        <p className="text-xl font-semibold text-gray-900">
                            Karakter Terbuka: {unlockedCount} / {artworks.length}
                        </p>
                        <p className="text-gray-600 text-sm mt-2">
                            Kumpulkan tinta untuk membuka karakter baru!
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {artworks.map((artwork) => {
                            const isUnlocked = artwork.is_unlocked;
                            const isActive = selectedArtwork === artwork.id;
                            const canUnlock = profile.tinta >= artwork.required_tinta;

                            return (
                                <div
                                    key={artwork.id}
                                    className={`relative rounded-3xl overflow-hidden transition-all ${
                                        isUnlocked 
                                            ? 'cursor-pointer hover:scale-105 bg-white' 
                                            : 'bg-gray-800 opacity-75'
                                    } ${isActive ? 'ring-4 ring-[#FFD700] shadow-2xl scale-105' : ''}`}
                                    onClick={() => isUnlocked && handleArtworkSelect(artwork.id)}
                                >
                                    <div className="aspect-2/3 relative">
                                        <Image
                                            src={isUnlocked ? artwork.image_url : artwork.image_locked_url}
                                            alt="Artwork Image"
                                            fill
                                            className="object-cover"
                                        />
                                        
                                        {!isUnlocked && (
                                            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                                                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mb-2">
                                                    <svg className="w-10 h-10 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <p className="text-white font-bold text-sm text-center px-2">
                                                    {artwork.required_tinta} Tinta
                                                </p>
                                                {canUnlock && (
                                                    <p className="text-green-400 text-xs mt-1">Bisa dibuka!</p>
                                                )}
                                            </div>
                                        )}

                                        {isActive && (
                                            <div className="absolute top-2 right-2 bg-[#FFD700] border-2 border-gray-800 rounded-full px-3 py-1">
                                                <p className="text-xs font-bold text-gray-900">AKTIF</p>
                                            </div>
                                        )}

                                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-3">
                                            <p className="text-white font-bold text-center text-sm">
                                                {artwork.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={() => router.back()}
                        className="px-8 py-3 bg-linear-to-r from-[#5C6BC0] to-[#3949AB] hover:from-[#4A5AB8] hover:to-[#2838A0] border-4 border-gray-800 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105 cursor-pointer flex items-center gap-2 z-10"
                    >
                        <ArrowLeft size={24} />
                        Kembali
                    </button>
                </div>
            </div>
        </div>
    );
}
