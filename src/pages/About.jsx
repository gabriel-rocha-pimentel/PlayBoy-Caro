import React from 'react';
import { motion } from 'framer-motion';
import { MicOff as MicVocal, Users, Award, Disc3, TrendingUp, Music2 } from 'lucide-react';

const About = () => {
  const artistName = "PlayBoy Caro";
  const realName = "Murillo Lima";

  const milestones = [
    { icon: Music2, label: 'Singles Lançados', value: '20+' },
    { icon: Users, label: 'Fãs nas Redes', value: '500K+' },
    { icon: TrendingUp, label: 'Visualizações YouTube', value: '10M+' },
    { icon: Disc3, label: 'Colaborações', value: '5+' }
  ];

  const values = [
    {
      icon: MicVocal,
      title: 'Autenticidade no Trap',
      description: 'Letras que refletem a realidade das ruas com uma sonoridade única e flow agressivo.'
    },
    {
      icon: TrendingUp,
      title: 'Ascensão Meteórica',
      description: 'Conquistando o cenário nacional com hits virais e uma base de fãs fiel e engajada.'
    },
    {
      icon: Award,
      title: 'Reconhecimento e Futuro',
      description: 'Buscando sempre inovar e expandir sua influência, {artistName} é uma promessa consolidada no trap brasileiro.'
    }
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
            <span className="gold-gradient">SOBRE {artistName.toUpperCase()}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A trajetória de {realName}, o artista por trás do fenômeno {artistName}.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              A Voz <span className="gold-gradient">das Ruas</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              {realName}, mais conhecido como {artistName}, emergiu da cena underground para se tornar uma das vozes mais potentes e autênticas do trap nacional. Suas letras cortantes e flow inconfundível capturam a essência da vivência urbana, conquistando uma legião de fãs.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              Desde seus primeiros singles, {artistName} demonstrou uma habilidade singular para traduzir suas experiências e observações em rimas impactantes. Sua música é um reflexo cru e honesto da realidade, sem filtros, o que o conecta profundamente com seu público.
            </p>
          </div>
          
          <div className="relative">
            <img 
              className="w-full h-auto md:h-[500px] object-cover rounded-2xl shadow-2xl"
              alt="PlayBoy Caro em estúdio de gravação ou em um momento de criação"
             src="https://images.unsplash.com/photo-1684857932731-aff6b0b73d27" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center glass-effect rounded-xl p-6 hover-glow"
              >
                <div className="w-12 h-12 bg-red-700 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <milestone.icon className="h-6 w-6 text-yellow-400" />
                </div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {milestone.value}
                </div>
                <div className="text-gray-300 text-sm">
                  {milestone.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">Filosofia</span> <span className="gold-gradient">do Artista</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Os pilares que sustentam a arte de {artistName}.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass-effect rounded-xl p-8 text-center hover-glow_yellow transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <value.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  {value.title.replace('{artistName}', artistName)}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {value.description.replace('{artistName}', artistName)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="glass-effect rounded-2xl p-10 md:p-12 max-w-4xl mx-auto shadow-2xl">
            <MicVocal className="h-16 w-16 text-yellow-400 mx-auto mb-6 music-note"/>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Junte-se à <span className="gold-gradient">Nação PlayBoy Caro</span>
            </h3>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Fique por dentro dos lançamentos, shows e novidades. Siga {artistName} nas redes sociais e faça parte dessa caminhada vitoriosa no trap.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://www.instagram.com/playboycaro_oficial/" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
              >
                Seguir no Instagram
              </motion.a>
              <motion.a
                href="https://www.youtube.com/channel/UCexampleChannelID" target="_blank" rel="noopener noreferrer" // Substituir
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-red-600 text-red-400 hover:bg-red-600 hover:text-white font-semibold px-8 py-3 rounded-lg transition-colors shadow-lg"
              >
                Inscrever-se no YouTube
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;