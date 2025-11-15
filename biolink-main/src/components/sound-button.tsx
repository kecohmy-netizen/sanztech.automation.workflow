"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useSound } from "@/hooks/use-sound";
import { forwardRef } from "react";

interface SoundButtonProps extends ButtonProps {
  soundOnClick?: boolean;
  soundOnHover?: boolean;
  soundType?: "click" | "hover" | "success" | "error";
}

export const SoundButton = forwardRef<HTMLButtonElement, SoundButtonProps>(
  ({ soundOnClick = true, soundOnHover = false, soundType = "click", onClick, onMouseEnter, ...props }, ref) => {
    const { playClick, playHover, playSuccess, playError } = useSound();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (soundOnClick) {
        switch (soundType) {
          case "click":
            playClick();
            break;
          case "success":
            playSuccess();
            break;
          case "error":
            playError();
            break;
          default:
            playClick();
        }
      }
      onClick?.(e);
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (soundOnHover) {
        playHover();
      }
      onMouseEnter?.(e);
    };

    return (
      <Button
        ref={ref}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        {...props}
      />
    );
  }
);

SoundButton.displayName = "SoundButton";

