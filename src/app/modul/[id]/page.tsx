import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import ModulPage, { Section } from '@/components/pages/modulPage';

interface ModuleContent {
    sections: {
        type?: "points" | "table";
        title: string;
        description?: string;
        points?: string[];
        table?: {
            headers: string[];
            rows: string[][];
        };
    }[];
}

interface Profile {
    full_name: string | null;
    tinta: number;
}

export default async function ModulPageWrapper({ params }: { params: Promise<{ id: string }> }) {
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
        .single() as { data: { id: number; module_number: number; title: string; description: string; content: ModuleContent } | null; error: Error | null };

    console.log('Module data:', module);
    console.log('Module error:', error);
    console.log('Params ID:', resolvedParams.id);

    if (!module || error) {
        console.error('Module not found or error:', error);
        notFound();
    }

    const transformedContent = {
        sections: module.content.sections.map(section => {
            if (section.type === "table" && section.table) {
                return {
                    type: "table" as const,
                    title: section.title,
                    description: section.description,
                    table: section.table
                };
            }
            return {
                type: "points" as const,
                title: section.title,
                description: section.description,
                points: section.points || []
            };
        }) as Section[]
    };

    return (
        <ModulPage
            materiId={module.id}
            materiNumber={module.module_number || 1}
            title={module.title}
            content={transformedContent}
            profile={profile || undefined}
        />
    );
}
