import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, ShoppingBag, Shirt, Disc3, Headphones as Headset, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const artistName = "PlayBoy Caro";
  const { toast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({ title: 'Erro ao buscar produtos da loja', description: error.message, variant: 'destructive' });
        setProducts([]);
      } else {
        setProducts(data || []);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [toast]);

  useEffect(() => {
    let filtered = products;
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const categories = [
    { value: "", label: "Todas", icon: ShoppingBag },
    { value: "roupas", label: "Roupas", icon: Shirt },
    { value: "acessórios", label: "Acessórios", icon: Headset },
    { value: "música", label: "Música", icon: Disc3 }
  ];

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="gold-gradient">Loja Oficial {artistName}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Adquira os produtos exclusivos e mostre seu apoio ao brabo do trap.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 glass-effect p-6 rounded-xl max-w-4xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar por nome ou descrição do produto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-3 bg-black/50 border-red-700/50 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-yellow-500 text-base"
              />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(cat => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat.value)}
                className={`transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  selectedCategory === cat.value 
                  ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-lg' 
                  : 'border-red-700 text-red-400 hover:bg-red-700 hover:text-white'
                }`}
              >
                <cat.icon className="h-4 w-4 mr-2" />
                {cat.label}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-500 mx-auto mb-4"></div>
              <p className="text-white text-xl">Carregando produtos...</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 glass-effect rounded-xl">
              <ShoppingBag className="text-6xl mb-6 text-yellow-400 mx-auto music-note" />
              <h3 className="text-2xl font-semibold text-white mb-2">
                Nenhum produto encontrado {searchTerm || selectedCategory ? `para "${searchTerm || selectedCategory}"` : ''}
              </h3>
              <p className="text-gray-400">
                {searchTerm || selectedCategory ? 'Tente refinar sua busca ou selecionar outra categoria.' : 'Ainda não há produtos na loja. Volte em breve!'}
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Envio Nacional", desc: "Receba seu merch em todo o Brasil.", icon: "🚚" },
              { title: "Produtos de Qualidade", desc: "Garanta a autenticidade e qualidade do seu estilo.", icon: "⭐" },
              { title: "Pagamento Seguro", desc: "Compra protegida com as melhores plataformas.", icon: "🔒" }
            ].map(info => (
              <div key={info.title} className="glass-effect rounded-xl p-8 text-center hover-glow">
                <div className="text-4xl mx-auto mb-4">{info.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {info.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {info.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Store;