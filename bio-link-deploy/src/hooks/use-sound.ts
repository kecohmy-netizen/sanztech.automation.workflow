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
      if (!audioRefs.current[type]) {
        audioRefs.current[type] = new Audio(soundPaths[type]);
        audioRefs.current[type]!.volume = volume;
      }
      const audio = audioRefs.current[type]!;
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch {}
  }, []);

  return {
    playClick: () => playSound("click", 0.2),
    playHover: () => playSound("hover", 0.15),
    playSuccess: () => playSound("success", 0.4),
    playError: () => playSound("error", 0.4),
  };
}
