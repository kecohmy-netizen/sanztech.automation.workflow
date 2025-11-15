"use client";

import { useCallback, useRef } from "react";

type SoundType = "click" | "hover" | "success" | "error";

const soundPaths: Record<SoundType, string> = {
  click: "/sounds/foot-switch-166326.mp3",
  hover: "/sounds/whoosh-bamboo-389752.mp3",
  success: "/sounds/success-340660.mp3",
  error: "/sounds/error-126627.mp3",
};

export function useSound() {
  const audioRefs = useRef<Record<SoundType, HTMLAudioElement | null>>({
    click: null,
    hover: null,
    success: null,
    error: null,
  });

  const playSound = useCallback((type: SoundType, volume: number = 0.3) => {
    try {
      // Check if audio already exists
      if (!audioRefs.current[type]) {
        audioRefs.current[type] = new Audio(soundPaths[type]);
        audioRefs.current[type]!.volume = volume;
      }

      const audio = audioRefs.current[type]!;
      
      // Reset and play
      audio.currentTime = 0;
      audio.play().catch((error) => {
        // Silently fail if audio can't play (user interaction required, etc.)
        console.debug("Sound playback failed:", error);
      });
    } catch (error) {
      // Silently fail if audio creation fails
      console.debug("Sound creation failed:", error);
    }
  }, []);

  return {
    playClick: () => playSound("click", 0.2),
    playHover: () => playSound("hover", 0.15),
    playSuccess: () => playSound("success", 0.4),
    playError: () => playSound("error", 0.4),
  };
}

