'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

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
            const currentProgress = (existingProgress as any).progress || 0;
            let newProgress = currentProgress;

            if (progressType === 'modul' && !(existingProgress as any).modul_viewed) {
                newProgress += 20;
                shouldAddTinta = true;
                
                await supabase
                    .from('learning_progress')
                    .update({ 
                        progress: newProgress,
                        modul_viewed: true,
                        completed: newProgress >= 100
                    } as any)
                    .eq('user_id', user.id)
                    .eq('module_id', moduleId)
                    .select();
            } else if (progressType === 'video' && !(existingProgress as any).video_viewed) {
                newProgress += 20;
                shouldAddTinta = true;
                
                await supabase
                    .from('learning_progress')
                    .update({ 
                        progress: newProgress,
                        video_viewed: true,
                        completed: newProgress >= 100
                    } as any)
                    .eq('user_id', user.id)
                    .eq('module_id', moduleId)
                    .select();
            }
        } else {
            const initialProgress = 20;
            shouldAddTinta = true;
            
            await supabase
                .from('learning_progress')
                .insert({
                    user_id: user.id,
                    module_id: moduleId,
                    progress: initialProgress,
                    modul_viewed: progressType === 'modul',
                    video_viewed: progressType === 'video',
                    completed: false
                } as any)
                .select();
        }

        if (shouldAddTinta) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('tinta')
                .eq('id', user.id)
                .single();

            if (profile) {
                const currentTinta = (profile as any).tinta || 0;
                await supabase
                    .from('profiles')
                    .update({ tinta: currentTinta + 500 } as any)
                    .eq('id', user.id);
            }
        }

        revalidatePath('/belajar');
        revalidatePath('/dashboard');
        
        return { success: true };
    } catch (error) {
        return { error: 'Failed to update progress' };
    }
}
