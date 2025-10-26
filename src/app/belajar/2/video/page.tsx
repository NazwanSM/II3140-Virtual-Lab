"use client";

import VideoPage from '@/components/videoPage';

export default function Materi2Video() {
    const videoData = {
        materiNumber: 2,
        title: "Bahasa yang Tepat Berawal dari Diksi Baku",
        videoUrl: "https://www.youtube.com/embed/kEIyVlvpIYI", // Ganti dengan URL video yang sesuai
        videoTitle: "Video Pembelajaran Modul 2"
    };

    return <VideoPage {...videoData} />;
}
