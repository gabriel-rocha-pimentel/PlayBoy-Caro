import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const ProductCard = ({ product, index }) => {
  const { toast } = useToast();

  const handleBuyClick = () => {
     if (product.product_url) {
      window.open(product.product_url, '_blank');
    } else {
      toast({
        title: "🚧 Este recurso não está implementado ainda—mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
        description: "Link de compra do produto não configurado.",
        duration: 3000,
      });
    }
  };

  const formatPrice = (price) => {
    if (typeof price !== 'number') return 'Preço indisponível';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="bg-black/40 border-red-900/30 hover-glow overflow-hidden">
        <div className="relative">
          <img 
            className="w-full h-60 object-cover transition-transform group-hover:scale-105"
            alt={product.name || "Produto Oficial PlayBoy Caro"}
           src={product.image_url || "https://images.unsplash.com/photo-1697862040431-f149c8e1ac9d"} />
          
          <div className="absolute top-2 right-2">
            <span className="bg-yellow-500 text-black px-3 py-1.5 rounded-full text-sm font-bold shadow-md">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-yellow-400 transition-colors truncate">
            {product.name || "Produto Oficial"}
          </h3>
          <p className="text-gray-400 text-sm mb-3 line-clamp-3 h-16">
            {product.description || "Descrição detalhada do produto oficial do PlayBoy Caro."}
          </p>
          
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {product.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="px-2.5 py-1 bg-red-900/40 text-yellow-300 text-xs rounded-full shadow"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <div className="text-2xl font-bold text-yellow-400">
            {formatPrice(product.price)}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleBuyClick}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Comprar Merch Oficial
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProductCard;