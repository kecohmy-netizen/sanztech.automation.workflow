import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video, Sparkles, Mail, Phone } from 'lucide-react';
import { useSound } from '../hooks/use-sound';

export default function LandingPage() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const { playClick, playHover } = useSound();

  const affiliateLinks = [
    {
      id: 1,
      title: "🔥 Collection Baju Budak",
      url: "/baju-budak",
      internal: true
    },
    {
      id: 2,
      title: "⚙️ Sanztech Workflow",
      url: "/workflow",
      internal: true
    },
    {
      id: 3,
      title: "⚙️ Template Automation",
      url: "/showcase",
      internal: true
    },
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#0a0e1a] text-white overflow-x-hidden pt-20">
      {/* Animated Particles */}
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
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>
      
      <main className="container mx-auto max-w-2xl px-4 py-8 sm:py-12 md:py-20 flex flex-col items-center gap-6 sm:gap-8 md:gap-10 relative z-10">
        {/* Sound Toggle */}
        <motion.button
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-0 right-4 p-3 bg-gray-800/80 hover:bg-gray-700/80 rounded-full transition backdrop-blur-sm"
          onClick={() => {
            setSoundEnabled(!soundEnabled);
            playClick();
          }}
        >
          <span className="text-2xl">
            {soundEnabled ? '🔊' : '🔇'}
          </span>
        </motion.button>

        {/* Profile Section */}
        <motion.section 
          className="flex flex-col items-center text-center gap-4 sm:gap-6 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="relative inline-flex"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.2
            }}
          >
            <motion.div
              className="w-32 h-32 rounded-full border-4 border-[#d4af37] overflow-hidden"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(212, 175, 55, 0.5)",
                  "0 0 40px rgba(212, 175, 55, 0.8)",
                  "0 0 20px rgba(212, 175, 55, 0.5)",
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <img
                src="/adam-profile.jpg"
                alt="Adam Sanz, Mind Hustler of KL"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div 
              className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center cursor-pointer"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-2xl">✨</span>
            </motion.div>


          </motion.div>
          
          <motion.div 
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span className="text-[#d4af37]">Adamsanz</span>
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-[#d4af37] font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              Mind Hustler of KL
            </motion.p>
          </motion.div>
          
          <motion.p 
            className="max-w-md text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            Budak KL main otak & AI, bantu orang hidup dari content, bukan sekadar survive.
          </motion.p>
        </motion.section>

        {/* Links Section */}
        <motion.section 
          className="w-full max-w-sm flex flex-col gap-3 sm:gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 1.3
              }
            }
          }}
        >
          {/* Affiliate Links */}
          {affiliateLinks.map((link) => (
            link.internal ? (
              <motion.div
                key={link.id}
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <Link
                  to={link.url}
                  className="block w-full px-6 py-4 bg-gray-900/50 hover:bg-gray-800/50 backdrop-blur-sm border border-gray-800 hover:border-[#d4af37] rounded-xl text-center font-semibold cursor-pointer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(212, 175, 55, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.title}
                  </motion.div>
                </Link>
              </motion.div>
            ) : (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-6 py-4 bg-gray-900/50 hover:bg-gray-800/50 backdrop-blur-sm border border-gray-800 hover:border-[#d4af37] rounded-xl text-center font-semibold cursor-pointer"
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(212, 175, 55, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={playHover}
                onClick={playClick}
              >
                {link.title}
              </motion.a>
            )
          ))}

          {/* Main CTA Button - TikTok */}

          <motion.a
            href="https://www.tiktok.com/@adamsanzziy"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full px-6 py-4 bg-gray-900/50 hover:bg-gray-800/50 backdrop-blur-sm border border-gray-800 hover:border-[#d4af37] rounded-xl text-center font-semibold cursor-pointer"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { opacity: 1, x: 0 }
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(212, 175, 55, 0.3)"
            }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={playHover}
            onClick={playClick}
          >
            <div className="flex items-center justify-center gap-2">
              <Video className="w-5 h-5" />
              <span>TikTok Aku</span>
            </div>
          </motion.a>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          className="w-full max-w-sm mt-8 p-6 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-[#d4af37]/20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          whileHover={{
            borderColor: "rgba(212, 175, 55, 0.5)",
            boxShadow: "0 0 30px rgba(212, 175, 55, 0.2)"
          }}
        >
          <h3 className="text-xl font-bold text-[#d4af37] mb-4 text-center flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5" />
            Get In Touch
          </h3>
          <div className="flex flex-col gap-3 text-gray-300">
            <motion.a 
              href="mailto:sanztechsolution@gmail.com" 
              className="flex items-center gap-3 hover:text-[#d4af37] transition-colors"
              whileHover={{ x: 10 }}
            >
              <Mail className="w-5 h-5 text-[#d4af37]" />
              <span className="text-sm">sanztechsolution@gmail.com</span>
            </motion.a>
            <motion.a 
              href="tel:+60116396924" 
              className="flex items-center gap-3 hover:text-[#d4af37] transition-colors"
              whileHover={{ x: 10 }}
            >
              <Phone className="w-5 h-5 text-[#d4af37]" />
              <span className="text-sm">011-6396 9241</span>
            </motion.a>
          </div>
        </motion.section>

        {/* Footer */}
        <motion.footer 
          className="text-center text-gray-400 mt-8 pt-6 border-t border-gray-800 text-sm space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.p 
            className="text-[#d4af37] italic font-medium"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            "Built with Hustle & Tawakkal"
          </motion.p>
          <div className="flex gap-4 justify-center">
            <Link to="/privacy" className="hover:text-[#d4af37] transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-[#d4af37] transition-colors">
              Terms
            </Link>
          </div>
          <p className="text-gray-500">© 2025 Adam Sanz | Sanztech Automation</p>
        </motion.footer>
      </main>
    </div>
  );
}
