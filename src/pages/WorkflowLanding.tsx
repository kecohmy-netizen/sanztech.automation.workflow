// Sanztech Workflow Landing Page - SEO Optimized
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Zap,
  Bot,
  Workflow,
  BarChart3,
  MessageSquare,
  Video,
  Link2,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Clock,
  Shield,
  Rocket,
  Code,
  Database,
  Globe,
  Mail,
  Phone
} from 'lucide-react';

export default function WorkflowLanding() {
  const navigate = useNavigate();
  const { signInDemo } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleTryDemo = async () => {
    setIsLoading(true);
    try {
      await signInDemo();
      navigate('/dashboard');
    } catch (error) {
      console.error('Demo login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      icon: <Workflow className="w-6 h-6" />,
      title: 'Visual Workflow Builder',
      description: 'Drag-and-drop automation builder dengan 20+ node types. No coding required.',
      color: 'from-[#d4af37] to-[#b8941f]'
    },
    {
      icon: <Bot className="w-6 h-6" />,
      title: 'AI-Powered Assistant',
      description: 'Maya AI dengan OpenAI & Gemini integration untuk smart automation.',
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: 'TikTok Automation',
      description: 'Auto-posting, content scheduling, dan analytics tracking untuk TikTok.',
      color: 'from-pink-500 to-pink-700'
    },
    {
      icon: <Link2 className="w-6 h-6" />,
      title: 'Smart Link Bio',
      description: 'Professional link-in-bio dengan analytics dan conversion tracking.',
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Real-Time Analytics',
      description: 'Dashboard analytics dengan real-time data dan custom reports.',
      color: 'from-green-500 to-green-700'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'Multi-Channel Integration',
      description: 'WhatsApp, Telegram, Email, dan social media automation.',
      color: 'from-orange-500 to-orange-700'
    }
  ];

  const capabilities = [
    { icon: <Code className="w-5 h-5" />, text: 'Custom API Integrations' },
    { icon: <Database className="w-5 h-5" />, text: 'Database Automation' },
    { icon: <Globe className="w-5 h-5" />, text: 'Web Scraping & Data Collection' },
    { icon: <Mail className="w-5 h-5" />, text: 'Email Marketing Automation' },
    { icon: <Shield className="w-5 h-5" />, text: 'Secure & Reliable' },
    { icon: <Rocket className="w-5 h-5" />, text: 'Fast Deployment' }
  ];

  const stats = [
    { value: '20+', label: 'Automation Nodes', icon: <Zap className="w-5 h-5" /> },
    { value: '50+', label: 'Happy Clients', icon: <Users className="w-5 h-5" /> },
    { value: '98%', label: 'Success Rate', icon: <TrendingUp className="w-5 h-5" /> },
    { value: '24/7', label: 'System Uptime', icon: <Clock className="w-5 h-5" /> }
  ];

  const useCases = [
    {
      title: 'E-commerce Automation',
      description: 'Automate inventory, orders, customer notifications, dan payment processing.',
      icon: '🛒'
    },
    {
      title: 'Social Media Management',
      description: 'Schedule posts, auto-reply comments, track engagement, dan analytics.',
      icon: '📱'
    },
    {
      title: 'Lead Generation',
      description: 'Capture leads, auto-follow up, CRM integration, dan conversion tracking.',
      icon: '🎯'
    },
    {
      title: 'Content Creation',
      description: 'AI-powered content generation, scheduling, dan multi-platform distribution.',
      icon: '✍️'
    }
  ];

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Sanztech Workflow - Automation System Malaysia | AI-Powered Business Automation</title>
        <meta name="description" content="Professional automation system untuk bisnes Malaysia. Visual workflow builder, AI integration, TikTok automation, analytics dashboard. Try demo now!" />
        <meta name="keywords" content="automation malaysia, workflow automation, business automation, AI automation, TikTok automation, social media automation, sanztech, automation system" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Sanztech Workflow - Automation System Malaysia" />
        <meta property="og:description" content="Professional automation system dengan AI integration. Visual workflow builder, TikTok automation, analytics dashboard." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.sanztech.online" />
        <meta property="og:image" content="https://www.sanztech.online/og-image.jpg" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sanztech Workflow - Automation System Malaysia" />
        <meta name="twitter:description" content="Professional automation system dengan AI integration untuk bisnes Malaysia." />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Adam Sanz - Sanztech Automation Solution" />
        <meta name="contact" content="sanztechsolution@gmail.com" />
        <link rel="canonical" content="https://www.sanztech.online" />
        
        {/* Social Links */}
        <meta property="og:email" content="sanztechsolution@gmail.com" />
        <meta property="og:phone_number" content="+601163969241" />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        
        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32 pb-20 md:pb-32 px-4 overflow-hidden">
          {/* Modern Grid Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(to right, #d4af37 1px, transparent 1px),
                linear-gradient(to bottom, #d4af37 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px'
            }}></div>
          </div>
          
          {/* Gradient Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#d4af37]/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              {/* Logo */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center shadow-lg shadow-[#d4af37]/50">
                  <Zap className="w-8 h-8 md:w-10 md:h-10 text-black" />
                </div>
                <div className="text-left">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#d4af37]">sanztech</h2>
                  <p className="text-sm md:text-base text-gray-400">automation.solution</p>
                </div>
              </div>

              <Badge className="mb-6 bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30 text-sm md:text-base px-4 py-1">
                Professional Automation System
              </Badge>

              <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight">
                <span className="block text-white">Automate Your</span>
                <span className="block bg-gradient-to-r from-[#d4af37] via-[#f5f5dc] to-[#d4af37] bg-clip-text text-transparent">
                  Business Growth
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 px-4 leading-relaxed">
                Build powerful automations with our visual workflow builder.
                <br className="hidden md:block" />
                <span className="text-white font-medium"> AI-powered. No code needed.</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4 mb-12">
                <Button
                  size="lg"
                  onClick={handleTryDemo}
                  disabled={isLoading}
                  className="bg-[#d4af37] hover:bg-[#c9a332] text-black font-semibold text-lg px-10 py-7 w-full sm:w-auto rounded-full shadow-lg shadow-[#d4af37]/50 hover:shadow-[#d4af37]/70 transition-all hover:scale-105"
                >
                  {isLoading ? (
                    <>
                      <Clock className="w-5 h-5 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Try Demo — It's Free
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </Button>

                <Link to="/portfolio" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-gray-300 hover:text-white font-medium text-lg px-10 py-7 w-full rounded-full hover:bg-white/5"
                  >
                    View Portfolio
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                  <span>No credit card</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                  <span>Instant access</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37]"></div>
                  <span>Full features</span>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mt-20"
            >
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center group">
                  <div className="flex items-center justify-center text-[#d4af37] mb-3 group-hover:scale-110 transition-transform">
                    {stat.icon}
                  </div>
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 md:py-32 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-sm font-medium mb-6">
                Core Features
              </div>
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Everything you need
                <br />
                <span className="text-gray-500">in one platform</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Professional automation tools designed for modern businesses
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] hover:border-[#d4af37]/30 transition-all duration-300 h-full backdrop-blur-sm">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-[#d4af37] transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities Section */}
        <section className="py-24 md:py-32 px-4 relative overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent"></div>
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-sm font-medium mb-6">
                Technical Capabilities
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
                Built for scale
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {capabilities.map((cap, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group"
                >
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-[#d4af37]/30 transition-all flex items-center gap-3 hover:bg-white/[0.04]">
                    <div className="text-[#d4af37] group-hover:scale-110 transition-transform">{cap.icon}</div>
                    <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">{cap.text}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-24 md:py-32 px-4">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/20 text-[#d4af37] text-sm font-medium mb-6">
                Use Cases
              </div>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                Perfect for any business
              </h2>
              <p className="text-xl text-gray-400">From startups to enterprises</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((useCase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group"
                >
                  <div className="p-8 rounded-2xl bg-gradient-to-br from-white/[0.03] to-transparent border border-white/[0.05] hover:border-[#d4af37]/30 transition-all h-full backdrop-blur-sm">
                    <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">{useCase.icon}</div>
                    <h3 className="text-2xl font-semibold text-white mb-3">{useCase.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{useCase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent"></div>
          
          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                Start automating today
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Join businesses yang dah automate their operations with our platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={handleTryDemo}
                  disabled={isLoading}
                  className="bg-[#d4af37] hover:bg-[#c9a332] text-black font-semibold text-lg px-10 py-7 rounded-full shadow-lg shadow-[#d4af37]/50 hover:shadow-[#d4af37]/70 transition-all hover:scale-105"
                >
                  {isLoading ? 'Loading...' : 'Try Demo — It\'s Free'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <a href="https://wa.me/601163969241" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-gray-300 hover:text-white font-medium text-lg px-10 py-7 rounded-full hover:bg-white/5"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    WhatsApp Me
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-white/[0.05]">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-black" />
                </div>
                <div>
                  <div className="text-white font-semibold">sanztech</div>
                  <div className="text-xs text-gray-500">automation.solution</div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <p className="text-gray-500 text-sm">🚀 Hustle & Tawakkal</p>
                <p className="text-gray-600 text-xs mt-1">© 2024 Sanztech. All rights reserved.</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
