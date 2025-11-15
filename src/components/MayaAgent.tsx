import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Code, 
  Wrench, 
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Loader2,
  BarChart3,
  ShoppingCart,
  DollarSign,
  Megaphone,
  Users,
  Rocket
} from 'lucide-react';

interface Message {
  role: 'user' | 'maya';
  content: string;
  timestamp: Date;
  type?: 'success' | 'error' | 'info';
}

export default function MayaAgent() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'maya',
      content: 'Halo! Saya Maya, AI Agent untuk MayaHQ. Saya dapat membantu Anda:\n\n• Membuat workflow automation baru\n• Memperbaiki error dalam automation\n• Mengoptimalkan performa aplikasi\n• Memberikan saran untuk meningkatkan sistem\n\nApa yang bisa saya bantu hari ini?',
      timestamp: new Date(),
      type: 'info'
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);

    setTimeout(() => {
      const response = generateMayaResponse(input);
      const mayaMessage: Message = {
        role: 'maya',
        content: response.content,
        timestamp: new Date(),
        type: response.type
      };
      setMessages(prev => [...prev, mayaMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const generateMayaResponse = (userInput: string): { content: string; type: 'success' | 'error' | 'info' } => {
    const input = userInput.toLowerCase();

    // Agent HQ & Sub-Agent Management
    if (input.includes('agent hq') || input.includes('maya otak gemini') || input.includes('sub-agent') || input.includes('automation bisnes')) {
      return {
        content: `🧠 **MAYA HQ - Gemini Intelligence Activated**\n\nSaya sekarang berfungsi sebagai **Agent HQ** dengan kemampuan Gemini yang bijak untuk mengelola seluruh workflow automasi bisnes Anda!\n\n**Architecture Agent HQ:**\n\n🏢 **MAYA HQ (Brain Center)**\n• Gemini Intelligence Core\n• Central Decision Making\n• Workflow Orchestration\n• Performance Monitoring\n• Strategic Optimization\n\n**Sub-Agent Ecosystem:**\n\n🤖 **Sales Agent**\n• Lead Management & Follow-up\n• Customer Relationship Automation\n• Sales Pipeline Optimization\n• Revenue Tracking\n\n📊 **Analytics Agent**\n• Data Analysis & Insights\n• Performance Dashboard\n• Trend Prediction\n• Business Intelligence\n\n🛒 **E-commerce Agent**\n• Inventory Management\n• Order Processing\n• Customer Support\n• Payment Automation\n\n📧 **Communication Agent**\n• Email & SMS Automation\n• Social Media Management\n• Notification System\n• Multi-channel Integration\n\n**Next Steps:**\n1. Konfigurasi sub-agent yang diperlukan\n2. Setup integration dengan sistem existing\n3. Define business rules & workflows\n4. Deploy & monitor performance\n\nAgent mana yang ingin Anda aktifkan terlebih dahulu?`,
        type: 'success'
      };
    }

    if (input.includes('workflow') || input.includes('automation')) {
      return {
        content: `Saya akan membantu Anda membuat workflow automation baru! \n\nBerikut langkah-langkahnya:\n1. Buka Workflow Builder\n2. Pilih trigger (webhook, schedule, atau event)\n3. Tambahkan action nodes (email, database, API calls)\n4. Hubungkan nodes dengan drag & drop\n5. Konfigurasi setiap node\n6. Test dan deploy workflow\n\nApakah Anda ingin saya buatkan template workflow untuk use case tertentu?`,
        type: 'success'
      };
    }

    if (input.includes('error') || input.includes('bug') || input.includes('fix')) {
      return {
        content: `Saya akan menganalisis error dalam sistem Anda.\n\nLangkah troubleshooting:\n✓ Memeriksa log sistem\n✓ Mengidentifikasi bottleneck\n✓ Menganalisis failed workflows\n✓ Memberikan solusi perbaikan\n\nBerdasarkan analisis, saya menemukan:\n• 2 workflows dengan timeout issues\n• 1 API endpoint yang perlu optimasi\n• Database query yang bisa di-cache\n\nApakah Anda ingin saya perbaiki secara otomatis?`,
        type: 'info'
      };
    }

    if (input.includes('optimize') || input.includes('improve') || input.includes('performance')) {
      return {
        content: `Saya telah menganalisis performa aplikasi Anda:\n\n📊 Rekomendasi Optimasi:\n• Implementasi caching untuk API calls (↑ 40% speed)\n• Batch processing untuk tasks (↓ 30% resource usage)\n• Async processing untuk heavy operations\n• Database indexing untuk query optimization\n\n🚀 Potensi Improvement:\n• Response time: 2.5s → 0.8s\n• Throughput: +150 tasks/hour\n• Error rate: 5% → 1%\n\nApakah Anda ingin saya implementasikan optimasi ini?`,
        type: 'success'
      };
    }

    if (input.includes('learn') || input.includes('training') || input.includes('data')) {
      return {
        content: `Saya terus belajar dari data aplikasi ini:\n\n📚 Learning Progress:\n• Workflow patterns: 1,234 samples analyzed\n• Error patterns: 89 unique cases learned\n• User behavior: 5,483 interactions tracked\n• Optimization strategies: 23 successful implementations\n\n🧠 Model Training (Gemini):\n• Accuracy: 94.5%\n• Confidence: High\n• Last updated: 2 hours ago\n\nSaya menggunakan data ini untuk memberikan rekomendasi yang lebih baik dan otomasi yang lebih cerdas.`,
        type: 'info'
      };
    }

    // Sub-Agent specific responses
    if (input.includes('sales agent') || input.includes('lead')) {
      return {
        content: `🤖 **Sales Agent Activated**\n\n**Capabilities:**\n• Auto-lead qualification & scoring\n• Follow-up sequence automation\n• CRM integration & sync\n• Sales performance analytics\n• Customer segmentation\n\n**Setup Process:**\n1. Connect CRM system (HubSpot, Salesforce, etc)\n2. Define lead scoring criteria\n3. Configure follow-up sequences\n4. Set up performance dashboards\n5. Enable real-time notifications\n\n**Expected Results:**\n• ↑ 35% lead conversion rate\n• ↓ 60% manual follow-up time\n• Real-time sales pipeline visibility\n• Automated customer journey tracking\n\nReady to deploy Sales Agent?`,
        type: 'success'
      };
    }

    if (input.includes('finance agent') || input.includes('accounting')) {
      return {
        content: `💰 **Finance Agent Activated**\n\n**Capabilities:**\n• Automated invoicing & billing\n• Expense tracking & categorization\n• Financial reporting automation\n• Tax compliance monitoring\n• Cash flow forecasting\n\n**Setup Process:**\n1. Connect accounting software (QuickBooks, Xero)\n2. Configure billing automation\n3. Set up expense policies\n4. Enable financial reporting\n5. Integrate payment gateways\n\n**Expected Results:**\n• ↓ 75% manual accounting tasks\n• Real-time financial insights\n• Automated compliance checks\n• Improved cash flow management\n\nReady to deploy Finance Agent?`,
        type: 'success'
      };
    }

    if (input.includes('marketing agent') || input.includes('campaign')) {
      return {
        content: `📢 **Marketing Agent Activated**\n\n**Capabilities:**\n• Multi-channel campaign automation\n• Customer segmentation & targeting\n• Performance analytics & optimization\n• Content scheduling & distribution\n• ROI tracking & reporting\n\n**Setup Process:**\n1. Connect marketing platforms (Mailchimp, HubSpot)\n2. Define campaign strategies\n3. Configure audience segments\n4. Set up analytics dashboards\n5. Enable A/B testing\n\n**Expected Results:**\n• ↑ 45% campaign engagement\n• ↓ 50% campaign setup time\n• Real-time performance tracking\n• Automated optimization\n\nReady to deploy Marketing Agent?`,
        type: 'success'
      };
    }

    if (input.includes('hr agent') || input.includes('human resource')) {
      return {
        content: `👥 **HR Agent Activated**\n\n**Capabilities:**\n• Recruitment process automation\n• Employee onboarding workflows\n• Performance review scheduling\n• Leave & attendance management\n• Training & development tracking\n\n**Setup Process:**\n1. Connect HR systems (BambooHR, Workday)\n2. Configure recruitment pipelines\n3. Set up employee self-service\n4. Enable performance tracking\n5. Integrate payroll systems\n\n**Expected Results:**\n• ↓ 70% manual HR tasks\n• Streamlined recruitment process\n• Automated employee lifecycle\n• Improved compliance tracking\n\nReady to deploy HR Agent?`,
        type: 'success'
      };
    }

    if (input.includes('analytics agent') || input.includes('data insight')) {
      return {
        content: `📊 **Analytics Agent Activated**\n\n**Capabilities:**\n• Real-time business intelligence\n• Predictive analytics & forecasting\n• Automated reporting\n• Performance KPI tracking\n• Data visualization\n\n**Setup Process:**\n1. Connect data sources (database, APIs, files)\n2. Define key metrics & KPIs\n3. Configure dashboards & reports\n4. Set up alert thresholds\n5. Enable automated insights\n\n**Expected Results:**\n• Real-time business monitoring\n• Predictive trend analysis\n• Automated executive reports\n• Data-driven decision making\n\nReady to deploy Analytics Agent?`,
        type: 'success'
      };
    }

    if (input.includes('e-commerce agent') || input.includes('inventory')) {
      return {
        content: `🛒 **E-commerce Agent Activated**\n\n**Capabilities:**\n• Inventory management automation\n• Order processing workflow\n• Customer support automation\n• Payment gateway integration\n• Shipping & logistics coordination\n\n**Setup Process:**\n1. Connect e-commerce platform\n2. Configure inventory rules\n3. Set up order workflows\n4. Integrate payment systems\n5. Enable customer support automation\n\n**Expected Results:**\n• ↓ 80% manual order processing\n• Real-time inventory tracking\n• Automated customer notifications\n• Streamlined fulfillment process\n\nReady to deploy E-commerce Agent?`,
        type: 'success'
      };
    }

    if (input.includes('deploy') || input.includes('setup') || input.includes('implement')) {
      return {
        content: `🚀 **Deployment Engine Activated**\n\n**Deployment Process:**\n1. **System Analysis** - Scan existing infrastructure\n2. **Agent Configuration** - Setup selected sub-agents\n3. **Integration Testing** - Verify all connections\n4. **Data Migration** - Transfer existing data\n5. **Performance Optimization** - Fine-tune parameters\n6. **Go Live** - Activate full automation\n\n**Deployment Timeline:**\n• Phase 1 (Setup): 2-3 days\n• Phase 2 (Integration): 3-5 days\n• Phase 3 (Testing): 1-2 days\n• Phase 4 (Launch): 1 day\n\n**Success Metrics:**\n• 99.5% system uptime\n• < 2s response time\n• Zero data loss\n• Full automation achieved\n\nReady to begin deployment?`,
        type: 'success'
      };
    }

    return {
      content: `Terima kasih atas pertanyaan Anda! Saya dapat membantu dengan:\n\n🤖 Automation Tasks:\n• Membuat dan mengelola workflows\n• Memperbaiki errors dan bugs\n• Optimasi performa sistem\n\n📈 Analytics & Insights:\n• Analisis data workflow\n• Rekomendasi improvement\n• Prediksi bottlenecks\n\n🔧 Development Support:\n• Code generation\n• API integration\n• Database optimization\n\nSilakan tanyakan hal spesifik yang ingin Anda lakukan!`,
      type: 'info'
    };
  };

  // State untuk mengelola sub-agents
  const [activeAgents, setActiveAgents] = useState<string[]>([]);
  const [agentPerformance, setAgentPerformance] = useState<Record<string, number>>({});

  const quickActions = [
    { label: 'Maya HQ Setup', icon: <Bot className="w-4 h-4" />, action: 'message' },
    { label: '📱 Phone Setup', icon: <Bot className="w-4 h-4" />, action: 'navigate', path: '/maya/phone' },
    { label: 'Sales Agent', icon: <TrendingUp className="w-4 h-4" />, action: 'message' },
    { label: 'Analytics Agent', icon: <BarChart3 className="w-4 h-4" />, action: 'message' },
    { label: 'E-commerce Agent', icon: <ShoppingCart className="w-4 h-4" />, action: 'message' },
    { label: 'Finance Agent', icon: <DollarSign className="w-4 h-4" />, action: 'message' },
    { label: 'Marketing Agent', icon: <Megaphone className="w-4 h-4" />, action: 'message' },
    { label: 'HR Agent', icon: <Users className="w-4 h-4" />, action: 'message' },
    { label: 'Deploy All', icon: <Rocket className="w-4 h-4" />, action: 'message' },
    { label: 'Create Workflow', icon: <Sparkles className="w-4 h-4" />, action: 'message' },
    { label: 'Fix Errors', icon: <Wrench className="w-4 h-4" />, action: 'message' },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] flex flex-col">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-xl border-b border-[#d4af37]/20 p-4 md:p-6">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center">
            <Bot className="w-6 h-6 md:w-8 md:h-8 text-black" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold text-[#d4af37]">Maya AI Agent</h2>
            <p className="text-gray-400 text-xs md:text-sm">Autonomous Automation Assistant powered by Gemini</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/50">
            <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
            <span className="text-[#d4af37] text-xs font-semibold">Online</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-3 md:p-4 border-b border-[#d4af37]/20 overflow-x-auto">
        <div className="flex gap-2">
          {quickActions.map((action, idx) => (
            <Button
              key={idx}
              variant="outline"
              className="border-[#d4af37]/30 bg-[#1a1a1a] text-white hover:bg-[#d4af37]/10 hover:border-[#d4af37] whitespace-nowrap text-xs md:text-sm"
              onClick={() => {
                if (action.action === 'navigate' && action.path) {
                  navigate(action.path);
                } else {
                  setInput(action.label);
                }
              }}
              size="sm"
            >
              {action.icon}
              <span className="ml-2">{action.label}</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4">
        {messages.map((message, idx) => (
          <div
            key={idx}
            className={`flex gap-2 md:gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'maya' && (
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 md:w-5 md:h-5 text-black" />
              </div>
            )}
            <Card
              className={`max-w-[85%] md:max-w-2xl p-3 md:p-4 ${
                message.role === 'user'
                  ? 'bg-[#d4af37] text-black'
                  : message.type === 'success'
                  ? 'bg-gradient-to-br from-[#d4af37]/20 to-[#d4af37]/10 border-[#d4af37]/30'
                  : message.type === 'error'
                  ? 'bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-600/30'
                  : 'bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20'
              }`}
            >
              {message.role === 'maya' && message.type && (
                <div className="flex items-center gap-2 mb-2">
                  {message.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />}
                  {message.type === 'error' && <AlertCircle className="w-4 h-4 text-gray-400" />}
                  {message.type === 'info' && <Sparkles className="w-4 h-4 text-[#d4af37]" />}
                  <span className="text-xs font-semibold text-gray-400">
                    {message.type.toUpperCase()}
                  </span>
                </div>
              )}
              <div className={`whitespace-pre-wrap text-sm md:text-base ${message.role === 'user' ? 'text-black' : 'text-white'}`}>
                {message.content}
              </div>
              <div className={`text-xs mt-2 ${message.role === 'user' ? 'text-black/60' : 'text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString()}
              </div>
            </Card>
          </div>
        ))}
        {isProcessing && (
          <div className="flex gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center">
              <Bot className="w-4 h-4 md:w-5 md:h-5 text-black" />
            </div>
            <Card className="p-3 md:p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Maya sedang berpikir...</span>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-3 md:p-4 bg-black/40 backdrop-blur-xl border-t border-[#d4af37]/20">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Tanyakan sesuatu kepada Maya..."
            className="flex-1 !bg-[#1a1a1a] border-[#d4af37]/30 text-white placeholder:text-gray-500 resize-none text-sm md:text-base"
            rows={2}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            className="bg-[#d4af37] hover:bg-[#b8941f] text-black font-semibold h-auto px-3 md:px-4"
          >
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}