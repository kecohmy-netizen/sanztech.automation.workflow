"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { products, categories, sortOptions, type Product } from "@/lib/products";
import { ShoppingBag, Truck, Shield, Star, ChevronRight, ArrowLeft } from "lucide-react";
import { useSound } from "@/hooks/use-sound";

export default function BajuRayaPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 500,
  });
  const { playClick, playHover, playSuccess } = useSound();

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (p) => p.priceRange.min >= priceRange.min && p.priceRange.max <= priceRange.max
    );

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "popular":
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          return 0;
        case "newest":
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        case "price-low":
          return a.priceRange.min - b.priceRange.min;
        case "price-high":
          return b.priceRange.max - a.priceRange.max;
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, sortBy, priceRange]);

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground font-body overflow-x-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.15),rgba(255,255,255,0))]"></div>
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-24 border-b border-primary/20 animate-in fade-in duration-500">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-in slide-in-from-top-4 duration-700">
              Baju Budak
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-primary mb-2 font-medium animate-in slide-in-from-bottom-4 duration-700 delay-100">
              Collection Terbaik untuk Raya yang Istimewa
            </p>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 animate-in slide-in-from-bottom-4 duration-700 delay-200">
              ✨ Free Shipping • Kualiti Terjamin • Sizes Lengkap
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-300 animate-in zoom-in duration-700 delay-300"
            >
              <a 
                href="#products"
                onClick={playClick}
                onMouseEnter={playHover}
              >
                Lihat Collection
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-6 sm:py-8 border-b border-primary/20 animate-in fade-in duration-500 delay-400">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-primary/20 rounded-full p-3 mb-2 border border-primary/30">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <p className="font-bold text-lg text-foreground">100+</p>
              <p className="text-sm text-muted-foreground">Happy Parents</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/20 rounded-full p-3 mb-2 border border-primary/30">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <p className="font-bold text-lg text-foreground">Fast</p>
              <p className="text-sm text-muted-foreground">Delivery</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/20 rounded-full p-3 mb-2 border border-primary/30">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <p className="font-bold text-lg text-foreground">Quality</p>
              <p className="text-sm text-muted-foreground">Guaranteed</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-primary/20 rounded-full p-3 mb-2 border border-primary/30">
                <ShoppingBag className="h-6 w-6 text-primary" />
              </div>
              <p className="font-bold text-lg text-foreground">Easy</p>
              <p className="text-sm text-muted-foreground">Returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter & Sort */}
      <section className="py-4 sm:py-6 sticky top-0 z-40 border-b border-primary/20 bg-background/95 backdrop-blur-sm shadow-sm animate-in slide-in-from-top-4 duration-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-center justify-between">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playClick()
                    setSelectedCategory(cat.value)
                  }}
                  onMouseEnter={playHover}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                    selectedCategory === cat.value
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-primary/20 hover:scale-105"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => {
                playClick()
                setSortBy(e.target.value)
              }}
              className="px-4 py-2 rounded-lg border border-primary/20 bg-background text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 justify-center w-full">
            <label className="text-xs sm:text-sm font-medium text-foreground whitespace-nowrap">Harga:</label>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange.max}
              onChange={(e) =>
                setPriceRange({ ...priceRange, max: Number(e.target.value) })
              }
              className="flex-1 max-w-xs accent-primary"
            />
            <span className="text-xs sm:text-sm font-medium text-primary whitespace-nowrap">
              RM 0 - RM {priceRange.max}
            </span>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="products" className="py-8 sm:py-12 animate-in fade-in duration-500 delay-500">
        <div className="container mx-auto px-4">
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-12 sm:py-16 animate-in zoom-in duration-500">
              <p className="text-lg sm:text-xl text-muted-foreground mb-4">Tiada produk ditemui untuk filter ini.</p>
              <Button
                onClick={() => {
                  playClick()
                  setSelectedCategory("all");
                  setPriceRange({ min: 0, max: 500 });
                }}
                className="mt-4"
                variant="outline"
              >
                Reset Filter
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredAndSortedProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 border-t border-primary/20 animate-in fade-in duration-500">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-foreground">
            Soalan Lazim (FAQ)
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <FAQItem
              question="Bagaimana nak tahu saiz yang sesuai?"
              answer="Kami menyediakan size chart lengkap untuk setiap produk. Sila rujuk gambar size chart dalam product page atau hubungi kami untuk bantuan."
            />
            <FAQItem
              question="Berapa lama masa penghantaran?"
              answer="Masa penghantaran biasanya 3-5 hari bekerja untuk Semenanjung Malaysia, 5-7 hari untuk Sabah & Sarawak. Free shipping untuk pembelian melebihi RM100."
            />
            <FAQItem
              question="Boleh return atau tukar saiz?"
              answer="Ya, kami terima return/tukar dalam tempoh 7 hari selepas terima barang. Barang mesti dalam keadaan asal dengan tag masih ada."
            />
            <FAQItem
              question="Ada jaminan kualiti?"
              answer="Ya, semua produk kami dijamin kualiti. Jika ada masalah dengan produk, sila hubungi kami dan kami akan ganti atau refund."
            />
            <FAQItem
              question="Boleh beli untuk adik-beradik dengan design matching?"
              answer="Ya! Kami ada sibling sets dengan design matching. Sila pilih kategori 'Sibling Sets' untuk lihat koleksi lengkap."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/20 py-8 sm:py-12 animate-in fade-in duration-500">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Baju Budak</h3>
              <p className="text-muted-foreground">Collection terbaik untuk Raya yang istimewa</p>
            </div>
            <div className="flex flex-col items-center md:items-end gap-4">
              <Button
                asChild
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <Link 
                  href="/"
                  onClick={playClick}
                  onMouseEnter={playHover}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Kembali ke BioLink
                </Link>
              </Button>
              <div className="flex gap-4">
                <a
                  href="https://wa.me/601163969241"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  WhatsApp
                </a>
                <a
                  href="https://www.tiktok.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  TikTok
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary/20 text-center text-muted-foreground text-sm">
            <p>© 2025 Adamsanz | Built with Hustle & Tawakkal</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const { playClick, playHover } = useSound();
  
  return (
    <div className="bg-card rounded-lg shadow-md hover:shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all duration-300 overflow-hidden group border border-primary/20">
      {/* Badge */}
      <div className="relative">
        {product.isPopular && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold z-10 shadow-lg shadow-primary/20">
            Popular
          </span>
        )}
        {product.isNew && (
          <span className="absolute top-2 right-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
            Baru
          </span>
        )}
        <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-foreground line-clamp-2">
          {product.title}
        </h3>
        <p className="text-primary font-bold text-xl mb-3">
          RM {product.priceRange.min} - RM {product.priceRange.max}
        </p>

        {/* Quick Info */}
        <div className="space-y-2 mb-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">Saiz:</span>
            <span>{product.sizes.join(", ")}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">Warna:</span>
            <span>{product.colors.join(", ")}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {product.features.slice(0, 2).map((feature, idx) => (
            <span
              key={idx}
              className="text-xs bg-primary/20 text-primary px-2 py-1 rounded border border-primary/30"
            >
              {feature}
            </span>
          ))}
        </div>

        {/* CTA Button */}
        <Button
          asChild
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold group/btn shadow-lg shadow-primary/20"
        >
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              playClick()
              // Click tracking boleh tambah di sini
              console.log(`Product clicked: ${product.id}`);
            }}
            onMouseEnter={playHover}
          >
            Shop Now
            <ChevronRight className="ml-2 h-4 w-4 inline group-hover/btn:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const { playClick, playHover } = useSound();

  return (
    <div className="bg-card rounded-lg shadow-md border border-primary/20 overflow-hidden">
      <button
        onClick={() => {
          playClick()
          setIsOpen(!isOpen)
        }}
        onMouseEnter={playHover}
        className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-primary/10 transition-colors"
      >
        <span className="font-semibold text-foreground">{question}</span>
        <ChevronRight
          className={`h-5 w-5 text-primary transition-transform ${
            isOpen ? "rotate-90" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-muted-foreground border-t border-primary/20 pt-4">
          {answer}
        </div>
      )}
    </div>
  );
}

