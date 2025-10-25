"use client";

import VideoPage from '@/components/videoPage';

export default function Materi1Video() {
    const videoData = {
        materiNumber: 1,
        title: "Kaidah Ejaan dan Tanda Baca Berdasarkan PUEBI",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Ganti dengan URL video yang sesuai
        videoTitle: "Video Pembelajaran Modul 1"
    };

    return <VideoPage {...videoData} />;
}
