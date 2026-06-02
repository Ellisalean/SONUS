import { supabase } from './supabase';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface SupabaseErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

export function handleSupabaseError(error: any, operationType: OperationType, table: string | null) {
  const errInfo: SupabaseErrorInfo = {
    error: error?.message || String(error),
    operationType,
    path: table
  }
  console.error('Supabase Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Entity: Song
export interface Song {
  id: string;
  title: string;
  artist: string;
  pdf_url?: string;
  chords: string;
}

export interface Setlist {
  id: string;
  name: string;
  date: string;
  song_ids: string[];
}

const SONGS_TABLE = 'songs_v4';
const SETLISTS_TABLE = 'setlists';

export async function getSongs(): Promise<Song[]> {
  try {
    const { data, error } = await supabase.from(SONGS_TABLE).select('*');
    if (error) throw error;
    return data || [];
  } catch (error) {
    handleSupabaseError(error, OperationType.LIST, SONGS_TABLE);
    return [];
  }
}

export function subscribeToSongs(callback: (songs: Song[]) => void): () => void {
  const channel = supabase
    .channel('songs_v4')
    .on('postgres_changes', { event: '*', schema: 'public', table: SONGS_TABLE }, (payload) => {
      console.log('Change received!', payload);
      getSongs().then(callback);
    })
    .subscribe();
    
  return () => {
    supabase.removeChannel(channel);
  };
}

export async function addSong(song: Omit<Song, 'id'>, id: string): Promise<string> {
  try {
    const { data, error } = await supabase.from(SONGS_TABLE).select('id').eq('title', song.title).eq('artist', song.artist);
    if (error) throw error;
    if (data && data.length > 0) {
        return data[0].id;
    }

    const { data: inserted, error: insertError } = await supabase.from(SONGS_TABLE).insert({ ...song, id }).select('id');
    if (insertError) throw insertError;
    return inserted[0].id;
  } catch (error) {
    handleSupabaseError(error, OperationType.CREATE, SONGS_TABLE);
    return '';
  }
}

export async function updateSong(id: string, song: Partial<Song>): Promise<void> {
  try {
    const { error } = await supabase.from(SONGS_TABLE).update(song).eq('id', id);
    if (error) throw error;
  } catch (error) {
    handleSupabaseError(error, OperationType.UPDATE, `${SONGS_TABLE}/${id}`);
  }
}

export async function deleteSong(id: string): Promise<void> {
  try {
    const { error } = await supabase.from(SONGS_TABLE).delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    handleSupabaseError(error, OperationType.DELETE, `${SONGS_TABLE}/${id}`);
  }
}

export async function hardDeleteAllSongs(): Promise<void> {
    try {
        // Delete all rows by using a filter that matches everything
        await supabase.from(SONGS_TABLE).delete().neq('id', '00000000-0000-0000-0000-000000000000');
    } catch (error) {
        console.error('Error hard deleting songs:', error);
    }
}

export async function getSetlists(): Promise<Setlist[]> {
  try {
    const { data, error } = await supabase.from(SETLISTS_TABLE).select('*');
    if (error) throw error;
    return data || [];
  } catch (error) {
    handleSupabaseError(error, OperationType.LIST, SETLISTS_TABLE);
    return [];
  }
}

export async function addSetlist(setlist: Omit<Setlist, 'id'>): Promise<string> {
  try {
    const { data, error } = await supabase.from(SETLISTS_TABLE).insert(setlist).select('id');
    if (error) throw error;
    return data[0].id;
  } catch (error) {
    handleSupabaseError(error, OperationType.CREATE, SETLISTS_TABLE);
    return '';
  }
}

export async function updateSetlist(id: string, setlist: Partial<Setlist>): Promise<void> {
  try {
    const { error } = await supabase.from(SETLISTS_TABLE).update(setlist).eq('id', id);
    if (error) throw error;
  } catch (error) {
    handleSupabaseError(error, OperationType.UPDATE, `${SETLISTS_TABLE}/${id}`);
  }
}

export async function deleteSetlist(id: string): Promise<void> {
  try {
    const { error } = await supabase.from(SETLISTS_TABLE).delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    handleSupabaseError(error, OperationType.DELETE, `${SETLISTS_TABLE}/${id}`);
  }
}
