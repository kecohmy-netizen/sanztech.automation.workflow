// Header Component - Navigation with login/user menu
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { LoginModal } from './LoginModal';
import { UserMenu } from './UserMenu';
import { Settings, LogIn } from 'lucide-react';

export function Header() {
  const { isAuthenticated, isLoading } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-[#d4af37]/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center group-hover:scale-110 transition-transform">
              <Settings className="w-6 h-6 text-black" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-[#d4af37]">sanztech</h1>
              <p className="text-[10px] text-gray-400">automation.solution</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/tiktok-bio-link" 
              className="text-gray-300 hover:text-[#d4af37] transition-colors text-sm"
            >
              Home
            </Link>
            <Link 
              to="/tiktok-bio-link/baju-budak" 
              className="text-gray-300 hover:text-[#d4af37] transition-colors text-sm"
            >
              Affiliate
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-300 hover:text-[#d4af37] transition-colors text-sm"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/workflows" 
                  className="text-gray-300 hover:text-[#d4af37] transition-colors text-sm"
                >
                  Workflows
                </Link>
                <Link 
                  to="/maya" 
                  className="text-gray-300 hover:text-[#d4af37] transition-colors text-sm"
                >
                  Maya AI
                </Link>
              </>
            )}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {isLoading ? (
              <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 animate-pulse" />
            ) : isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setShowLoginModal(true)}
                  className="text-gray-300 hover:text-[#d4af37] hover:bg-[#d4af37]/10"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Sign In</span>
                </Button>
                <Button
                  onClick={() => setShowLoginModal(true)}
                  className="bg-[#d4af37] hover:bg-[#b8941f] text-black font-semibold"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </>
  );
}
