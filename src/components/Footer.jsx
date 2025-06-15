import React from 'react';
import { Link } from 'react-router-dom';
import { MicOff as MicVocal, Instagram, Twitter, Youtube, Mail } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const { toast } = useToast();

  const handleSocialClick = (platformUrl) => {
    if (platformUrl) {
      window.open(platformUrl, '_blank');
    } else {
      toast({
        title: "🚧 Este recurso não está implementado ainda—mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
        duration: 3000,
      });
    }
  };

  const socialLinks = {
    instagram: 'https://www.instagram.com/playboycaro__oficial/', // Exemplo
    youtube: 'https://www.youtube.com/channel/@playboy__caro', // Exemplo
  };

  return (
    <footer className="bg-black/90 border-t border-red-900/30 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 red-gradient rounded-lg">
                <MicVocal className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold gold-gradient">
                PlayBoy Caro
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              PlayBoy Caro é o reflexo puro do luxo e do excesso. 
              Sua arte transborda dinheiro, mulheres, bebida e poder. 
              No topo do jogo, ele vive entre motores turbinados, drinks exclusivos e noites embaladas por batidas pesadas. 
              Sua presença é marcante: onde chega, o brilho aumenta, os olhares viram. Não é apenas um artista, é um estilo de vida.
            </p>
          </div>

          <div>
            <span className="text-lg font-semibold text-white mb-4 block">
              Navegação
            </span>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Home
              </Link>
              <Link to="/galeria" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Galeria
              </Link>
              <Link to="/loja" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Loja
              </Link>
              <Link to="/sobre" className="block text-gray-400 hover:text-yellow-400 transition-colors">
                Sobre
              </Link>
            </div>
          </div>

          <div>
            <span className="text-lg font-semibold text-white mb-4 block">
              Siga o PlayBoy Caro
            </span>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" onClick={() => handleSocialClick(socialLinks.instagram)} className="p-2 bg-red-900/20 rounded-lg hover:bg-red-900/40 transition-colors group">
                <Instagram className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleSocialClick(socialLinks.youtube)} className="p-2 bg-red-900/20 rounded-lg hover:bg-red-900/40 transition-colors group">
                <Youtube className="h-5 w-5 text-gray-400 group-hover:text-white" />
              </Button>
            </div>
            <div className="flex items-center space-x-2 text-gray-400 mt-4">
              <Mail className="h-4 w-4" />
              <span className="text-sm">murillolimadossantos127@gmail.com</span>
            </div>
          </div>
        </div>

        <div className="border-t border-red-900/30 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} PlayBoy Caro. Todos os direitos reservados. Criado com ❤️ por <br></br> <a href='https://techconnect.app.br' target='_blank'>Tech&Connect</a>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;