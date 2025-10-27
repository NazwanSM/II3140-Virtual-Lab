"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { signInWithGoogle } from "@/lib/actions/auth";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleEmailSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { createClient } = await import("@/lib/supabase/client");
            const supabase = createClient();

            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (signUpError) {
                setError(signUpError.message);
            } else {
                alert("Berhasil daftar! Silakan login dengan akun Anda.");
                router.push("/login");
            }
        } catch (err) {
            setError("Terjadi kesalahan. Pastikan Supabase sudah di-setup.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        setError("");
        try {
            await signInWithGoogle();
        } catch (err) {
            setError("Gagal daftar dengan Google. Pastikan OAuth sudah di-setup.");
            console.error(err);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center p-6 md:p-10">
            <div className="absolute top-10 left-10">
                <Image src="/LogoAksaraSmall.png" alt="Logo" width={128} height={32} />
            </div>

            <div className="relative w-full max-w-md bg-white p-8 sm:p-12 rounded-2xl border-2 border-black shadow-[2px_5px_5px_#000000]">
                <h1 className="text-3xl font-bold text-center mb-8 text-black">
                    Daftar
                </h1>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleEmailSignup} className="space-y-6">
                    <div>
                        <label
                            htmlFor="nama"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Nama Lengkap *
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <User className="h-5 w-5 text-gray-500" />
                            </span>
                            <input
                                type="text"
                                id="nama"
                                name="nama"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                                className="block w-full rounded-lg border-gray-300 bg-pink-50 p-3 pl-10 text-black placeholder-gray-500 focus:border-black focus:ring-black"
                                placeholder="Nama Lengkap"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Email Address *
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Mail className="h-5 w-5 text-gray-500" />
                            </span>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="block w-full rounded-lg border-gray-300 bg-pink-50 p-3 pl-10 text-black placeholder-gray-500 focus:border-black focus:ring-black"
                                placeholder="example@gmail.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Password *
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <Lock className="h-5 w-5 text-gray-500" />
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="block w-full rounded-lg border-gray-300 bg-pink-50 p-3 pl-10 text-black placeholder-gray-500 focus:border-black focus:ring-black"
                                placeholder="Password123."
                            />
                            <span
                                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <Eye className="h-5 w-5 text-gray-400" />
                                ) : (
                                    <EyeOff className="h-5 w-5 text-gray-400" />
                                )}
                            </span>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">Minimal 6 karakter</p>
                    </div>

                    <div className="pt-2 text-center">
                        <button 
                            className="btn-image-signup hover:scale-105 transition-transform" 
                            type="submit"
                            disabled={loading}
                        >
                            <span className="sr-only">{loading ? "Loading..." : "Daftar"}</span>
                        </button>
                    </div>

                    <div>
                        <button
                            type="button"
                            onClick={handleGoogleSignup}
                            disabled={loading}
                            className="w-full text-black bg-white border-2 border-black hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2 text-center flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            <Image
                                src="/google.svg"
                                alt="Google Logo"
                                width={20}
                                height={20}
                            />
                            Daftar menggunakan akun Google
                        </button>
                    </div>

                    <div className="text-sm text-center text-gray-600">
                        Sudah punya akun?{" "}
                        <a href="#" className="font-bold text-black hover:underline" onClick={() => router.push('/login')}>
                            Masuk Sekarang
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
