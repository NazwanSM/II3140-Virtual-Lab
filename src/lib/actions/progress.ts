'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

interface ExistingProgress {
    progress: number;
    modul_viewed: boolean;
    video_viewed: boolean;
}

interface Profile {
    tinta: number;
}

export async function updateModuleProgress(moduleId: string, progressType: 'modul' | 'video') {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { error: 'User not authenticated' };
    }

    try {
        const { data: existingProgress} = await supabase
            .from('learning_progress')
            .select('*')
            .eq('user_id', user.id)
            .eq('module_id', moduleId)
            .single();

        let shouldAddTinta = false;

        if (existingProgress) {
            const progress = existingProgress as unknown as ExistingProgress;
            const currentProgress = progress.progress || 0;
            let newProgress = currentProgress;

            if (progressType === 'modul' && !progress.modul_viewed) {
                newProgress += 20;
                shouldAddTinta = true;
                
                await supabase
                    .from('learning_progress')
                    // @ts-expect-error Supabase type generation issue
                    .update({ 
                        progress: newProgress,
                        modul_viewed: true,
                        completed: newProgress >= 100
                    })
                    .eq('user_id', user.id)
                    .eq('module_id', moduleId)
                    .select();
            } else if (progressType === 'video' && !progress.video_viewed) {
                newProgress += 20;
                shouldAddTinta = true;
                
                await supabase
                    .from('learning_progress')
                    // @ts-expect-error Supabase type generation issue
                    .update({ 
                        progress: newProgress,
                        video_viewed: true,
                        completed: newProgress >= 100
                    })
                    .eq('user_id', user.id)
                    .eq('module_id', moduleId)
                    .select();
            }
        } else {
            const initialProgress = 20;
            shouldAddTinta = true;
            
            await supabase
                .from('learning_progress')
                // @ts-expect-error Supabase type generation issue
                .insert({
                    user_id: user.id,
                    module_id: moduleId,
                    progress: initialProgress,
                    modul_viewed: progressType === 'modul',
                    video_viewed: progressType === 'video',
                    completed: false
                })
                .select();
        }

        if (shouldAddTinta) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('tinta')
                .eq('id', user.id)
                .single();

            if (profile) {
                const profileData = profile as unknown as Profile;
                const currentTinta = profileData.tinta || 0;
                await supabase
                    .from('profiles')
                    // @ts-expect-error Supabase type generation issue
                    .update({ tinta: currentTinta + 500 })
                    .eq('id', user.id);
            }
        }

        revalidatePath('/belajar');
        revalidatePath('/dashboard');
        
        return { success: true };
    } catch {
        return { error: 'Failed to update progress' };
    }
}
