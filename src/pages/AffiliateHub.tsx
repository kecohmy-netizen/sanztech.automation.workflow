import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, CheckCircle, Shield, TrendingUp, ArrowLeft, Sparkles } from 'lucide-react';

export default function AffiliateHub() {
  // TODO: Add your baju budak products here
  // Example format:
  // {
  //   id: 1,
  //   name: "Baju Kurung Budak Raya 2025",
  //   benefit: "Kain premium, jahitan kemas, selesa dipakai",
  //   price: "RM45",
  //   image: "/products/baju1.jpg",
  //   affiliateLink: "https://www.tiktok.com/@adamsanzziy/product/xxx"
  // }
  
  const products: Array<{
    id: number;
    name: string;
    benefit: string;
    price: string;
    image: string;
    affiliateLink: string;
  }> = [
    // Add your products here
  ];

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Harga Sentiasa Update & Jimat",
      description: "Kami pastikan harga terbaik untuk kau"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Barang Trusted & Ramai Review",
      description: "Semua produk dah tested & verified"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Semua Link Selamat & Verified",
      description: "100% secure checkout & fast delivery"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#D4A537]/20 rounded-full"
            initial={{
              x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
              y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0
            }}
            animate={{
              y: typeof window !== 'undefined' ? [null, Math.random() * window.innerHeight] : 0,
              x: typeof window !== 'undefined' ? [null, Math.random() * window.innerWidth] : 0,
            }}
            transition={{
              duration: 15 + Math.random() * 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Back Button */}
      <motion.div 
        className="container mx-auto px-4 pt-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-[#D4A537] hover:text-yellow-400 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 md:py-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4A537]/10 border border-[#D4A537]/30 rounded-full mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <Sparkles className="w-4 h-4 text-[#D4A537]" />
            <span className="text-sm text-[#D4A537] font-medium">Premium Collection</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Collection Baju Budak Terbaik — <br />
            <span className="text-[#D4A537]">Pilih & Terus Beli 🔥</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Kualiti terjamin, harga berpatutan, design terkini untuk anak-anak tersayang.
          </p>
          <motion.a 
            href="#products"
            className="inline-block px-8 py-4 bg-[#D4A537] hover:bg-yellow-500 text-black font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-[#D4A537]/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lihat Promosi Sekarang
          </motion.a>
        </motion.div>
      </section>

      {/* Highlight Box */}
      <section className="container mx-auto px-4 py-12 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto bg-gradient-to-br from-[#D4A537]/10 to-yellow-600/5 rounded-2xl p-8 md:p-12 border border-[#D4A537]/30 backdrop-blur-sm"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-[#D4A537] mb-8 text-center">
            Kenapa Beli Dari Link Kami?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                className="bg-black/50 rounded-xl p-6 text-center hover:bg-black/70 transition-all"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-[#D4A537]/20 rounded-full mb-4 text-[#D4A537]">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-400 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section id="products" className="container mx-auto px-4 py-12 relative z-10">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Collection <span className="text-[#D4A537]">Baju Budak</span>
        </motion.h2>
        
        {products.length === 0 ? (
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <ShoppingBag className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            </motion.div>
            <p className="text-xl text-gray-400">
              Produk akan ditambah tidak lama lagi...
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Stay tuned untuk collection baju budak terbaik!
            </p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {products.map((product, index) => (
            <motion.div 
              key={product.id}
              className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-gray-800 hover:border-[#D4A537]/50 transition-all shadow-lg hover:shadow-[#D4A537]/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              {/* Product Image */}
              <div className="aspect-square bg-gray-800 flex items-center justify-center overflow-hidden">
                <ShoppingBag className="w-20 h-20 text-gray-600" />
              </div>
              
              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.benefit}</p>
                
                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-[#D4A537]">{product.price}</span>
                  <span className="text-xs text-gray-500">Harga terkini</span>
                </div>
                
                {/* Buy Button */}
                <motion.a
                  href={product.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-[#D4A537] hover:bg-yellow-500 text-black font-bold text-center rounded-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Buy Now
                </motion.a>
              </div>
            </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto bg-gradient-to-r from-[#D4A537]/20 to-yellow-600/10 rounded-2xl p-12 border border-[#D4A537]/30 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Jangan Lepaskan <span className="text-[#D4A537]">Deal Terbaik!</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Semua produk limited stock. Grab sekarang sebelum habis!
          </p>
          <motion.a 
            href="#products"
            className="inline-block px-8 py-4 bg-[#D4A537] hover:bg-yellow-500 text-black font-bold text-lg rounded-lg transition-all shadow-lg hover:shadow-[#D4A537]/50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Sekarang
          </motion.a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 relative z-10">
        <motion.div 
          className="container mx-auto px-4 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400">
            Dibina oleh <span className="text-[#D4A537] font-semibold">SanzFlow</span> • Creator Malaysia
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-[#D4A537] transition-colors">
              Privacy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-[#D4A537] transition-colors">
              Terms
            </Link>
            <span>•</span>
            <a 
              href="mailto:sanztechsolution@gmail.com" 
              className="hover:text-[#D4A537] transition-colors"
            >
              Contact
            </a>
          </div>
          <p className="text-xs text-gray-600 mt-4">
            © 2025 Adam Sanz | Sanztech Automation
          </p>
        </motion.div>
      </footer>
    </div>
  );
}
