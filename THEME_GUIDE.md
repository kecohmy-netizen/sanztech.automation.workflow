# 🎨 Black & Gold Theme Guide

## Overview
sanztech.online menggunakan **Black & Gold** theme yang premium dan professional. Theme ini direka untuk memberikan kesan luxury dan high-end.

---

## 🎨 Color Palette

### Primary Colors

#### Gold (#d4af37)
```css
/* Main Gold */
--gold: 43 74% 52%
color: #d4af37

/* Light Gold */
--gold-light: 43 74% 65%
color: #e4c474

/* Dark Gold */
--gold-dark: 43 74% 40%
color: #b8941f
```

#### Black
```css
/* Pure Black */
background: #000000

/* Soft Black */
background: hsl(0 0% 5%)

/* Medium Black */
background: hsl(0 0% 10%)
```

---

## 🎯 Usage Examples

### Text Colors

#### Gold Text
```tsx
// Using Tailwind
<h1 className="text-gold">Gold Text</h1>
<p className="text-gold-light">Light Gold</p>
<span className="text-gold-dark">Dark Gold</span>

// Using gradient
<h1 className="text-gradient-gold">Gradient Gold Text</h1>
```

#### White/Black Text
```tsx
<p className="text-white">White Text</p>
<p className="text-black">Black Text</p>
<p className="text-gray-400">Gray Text</p>
```

---

### Background Colors

#### Solid Backgrounds
```tsx
// Gold backgrounds
<div className="bg-gold">Gold Background</div>
<div className="bg-gold-light">Light Gold</div>
<div className="bg-gold-dark">Dark Gold</div>

// Black backgrounds
<div className="bg-black">Pure Black</div>
<div className="bg-black-soft">Soft Black (5%)</div>
<div className="bg-black-medium">Medium Black (10%)</div>
```

#### Gradient Backgrounds
```tsx
// Gold gradients
<div className="bg-gradient-gold">
  Linear Gold Gradient
</div>

<div className="bg-gradient-gold-radial">
  Radial Gold Gradient
</div>

// Custom gradients
<div className="bg-gradient-to-r from-gold-dark via-gold to-gold-light">
  Custom Gradient
</div>

<div className="bg-gradient-to-br from-black via-gray-900 to-black">
  Black Gradient
</div>
```

---

### Border Colors

```tsx
// Gold borders
<div className="border border-gold">Gold Border</div>
<div className="border-2 border-gold-light">Light Gold Border</div>
<div className="border-4 border-gold-dark">Dark Gold Border</div>

// With opacity
<div className="border border-gold/30">30% Opacity</div>
<div className="border border-gold/50">50% Opacity</div>
```

---

### Shadow & Glow Effects

#### Box Shadows
```tsx
// Gold shadows
<div className="shadow-gold">Gold Shadow</div>
<div className="shadow-gold-lg">Large Gold Shadow</div>

// Hover effects
<button className="hover-gold-glow">
  Hover for Glow
</button>
```

#### Text Glow
```tsx
<h1 className="glow-gold">Glowing Gold Text</h1>
```

---

### Animations

#### Gold Pulse
```tsx
<div className="animate-gold-pulse">
  Pulsing Gold Effect
</div>
```

#### Gold Shimmer
```tsx
<div className="animate-gold-shimmer bg-gradient-to-r from-transparent via-gold to-transparent">
  Shimmer Effect
</div>
```

#### Fade In
```tsx
<div className="animate-fade-in">
  Fade In Animation
</div>
```

#### Slide In
```tsx
<div className="animate-slide-in">
  Slide In Animation
</div>
```

---

## 🎨 Component Examples

### Button Styles

#### Primary Gold Button
```tsx
<button className="bg-gold hover:bg-gold-dark text-black font-bold py-2 px-4 rounded-lg transition-all">
  Primary Button
</button>
```

#### Outline Gold Button
```tsx
<button className="border-2 border-gold text-gold hover:bg-gold hover:text-black py-2 px-4 rounded-lg transition-all">
  Outline Button
</button>
```

#### Gradient Gold Button
```tsx
<button className="bg-gradient-gold hover:shadow-gold-lg text-black font-bold py-2 px-4 rounded-lg transition-all">
  Gradient Button
</button>
```

---

### Card Styles

#### Gold Card
```tsx
<div className="bg-black border border-gold/30 rounded-xl p-6 hover:border-gold transition-all">
  <h3 className="text-gold font-bold mb-2">Card Title</h3>
  <p className="text-gray-300">Card content</p>
</div>
```

#### Gradient Card
```tsx
<div className="bg-gradient-to-br from-gold/10 to-gold/5 backdrop-blur-sm border border-gold/20 rounded-xl p-6">
  <h3 className="text-gold font-bold mb-2">Gradient Card</h3>
  <p className="text-white">Card content</p>
</div>
```

#### Glowing Card
```tsx
<div className="bg-black border border-gold rounded-xl p-6 shadow-gold hover:shadow-gold-lg transition-all">
  <h3 className="text-gold font-bold mb-2">Glowing Card</h3>
  <p className="text-gray-300">Card content</p>
</div>
```

---

### Header Styles

