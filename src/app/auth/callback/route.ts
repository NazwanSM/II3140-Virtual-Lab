import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get('code');
    const origin = requestUrl.origin;

    if (code) {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        
        if (error) {
            console.error('Error exchanging code for session:', error);
            return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
        }

        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            const { data: existingProfile } = await supabase
                .from('profiles')
                .select('id')
                .eq('id', user.id)
                .single();

            if (!existingProfile) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    // @ts-expect-error Supabase generated types issue
                    .insert({
                        id: user.id,
                        full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
                        email: user.email,
                        tinta: 0,
                        avatar_url: user.user_metadata?.avatar_url || null,
                    });

                if (profileError) {
                    console.error('Error creating profile:', profileError);
                }
            }
        }
    }

    return NextResponse.redirect(`${origin}/dashboard`);
}
