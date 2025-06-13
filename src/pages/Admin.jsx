
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LogOut, CheckCircle, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import AdminForm from '@/components/admin/AdminForm';
import AdminContentList from '@/components/admin/AdminContentList';
import AdminTabs from '@/components/admin/AdminTabs';
import AdminLogin from '@/components/admin/AdminLogin';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('home_info');
  const [editingItem, setEditingItem] = useState(null);
  const { toast } = useToast();

  const [homeInfo, setHomeInfo] = useState({
    id: null,
    artist_name: "PlayBoy Caro",
    banner_image_url: "",
    youtube_channel_url: "https://www.youtube.com/@MurilloLimadossantos-b4h",
    instagram_url: "https://www.instagram.com/@playboy_caro/",
    twitter_url: "https://twitter.com/playboycaro_oficial",
  });

  const [galleryItems, setGalleryItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    checkUser();
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      fetchHomeInfo();
      fetchGalleryItems();
      fetchProducts();
    }
  }, [user, toast]);

  const fetchHomeInfo = async () => {
    const { data, error } = await supabase.from('artist_info').select('*').limit(1).single();
    if (error && error.code !== 'PGRST116') { 
      toast({ title: 'Erro ao buscar informações da Home', description: error.message, variant: 'destructive' });
    } else if (data) {
      setHomeInfo(prev => ({...prev, ...data}));
    }
  };

  const fetchGalleryItems = async () => {
    const { data, error } = await supabase.from('gallery').select('*').order('created_at', { ascending: false });
    if (error) toast({ title: 'Erro ao buscar itens da Galeria', description: error.message, variant: 'destructive' });
    else setGalleryItems(data || []);
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (error) toast({ title: 'Erro ao buscar Produtos', description: error.message, variant: 'destructive' });
    else setProducts(data || []);
  };

  const handleLoginAttempt = async (email, password) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast({ title: 'Erro no Login', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Login bem-sucedido!', description: `Bem-vindo, ${email}!`, icon: <CheckCircle className="h-5 w-5 text-green-500" /> });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) toast({ title: 'Erro no Logout', description: error.message, variant: 'destructive' });
    else toast({ title: 'Logout realizado com sucesso!', icon: <LogOut className="h-5 w-5" /> });
    setLoading(false);
  };

  const handleSave = async (formData) => {
    if (!editingItem) return;
    const { type } = editingItem;
    let error;
    let updatedData = { ...formData };

    if (formData.image_file) {
      const file = formData.image_file;
      const fileName = `${Date.now()}_${file.name.replace(/\s/g, '_')}`;
      const filePath = `${type === 'products' ? 'products' : (type === 'gallery' ? 'music_banner' : 'banners')}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        toast({ title: 'Erro no Upload da Imagem', description: uploadError.message, variant: 'destructive' });
        return;
      }
      
      const { data: { publicUrl } } = supabase.storage.from('images').getPublicUrl(filePath);
      updatedData.image_url = publicUrl;
      delete updatedData.image_file; 
    }


    if (type === 'home_info') {
      const { id, ...dataToSave } = updatedData;
      if (id) {
        ({ error } = await supabase.from('artist_info').update(dataToSave).eq('id', id));
      } else {
        ({ error } = await supabase.from('artist_info').insert(dataToSave).select().single());
      }
      if (!error) fetchHomeInfo();
    } else if (type === 'gallery') {
      const { id, ...dataToSave } = updatedData;
      if (id) {
        ({ error } = await supabase.from('gallery').update(dataToSave).eq('id', id));
      } else {
        ({ error } = await supabase.from('gallery').insert(dataToSave));
      }
      if (!error) fetchGalleryItems();
    } else if (type === 'products') {
      const { id, ...dataToSave } = updatedData;
      if (id) {
        ({ error } = await supabase.from('products').update(dataToSave).eq('id', id));
      } else {
        ({ error } = await supabase.from('products').insert(dataToSave));
      }
      if (!error) fetchProducts();
    }

    if (error) {
      toast({ title: 'Erro ao Salvar', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Salvo com Sucesso!', description: `${type.replace('_', ' ')} atualizado(a).`, icon: <CheckCircle className="h-5 w-5 text-green-500" /> });
    }
    setEditingItem(null);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    const { type, id } = itemToDelete;
    let error;

    if (type === 'gallery') {
      ({ error } = await supabase.from('gallery').delete().eq('id', id));
      if (!error) fetchGalleryItems();
    } else if (type === 'products') {
      ({ error } = await supabase.from('products').delete().eq('id', id));
      if (!error) fetchProducts();
    }

    if (error) {
      toast({ title: 'Erro ao Excluir', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Excluído com Sucesso!', icon: <Trash2 className="h-5 w-5 text-red-500" /> });
    }
    setItemToDelete(null);
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center py-20 px-4">
        <AdminLogin onLogin={handleLoginAttempt} loading={loading} />
      </div>
    );
  }
  
  return (
    <AlertDialog>
      <div className="min-h-screen py-20 px-4">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-2"><span className="gold-gradient">Admin PlayBoy Caro</span></h1>
            <p className="text-gray-400 text-lg">Logado como: <span className="text-yellow-400">{user.email}</span></p>
          </motion.div>

          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <AdminContentList
              activeTab={activeTab}
              homeInfo={homeInfo}
              galleryItems={galleryItems}
              products={products}
              onEdit={(type, data) => setEditingItem({ type, data })}
              onDeleteInitiate={(type, id) => setItemToDelete({ type, id })}
              onAddNew={(type) => setEditingItem({ type, data: type === 'home_info' ? { ...homeInfo } : (type === 'gallery' ? { title: '', description: '', image_url: '', youtube_url:'', tags: [] } : { name: '', description: '', image_url: '', price: 0, tags: [], product_url: '' })})}
            />
          </motion.div>

          {editingItem && (
            <AdminForm
              item={editingItem}
              onSave={handleSave}
              onCancel={() => setEditingItem(null)}
            />
          )}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="text-center mt-16">
            <Button variant="outline" onClick={handleLogout} className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white px-8 py-3 text-lg" disabled={loading}>
              <LogOut className="h-5 w-5 mr-2" />{loading ? 'Saindo...' : 'Sair do Painel'}
            </Button>
          </motion.div>
        </div>
      </div>
      <AlertDialogContent className="bg-black/90 border-red-700 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-yellow-400 text-2xl">Confirmar Exclusão</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita e o item será removido permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setItemToDelete(null)} className="border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white">Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700 text-white">Confirmar Exclusão</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Admin;
