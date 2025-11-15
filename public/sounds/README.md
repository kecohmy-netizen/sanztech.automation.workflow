# Sound Effects

Folder ini untuk menyimpan audio files untuk sound effects.

## Required Files

Letakkan file-file berikut dalam folder ini:

- `click.mp3` - Sound untuk button clicks
- `hover.mp3` - Sound untuk hover effects
- `success.mp3` - Sound untuk success actions
- `error.mp3` - Sound untuk error states

## Usage

### Option 1: Guna SoundButton Component

```tsx
import { SoundButton } from "@/components/sound-button";

<SoundButton 
  soundOnClick={true}
  soundOnHover={false}
  soundType="click"
>
  Click Me
</SoundButton>
```

### Option 2: Guna useSound Hook

```tsx
import { useSound } from "@/hooks/use-sound";

function MyComponent() {
  const { playClick, playHover, playSuccess, playError } = useSound();

  return (
    <button onClick={playClick}>
      Click Me
    </button>
  );
}
```

## Notes

- Audio files akan auto-load bila pertama kali digunakan
- Volume default: click (0.2), hover (0.15), success (0.4), error (0.4)
- Sound akan fail silently jika browser tidak support atau user belum interact dengan page

