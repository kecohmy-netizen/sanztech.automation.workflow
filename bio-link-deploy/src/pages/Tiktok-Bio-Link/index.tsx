import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video, Sparkles, Mail, Phone } from 'lucide-react';
import { useSound } from '../../hooks/use-sound';

export default function LandingPage() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const { playClick, playHover } = useSound();

  const affiliateLinks = [
    { id: 1, title: '🔥 Collection Baju Budak', url: '/tiktok-bio-link/baju-budak', internal: true },
    { id: 2, title: '⚙️ Sanztech Workflow', url: '/tiktok-bio-link/workflow', internal: true },
    { id: 3, title: '⚙️ Template Automation', url: '/tiktok-bio-link/showcase', internal: true },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#0a0e1a] text-white overflow-x-hidden pt-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-500/10 rounded-full"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0
            }}
            animate={{
              y: typeof window !== 'undefined' ? [null, Math.random() * window.innerHeight] : 0,
              x: typeof window !== 'undefined' ? [null, Math.random() * window.innerWidth] : 0,
            }}
            transition={{ duration: 10 + Math.random() * 20, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-[#d4af37]/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/tiktok-bio-link" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center">
              <Video className="w-6 h-6 text-black" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-[#d4af37]">sanztech</h1>
              <p className="text-[10px] text-gray-400">automation.solution</p>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => setSoundEnabled(!soundEnabled)} className="px-3 py-1 rounded bg-gray-800 text-sm">
              {soundEnabled ? 'Sound: ON' : 'Sound: OFF'}
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 pt-24">
        <section className="text-center">
          <motion.h1 className="text-3xl md:text-5xl font-bold mb-3" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            Link Bio TikTok
          </motion.h1>
          <motion.p className="text-gray-300 max-w-2xl mx-auto mb-8" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}>
            Budak KL main otak & AI.
          </motion.p>
          <div className="w-full max-w-sm mx-auto flex flex-col gap-3">
            {affiliateLinks.map((link) => (
              <motion.div key={link.id} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}>
                <Link to={link.url} className="block w-full px-6 py-4 bg-gray-900/50 hover:bg-gray-800/50 backdrop-blur-sm border border-gray-800 hover:border-[#d4af37] rounded-xl text-center font-semibold" onMouseEnter={soundEnabled ? playHover : undefined} onClick={soundEnabled ? playClick : undefined}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>{link.title}</motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gray-900/40 rounded-xl border border-gray-800">
            <Sparkles className="w-6 h-6 text-[#d4af37] mb-2" />
            <h3 className="text-xl font-semibold mb-1">Automation</h3>
            <p className="text-gray-400">Jimat masa dengan sistem automasi.</p>
          </div>
          <div className="p-6 bg-gray-900/40 rounded-xl border border-gray-800">
            <Mail className="w-6 h-6 text-[#d4af37] mb-2" />
            <h3 className="text-xl font-semibold mb-1">Contact</h3>
            <p className="text-gray-400">sanztechsolution@gmail.com</p>
          </div>
          <div className="p-6 bg-gray-900/40 rounded-xl border border-gray-800">
            <Phone className="w-6 h-6 text-[#d4af37] mb-2" />
            <h3 className="text-xl font-semibold mb-1">WhatsApp</h3>
            <p className="text-gray-400">+60 11-6396 9241</p>
          </div>
        </section>
      </main>
    </div>
  );
}
