import { supabase } from '@/lib/supabase';

export const uploadImageToSupabase = async (file, folder) => {
  if (!file || !folder) return null;

  const fileExt = file.name.split('.').pop();
  const uniqueFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `${folder}/${uniqueFileName}`;

  const { data, error } = await supabase.storage.from('images').upload(filePath, file, {
    cacheControl: '3600',
    upsert: true,
  });

  if (error) {
    console.error('Erro ao fazer upload da imagem no Supabase:', error);
    return null;
  }

  const { data: urlData } = supabase.storage.from('images').getPublicUrl(filePath);
  return urlData?.publicUrl || null;
};
