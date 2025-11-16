import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { tiktokService } from '@/services/tiktokService';
import { useAuth } from '@/hooks/useAuth';
import { supabaseHelpers } from '@/services/supabaseClient';

export default function TikTokCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');
  const { user } = useAuth();

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const error = searchParams.get('error');

      if (error) {
        setStatus('error');
        setMessage(`Authentication failed: ${error}`);
        setTimeout(() => navigate('/tiktok-upload'), 3000);
        return;
      }

      if (!code) {
        setStatus('error');
        setMessage('No authorization code received');
        setTimeout(() => navigate('/tiktok-upload'), 3000);
        return;
      }

      try {
        // Exchange code for access token
        const accessToken = await tiktokService.getAccessToken(code);
        
        sessionStorage.setItem('tiktok_access_token', accessToken);
        tiktokService.setAccessToken(accessToken);
        if (user?.id) {
          try {
            await supabaseHelpers.updateUserSettings(user.id, { tiktok_access_token: accessToken });
          } catch {}
        }
        
        setStatus('success');
        setMessage('Successfully connected to TikTok!');
        
        // Redirect to upload page
        setTimeout(() => navigate('/tiktok-upload'), 2000);
      } catch (error: any) {
        console.error('Auth error:', error);
        setStatus('error');
        setMessage(error.message || 'Failed to authenticate with TikTok');
        setTimeout(() => navigate('/tiktok-upload'), 3000);
      }
    };

    handleCallback();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-gray-900 border border-gold-500/20 rounded-lg p-8 text-center space-y-6">
        {status === 'loading' && (
          <>
            <Loader2 className="h-16 w-16 text-gold-400 animate-spin mx-auto" />
            <h2 className="text-2xl font-bold text-gold-400">Connecting to TikTok</h2>
            <p className="text-gray-400">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
            <h2 className="text-2xl font-bold text-green-400">Success!</h2>
            <p className="text-gray-400">{message}</p>
            <p className="text-sm text-gray-500">Redirecting...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto" />
            <h2 className="text-2xl font-bold text-red-400">Authentication Failed</h2>
            <p className="text-gray-400">{message}</p>
            <p className="text-sm text-gray-500">Redirecting back...</p>
          </>
        )}
      </div>
    </div>
  );
}
