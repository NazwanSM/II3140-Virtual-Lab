"use client";

import VideoPage from '@/components/videoPage';

export default function Materi3Video() {
    const videoData = {
        materiNumber: 3,
        title: "Menulis Jelas, Padat, dan Tepat dengan Kalimat Efektif",
        videoUrl: "", // Ganti dengan URL video yang sesuai
        videoTitle: "Video Pembelajaran Modul 3"
    };

    return <VideoPage {...videoData} />;
}
