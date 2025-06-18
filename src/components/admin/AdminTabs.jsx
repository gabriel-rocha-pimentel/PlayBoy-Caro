import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Home as HomeIcon, ShoppingBag } from 'lucide-react';

const TabButton = ({ tabName, currentTab, label, icon: Icon, onClick }) => (
  <Button
    variant={currentTab === tabName ? 'default' : 'outline'}
    onClick={() => onClick(tabName)}
    className={`flex-1 md:flex-none px-6 py-3 text-base md:text-sm transition-all duration-300 ease-in-out transform hover:scale-105 ${
      currentTab === tabName 
      ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white shadow-lg' 
      : 'border-red-700 text-red-400 hover:bg-red-700 hover:text-white'
    }`}
  >
    <Icon className="h-5 w-5 mr-2" /> {label}
  </Button>
);

const AdminTabs = ({ activeTab, setActiveTab }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, delay: 0.2 }} 
      className="mb-10 glass-effect p-4 rounded-lg"
    >
      <div className="flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-3">
        <TabButton tabName="home_info" currentTab={activeTab} label="Home" icon={HomeIcon} onClick={setActiveTab} />
        <TabButton tabName="products" currentTab={activeTab} label="Loja" icon={ShoppingBag} onClick={setActiveTab} />
      </div>
    </motion.div>
  );
};

export default AdminTabs;