import { Download, X } from "lucide-react";
import { useEffect, useState } from "react";
import { pwaService } from "@/services/pwaService";

export function InstallPWA() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    const status = pwaService.getInstallStatus();
    setIsInstalled(status.isInstalled);

    // Listen for installable event
    const handleInstallable = (event: CustomEvent) => {
      if (event.detail.installable && !status.isInstalled) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('pwa-installable', handleInstallable as EventListener);

    return () => {
      window.removeEventListener('pwa-installable', handleInstallable as EventListener);
    };
  }, []);

  const handleInstall = async () => {
    const installed = await pwaService.showInstallPrompt();
    if (installed) {
      setShowPrompt(false);
      setIsInstalled(true);
    }
  };

  if (isInstalled || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-in slide-in-from-bottom">
      <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg p-4 backdrop-blur-sm shadow-xl">
        <button
          onClick={() => setShowPrompt(false)}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Download className="h-5 w-5 text-yellow-500" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-white mb-1">Install Maya App</h3>
            <p className="text-sm text-gray-300 mb-3">
              Install our app for faster access, offline support, and push notifications!
            </p>
            
            <div className="flex gap-2">
              <button
                onClick={handleInstall}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors"
              >
                Install Now
              </button>
              <button
                onClick={() => setShowPrompt(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
