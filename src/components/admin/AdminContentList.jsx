import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, ShoppingBag, Plus } from 'lucide-react';
import { AlertDialogTrigger } from '@/components/ui/alert-dialog';

const AdminContentList = ({ activeTab, homeInfo, products, onEdit, onDeleteInitiate, onAddNew }) => {
  if (activeTab === 'home_info') {
    return (
      <Card className="bg-black/40 border-red-900/30">
        <CardHeader>
          <CardTitle className="text-white">Informações da Home</CardTitle>
          <CardDescription className="text-gray-400">Edite os dados principais da página inicial.</CardDescription>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          <p className="text-sm"><strong className="text-yellow-400">Nome do Artista:</strong> <span className="text-white">{homeInfo.artist_name}</span></p>
          <p className="text-sm"><strong className="text-yellow-400">Banner URL:</strong> <span className="text-white truncate">{homeInfo.banner_image_url || "Não definido"}</span></p>
          <p className="text-sm"><strong className="text-yellow-400">YouTube:</strong> <span className="text-white">{homeInfo.youtube_channel_url}</span></p>
          <p className="text-sm"><strong className="text-yellow-400">Instagram:</strong> <span className="text-white">{homeInfo.instagram_url}</span></p>
          <Button onClick={() => onEdit('home_info', { ...homeInfo })} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black">
            <Edit className="h-4 w-4 mr-2" /> Editar Informações
          </Button>
        </CardContent>
      </Card>
    );
  }

  const itemsToDisplay = products;
  const itemTypeLabel = 'Produto';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <ShoppingBag className="h-6 w-6 mr-3 text-yellow-400" /> Gerenciar Produtos
        </h2>
        <Button className="bg-yellow-500 hover:bg-yellow-600 text-black" onClick={() => onAddNew('products')}>
          <Plus className="h-4 w-4 mr-2" /> Adicionar Produto
        </Button>
      </div>
      {itemsToDisplay.length === 0 && (
        <Card className="bg-black/40 border-dashed border-red-900/50">
          <CardContent className="p-10 text-center">
            <ShoppingBag className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400">Nenhum produto encontrado.</h3>
            <p className="text-gray-500">Clique em "Adicionar Produto" para começar.</p>
          </CardContent>
        </Card>
      )}
      <div className="grid md:grid-cols-2 gap-6">
        {itemsToDisplay.map((item) => (
          <Card key={item.id} className="bg-black/40 border-red-900/30 hover-glow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <img-replace src={item.image_url || "https://via.placeholder.com/150x84"} alt={item.title || item.name} className="w-full h-40 object-cover rounded-md mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title || item.name}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.description}</p>
                  {item.price && (
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
                  <Button variant="outline" size="icon" onClick={() => onEdit('products', item)} className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => onDeleteInitiate('products', item.id)} className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
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

export default AdminContentList;
