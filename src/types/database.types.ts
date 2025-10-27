export interface Database {
    public: {
        Tables: {
        profiles: {
            Row: {
            id: string;
            email: string;
            full_name: string | null;
            avatar_url: string | null;
            tinta: number;
            created_at: string;
            updated_at: string;
            };
            Insert: {
            id: string;
            email: string;
            full_name?: string | null;
            avatar_url?: string | null;
            tinta?: number;
            created_at?: string;
            updated_at?: string;
            };
            Update: {
            id?: string;
            email?: string;
            full_name?: string | null;
            avatar_url?: string | null;
            tinta?: number;
            created_at?: string;
            updated_at?: string;
            };
        };
        modules: {
            Row: {
            id: string;
            module_number: number;
            title: string;
            description: string | null;
            thumbnail_url: string | null;
            video_url: string | null;
            created_at: string;
            };
            Insert: {
            id?: string;
            module_number: number;
            title: string;
            description?: string | null;
            thumbnail_url?: string | null;
            video_url?: string | null;
            created_at?: string;
            };
            Update: {
            id?: string;
            module_number?: number;
            title?: string;
            description?: string | null;
            thumbnail_url?: string | null;
            video_url?: string | null;
            created_at?: string;
            };
        };
        questions: {
            Row: {
            id: string;
            module_number: number;
            difficulty: 'Mudah' | 'Sedang' | 'Sulit';
            question_number: number;
            question_text: string;
            option_a: string;
            option_b: string;
            option_c: string;
            option_d: string;
            correct_answer: 'A' | 'B' | 'C' | 'D';
            created_at: string;
            };
            Insert: {
            id?: string;
            module_number: number;
            difficulty: 'Mudah' | 'Sedang' | 'Sulit';
            question_number: number;
            question_text: string;
            option_a: string;
            option_b: string;
            option_c: string;
            option_d: string;
            correct_answer: 'A' | 'B' | 'C' | 'D';
            created_at?: string;
            };
            Update: {
            id?: string;
            module_number?: number;
            difficulty?: 'Mudah' | 'Sedang' | 'Sulit';
            question_number?: number;
            question_text?: string;
            option_a?: string;
            option_b?: string;
            option_c?: string;
            option_d?: string;
            correct_answer?: 'A' | 'B' | 'C' | 'D';
            created_at?: string;
            };
        };
        user_answers: {
            Row: {
            id: string;
            user_id: string;
            question_id: string;
            module_number: number;
            difficulty: string;
            user_answer: 'A' | 'B' | 'C' | 'D' | null;
            is_correct: boolean | null;
            answered_at: string;
            };
            Insert: {
            id?: string;
            user_id: string;
            question_id: string;
            module_number: number;
            difficulty: string;
            user_answer?: 'A' | 'B' | 'C' | 'D' | null;
            is_correct?: boolean | null;
            answered_at?: string;
            };
            Update: {
            id?: string;
            user_id?: string;
            question_id?: string;
            module_number?: number;
            difficulty?: string;
            user_answer?: 'A' | 'B' | 'C' | 'D' | null;
            is_correct?: boolean | null;
            answered_at?: string;
            };
        };
        video_progress: {
            Row: {
            id: string;
            user_id: string;
            module_number: number;
            watched: boolean;
            watched_at: string | null;
            created_at: string;
            };
            Insert: {
            id?: string;
            user_id: string;
            module_number: number;
            watched?: boolean;
            watched_at?: string | null;
            created_at?: string;
            };
            Update: {
            id?: string;
            user_id?: string;
            module_number?: number;
            watched?: boolean;
            watched_at?: string | null;
            created_at?: string;
            };
        };
        artworks: {
            Row: {
            id: string;
            title: string;
            description: string | null;
            image_url: string;
            required_tinta: number;
            created_at: string;
            };
            Insert: {
            id?: string;
            title: string;
            description?: string | null;
            image_url: string;
            required_tinta: number;
            created_at?: string;
            };
            Update: {
            id?: string;
            title?: string;
            description?: string | null;
            image_url?: string;
            required_tinta?: number;
            created_at?: string;
            };
        };
        user_artworks: {
            Row: {
            id: string;
            user_id: string;
            artwork_id: string;
            unlocked_at: string;
            };
            Insert: {
            id?: string;
            user_id: string;
            artwork_id: string;
            unlocked_at?: string;
            };
            Update: {
            id?: string;
            user_id?: string;
            artwork_id?: string;
            unlocked_at?: string;
            };
        };
        learning_progress: {
            Row: {
            id: string;
            user_id: string;
            module_number: number;
            difficulty: 'Mudah' | 'Sedang' | 'Sulit';
            completed: boolean;
            score: number;
            tinta_earned: number;
            completed_at: string | null;
            created_at: string;
            };
            Insert: {
            id?: string;
            user_id: string;
            module_number: number;
            difficulty: 'Mudah' | 'Sedang' | 'Sulit';
            completed?: boolean;
            score?: number;
            tinta_earned?: number;
            completed_at?: string | null;
            created_at?: string;
            };
            Update: {
            id?: string;
            user_id?: string;
            module_number?: number;
            difficulty?: 'Mudah' | 'Sedang' | 'Sulit';
            completed?: boolean;
            score?: number;
            tinta_earned?: number;
            completed_at?: string | null;
            created_at?: string;
            };
        };
        };
    };
}
