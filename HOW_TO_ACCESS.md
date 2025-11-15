# 🎯 How to Access Your Link Bio Automation

## 🚀 Quick Access Guide

### Step 1: Server is Running ✅
Your development server is already running at:
```
http://localhost:5173/
```

### Step 2: Navigate to Link Bio Automation
You have 2 ways to access:

#### Option A: Direct URL
Open browser and go to:
```
http://localhost:5173/linkbio
```

#### Option B: Through Dashboard
1. Go to: `http://localhost:5173/`
2. Look at left sidebar
3. Click on **"Link Bio Automation"** (Link icon 🔗)

---

## 📱 What You'll See

### Main Dashboard
```
┌─────────────────────────────────────────────────────┐
│  Link Bio Automation                    [Start] [+] │
│  Manage & automate semua link bio kau              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  📊 Stats Cards                                     │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐              │
│  │Views │ │Clicks│ │Conv  │ │Revenue│              │
│  │12.6K │ │1.8K  │ │85    │ │RM4.4K │              │
│  └──────┘ └──────┘ └──────┘ └──────┘              │
│                                                     │
│  🤖 Automation Status                               │
│  ● Running - Browser automation active             │
│                                                     │
│  📋 Your Links                                      │
│  ┌─────────────────────────────────────┐           │
│  │ 👕 Collection Baju Budak            │           │
│  │ Affiliate TikTok Shop               │           │
│  │ 👁️ 2.5K  🖱️ 320  ✅ 45  💰 RM1.2K  │           │
│  │ [Edit] [Delete]                     │           │
│  └─────────────────────────────────────┘           │
│                                                     │
│  ┌─────────────────────────────────────┐           │
│  │ 🚀 Template Automation              │           │
│  │ Business templates                  │           │
│  │ 👁️ 1.8K  🖱️ 180  ✅ 12  💰 RM2.4K  │           │
│  │ [Edit] [Delete]                     │           │
│  └─────────────────────────────────────┘           │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🎮 Interactive Elements

### Top Right Buttons
```
[Start/Stop] - Toggle automation on/off
[Add Link]   - Add new link to bio
```

### Link Cards
Each card shows:
- **Icon & Title** - Visual identifier
- **Type Badge** - affiliate/tiktok/template/ai-tool
- **Description** - Brief info
- **URL** - With copy & open buttons
- **Schedule** - Posting frequency
- **Analytics** - Views, clicks, conversions, revenue
- **Actions** - Edit & Delete buttons

### Stats Cards
```
┌─────────────┐
│ 👁️ Views    │
│   12,600    │
│   ↗️ +15%   │
└─────────────┘
```

---

## 🎨 Color Guide

### Status Colors
- 🟢 **Green** - Active/Running
- 🟡 **Yellow** - Paused
- 🔵 **Blue** - Scheduled
- 🔴 **Red** - Failed/Stopped

### Theme Colors
- 🟡 **Gold (#d4af37)** - Primary actions
- ⚫ **Black** - Background
- ⚪ **White** - Text
- 🔵 **Blue** - Views
- 🟢 **Green** - Clicks
- 🟣 **Purple** - Revenue

---

## ⚡ Quick Actions

### Start Automation
```
1. Click [Start] button (top right)
2. Button turns red [Stop]
3. Status shows: ● Running
4. Automation begins processing tasks
```

### Add New Link
```
1. Click [Add Link] button
2. Modal opens with form
3. Fill in:
   - Title: "My New Link"
   - URL: "https://..."
   - Type: Select from dropdown
   - Description: Brief text
   - Icon: Pick emoji
   - Schedule: Set timing
   - Platforms: Check boxes
4. Click [Save]
5. New card appears in grid
```

### Edit Link
```
1. Find link card
2. Click [Edit] button
3. Modal opens with current data
4. Modify fields
5. Click [Save]
6. Card updates instantly
```

### Copy Link
```
1. Find link card
2. Click 📋 (copy icon)
3. URL copied to clipboard
4. Toast notification appears
```

### Open Link
```
1. Find link card
2. Click 🔗 (external link icon)
3. Opens in new tab
```

---

## 📊 Understanding Analytics

### Views 👁️
- Someone saw your link
- Counted once per unique visitor
- Tracked automatically

### Clicks 🖱️
- Someone clicked your link
- Opens destination URL
- Conversion tracking starts

### Conversions ✅
- Successful action completed
- Purchase, signup, download, etc.
- Tracked via webhook/pixel

### Revenue 💰
- Money earned from link
- Calculated from conversions
- Displayed in RM (Ringgit Malaysia)

### CTR (Click-Through Rate)
```
CTR = (Clicks / Views) × 100
Example: (320 / 2500) × 100 = 12.8%
```

### Conversion Rate
```
Conv Rate = (Conversions / Clicks) × 100
Example: (45 / 320) × 100 = 14.1%
```

---

## 🔧 Troubleshooting

### Can't Access Page?
```bash
# Check if server is running
# Look for: "Local: http://localhost:5173/"

# If not running, start it:
npm run dev

# Then access:
http://localhost:5173/linkbio
```

### Page Not Loading?
```bash
# Clear browser cache
Ctrl + Shift + Delete (Windows)
Cmd + Shift + Delete (Mac)

# Hard refresh
Ctrl + F5 (Windows)
Cmd + Shift + R (Mac)
```

### Automation Not Working?
```bash
# Check console for errors
Press F12 → Console tab

# Restart automation
1. Click [Stop]
2. Wait 2 seconds
3. Click [Start]
```

### Links Not Showing?
```bash
# Check localStorage
F12 → Application → Local Storage

# Clear and refresh
localStorage.clear()
location.reload()
```

---

## 📱 Mobile Access

### From Same Network
```
1. Get your computer's IP:
   Windows: ipconfig
   Mac: ifconfig
   
2. Find IPv4 Address (e.g., 192.168.1.100)

3. On phone, open browser:
   http://192.168.1.100:5173/linkbio

4. Bookmark for quick access
```

### Responsive Features
- ✅ Touch-friendly buttons
- ✅ Swipe gestures
- ✅ Mobile-optimized layout
- ✅ Collapsible sections
- ✅ Bottom navigation

---

## 🎯 First Time Setup

### 1. Access Page
```
http://localhost:5173/linkbio
```

### 2. Review Pre-configured Links
- Collection Baju Budak 👕
- Template Automation 🚀
- TikTok Aku 📱
- AI Content Ideation 🤖

### 3. Start Automation
Click [Start] button

### 4. Monitor Performance
Watch stats update in real-time

### 5. Add Your Own Links
Click [Add Link] and customize

---

## 🎊 You're All Set!

Your automation system is ready to:
- ✅ Auto-post to TikTok
- ✅ Share to Instagram
- ✅ Post to Facebook
- ✅ Tweet to Twitter
- ✅ Share on LinkedIn

**Start automating and scale your business! 🚀**

---

## 📞 Need Help?

### Resources
- 📖 Full Docs: `LINKBIO_AUTOMATION.md`
- ⚡ Quick Start: `QUICK_START.md`
- 📋 Summary: `AUTOMATION_SUMMARY.md`

### Contact
- 🌐 Website: sanztech.online
- 📱 TikTok: @adamsanz
- 📧 Email: support@sanztech.online

---

*Happy Automating! 🎉*
*Built by Adamsanz - Mind Hustler of KL*