#### Gold Gradient Header
```tsx
<h1 className="text-4xl font-bold text-gradient-gold">
  sanztech.online
</h1>
```

#### Glowing Header
```tsx
<h1 className="text-4xl font-bold text-gold glow-gold">
  Mind Hustler of KL
</h1>
```

---

### Badge Styles

#### Gold Badge
```tsx
<span className="bg-gold/20 text-gold border border-gold/30 px-3 py-1 rounded-full text-sm font-medium">
  Active
</span>
```

#### Gradient Badge
```tsx
<span className="bg-gradient-gold text-black px-3 py-1 rounded-full text-sm font-bold">
  Premium
</span>
```

---

## 🎯 Best Practices

### 1. Contrast
Always ensure good contrast between text and background:
```tsx
✅ <div className="bg-black text-gold">Good Contrast</div>
✅ <div className="bg-gold text-black">Good Contrast</div>
❌ <div className="bg-gold text-gold-light">Poor Contrast</div>
```

### 2. Hierarchy
Use gold for important elements:
```tsx
// Primary action
<button className="bg-gold text-black">Primary</button>

// Secondary action
<button className="border border-gold text-gold">Secondary</button>

// Tertiary action
<button className="text-gray-400">Tertiary</button>
```

### 3. Spacing
Use consistent spacing with gold accents:
```tsx
<div className="space-y-4">
  <div className="border-l-4 border-gold pl-4">
    Gold accent on left
  </div>
</div>
```

### 4. Hover States
Always add smooth transitions:
```tsx
<button className="bg-gold hover:bg-gold-dark transition-all duration-300">
  Smooth Hover
</button>
```

---

## 🎨 Color Combinations

### Recommended Combinations

#### 1. Gold on Black
```tsx
<div className="bg-black text-gold border border-gold/30">
  Premium Look
</div>
```

#### 2. Black on Gold
```tsx
<div className="bg-gold text-black">
  High Contrast
</div>
```

#### 3. Gold Gradient on Black
```tsx
<div className="bg-black">
  <h1 className="text-gradient-gold">Elegant Title</h1>
</div>
```

#### 4. Gold Accent with Gray
```tsx
<div className="bg-gray-900 border-l-4 border-gold">
  <p className="text-gray-300">Content with gold accent</p>
</div>
```

---

## 🎯 Component Library

### Using with shadcn/ui

#### Button
```tsx
import { Button } from "@/components/ui/button"

<Button className="bg-gold hover:bg-gold-dark text-black">
  Gold Button
</Button>
```

#### Card
```tsx
import { Card } from "@/components/ui/card"

<Card className="bg-black border-gold/30 hover:border-gold">
  <CardContent className="text-gold">
    Gold Card
  </CardContent>
</Card>
```

#### Badge
```tsx
import { Badge } from "@/components/ui/badge"

<Badge className="bg-gold/20 text-gold border-gold/30">
  Gold Badge
</Badge>
```

---

## 🌟 Special Effects

### Shimmer Effect
```tsx
<div className="relative overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/20 to-transparent animate-gold-shimmer" />
  <div className="relative">Content</div>
</div>
```

### Pulse Effect
```tsx
<div className="animate-gold-pulse bg-gold rounded-full w-4 h-4" />
```

### Glow on Hover
```tsx
<div className="hover-gold-glow transition-all duration-300">
  Hover me for glow
</div>
```

---

## 📱 Responsive Design

### Mobile First
```tsx
<h1 className="text-2xl md:text-4xl lg:text-5xl text-gold">
  Responsive Gold Text
</h1>
```

### Breakpoint-specific Colors
```tsx
<div className="bg-black md:bg-gradient-gold">
  Different colors per breakpoint
</div>
```

---

## 🎨 Dark Mode (Default)

Theme ini default dark mode dengan black background:

```tsx
// No need for dark: prefix, it's default
<div className="bg-black text-gold">
  Default Dark Mode
</div>
```

---

## 🚀 Quick Reference

### Text
- `text-gold` - Gold text
- `text-gold-light` - Light gold
- `text-gold-dark` - Dark gold
- `text-gradient-gold` - Gold gradient text

### Background
- `bg-gold` - Gold background
- `bg-black` - Pure black
- `bg-black-soft` - Soft black (5%)
- `bg-gradient-gold` - Gold gradient

### Border
- `border-gold` - Gold border
- `border-gold/30` - 30% opacity
- `border-gold/50` - 50% opacity

### Effects
- `shadow-gold` - Gold shadow
- `glow-gold` - Gold glow
- `hover-gold-glow` - Hover glow
- `animate-gold-pulse` - Pulse animation

---

## 💡 Pro Tips

1. **Use gold sparingly** - For important elements only
2. **Maintain contrast** - Always check readability
3. **Add transitions** - Smooth hover effects
4. **Use gradients** - For premium feel
5. **Test on dark backgrounds** - Primary use case

---

**Theme Colors:**
- Primary: Gold (#d4af37)
- Background: Black (#000000)
- Accent: Gold variants
- Text: White/Gold

**Brand Identity:**
- Premium & Professional
- Luxury & High-end
- Modern & Clean
- Bold & Confident

---

*Built by Adamsanz - Mind Hustler of KL*
*sanztech.online*
