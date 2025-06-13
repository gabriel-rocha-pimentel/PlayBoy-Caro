import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const artistName = "PlayBoy Caro";

  const mockProductsData = [
    {
      id: 1,
      name: "Camiseta PBC Trap Lord",
      description: "Represente o movimento com a camiseta oficial 'Trap Lord' de PlayBoy Caro. Confeccionada em malha 100% algodão penteado fio 30.1, oferece toque macio e durabilidade. Estampa frontal em silk de alta definição, resistente a lavagens. Modelagem street wear que garante conforto e estilo para o dia a dia ou para os shows. Um item indispensável para os verdadeiros fãs.",
      price: 129.90,
      image_url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
      images: [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633",
        "https://images.unsplash.com/photo-1576566588028-4147f3842f27",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf"
      ],
      tags: ["camiseta", "trap lord", "vestuário", "exclusivo", "algodão"],
      category: "roupas",
      sizes: ["P", "M", "G", "GG", "XG"],
      stock: 23,
      rating: 4.9,
      reviews: 78,
      product_url: "https://linkparasuacamisa.com"
    },
    // Adicionar mais produtos mock se necessário para testar diferentes IDs
  ];

  useEffect(() => {
    const foundProduct = mockProductsData.find(p => p.id.toString() === id);
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]); // Default to first size
      }
    } else {
      // Redirecionar ou mostrar página de não encontrado
      navigate('/loja'); // Ou uma página 404 específica
    }
  }, [id, navigate]);

  const handleBuyNow = () => {
    if (product.product_url) {
      window.open(product.product_url, '_blank');
    } else {
      toast({
        title: "🚧 Link de compra indisponível.",
        description: "O link para este produto ainda não foi configurado.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };
  
  const handleAction = (actionName) => {
     toast({
        title: `🚧 ${actionName} (simulação).`,
        description: "Este recurso não está implementado ainda—mas não se preocupe! Você pode solicitá-lo no seu próximo prompt! 🚀",
      });
  }


  const formatPrice = (price) => {
    if (typeof price !== 'number') return 'Preço indisponível';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-yellow-500 mx-auto mb-6"></div>
          <p className="text-xl text-white font-semibold">Carregando produto do {artistName}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
          <Button variant="ghost" onClick={() => navigate('/loja')} className="text-white hover:text-yellow-400 text-lg">
            <ArrowLeft className="h-5 w-5 mr-2" /> Voltar para Loja
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="space-y-5">
              <div className="aspect-w-1 aspect-h-1 rounded-2xl overflow-hidden shadow-2xl border-2 border-red-700/30">
                <img-replace src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
              </div>
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-4">
                  {product.images.slice(0, 3).map((image, index) => (
                    <div key={index} className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden cursor-pointer border border-red-700/20 hover:border-yellow-500 transition-all">
                      <img-replace src={image} alt={`${product.name} - Visualização ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="space-y-7">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">{product.name}</h1>
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`h-6 w-6 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />)}
                </div>
                <span className="text-white text-lg">{product.rating.toFixed(1)}</span>
                <span className="text-gray-400 text-lg">({product.reviews} avaliações)</span>
              </div>
              <div className="text-4xl font-extrabold gold-gradient mb-6">{formatPrice(product.price)}</div>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>

            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {product.tags.map((tag, index) => (
                  <span key={index} className="px-3.5 py-1.5 bg-red-800/50 text-yellow-300 text-sm rounded-full shadow-md">{tag}</span>
                ))}
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="text-white font-semibold text-xl mb-3">Tamanho: <span className="text-yellow-400">{selectedSize}</span></h3>
                <div className="flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => (
                    <Button key={size} variant={selectedSize === size ? 'default' : 'outline'} onClick={() => setSelectedSize(size)}
                      className={`py-2.5 px-5 text-base transition-all duration-200 ${selectedSize === size ? 'bg-yellow-500 hover:bg-yellow-600 text-black scale-105 shadow-lg' : 'border-red-600 text-red-400 hover:bg-red-700 hover:text-white'}`}>
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-white font-semibold text-xl mb-3">Quantidade:</h3>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="border-red-600 text-red-400 hover:bg-red-700 hover:text-white w-12 h-12 text-2xl">-</Button>
                <span className="text-white font-bold text-3xl w-12 text-center">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="border-red-600 text-red-400 hover:bg-red-700 hover:text-white w-12 h-12 text-2xl">+</Button>
              </div>
              <p className="text-green-400 text-md mt-3 flex items-center"><CheckCircle className="h-5 w-5 mr-2"/> {product.stock} unidades em estoque!</p>
            </div>

            <div className="space-y-4 pt-5">
              <Button onClick={handleBuyNow} className="w-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 hover:shadow-yellow-500/50 text-black font-bold py-4 text-xl shadow-xl transform hover:scale-105 transition-all duration-300">
                <ShoppingCart className="h-6 w-6 mr-3" /> COMPRAR AGORA - {formatPrice(product.price * quantity)}
              </Button>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => handleAction("Adicionar aos Favoritos")} className="flex-1 border-red-600 text-red-400 hover:bg-red-700 hover:text-white py-3 text-lg"><Heart className="h-5 w-5 mr-2" />Favoritar</Button>
                <Button variant="outline" onClick={() => handleAction("Compartilhar Produto")} className="flex-1 border-red-600 text-red-400 hover:bg-red-700 hover:text-white py-3 text-lg"><Share2 className="h-5 w-5 mr-2" />Compartilhar</Button>
              </div>
            </div>
            
            <div className="glass-effect rounded-xl p-6 space-y-3 mt-8 border border-yellow-500/30">
                <h3 className="text-xl font-semibold text-yellow-400 flex items-center"><ShieldCheck className="h-6 w-6 mr-2"/>Compra Segura e Autêntica</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                    <li>Produto 100% oficial {artistName}.</li>
                    <li>Materiais de alta qualidade e durabilidade.</li>
                    <li>Entrega rápida para todo o Brasil.</li>
                    <li>Pagamento seguro e facilitado.</li>
                </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;