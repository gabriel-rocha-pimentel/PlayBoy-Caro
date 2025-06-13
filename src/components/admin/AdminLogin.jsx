
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, MicOff as MicVocal, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

const AdminLogin = ({ onLogin, loading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: 'admin@playboycaro.com', password: 'SenhaForte123!' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginForm.email, loginForm.password);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.6 }} 
      className="w-full max-w-md"
    >
      <Card className="bg-black/50 border-2 border-red-700 shadow-xl shadow-red-700/30">
        <CardHeader className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <MicVocal className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold gold-gradient">PlayBoy Caro - Admin</CardTitle>
          <CardDescription className="text-gray-300">Acesso restrito ao painel de controle.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email-login" className="text-yellow-400">Email</Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  id="email-login" 
                  type="email" 
                  placeholder="admin@playboycaro.com" 
                  value={loginForm.email} 
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })} 
                  className="pl-10 bg-black/60 border-red-700/50 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-yellow-500" 
                  required 
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password-login" className="text-yellow-400">Senha</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input 
                  id="password-login" 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  value={loginForm.password} 
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} 
                  className="pl-10 pr-10 bg-black/60 border-red-700/50 text-white placeholder-gray-500 focus:border-yellow-500 focus:ring-yellow-500" 
                  required 
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white font-bold py-3 text-lg shadow-md hover:shadow-lg transition-all duration-300" 
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar no Painel'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="pt-6">
            <Card className="w-full bg-yellow-900/20 border-yellow-700/50 p-4">
                <CardHeader className="p-0 pb-2">
                    <CardTitle className="text-yellow-400 text-sm flex items-center">
                        <Info className="h-4 w-4 mr-2" /> Credenciais de Demonstração
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-xs text-yellow-200 space-y-1">
                    <p><strong>Email:</strong> admin@playboycaro.com</p>
                    <p><strong>Senha:</strong> SenhaForte123!</p>
                    <p className="text-yellow-300/70 italic pt-1">Certifique-se de que este usuário existe no Supabase Auth.</p>
                </CardContent>
            </Card>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AdminLogin;
