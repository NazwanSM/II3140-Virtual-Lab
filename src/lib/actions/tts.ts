'use server';

import { createClient } from '@/lib/supabase/server';

export type TTSGame = {
  id: string;
  title: string;
  description: string | null;
  difficulty: string | null;
  grid_size: number;
  created_at: string;
  updated_at: string;
  is_active: boolean;
};

export type TTSGridCell = {
  row: number;
  col: number;
  isBlocker: boolean;
  number: number | null;
};

export type TTSClue = {
  number: number;
  clue: string;
  answer: string;
  startRow: number;
  startCol: number;
  length: number;
};

export type TTSGameData = {
  game: TTSGame;
  grid: TTSGridCell[];
  cluesAcross: TTSClue[];
  cluesDown: TTSClue[];
};

export type TTSPlayerProgress = {
  id: string;
  user_id: string;
  game_id: string;
  current_state: Record<string, string> | null;
  is_completed: boolean;
  score: number;
  hints_used: number;
  time_spent: number;
  started_at: string;
  completed_at: string | null;
  last_played: string;
};

type TTSGridRow = {
  row_index: number;
  col_index: number;
  is_blocker: boolean;
  cell_number: number | null;
};

type TTSClueRow = {
  clue_number: number;
  clue_text: string;
  answer: string;
  start_row: number;
  start_col: number;
  length: number;
};

export async function getActiveTTSGames(): Promise<TTSGame[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('tts_games')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching TTS games:', error);
    return [];
  }

  return data || [];
}

export async function getTTSGameDetail(gameId: string): Promise<TTSGameData | null> {
  const supabase = await createClient();

  const { data: game, error: gameError } = await supabase
    .from('tts_games')
    .select('*')
    .eq('id', gameId)
    .single();

  if (gameError || !game) {
    console.error('Error fetching game:', gameError);
    return null;
  }

  const { data: gridData, error: gridError } = await supabase
    .from('tts_grid_structure')
    .select('row_index, col_index, is_blocker, cell_number')
    .eq('game_id', gameId)
    .order('row_index')
    .order('col_index');

  if (gridError) {
    console.error('Error fetching grid:', gridError);
    return null;
  }

  const { data: cluesAcrossData, error: acrossError } = await supabase
    .from('tts_clues_across')
    .select('clue_number, clue_text, answer, start_row, start_col, length')
    .eq('game_id', gameId)
    .order('clue_number');

  if (acrossError) {
    console.error('Error fetching clues across:', acrossError);
    return null;
  }

  const { data: cluesDownData, error: downError } = await supabase
    .from('tts_clues_down')
    .select('clue_number, clue_text, answer, start_row, start_col, length')
    .eq('game_id', gameId)
    .order('clue_number');

  if (downError) {
    console.error('Error fetching clues down:', downError);
    return null;
  }

  const grid: TTSGridCell[] = (gridData as TTSGridRow[]).map((cell) => ({
    row: cell.row_index,
    col: cell.col_index,
    isBlocker: cell.is_blocker,
    number: cell.cell_number,
  }));

  const cluesAcross: TTSClue[] = (cluesAcrossData as TTSClueRow[]).map((clue) => ({
    number: clue.clue_number,
    clue: clue.clue_text,
    answer: clue.answer,
    startRow: clue.start_row,
    startCol: clue.start_col,
    length: clue.length,
  }));

  const cluesDown: TTSClue[] = (cluesDownData as TTSClueRow[]).map((clue) => ({
    number: clue.clue_number,
    clue: clue.clue_text,
    answer: clue.answer,
    startRow: clue.start_row,
    startCol: clue.start_col,
    length: clue.length,
  }));

  return {
    game,
    grid,
    cluesAcross,
    cluesDown,
  };
}

export async function saveTTSProgress(
  gameId: string,
  currentState: Record<string, string>,
  isCompleted: boolean = false,
  score: number = 0,
  hintsUsed: number = 0,
  timeSpent: number = 0
): Promise<{ success: boolean; error?: string }> {
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'User not authenticated' };
  }

  // Upsert progress
  // @ts-expect-error Supabase type generation issue
  const { error } = await supabase.from('tts_player_progress').upsert(
    {
      user_id: user.id,
      game_id: gameId,
      current_state: currentState,
      is_completed: isCompleted,
      score: score,
      hints_used: hintsUsed,
      time_spent: timeSpent,
      completed_at: isCompleted ? new Date().toISOString() : null,
      last_played: new Date().toISOString(),
    },
    {
      onConflict: 'user_id,game_id',
    }
  );

  if (error) {
    console.error('Error saving progress:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function getTTSProgress(gameId: string): Promise<TTSPlayerProgress | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from('tts_player_progress')
    .select('*')
    .eq('user_id', user.id)
    .eq('game_id', gameId)
    .single();

  if (error) {
    console.error('Error fetching progress:', error);
    return null;
  }

  return data;
}

export async function getAllTTSProgress(): Promise<TTSPlayerProgress[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data, error } = await supabase
    .from('tts_player_progress')
    .select('*')
    .eq('user_id', user.id)
    .order('last_played', { ascending: false });

  if (error) {
    console.error('Error fetching all progress:', error);
    return [];
  }

  return data || [];
}
