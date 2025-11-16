// Modern Sidebar Navigation Component
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { UserMenu } from './UserMenu';
import { LoginModal } from './LoginModal';
import {
  Home,
  Workflow,
  Sparkles,
  ShoppingBag,
  Video,
  Menu,
  X,
  Zap,
  LayoutDashboard,
  Bot,
  ListTodo,
  TrendingUp,
  Settings,
  LogIn
} from 'lucide-react';

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  const publicLinks = [
    { path: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
    { path: '/workflow', label: 'Sanztech Workflow', icon: <Workflow className="w-5 h-5" /> },
    { path: '/showcase', label: 'Template Automation', icon: <Sparkles className="w-5 h-5" /> },
    { path: '/baju-budak', label: 'Collection Baju Budak', icon: <ShoppingBag className="w-5 h-5" /> },
  ];

  const protectedLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: '/workflows', label: 'Workflows', icon: <Workflow className="w-5 h-5" /> },
    { path: '/maya', label: 'Maya AI', icon: <Bot className="w-5 h-5" /> },
    { path: '/tiktok', label: 'TikTok Automation', icon: <Video className="w-5 h-5" /> },
    { path: '/tasks', label: 'Tasks', icon: <ListTodo className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-black/50 backdrop-blur-sm border border-[#d4af37]/30 hover:bg-[#d4af37]/10"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : '-100%',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-full w-72 bg-[#0a0a0a] border-r border-white/[0.05] z-40 flex flex-col md:translate-x-0"
      >
        {/* Logo */}
        <div className="p-6 border-b border-white/[0.05]">
          <Link to="/" className="flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center shadow-lg shadow-[#d4af37]/50 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-black" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#d4af37]">sanztech</h2>
              <p className="text-xs text-gray-500">automation.solution</p>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {/* Public Links */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
              Explore
            </p>
            {publicLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive(link.path)
                    ? 'bg-[#d4af37]/10 text-[#d4af37] font-medium'
                    : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                {link.icon}
                <span className="text-sm">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Protected Links (if authenticated) */}
          {isAuthenticated && (
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                Dashboard
              </p>
              {protectedLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                    isActive(link.path)
                      ? 'bg-[#d4af37]/10 text-[#d4af37] font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  {link.icon}
                  <span className="text-sm">{link.label}</span>
                </Link>
              ))}
            </div>
          )}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/[0.05]">
          {isAuthenticated ? (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.05]">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                <p className="text-xs text-gray-500 truncate">{user?.email}</p>
              </div>
              <UserMenu />
            </div>
          ) : (
            <Button
              onClick={() => setShowLoginModal(true)}
              className="w-full bg-[#d4af37] hover:bg-[#c9a332] text-black font-semibold"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/[0.05]">
          <div className="flex items-center justify-between text-xs text-gray-600">
            <span>© 2024 Sanztech</span>
            <a
              href="https://www.tiktok.com/@adamsannzz"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#d4af37] transition-colors"
            >
              <Video className="w-4 h-4" />
            </a>
          </div>
        </div>
      </motion.aside>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

      {/* Spacer for desktop */}
      <div className="hidden md:block w-72 flex-shrink-0" />
    </>
  );
}
