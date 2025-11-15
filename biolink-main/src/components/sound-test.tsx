"use client";

import { useSound } from "@/hooks/use-sound";
import { Button } from "@/components/ui/button";
import { SoundButton } from "./sound-button";

/**
 * Test component untuk verify sound effects function
 * Boleh guna ni untuk test sebelum integrate ke buttons sebenar
 */
export function SoundTest() {
  const { playClick, playHover, playSuccess, playError } = useSound();

  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-bold mb-4">Sound Effects Test</h3>
      
      <div className="flex flex-wrap gap-2">
        {/* Test dengan useSound hook */}
        <Button onClick={playClick}>Test Click Sound</Button>
        <Button onClick={playHover}>Test Hover Sound</Button>
        <Button onClick={playSuccess}>Test Success Sound</Button>
        <Button onClick={playError}>Test Error Sound</Button>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {/* Test dengan SoundButton component */}
        <SoundButton soundOnClick={true} soundType="click">
          SoundButton - Click
        </SoundButton>
        <SoundButton soundOnClick={true} soundOnHover={true} soundType="hover">
          SoundButton - Hover
        </SoundButton>
        <SoundButton soundOnClick={true} soundType="success">
          SoundButton - Success
        </SoundButton>
        <SoundButton soundOnClick={true} soundType="error">
          SoundButton - Error
        </SoundButton>
      </div>

      <p className="text-sm text-muted-foreground mt-4">
        💡 Pastikan audio files (click.mp3, hover.mp3, success.mp3, error.mp3) 
        dah ada dalam folder public/sounds/
      </p>
    </div>
  );
}

