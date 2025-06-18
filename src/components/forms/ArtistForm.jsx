import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';
import { uploadImageToSupabase } from '@/utils/uploadImage';
import { motion } from 'framer-motion';

const ArtistForm = ({ data = {}, onSave, onCancel }) => {
  const [formData, setFormData] = useState(data);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    setFormData(data);
    setImagePreview(data.banner_image_url || null);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let bannerImageUrl = formData.banner_image_url;
    if (imageFile) {
      bannerImageUrl = await uploadImageToSupabase(imageFile, 'banners');
    }
    onSave({ ...formData, banner_image_url: bannerImageUrl });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-neutral-900 border border-red-700 rounded-2xl p-6 space-y-6 shadow-xl overflow-hidden"
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-yellow-400">Cadastro do Artista</h2>
          <Button onClick={onCancel} variant="ghost" size="icon" className="text-red-400 hover:text-red-200">
            <X />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <div><Label>Nome do Artista</Label><Input name="artist_name" value={formData.artist_name || ''} onChange={handleChange} /></div>
          <div><Label>URL Imagem do Banner</Label><Input name="banner_image_url" value={formData.banner_image_url || ''} onChange={handleChange} /></div>
          <div><Label>YouTube</Label><Input name="youtube_channel_url" value={formData.youtube_channel_url || ''} onChange={handleChange} /></div>
          <div><Label>Instagram</Label><Input name="instagram_url" value={formData.instagram_url || ''} onChange={handleChange} /></div>
          <div><Label>Twitter/X</Label><Input name="twitter_url" value={formData.twitter_url || ''} onChange={handleChange} /></div>

          <div>
            <Label>Upload de Banner</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImageFile(file);
                  const reader = new FileReader();
                  reader.onloadend = () => setImagePreview(reader.result);
                  reader.readAsDataURL(file);
                }
              }}
            />
            {imagePreview && (
              <img src={imagePreview} className="mt-2 max-h-48 w-full object-contain rounded-md border border-yellow-500/30" alt="Preview" />
            )}
          </div>

          <Button type="submit" className="w-full bg-yellow-500 text-black hover:bg-yellow-600">
            <Save className="mr-2" /> Salvar
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ArtistForm;
