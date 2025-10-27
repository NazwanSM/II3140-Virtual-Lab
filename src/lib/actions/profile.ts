'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

interface Artwork {
    required_tinta: number;
}

interface Profile {
    tinta: number;
}

interface UserArtwork {
    id: string;
}

export async function selectArtwork(artworkId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { data: artwork } = await supabase
        .from('artworks')
        .select('required_tinta')
        .eq('id', artworkId)
        .single() as { data: Artwork | null };

    if (!artwork) {
        throw new Error('Artwork not found');
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('tinta')
        .eq('id', user.id)
        .single() as { data: Profile | null };

    if (!profile) {
        throw new Error('Profile not found');
    }

    if (profile.tinta < artwork.required_tinta) {
        throw new Error('Insufficient tinta');
    }

    const { data: existingUnlock } = await supabase
        .from('user_artworks')
        .select('id')
        .eq('user_id', user.id)
        .eq('artwork_id', artworkId)
        .single() as { data: UserArtwork | null };

    if (!existingUnlock) {
        const { error: unlockError } = await supabase
            .from('user_artworks')
            // @ts-expect-error Supabase type generation issue
            .insert({
                user_id: user.id,
                artwork_id: artworkId,
                is_active: false
            });

        if (unlockError) {
            throw new Error('Failed to unlock artwork');
        }
    }

    await supabase
        .from('user_artworks')
        // @ts-expect-error Supabase type generation issue
        .update({ is_active: false })
        .eq('user_id', user.id);

    revalidatePath('/profile');
    revalidatePath('/dashboard');

    return { success: true };
}

export async function updateProfile(data: { full_name?: string; username?: string }) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('User not authenticated');
    }

    const { error } = await supabase
        .from('profiles')
        // @ts-expect-error Supabase type generation issue
        .update(data)
        .eq('id', user.id);

    if (error) {
        throw new Error('Failed to update profile');
    }

    revalidatePath('/profile');
    revalidatePath('/dashboard');

    return { success: true };
}

export async function updatePassword(currentPassword: string, newPassword: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, error: 'User not authenticated' };
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email!,
        password: currentPassword,
    });

    if (signInError) {
        return { success: false, error: 'Password lama salah' };
    }

    const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
    });

    if (updateError) {
        return { success: false, error: 'Gagal mengubah password' };
    }

    return { success: true };
}
