import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save, X } from 'lucide-react';
import { uploadImageToSupabase } from '@/utils/uploadImage';
import { motion } from 'framer-motion';

const ProductForm = ({ data = {}, onSave, onCancel }) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-neutral-900 border border-red-700 rounded-2xl p-6 space-y-6 shadow-xl overflow-hidden"
      >
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold text-yellow-400">Cadastro de Produto</h2>
          <Button onClick={onCancel} variant="ghost" size="icon" className="text-red-400 hover:text-red-200">
            <X />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          <div>
            <Label>Nome do Produto</Label>
            <Input name="name" value={formData.name || ''} onChange={handleChange} />
          </div>

          <div>
            <Label>Descrição</Label>
            <Textarea name="description" value={formData.description || ''} onChange={handleChange} />
          </div>

          <div>
            <Label>URL da Imagem</Label>
            <Input name="image_url" value={formData.image_url || ''} onChange={handleChange} />
          </div>

          <div>
            <Label>Preço</Label>
            <Input type="number" name="price" step="0.01" value={formData.price || 0} onChange={handleChange} />
          </div>

          <div>
            <Label>URL do Produto (externo)</Label>
            <Input name="product_url" value={formData.product_url || ''} onChange={handleChange} />
          </div>

          <div>
            <Label>Categoria</Label>
            <Input name="category" value={formData.category || ''} onChange={handleChange} />
          </div>

          <div>
            <Label>Estoque</Label>
            <Input type="number" name="stock" value={formData.stock || 0} onChange={handleChange} />
          </div>

          <div>
            <Label>Tags (separadas por vírgula)</Label>
            <Input
              name="tags"
              value={(formData.tags || []).join(', ')}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value.split(',').map((t) => t.trim()) })
              }
            />
          </div>

          <div>
            <Label>Upload de Imagem</Label>
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
              <img
                src={imagePreview}
                className="mt-2 max-h-48 w-full object-contain rounded-md border border-yellow-500/30"
                alt="Pré-visualização da Imagem"
              />
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

export default ProductForm;
