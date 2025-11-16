// User Menu Component - Profile dropdown with logout
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Settings, 
  LogOut, 
  Shield,
  CreditCard,
  HelpCircle
} from 'lucide-react';

export function UserMenu() {
  const navigate = useNavigate();
  const { user, signOut, signOutDemo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      // Check if demo mode
      if (user?.id === 'demo-user-123') {
        signOutDemo();
      } else {
        await signOut();
      }
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null;

  const initials = user.name
    ?.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase() || user.email[0].toUpperCase();

  const isDemoMode = user.id.startsWith('demo-');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full border-2 border-[#d4af37]/30 hover:border-[#d4af37]"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar} alt={user.name || user.email} />
            <AvatarFallback className="bg-[#d4af37] text-black font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent 
        className="w-56 bg-[#1a1a1a] border-[#d4af37]/30 text-white" 
        align="end"
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-[#d4af37]">
              {user.name || 'User'}
            </p>
            <p className="text-xs leading-none text-gray-400">
              {user.email}
            </p>
            {isDemoMode && (
              <span className="text-xs text-yellow-500 font-semibold">
                Demo Mode
              </span>
            )}
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-[#d4af37]/20" />
        
        <DropdownMenuItem 
          className="hover:bg-[#d4af37]/10 cursor-pointer"
          onClick={() => navigate('/profile')}
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="hover:bg-[#d4af37]/10 cursor-pointer"
          onClick={() => navigate('/settings')}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        
        {!isDemoMode && (
          <>
            <DropdownMenuItem 
              className="hover:bg-[#d4af37]/10 cursor-pointer"
              onClick={() => navigate('/billing')}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem 
              className="hover:bg-[#d4af37]/10 cursor-pointer"
              onClick={() => navigate('/security')}
            >
              <Shield className="mr-2 h-4 w-4" />
              <span>Security</span>
            </DropdownMenuItem>
          </>
        )}
        
        <DropdownMenuItem 
          className="hover:bg-[#d4af37]/10 cursor-pointer"
          onClick={() => navigate('/help')}
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>Help & Support</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-[#d4af37]/20" />
        
        <DropdownMenuItem 
          className="hover:bg-red-500/10 text-red-500 cursor-pointer"
          onClick={handleSignOut}
          disabled={isLoading}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{isLoading ? 'Signing out...' : 'Sign out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
