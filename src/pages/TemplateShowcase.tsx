// Template Showcase Page - Display automation templates portfolio
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  Zap,
  Bot,
  MessageSquare,
  ShoppingCart,
  BarChart3,
  Mail,
  Calendar,
  FileText,
  Link2,
  Video,
  ArrowRight,
  Check,
  Star,
  TrendingUp,
  Users,
  Clock,
  DollarSign
} from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  price: string;
  category: string;
  demoUrl?: string;
  popular?: boolean;
  comingSoon?: boolean;
}

export default function TemplateShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const templates: Template[] = [
    {
      id: 'tiktok-automation',
      title: 'TikTok Automation Suite',
      description: 'Complete TikTok automation system with auto-posting, content scheduling, and analytics tracking.',
      icon: <Video className="w-8 h-8" />,
      category: 'Social Media',
      price: 'RM 499',
      popular: true,
      features: [
        'Auto-post scheduler',
        'AI content generation',
        'Analytics dashboard',
        'Multi-account support',
        'Hashtag optimizer',
        'Performance tracking'
      ],
      demoUrl: '/tiktok'
    },
    {
      id: 'linkbio-automation',
      title: 'Smart Link Bio',
      description: 'Professional link-in-bio page with analytics, affiliate tracking, and conversion optimization.',
      icon: <Link2 className="w-8 h-8" />,
      category: 'Marketing',
      price: 'RM 299',
      popular: true,
      features: [
        'Customizable design',
        'Click tracking',
        'Revenue analytics',
        'QR code generator',
        'Mobile optimized',
        'SEO friendly'
      ],
      demoUrl: '/linkbio'
    },
    {
      id: 'whatsapp-bot',
      title: 'WhatsApp Business Bot',
      description: 'AI-powered WhatsApp bot for customer service, lead generation, and automated responses.',
      icon: <MessageSquare className="w-8 h-8" />,
      category: 'Customer Service',
      price: 'RM 699',
      features: [
        'AI chat responses',
        'Auto-reply system',
        'Lead capture',
        'Broadcast messages',
        'Contact management',
        'Analytics dashboard'
      ],
      comingSoon: true
    },
    {
      id: 'workflow-builder',
      title: 'Visual Workflow Builder',
      description: 'Drag-and-drop workflow automation builder with 20+ integrations and real-time execution.',
      icon: <Zap className="w-8 h-8" />,
      category: 'Automation',
      price: 'RM 899',
      popular: true,
      features: [
        'Visual workflow editor',
        '20+ node types',
        'Real-time execution',
        'API integrations',
        'Conditional logic',
        'Error handling'
      ],
      demoUrl: '/workflows'
    },
    {
      id: 'maya-ai-agent',
      title: 'Maya AI Assistant',
      description: 'Intelligent AI assistant powered by OpenAI and Gemini for business automation and support.',
      icon: <Bot className="w-8 h-8" />,
      category: 'AI',
      price: 'RM 599',
      features: [
        'OpenAI GPT integration',
        'Gemini AI support',
        'Content generation',
        'Workflow suggestions',
        'Analytics insights',
        'Multi-language'
      ],
      demoUrl: '/maya'
    },
    {
      id: 'ecommerce-automation',
      title: 'E-commerce Automation',
      description: 'Complete e-commerce automation for inventory, orders, and customer management.',
      icon: <ShoppingCart className="w-8 h-8" />,
      category: 'E-commerce',
      price: 'RM 799',
      features: [
        'Inventory sync',
        'Order automation',
        'Customer notifications',
        'Payment integration',
        'Shipping automation',
        'Sales analytics'
      ],
      comingSoon: true
    },
    {
      id: 'analytics-dashboard',
      title: 'Business Analytics Dashboard',
      description: 'Real-time analytics dashboard with custom reports, KPI tracking, and data visualization.',
      icon: <BarChart3 className="w-8 h-8" />,
      category: 'Analytics',
      price: 'RM 499',
      features: [
        'Real-time data',
        'Custom reports',
        'KPI tracking',
        'Data visualization',
        'Export reports',
        'Multi-source integration'
      ],
      demoUrl: '/dashboard'
    },
    {
      id: 'email-automation',
      title: 'Email Marketing Automation',
      description: 'Automated email campaigns with segmentation, A/B testing, and performance tracking.',
      icon: <Mail className="w-8 h-8" />,
      category: 'Marketing',
      price: 'RM 399',
      features: [
        'Campaign builder',
        'Email templates',
        'Segmentation',
        'A/B testing',
        'Analytics',
        'Auto-responders'
      ],
      comingSoon: true
    },
    {
      id: 'appointment-booking',
      title: 'Smart Appointment System',
      description: 'Automated appointment booking with calendar sync, reminders, and payment integration.',
      icon: <Calendar className="w-8 h-8" />,
      category: 'Business',
      price: 'RM 449',
      features: [
        'Online booking',
        'Calendar sync',
        'SMS reminders',
        'Payment integration',
        'Customer management',
        'Analytics'
      ],
      comingSoon: true
    }
  ];

  const categories = [
    { id: 'all', label: 'All Templates', count: templates.length },
    { id: 'Social Media', label: 'Social Media', count: templates.filter(t => t.category === 'Social Media').length },
    { id: 'Marketing', label: 'Marketing', count: templates.filter(t => t.category === 'Marketing').length },
    { id: 'Automation', label: 'Automation', count: templates.filter(t => t.category === 'Automation').length },
    { id: 'AI', label: 'AI', count: templates.filter(t => t.category === 'AI').length },
    { id: 'E-commerce', label: 'E-commerce', count: templates.filter(t => t.category === 'E-commerce').length },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const stats = [
    { icon: <Sparkles className="w-5 h-5" />, label: 'Templates', value: '9+' },
    { icon: <Users className="w-5 h-5" />, label: 'Happy Clients', value: '50+' },
    { icon: <Star className="w-5 h-5" />, label: 'Rating', value: '4.9/5' },
    { icon: <TrendingUp className="w-5 h-5" />, label: 'Success Rate', value: '98%' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] text-white pt-20 md:pt-24 pb-8 md:pb-12">
      <div className="container mx-auto px-3 md:px-4 max-w-7xl">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30">
            Sanztech Automation Solution
          </Badge>
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-4 md:mb-6"
          >
            <div className="flex items-center justify-center gap-2 md:gap-3">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-lg md:rounded-xl bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center shadow-lg shadow-[#d4af37]/50">
                <Zap className="w-6 h-6 md:w-8 md:h-8 text-black" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-[#d4af37]">sanztech</h2>
                <p className="text-xs md:text-sm text-gray-400">automation.solution</p>
              </div>
            </div>
          </motion.div>

          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-[#d4af37] to-[#f5f5dc] bg-clip-text text-transparent px-4">
            Template Automation
          </h1>
          <p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto mb-6 md:mb-8 px-4">
            Ready-to-use automation templates untuk bisnes Malaysia. Plug & play, no coding required.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-4xl mx-auto">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#1a1a1a] border border-[#d4af37]/20 rounded-lg p-3 md:p-4"
              >
                <div className="flex items-center justify-center gap-2 text-[#d4af37] mb-1 md:mb-2">
                  {stat.icon}
                </div>
                <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-6 md:mb-12 px-2"
        >
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category.id)}
              size="sm"
              className={`text-xs md:text-sm min-h-[44px] ${
                selectedCategory === category.id
                  ? 'bg-[#d4af37] hover:bg-[#b8941f] text-black'
                  : 'border-[#d4af37]/30 hover:bg-[#d4af37]/10'
              }`}
            >
              {category.label}
              <Badge variant="secondary" className="ml-1 md:ml-2 text-xs">
                {category.count}
              </Badge>
            </Button>
          ))}
        </motion.div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredTemplates.map((template, idx) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 hover:border-[#d4af37]/50 transition-all duration-300 h-full flex flex-col group hover:shadow-xl hover:shadow-[#d4af37]/10 active:scale-[0.98]">
                <div className="p-4 md:p-6 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3 md:mb-4">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37]/20 transition-colors flex-shrink-0">
                      {template.icon}
                    </div>
                    <div className="flex gap-2">
                      {template.popular && (
                        <Badge className="bg-[#d4af37] text-black">
                          <Star className="w-3 h-3 mr-1" />
                          Popular
                        </Badge>
                      )}
                      {template.comingSoon && (
                        <Badge variant="outline" className="border-[#d4af37]/30 text-[#d4af37]">
                          <Clock className="w-3 h-3 mr-1" />
                          Soon
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-[#d4af37] transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 flex-1 line-clamp-2">
                    {template.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-1.5 md:space-y-2 mb-4 md:mb-6">
                    {template.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs md:text-sm text-gray-300">
                        <Check className="w-3 h-3 md:w-4 md:h-4 text-[#d4af37] flex-shrink-0" />
                        <span className="line-clamp-1">{feature}</span>
                      </div>
                    ))}
                    {template.features.length > 3 && (
                      <div className="text-xs md:text-sm text-gray-500">
                        +{template.features.length - 3} more features
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-[#d4af37]/20 gap-3">
                    <div>
                      <div className="text-xl md:text-2xl font-bold text-[#d4af37]">
                        {template.price}
                      </div>
                      <div className="text-[10px] md:text-xs text-gray-500">one-time</div>
                    </div>
                    {template.demoUrl ? (
                      <Link to={template.demoUrl}>
                        <Button size="sm" className="bg-[#d4af37] hover:bg-[#b8941f] text-black min-h-[44px] text-xs md:text-sm">
                          View Demo
                          <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2" />
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        size="sm"
                        disabled={template.comingSoon}
                        className="bg-[#d4af37] hover:bg-[#b8941f] text-black disabled:opacity-50 min-h-[44px] text-xs md:text-sm"
                      >
                        {template.comingSoon ? 'Soon' : 'Get Started'}
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 md:mt-16 text-center"
        >
          <Card className="bg-gradient-to-br from-[#d4af37]/10 to-[#d4af37]/5 border-[#d4af37]/30 p-6 md:p-8 lg:p-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
              Need Custom Automation?
            </h2>
            <p className="text-gray-400 text-sm md:text-base lg:text-lg mb-6 md:mb-8 max-w-2xl mx-auto px-2">
              Tak jumpa template yang sesuai? Saya boleh develop custom automation solution untuk bisnes anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-2">
              <a href="https://wa.me/601163969241" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button size="lg" className="bg-[#d4af37] hover:bg-[#b8941f] text-black font-semibold w-full sm:w-auto min-h-[48px]">
                  <MessageSquare className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                  WhatsApp Adam
                </Button>
              </a>
              <Link to="/" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="border-[#d4af37]/30 hover:bg-[#d4af37]/10 w-full sm:w-auto min-h-[48px]">
                  Back to Home
                </Button>
              </Link>
            </div>
          </Card>
        </motion.div>

        {/* Footer Note */}
        <div className="mt-8 md:mt-12 text-center text-gray-500 text-xs md:text-sm px-4">
          <p>💡 All templates include setup guide, documentation, and 30-day support</p>
          <p className="mt-2">🚀 Hustle & Tawakkal - Sanztech Automation Solution</p>
        </div>
      </div>
    </div>
  );
}
