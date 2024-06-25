import { supabase } from './supabase';

export async function getSeries() {
  const { data, error } = await supabase.from('series').select('*');
  if (error) {
    throw error;
  }
  return data;
}

export async function getSeriesById(id: number) {
    const { data, error } = await supabase.from('series').select('*').eq('id', id);
    if (error) {
        throw error;
    }
    return data[0];
}

export async function getSerieComments(serieId: number) {
    const { data, error } = await supabase.from('reviews').select('*').eq('serie_id', serieId);
    if (error) {
        throw error;
    }
    return data;
}

export async function addSerieComment(serie_id: number, comment: string, stars: number, user_id: string) {
    const { data, error } = await supabase.from('reviews').insert([{ serie_id, comment, stars, user_id }]);
    if (error) {
        throw error;
    }
    return data;
}