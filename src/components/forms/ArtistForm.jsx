import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { uploadImageToSupabase } from '@/utils/uploadImage';

const ArtistForm = ({ data = {}, onSave }) => {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><Label>Nome do Artista</Label><Input name="artist_name" value={formData.artist_name || ''} onChange={handleChange} /></div>
      <div><Label>URL Imagem do Banner</Label><Input name="banner_image_url" value={formData.banner_image_url || ''} onChange={handleChange} /></div>
      <div><Label>YouTube</Label><Input name="youtube_channel_url" value={formData.youtube_channel_url || ''} onChange={handleChange} /></div>
      <div><Label>Instagram</Label><Input name="instagram_url" value={formData.instagram_url || ''} onChange={handleChange} /></div>
      <div><Label>Twitter/X</Label><Input name="twitter_url" value={formData.twitter_url || ''} onChange={handleChange} /></div>

      <div className="mt-4">
        <Label>Upload de Banner</Label>
        <Input type="file" accept="image/*" onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
          }
        }} />
        {imagePreview && <img src={imagePreview} className="mt-2 max-h-40" alt="Banner preview" />}
      </div>

      <Button type="submit" className="w-full">
        <Save className="mr-2" /> Salvar
      </Button>
    </form>
  );
};

export default ArtistForm;
