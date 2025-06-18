// components/forms/ProductForm.js
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { uploadImageToSupabase } from '@/utils/uploadImage';

const ProductForm = ({ data = {}, onSave }) => {
  const [formData, setFormData] = useState(data);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (data) {
      setFormData(data);
      setImagePreview(data.image_url || null);
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formData.image_url;
    if (imageFile) {
      imageUrl = await uploadImageToSupabase(imageFile, 'products');
    }
    onSave({ ...formData, image_url: imageUrl });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div><Label>Nome</Label><Input name="name" value={formData.name || ''} onChange={handleChange} /></div>
      <div><Label>Descrição</Label><Textarea name="description" value={formData.description || ''} onChange={handleChange} /></div>
      <div><Label>URL Imagem</Label><Input name="image_url" value={formData.image_url || ''} onChange={handleChange} /></div>
      <div><Label>Preço</Label><Input type="number" name="price" step="0.01" value={formData.price || 0} onChange={handleChange} /></div>
      <div><Label>URL Produto</Label><Input name="product_url" value={formData.product_url || ''} onChange={handleChange} /></div>
      <div><Label>Categoria</Label><Input name="category" value={formData.category || ''} onChange={handleChange} /></div>
      <div><Label>Estoque</Label><Input type="number" name="stock" value={formData.stock || 0} onChange={handleChange} /></div>
      <div><Label>Tags</Label><Input name="tags" value={(formData.tags || []).join(', ')} onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })} /></div>

      <div className="mt-4">
        <Label>Upload de Imagem</Label>
        <Input type="file" accept="image/*" onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
          }
        }} />
        {imagePreview && <img src={imagePreview} className="mt-2 max-h-40" alt="Preview" />}
      </div>

      <Button type="submit" className="w-full">
        <Save className="mr-2" /> Salvar
      </Button>
    </form>
  );
};

export default ProductForm;
