"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Rocket, Clapperboard, Upload, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { affiliateLinks } from "@/lib/links"
import AiContentGenerator from "@/components/ai-content-generator"
import { useRef, useState, useEffect } from "react"
import { toast } from "@/hooks/use-toast"
import { useSound } from "@/hooks/use-sound"

const STORAGE_KEY = "profile_image"

export default function Home() {
  const profileImage = PlaceHolderImages.find((p) => p.id === "adamsanz-profile")!
  const [displayImage, setDisplayImage] = useState<string>(profileImage.imageUrl)
  const [newProfileImage, setNewProfileImage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { playClick, playHover, playSuccess, playError } = useSound()

  useEffect(() => {
    const savedImage = localStorage.getItem(STORAGE_KEY)
    if (savedImage) {
      setDisplayImage(savedImage)
    }
  }, [])

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        playError()
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please upload an image smaller than 5MB.",
        })
        return
      }
      playClick()

      const reader = new FileReader()
      reader.onloadend = () => {
        setNewProfileImage(reader.result as string)
      }
      reader.onerror = () => {
        toast({
          variant: "destructive",
          title: "Upload failed",
          description: "Could not read the file.",
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileUpload = () => {
    fileInputRef.current?.click()
  }

  const handleSaveImage = async () => {
    if (!newProfileImage) return

    setIsSaving(true)
    try {
      localStorage.setItem(STORAGE_KEY, newProfileImage)
      setDisplayImage(newProfileImage)
      setNewProfileImage(null)
      playSuccess()
      toast({
        title: "Success!",
        description: "Your profile picture has been saved.",
      })
    } catch (error) {
      playError()
      toast({
        variant: "destructive",
        title: "Save failed",
        description: "Could not save your image. Please try again.",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleCancel = () => {
    setNewProfileImage(null)
  }

  return (
    <div className="relative min-h-screen w-full bg-background text-foreground font-body selection:bg-primary/20 selection:text-primary-foreground overflow-x-hidden">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.15),rgba(255,255,255,0))]"></div>

      <main className="container mx-auto max-w-2xl px-4 py-8 sm:py-12 md:py-20 flex flex-col items-center gap-6 sm:gap-8 md:gap-10 animate-in fade-in duration-500">
        {/* Profile Section */}
        <section className="flex flex-col items-center text-center gap-4 sm:gap-6 w-full animate-in slide-in-from-top-4 duration-700">
          <div className="relative inline-flex animate-in zoom-in duration-700 delay-100">
            <Image
              src={newProfileImage || displayImage}
              alt="Adam Sanz, Mind Hustler of KL"
              width={128}
              height={128}
              className="rounded-full border-4 border-primary shadow-lg shadow-primary/20 object-cover transition-transform duration-300 hover:scale-105"
              data-ai-hint={profileImage.imageHint}
              priority
              loading="eager"
              onError={(e) => {
                // Fallback jika image tidak load
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-user.jpg";
              }}
            />
            <div className="absolute bottom-0 right-0 flex items-center gap-1">
              <Button
                size="icon"
                className="rounded-full h-8 w-8 shadow-md hover:scale-110 transition-transform"
                onClick={() => {
                  playClick()
                  triggerFileUpload()
                }}
                onMouseEnter={playHover}
                title="Upload new profile picture"
              >
                <Upload className="h-4 w-4" />
                <span className="sr-only">Upload new profile picture</span>
              </Button>
              {newProfileImage && (
                <>
                  <Button
                    size="icon"
                    className="rounded-full h-8 w-8 shadow-md hover:scale-110 transition-transform"
                    onClick={handleSaveImage}
                    disabled={isSaving}
                    onMouseEnter={playHover}
                    title="Save picture"
                  >
                    <Check className="h-4 w-4" />
                    <span className="sr-only">Save picture</span>
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="rounded-full h-8 w-8 shadow-md hover:scale-110 transition-transform bg-transparent"
                    onClick={() => {
                      playClick()
                      handleCancel()
                    }}
                    disabled={isSaving}
                    onMouseEnter={playHover}
                    title="Cancel"
                  >
                    <span className="sr-only">Cancel</span>✕
                  </Button>
                </>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
              accept="image/*"
              aria-label="Upload profile image"
            />
          </div>
          <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-4 duration-700 delay-200">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-headline font-bold text-foreground tracking-tight">Adamsanz</h1>
            <p className="text-base sm:text-lg md:text-xl text-primary font-medium">Mind Hustler of KL</p>
          </div>
          <p className="max-w-md text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed px-4 animate-in slide-in-from-bottom-4 duration-700 delay-300">
            Budak KL main otak & AI, bantu orang hidup dari content, bukan sekadar survive.
          </p>
        </section>

        {/* Links Section */}
        <section className="w-full max-w-sm flex flex-col gap-3 sm:gap-4 animate-in slide-in-from-bottom-4 duration-700 delay-400">
          {/* Affiliate Links */}
          {affiliateLinks.map((link, index) => (
            <Button
              key={link.id}
              asChild
              size="lg"
              variant="secondary"
              className="w-full text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-primary/20 animate-in slide-in-from-left-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link 
                href={link.url} 
                target={link.url.startsWith('http') ? "_blank" : undefined}
                rel={link.url.startsWith('http') ? "noopener noreferrer" : undefined}
                onClick={playClick}
                onMouseEnter={playHover}
              >
                {link.title}
              </Link>
            </Button>
          ))}
          
          {/* Social Links */}
          <Button
            asChild
            size="lg"
            className="w-full text-sm sm:text-base font-semibold shadow-lg shadow-primary/10 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-xl hover:shadow-primary/30 animate-in slide-in-from-left-4 duration-500 delay-500"
          >
            <Link 
              href="https://sanztech-template.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
            >
              <Rocket className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Template Automation
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="w-full text-sm sm:text-base font-semibold transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-primary/20 animate-in slide-in-from-left-4 duration-500 delay-600"
          >
            <Link 
              href="https://www.tiktok.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
            >
              <Clapperboard className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              TikTok Aku
            </Link>
          </Button>
        </section>

        {/* AI Content Generator Section */}
        <section className="w-full animate-in slide-in-from-bottom-4 duration-700 delay-700">
          <AiContentGenerator />
        </section>

        {/* Footer Section */}
        <footer className="text-center text-muted-foreground mt-6 sm:mt-8 text-sm">
          <p>"© 2025 Adamsanz | Built with Hustle & Tawakkal"</p>
        </footer>
      </main>
    </div>
  )
}
