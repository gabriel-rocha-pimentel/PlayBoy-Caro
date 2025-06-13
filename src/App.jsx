
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Gallery from '@/pages/Gallery';
import Store from '@/pages/Store';
import About from '@/pages/About';
import Admin from '@/pages/Admin';
import ProductPage from '@/pages/ProductPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen gradient-bg">
        <Header />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/galeria" element={<Gallery />} />
            <Route path="/loja" element={<Store />} />
            <Route path="/produto/:id" element={<ProductPage />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
