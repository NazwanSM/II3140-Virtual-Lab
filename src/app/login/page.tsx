"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";


export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative flex min-h-screen items-center justify-center p-4">
        <div className="absolute top-8 left-8">
            <Image src="/LogoAksaraSmall.png" alt="Logo" width={128} height={32} />
        </div>

        <div className="relative w-full max-w-md bg-white p-8 sm:p-12 rounded-2xl border-2 border-black shadow-[2px_5px_5px_#000000]">
            <h1 className="text-3xl font-bold text-center mb-8 text-black">
            Masuk
            </h1>

            <form className="space-y-6">
            <div>
                <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
                >
                Email Address *
                </label>
                <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                </span>
                <input
                    type="email"
                    id="email"
                    name="email"
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
                    <Lock className="h-5 w-5 text-gray-400" />
                </span>
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
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
            </div>

            <div className="pt-2 text-center">
                <button className="btn-image" type="submit">
                    <span className="sr-only"></span>
                </button>
            </div>

            <div>
                <button
                type="button"
                className="w-full text-black bg-white border-2 border-black hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2 text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                <Image
                    src="/google.svg"
                    alt="Google Logo"
                    width={20}
                    height={20}
                />
                Masuk menggunakan akun Google
                </button>
            </div>

            <div className="text-sm text-center text-gray-600">
                Belum punya akun?{" "}
                <a href="#" className="font-bold text-black hover:underline">
                Daftar Sekarang
                </a>
            </div>
            </form>
        </div>
        </div>
    );
}
