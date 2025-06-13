import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash2, Plus, Film, ShoppingBag } from 'lucide-react';
import { AlertDialogTrigger } from '@/components/ui/alert-dialog';

const ManageItemsSection = ({ items, itemTypeLabel, itemIcon: ItemIcon, onEdit, onDeletePrompt, onAdd }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <ItemIcon className="h-6 w-6 mr-3 text-yellow-400" /> Gerenciar {itemTypeLabel}
        </h2>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-2" /> Adicionar {itemTypeLabel === 'Galeria' ? 'Item na Galeria' : 'Produto'}
        </Button>
      </div>
      {items.length === 0 && (
        <Card className="bg-black/40 border-dashed border-red-900/50">
          <CardContent className="p-10 text-center">
            <ItemIcon className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400">Nenhum {itemTypeLabel === 'Galeria' ? 'item na galeria' : 'produto'} encontrado.</h3>
            <p className="text-gray-500">Clique em "Adicionar" para começar.</p>
          </CardContent>
        </Card>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item) => (
          <Card key={item.id} className="bg-black/40 border-red-900/30 hover-glow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <img-replace 
                    src={item.image_url || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=100&fit=crop`} 
                    alt={item.title || item.name} 
                    className="w-full h-40 object-cover rounded-md mb-3" 
                  />
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title || item.name}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                  {itemTypeLabel === 'Produtos' && item.price && (
                    <p className="text-yellow-400 font-bold mb-3 text-lg">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.price)}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {(item.tags || []).map((tag, index) => (
                      <span key={index} className="px-2.5 py-1 bg-red-900/40 text-yellow-300 text-xs rounded-full shadow">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col space-y-2 ml-4">
                  <Button variant="outline" size="icon" onClick={() => onEdit({ type: itemTypeLabel === 'Galeria' ? 'gallery' : 'products', data: item })} className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => onDeletePrompt({ type: itemTypeLabel === 'Galeria' ? 'gallery' : 'products', id: item.id })} className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ManageItemsSection;