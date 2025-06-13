import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Image as ImageIcon, XCircle, UploadCloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdminForm = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (item?.data) {
      setFormData(item.data);
      setImagePreview(item.data.image_url || null);
      setImageFile(null);
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "tags") {
      setFormData(prev => ({ ...prev, [name]: value.split(',').map(tag => tag.trim()) }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSave = { ...formData };
    if (imageFile) {
      dataToSave.image_file = imageFile; 
    }
    onSave(dataToSave);
  };
  
  const formType = item?.type;
  const commonIdentifier = formData.title || formData.name || formData.artist_name;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="bg-black/95 border-2 border-red-700 rounded-xl p-6 md:p-8 w-full max-w-lg shadow-2xl shadow-red-700/30 my-8"
      >
        <CardHeader className="p-0 mb-6 text-center">
          <CardTitle className="text-2xl font-bold gold-gradient">
            {formData.id || (formType === 'home_info' && formData.artist_name) ? 'Editar ' : 'Adicionar Novo '} 
            {formType === 'home_info' ? 'Conteúdo da Home' : formType === 'gallery' ? 'Item na Galeria' : 'Produto na Loja'}
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-5 max-h-[70vh] overflow-y-auto pr-2 scrollbar-hide">
          {formType === 'home_info' ? (
            <>
              <div><Label htmlFor="artist_name" className="text-white">Nome do Artista</Label><Input id="artist_name" name="artist_name" value={formData.artist_name || ''} onChange={handleChange} className="bg-black/40 border-red-900/30 text-white" /></div>
              <div><Label htmlFor="banner_image_url" className="text-white">URL Imagem Banner (ou Upload Abaixo)</Label><Input id="banner_image_url" name="banner_image_url" value={formData.banner_image_url || ''} onChange={handleChange} className="bg-black/40 border-red-900/30 text-white" /></div>
              <div><Label htmlFor="youtube_channel_url" className="text-white">URL Canal YouTube</Label><Input id="youtube_channel_url" name="youtube_channel_url" value={formData.youtube_channel_url || ''} onChange={handleChange} className="bg-black/40 border-red-900/30 text-white" /></div>
              <div><Label htmlFor="instagram_url" className="text-white">URL Instagram</Label><Input id="instagram_url" name="instagram_url" value={formData.instagram_url || ''} onChange={handleChange} className="bg-black/40 border-red-900/30 text-white" /></div>
              <div><Label htmlFor="twitter_url" className="text-white">URL Twitter/X</Label><Input id="twitter_url" name="twitter_url" value={formData.twitter_url || ''} onChange={handleChange} className="bg-black/40 border-red-900/30 text-white" /></div>
            </>
          ) : (
            <>
              <div>
                <Label htmlFor={formType === 'products' ? "name" : "title"} className="text-white">{formType === 'products' ? "Nome do Produto" : "Título do Vídeo"}</Label>
                <Input id={formType === 'products' ? "name" : "title"} name={formType === 'products' ? "name" : "title"} value={commonIdentifier || ''} onChange={handleChange} className="bg-black/40 border-red-900/30 text-white" />
              </div>
              <div>
                <Label htmlFor="description" className="text-white">Descrição</Label>
                <Textarea id="description" name="description" value={formData.description || ''} onChange={handleChange} className="bg-black/40 border-red-900/30 text-white" />
              </div>
              <div>
                <Label htmlFor="image_url" className="text-white">URL da Imagem (ou Upload Abaixo)</Label>
                <Input id="image_url" name="image_url" value={formData.image_url || ''} onChange={handleChange} className="bg-black/40 border-red-900/30 text-white" />
              </div>
              {formType === 'gallery' && (
                <div>
                  <Label htmlFor="youtube_url" className="text-white">URL do Vídeo no YouTube</Label>
                  <Input id="youtube_url" name="youtube_url" value={formData.youtube_url || ''} onChange={handleChange} className="bg-black/40 border-red-900/30 text-white" />
                </div>
              )}
              {formType === 'products' && (
                <>
                  <div>
                    <Label htmlFor="price" className="text-white">Preço (ex: 99.90)</Label>
                    <Input id="price" name="price" type="number" step="0.01" value={formData.price || ''} onChange={handleChange} className="bg-black/40 border-red-900/30 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="product_url" className="text-white">URL de Compra do Produto (Externo)</Label>
                    <Input id="product_url" name="product_url" value={formData.product_url || ''} onChange={handleChange} className="bg-black/40 border-red-900/30 text-white" />
                  </div>
                   <div>
                    <Label htmlFor="category" className="text-white">Categoria</Label>
                    <Input id="category" name="category" value={formData.category || ''} onChange={handleChange} className="bg-black/40 border-red-900/30 text-white" />
                  </div>
                   <div>
                    <Label htmlFor="stock" className="text-white">Estoque</Label>
                    <Input id="stock" name="stock" type="number" value={formData.stock || 0} onChange={handleChange} className="bg-black/40 border-red-900/30 text-white" />
                  </div>
                </>
              )}
              <div>
                <Label htmlFor="tags" className="text-white">Tags (separadas por vírgula)</Label>
                <Input id="tags" name="tags" value={(formData.tags || []).join(', ')} onChange={handleChange} className="bg-black/40 border-red-900/30 text-white" />
              </div>
            </>
          )}
          
          <div>
            <Label htmlFor="image_file_upload" className="text-white mb-2 block">Upload Nova Imagem</Label>
            <div className="flex items-center space-x-4">
              <label htmlFor="image_file_upload" className="flex-1 cursor-pointer bg-red-800/60 hover:bg-red-700/80 text-yellow-300 font-semibold py-2.5 px-4 rounded-md transition-colors duration-200 text-center">
                <UploadCloud className="inline-block h-5 w-5 mr-2 align-middle" /> {imageFile ? imageFile.name : "Escolher Arquivo"}
              </label>
              <Input id="image_file_upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              {imagePreview && (
                <Button type="button" variant="ghost" size="icon" onClick={() => { setImagePreview(null); setImageFile(null); setFormData(prev => ({...prev, image_url: ''})); }} className="text-red-500 hover:text-red-400">
                  <XCircle className="h-6 w-6" />
                </Button>
              )}
            </div>
            {imagePreview && (
              <div className="mt-4 border-2 border-dashed border-yellow-500/50 p-2 rounded-md">
                <img-replace src={imagePreview} alt="Pré-visualização da Imagem" className="w-full max-h-48 object-contain rounded" />
              </div>
            )}
            <p className="text-xs text-gray-400 mt-2">
              {formType === 'products' ? 'Enviar para images/products. ' : formType === 'gallery' ? 'Enviar para images/music_banner. ' : 'Enviar para images/banners. '}
              Se uma URL for fornecida no campo acima e um arquivo for carregado, o arquivo carregado terá precedência.
            </p>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button type="submit" className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold py-3">
              <Save className="h-5 w-5 mr-2" />Salvar
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 border-red-600 text-red-400 hover:bg-red-600 hover:text-white py-3">
              Cancelar
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminForm;