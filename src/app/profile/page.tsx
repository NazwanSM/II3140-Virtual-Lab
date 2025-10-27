import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import ProfilePageComponent from '@/components/pages/profilePage';
import { selectArtwork, updateProfile, updatePassword } from '@/lib/actions/profile';

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
    image_hover_url: string;
    image_locked_hover_url: string;
    description: string;
}

interface UserArtwork {
    artwork_id: string;
}

export default async function Profile() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, tinta, active_artwork_id, created_at')
        .eq('id', user.id)
        .single() as { data: Profile | null };

    if (!profile) {
        redirect('/login');
    }

    const fullProfile = {
        ...profile,
        email: user.email || null,
        username: profile.full_name
    };

    const { data: allArtworks } = await supabase
        .from('artworks')
        .select('*')
        .order('artwork_number') as { data: Artworks[] | null };

    const { data: unlockedArtworks } = await supabase
        .from('user_artworks')
        .select('artwork_id')
        .eq('user_id', user.id) as { data: UserArtwork[] | null };

    const unlockedIds = new Set(unlockedArtworks?.map((uc) => uc.artwork_id) || []);

    const artworks = (allArtworks || []).map((art) => ({
        ...art,
        is_unlocked: art.required_tinta === 0 || unlockedIds.has(art.id) || fullProfile.tinta >= art.required_tinta
    }));

    const firstArt = artworks[0];
    if (firstArt && !unlockedIds.has(firstArt.id)) {
        const insertData = {
            user_id: user.id,
            artwork_id: firstArt.id,
            is_active: !fullProfile.active_artwork_id
        };
        
        const { error } = await supabase
            .from('user_artworks')
            // @ts-expect-error Supabase type generation issue
            .insert([insertData]);

        if (!error && !fullProfile.active_artwork_id) {
            await supabase
                .from('profiles')
                // @ts-expect-error Supabase type generation issue  
                .update({ active_artwork_id: firstArt.id })
                .eq('id', user.id);
        }
    }

    return (
        <ProfilePageComponent
            profile={fullProfile}
            artworks={artworks}
            onSelectArtwork={selectArtwork}
            onUpdateProfile={updateProfile}
            onUpdatePassword={updatePassword}
        />
    );
}
