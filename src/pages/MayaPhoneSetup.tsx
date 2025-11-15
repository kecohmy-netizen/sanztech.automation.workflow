import React, { useState } from 'react';
import { 
  Smartphone,
  MessageCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Copy,
  QrCode,
  Settings,
  Phone,
  Zap,
  Link2,
  ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PlatformConfig {
  name: string;
  icon: React.ReactNode;
  color: string;
  status: 'connected' | 'disconnected' | 'pending';
  phoneNumber?: string;
  instructions: string[];
}

export default function MayaPhoneSetup() {
  const [platforms, setPlatforms] = useState<PlatformConfig[]>([
    {
      name: 'WhatsApp',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'from-green-500 to-green-600',
      status: 'disconnected',
      phoneNumber: '+60123456789',
      instructions: [
        'Save Maya number: +60 12-345 6789',
        'Send "Hi Maya" untuk start',
        'Maya akan reply dengan welcome message',
        'Gunakan commands atau chat naturally'
      ]
    },
    {
      name: 'Telegram',
      icon: <Send className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600',
      status: 'disconnected',
      phoneNumber: '@MayaAutomationBot',
      instructions: [
        'Search @MayaAutomationBot di Telegram',
        'Click "Start" button',
        'Send /setup untuk configure',
        'Link dengan account kau'
      ]
    },
    {
      name: 'SMS',
      icon: <Phone className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600',
      status: 'disconnected',
      phoneNumber: '+60 12-345 6789',
      instructions: [
        'SMS ke +60 12-345 6789',
        'Format: MAYA <your-message>',
        'Example: MAYA status',
        'Maya akan reply dalam 5 saat'
      ]
    }
  ]);

  const [selectedPlatform, setSelectedPlatform] = useState<string>('WhatsApp');
  const [setupStep, setSetupStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');

  const mayaNumber = '+60 12-345 6789';
  const telegramBot = '@MayaAutomationBot';
  const webhookUrl = 'https://sanztech.online/webhook/maya';

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // Add toast notification
  };

  const quickCommands = [
    { cmd: '/status', desc: 'Check system status' },
    { cmd: '/workflows', desc: 'Manage workflows' },
    { cmd: '/analytics', desc: 'View analytics' },
    { cmd: '/linkbio', desc: 'Link bio stats' },
    { cmd: '/start', desc: 'Start automation' },
    { cmd: '/stop', desc: 'Stop automation' },
    { cmd: '/help', desc: 'Show all commands' }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37] to-yellow-500 flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#d4af37] to-yellow-400 bg-clip-text text-transparent">
                Maya Phone Integration
              </h1>
              <p className="text-gray-400">Communicate dengan Maya dari phone kau</p>
            </div>
          </div>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {platforms.map((platform) => (
            <Card
              key={platform.name}
              className={`bg-black border ${
                platform.status === 'connected' 
                  ? 'border-gold/50' 
                  : 'border-gold/20'
              } p-6 cursor-pointer hover:border-gold hover:shadow-gold transition-all`}
              onClick={() => setSelectedPlatform(platform.name)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center">
                  {platform.icon}
                </div>
                {platform.status === 'connected' ? (
                  <CheckCircle className="w-6 h-6 text-gold" />
                ) : (
                  <AlertCircle className="w-6 h-6 text-gray-400" />
                )}
              </div>
              
              <h3 className="text-xl font-bold mb-2">{platform.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{platform.phoneNumber}</p>
              
              <div className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${
                platform.status === 'connected'
                  ? 'bg-gold/20 text-gold border border-gold/30'
                  : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
              }`}>
                {platform.status === 'connected' ? 'Connected' : 'Not Connected'}
              </div>
            </Card>
          ))}
        </div>

        {/* Setup Instructions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* WhatsApp Setup */}
          <Card className="bg-black border border-gold/20 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-xl font-bold text-gold">WhatsApp Setup</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2">Maya WhatsApp Number:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-lg font-mono text-gold">{mayaNumber}</code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(mayaNumber)}
                    className="border-gold/30 hover:bg-gold/10"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-gold">Setup Steps:</p>
                {platforms[0].instructions.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-gold/30">
                      <span className="text-xs font-bold text-gold">{idx + 1}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{step}</p>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-gradient-to-r from-gold-dark to-gold hover:from-gold hover:to-gold-light text-black font-semibold">
                <MessageCircle className="w-4 h-4 mr-2" />
                Open WhatsApp
              </Button>
            </div>
          </Card>

          {/* Telegram Setup */}
          <Card className="bg-black border border-gold/20 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gold-dark to-gold flex items-center justify-center">
                <Send className="w-5 h-5 text-black" />
              </div>
              <h2 className="text-xl font-bold text-gold">Telegram Setup</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-black/30 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2">Maya Telegram Bot:</p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-lg font-mono text-gold">{telegramBot}</code>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(telegramBot)}
                    className="border-gold/30 hover:bg-gold/10"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-gold">Setup Steps:</p>
                {platforms[1].instructions.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5 border border-gold/30">
                      <span className="text-xs font-bold text-gold">{idx + 1}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{step}</p>
                  </div>
                ))}
              </div>

              <Button className="w-full bg-gradient-to-r from-gold-dark to-gold hover:from-gold hover:to-gold-light text-black font-semibold">
                <Send className="w-4 h-4 mr-2" />
                Open Telegram
              </Button>
            </div>
          </Card>
        </div>

        {/* Quick Commands Reference */}
        <Card className="bg-black border border-gold/20 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-[#d4af37]" />
            <h2 className="text-xl font-bold">Quick Commands</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickCommands.map((cmd) => (
              <div key={cmd.cmd} className="bg-black/30 rounded-lg p-4">
                <code className="text-[#d4af37] font-mono font-bold">{cmd.cmd}</code>
                <p className="text-gray-400 text-sm mt-1">{cmd.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-[#d4af37]/10 rounded-lg border border-[#d4af37]/30">
            <p className="text-sm text-gray-300">
              💡 <span className="font-semibold">Pro Tip:</span> Kau boleh chat naturally dengan Maya! 
              Tak perlu guna commands. Just type macam chat dengan kawan.
            </p>
          </div>
        </Card>

        {/* Example Conversations */}
        <Card className="bg-black border border-gold/20 p-6">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="w-6 h-6 text-[#d4af37]" />
            <h2 className="text-xl font-bold">Example Conversations</h2>
          </div>

          <div className="space-y-4">
            {/* Example 1 */}
            <div className="space-y-2">
              <div className="bg-[#d4af37]/20 rounded-lg p-3 ml-12">
                <p className="text-sm font-medium">You:</p>
                <p className="text-white">"Maya, how's my link bio performing?"</p>
              </div>
              <div className="bg-[#d4af37]/20 rounded-lg p-3 mr-12">
                <p className="text-sm font-medium text-[#d4af37]">Maya:</p>
                <p className="text-white text-sm">
                  🔗 Link Bio Performance:<br/>
                  <br/>
                  👕 Collection Baju Budak<br/>
                  &nbsp;&nbsp;&nbsp;RM 1,250 | 320 clicks<br/>
                  <br/>
                  🚀 Template Automation<br/>
                  &nbsp;&nbsp;&nbsp;RM 2,400 | 180 clicks<br/>
                  <br/>
                  📈 Total: RM 4,490 today!
                </p>
              </div>
            </div>

            {/* Example 2 */}
            <div className="space-y-2">
              <div className="bg-[#d4af37]/20 rounded-lg p-3 ml-12">
                <p className="text-sm font-medium">You:</p>
                <p className="text-white">"Start automation"</p>
              </div>
              <div className="bg-[#d4af37]/20 rounded-lg p-3 mr-12">
                <p className="text-sm font-medium text-[#d4af37]">Maya:</p>
                <p className="text-white text-sm">
                  🚀 Automation started!<br/>
                  <br/>
                  All workflows are now active:<br/>
                  ✅ TikTok Auto-post<br/>
                  ✅ Link Bio Sync<br/>
                  ✅ Analytics Report<br/>
                  <br/>
                  I'll notify you of any updates!
                </p>
              </div>
            </div>

            {/* Example 3 */}
            <div className="space-y-2">
              <div className="bg-[#d4af37]/20 rounded-lg p-3 ml-12">
                <p className="text-sm font-medium">You:</p>
                <p className="text-white">"/analytics"</p>
              </div>
              <div className="bg-[#d4af37]/20 rounded-lg p-3 mr-12">
                <p className="text-sm font-medium text-[#d4af37]">Maya:</p>
                <p className="text-white text-sm">
                  📊 Today's Analytics:<br/>
                  <br/>
                  👁️ Views: 1,234 (↗️ +15%)<br/>
                  🖱️ Clicks: 189 (↗️ +8%)<br/>
                  ✅ Conversions: 23<br/>
                  💰 Revenue: RM 567 (↗️ +22%)<br/>
                  <br/>
                  Great performance! 🎉
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Advanced Settings */}
        <Card className="bg-black border border-gold/20 p-6 mt-8">
          <div className="flex items-center gap-3 mb-6">
            <Settings className="w-6 h-6 text-[#d4af37]" />
            <h2 className="text-xl font-bold">Advanced Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Webhook URL (for developers)
              </label>
              <div className="flex gap-2">
                <Input
                  value={webhookUrl}
                  readOnly
                  className="flex-1 bg-black/30 border border-[#d4af37]/30"
                />
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(webhookUrl)}
                  className="border-[#d4af37]/30"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Response Delay
                </label>
                <select className="w-full bg-black/30 border border-[#d4af37]/30 rounded-lg px-4 py-2">
                  <option>Instant</option>
                  <option>1 second</option>
                  <option>2 seconds</option>
                  <option>5 seconds</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Notification Frequency
                </label>
                <select className="w-full bg-black/30 border border-[#d4af37]/30 rounded-lg px-4 py-2">
                  <option>Real-time</option>
                  <option>Every hour</option>
                  <option>Daily summary</option>
                  <option>Weekly summary</option>
                </select>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
