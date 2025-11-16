// PWA Service - Handle installation, updates, and notifications

class PWAService {
  private deferredPrompt: any = null;
  private registration: ServiceWorkerRegistration | null = null;

  // Register service worker
  async register() {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js');
        console.log('✅ Service Worker registered');
        
        // Check for updates
        this.registration.addEventListener('updatefound', () => {
          const newWorker = this.registration?.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New version available
                this.showUpdateNotification();
              }
            });
          }
        });
        
        return this.registration;
      } catch (error) {
        console.error('❌ Service Worker registration failed:', error);
      }
    }
  }

  // Show update notification
  private showUpdateNotification() {
    if (confirm('New version available! Reload to update?')) {
      window.location.reload();
    }
  }

  // Check if app is installable
  isInstallable(): boolean {
    return this.deferredPrompt !== null;
  }

  // Setup install prompt
  setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      console.log('📱 App is installable');
      
      // Show install button
      this.showInstallButton();
    });

    // Track installation
    window.addEventListener('appinstalled', () => {
      console.log('✅ App installed');
      this.deferredPrompt = null;
      this.hideInstallButton();
    });
  }

  // Show install prompt
  async showInstallPrompt(): Promise<boolean> {
    if (!this.deferredPrompt) {
      console.log('⚠️ Install prompt not available');
      return false;
    }

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    
    console.log(`User ${outcome === 'accepted' ? 'accepted' : 'dismissed'} install prompt`);
    
    this.deferredPrompt = null;
    return outcome === 'accepted';
  }

  // Show install button
  private showInstallButton() {
    const event = new CustomEvent('pwa-installable', { detail: { installable: true } });
    window.dispatchEvent(event);
  }

  // Hide install button
  private hideInstallButton() {
    const event = new CustomEvent('pwa-installable', { detail: { installable: false } });
    window.dispatchEvent(event);
  }

  // Request notification permission
  async requestNotificationPermission(): Promise<boolean> {
    if (!('Notification' in window)) {
      console.log('⚠️ Notifications not supported');
      return false;
    }

    if (Notification.permission === 'granted') {
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }

    return false;
  }

  // Subscribe to push notifications
  async subscribeToPush(): Promise<PushSubscription | null> {
    if (!this.registration) {
      console.error('⚠️ Service Worker not registered');
      return null;
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(
          import.meta.env.VITE_VAPID_PUBLIC_KEY || ''
        ),
      });

      console.log('✅ Push subscription created');
      return subscription;
    } catch (error) {
      console.error('❌ Push subscription failed:', error);
      return null;
    }
  }

  // Show notification
  async showNotification(title: string, options?: NotificationOptions) {
    const hasPermission = await this.requestNotificationPermission();
    
    if (!hasPermission) {
      console.log('⚠️ Notification permission denied');
      return;
    }

    if (this.registration) {
      await this.registration.showNotification(title, {
        icon: '/icon-192x192.png',
        badge: '/icon-96x96.png',
        vibrate: [200, 100, 200],
        ...options,
      });
    } else {
      new Notification(title, options);
    }
  }

  // Check if app is standalone (installed)
  isStandalone(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    );
  }

  // Get install status
  getInstallStatus() {
    return {
      isInstallable: this.isInstallable(),
      isInstalled: this.isStandalone(),
      hasNotificationPermission: Notification.permission === 'granted',
      hasServiceWorker: 'serviceWorker' in navigator,
    };
  }

  // Helper: Convert VAPID key
  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    
    return outputArray;
  }

  // Cache important URLs
  async cacheUrls(urls: string[]) {
    if (this.registration && this.registration.active) {
      this.registration.active.postMessage({
        type: 'CACHE_URLS',
        urls,
      });
    }
  }

  // Clear cache
  async clearCache() {
    if ('caches' in window) {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      console.log('🗑️ Cache cleared');
    }
  }

  // Check for updates
  async checkForUpdates() {
    if (this.registration) {
      await this.registration.update();
      console.log('🔄 Checked for updates');
    }
  }
}

export const pwaService = new PWAService();
export default pwaService;
