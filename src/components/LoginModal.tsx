// Login Modal Component
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { 
  Loader2, 
  Mail, 
  Lock, 
  User, 
  AlertCircle,
  CheckCircle2,
  Chrome,
  Github
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'signup';
}

export function LoginModal({ isOpen, onClose, defaultMode = 'login' }: LoginModalProps) {
  const navigate = useNavigate();
  const { signIn, signUp, signInWithOAuth, signInDemo } = useAuth();
  
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      if (mode === 'login') {
        await signIn(email, password);
        setSuccess('Login successful!');
        setTimeout(() => {
          onClose();
          navigate('/dashboard');
        }, 1000);
      } else if (mode === 'signup') {
        const result = await signUp(email, password, { name });
        if (result.message) {
          setSuccess(result.message);
        } else {
          setSuccess('Account created! Redirecting...');
          setTimeout(() => {
            onClose();
            navigate('/dashboard');
          }, 1000);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'github') => {
    setError('');
    setIsLoading(true);

    try {
      await signInWithOAuth(provider);
    } catch (err: any) {
      setError(err.message || 'OAuth sign in failed');
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      await signInDemo();
      setSuccess('Demo mode activated!');
      setTimeout(() => {
        onClose();
        navigate('/dashboard');
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'Demo login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#1a1a1a] border-[#d4af37]/30 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#d4af37]">
            {mode === 'login' ? 'Welcome Back' : mode === 'signup' ? 'Create Account' : 'Reset Password'}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {mode === 'login' 
              ? 'Sign in to access your automation dashboard' 
              : mode === 'signup'
              ? 'Get started with Maya automation platform'
              : 'Enter your email to reset your password'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Name field (signup only) */}
          {mode === 'signup' && (
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="pl-10 bg-black/40 border-[#d4af37]/30 text-white"
                  required
                />
              </div>
            </div>
          )}

          {/* Email field */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="pl-10 bg-black/40 border-[#d4af37]/30 text-white"
                required
              />
            </div>
          </div>

          {/* Password field (not for reset) */}
          {mode !== 'reset' && (
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 bg-black/40 border-[#d4af37]/30 text-white"
                  required
                  minLength={6}
                />
              </div>
            </div>
          )}

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-green-500" />
              <p className="text-sm text-green-500">{success}</p>
            </div>
          )}

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'
            )}
          </Button>

          {/* OAuth buttons (login/signup only) */}
          {mode !== 'reset' && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#1a1a1a] px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOAuth('google')}
                  disabled={isLoading}
                  className="border-[#d4af37]/30 hover:bg-[#d4af37]/10"
                >
                  <Chrome className="w-4 h-4 mr-2" />
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOAuth('github')}
                  disabled={isLoading}
                  className="border-[#d4af37]/30 hover:bg-[#d4af37]/10"
                >
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </div>

              {/* Demo mode button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleDemoLogin}
                disabled={isLoading}
                className="w-full border-[#d4af37]/30 hover:bg-[#d4af37]/10 text-[#d4af37]"
              >
                Try Demo Mode (No signup required)
              </Button>
            </>
          )}

          {/* Mode switcher */}
          <div className="text-center text-sm">
            {mode === 'login' ? (
              <>
                <span className="text-gray-400">Don't have an account? </span>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-[#d4af37] hover:underline font-semibold"
                >
                  Sign up
                </button>
              </>
            ) : mode === 'signup' ? (
              <>
                <span className="text-gray-400">Already have an account? </span>
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-[#d4af37] hover:underline font-semibold"
                >
                  Sign in
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setMode('login')}
                className="text-[#d4af37] hover:underline font-semibold"
              >
                Back to login
              </button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
