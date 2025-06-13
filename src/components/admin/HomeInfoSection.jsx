import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Edit } from 'lucide-react';

const HomeInfoSection = ({ homeInfo, onEdit }) => {
  return (
    <Card className="bg-black/40 border-red-900/30">
      <CardHeader>
        <CardTitle className="text-white">Informações da Home</CardTitle>
        <CardDescription className="text-gray-400">Edite os dados principais da página inicial.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 space-y-3">
        <p className="text-sm"><strong className="text-yellow-400">Nome do Artista:</strong> <span className="text-white">{homeInfo.artist_name || "Não definido"}</span></p>
        <p className="text-sm"><strong className="text-yellow-400">Banner:</strong> <span className="text-white truncate">{homeInfo.banner_image_url || "Não definido"}</span></p>
        <p className="text-sm"><strong className="text-yellow-400">URL Canal YouTube:</strong> <span className="text-white">{homeInfo.youtube_channel_url || "Não definido"}</span></p>
        <p className="text-sm"><strong className="text-yellow-400">URL Instagram:</strong> <span className="text-white">{homeInfo.instagram_url || "Não definido"}</span></p>
        <p className="text-sm"><strong className="text-yellow-400">URL Twitter/X:</strong> <span className="text-white">{homeInfo.twitter_url || "Não definido"}</span></p>
        <Button onClick={() => onEdit({ type: 'home_info', data: { ...homeInfo } })} className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black">
          <Edit className="h-4 w-4 mr-2" /> Editar Informações da Home
        </Button>
      </CardContent>
    </Card>
  );
};

export default HomeInfoSection;