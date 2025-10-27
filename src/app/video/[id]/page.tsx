import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import VideoPage from '@/components/pages/videoPage';

interface Profile {
    full_name: string | null;
    tinta: number;
}

export default async function VideoPageWrapper({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, tinta')
        .eq('id', user.id)
        .single() as { data: Profile | null };

    const { data: module, error } = await supabase
        .from('modules')
        .select('*')
        .eq('id', resolvedParams.id)
        .single() as { data: { id: string; module_number: number; title: string; description: string; video_url: string | null } | null; error: Error | null };

    if (!module || !module.video_url || error) {
        notFound();
    }

    const getYouTubeEmbedUrl = (url: string) => {
        const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/;
        const match = url.match(youtubeRegex);
        if (match) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }
        return url;
    };

    const videoEmbedUrl = getYouTubeEmbedUrl(module.video_url);

    return (
        <VideoPage
            materiId={module.id}
            title={module.title}
            videoUrl={videoEmbedUrl}
            videoTitle={`Video Pembelajaran Modul ${module.module_number}`}
            profile={profile || undefined}
        />
    );
}
