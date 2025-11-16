// SanzTech Professional Landing Page - Conversion Optimized
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Zap,
  Bot,
  Video,
  Link2,
  BarChart3,
  Workflow,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MessageSquare,
  TrendingUp,
  Users,
  Clock,
  Shield,
  Globe,
  Mail,
  Phone,
  Play,
  Star,
  Rocket,
  Target,
  Layers
} from 'lucide-react';

export default function SanzTechLanding() {
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

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>SanzTech - AI-Powered Business Automation for Malaysian Entrepreneurs</title>
        <meta name="description" content="Stop manual work. Start automating. TikTok automation, WhatsApp AI, workflow builder & more. Trusted by Malaysian entrepreneurs." />
        <meta name="keywords" content="automation malaysia, business automation, TikTok automation, WhatsApp AI, workflow automation, sanztech" />
        <meta property="og:title" content="SanzTech - AI-Powered Business Automation Malaysia" />
        <meta property="og:description" content="Stop manual work. Start automating. Trusted by Malaysian entrepreneurs." />
        <meta property="og:url" content="https://www.sanztech.online" />
        <meta name="author" content="Adam Sanz - SanzTech Automation Solution" />
        <link rel="canonical" content="https://www.sanztech.online" />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        
        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
          {/* Background Grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `linear-gradient(to right, #d4af37 1px, transparent 1px), linear-gradient(to bottom, #d4af37 1px, transparent 1px)`,
              backgroundSize: '80px 80px'
            }}></div>
          </div>
          
          {/* Gradient Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#d4af37]/20 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>

          <div className="container mx-auto max-w-7xl relative z-10 py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left: Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-6 bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30 text-sm px-4 py-1">
                  AI-Powered Business Automation
                </Badge>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="block text-white">Stop Manual Work.</span>
                  <span className="block bg-gradient-to-r from-[#d4af37] to-yellow-300 bg-clip-text text-transparent">
                    Start Automating.
                  </span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
                  AI-powered automation platform trusted by
                  <span className="text-white font-semibold"> Malaysian entrepreneurs</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button
                    size="lg"
                    onClick={handleTryDemo}
                    disabled={isLoading}
                    className="bg-[#d4af37] hover:bg-[#b8941f] text-black font-bold text-lg px-8 py-7 rounded-full shadow-lg shadow-[#d4af37]/50 hover:shadow-[#d4af37]/70 transition-all hover:scale-105"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    {isLoading ? 'Loading...' : 'See Live Demo'}
                  </Button>

                  <a href="https://wa.me/601163969241" target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-[#d4af37]/30 hover:bg-[#d4af37]/10 text-white font-semibold text-lg px-8 py-7 rounded-full w-full"
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Get Your Automation
                    </Button>
                  </a>
                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                    <span>Setup in 5 minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#d4af37]" />
                    <span>Made in KL 🇲🇾</span>
                  </div>
                </div>
              </motion.div>

              {/* Right: Dashboard Preview */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/20 shadow-2xl shadow-[#d4af37]/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#d4af37]/10 to-transparent"></div>
                  <div className="relative bg-[#1a1a1a] p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/40 p-4 rounded-lg border border-[#d4af37]/20">
                        <div className="text-3xl font-bold text-[#d4af37] mb-1">12</div>
                        <div className="text-xs text-gray-400">Automations Running</div>
                      </div>
                      <div className="bg-black/40 p-4 rounded-lg border border-[#d4af37]/20">
                        <div className="text-3xl font-bold text-[#d4af37] mb-1">1,234</div>
                        <div className="text-xs text-gray-400">Tasks Completed</div>
                      </div>
                      <div className="bg-black/40 p-4 rounded-lg border border-[#d4af37]/20">
                        <div className="text-3xl font-bold text-[#d4af37] mb-1">2.5h</div>
                        <div className="text-xs text-gray-400">Saved Daily</div>
                      </div>
                      <div className="bg-black/40 p-4 rounded-lg border border-[#d4af37]/20">
                        <div className="text-3xl font-bold text-[#d4af37] mb-1">5,483</div>
                        <div className="text-xs text-gray-400">Items Processed</div>
                      </div>
                    </div>
                    <div className="mt-4 text-center text-sm text-gray-500">
                      Real system. Real results. No mockups.
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* FEATURES SHOWCASE */}
        <section className="py-24 px-4 bg-black/20">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Everything You Need to Automate
              </h2>
              <p className="text-xl text-gray-400">Powerful features designed for Malaysian businesses</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Video className="w-6 h-6" />, title: 'TikTok Automation', desc: 'Auto-generate & schedule content 24/7', color: 'from-pink-500 to-pink-700' },
                { icon: <Bot className="w-6 h-6" />, title: 'WhatsApp AI Assistant (Maya)', desc: 'Smart customer support automation', color: 'from-green-500 to-green-700' },
                { icon: <Link2 className="w-6 h-6" />, title: 'Link Bio Automation', desc: 'Dynamic product sync & tracking', color: 'from-blue-500 to-blue-700' },
                { icon: <Workflow className="w-6 h-6" />, title: 'Workflow Builder', desc: 'No-code automation builder', color: 'from-purple-500 to-purple-700' },
                { icon: <BarChart3 className="w-6 h-6" />, title: 'Analytics Dashboard', desc: 'Real-time insights & reports', color: 'from-orange-500 to-orange-700' },
                { icon: <Layers className="w-6 h-6" />, title: 'Multi-platform Integration', desc: 'Connect everything seamlessly', color: 'from-cyan-500 to-cyan-700' },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-6 bg-gradient-to-br from-white/[0.03] to-transparent border-white/[0.05] hover:border-[#d4af37]/30 transition-all h-full group">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Built For Your Business
              </h2>
              <p className="text-xl text-gray-400">Whatever your niche, we've got you covered</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'For Affiliates',
                  icon: '🎯',
                  features: ['Auto-generate TikTok content', 'Schedule posts optimally', 'Sync products to biolink', 'Track performance']
                },
                {
                  title: 'For Businesses',
                  icon: '💼',
                  features: ['WhatsApp customer support', 'Lead generation automation', 'Multi-channel posting', 'Analytics & reporting']
                },
                {
                  title: 'For Creators',
                  icon: '✨',
                  features: ['Content automation', 'Engagement tracking', 'Growth analytics', 'Time-saving workflows']
                }
              ].map((useCase, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="p-8 bg-gradient-to-br from-white/[0.03] to-transparent border-white/[0.05] hover:border-[#d4af37]/30 transition-all h-full">
                    <div className="text-5xl mb-4">{useCase.icon}</div>
                    <h3 className="text-2xl font-bold text-white mb-4">{useCase.title}</h3>
                    <ul className="space-y-3">
                      {useCase.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-400">
                          <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROOF SECTION */}
        <section className="py-24 px-4 bg-black/20">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Built by Malaysian Developer for Malaysian Market
              </h2>
              <p className="text-xl text-gray-400">Trusted technology stack & compliance</p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {['AI Powered', 'TikTok API', 'WhatsApp', 'Vercel', 'React', 'TypeScript', 'Supabase', 'OpenAI'].map((tech, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.05] text-center hover:border-[#d4af37]/30 transition-all">
                    <span className="text-sm text-gray-300">{tech}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                TikTok API Compliant
              </Badge>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-4 py-2">
                <Shield className="w-4 h-4 mr-2" />
                Encrypted & Secure
              </Badge>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 px-4 py-2">
                <Globe className="w-4 h-4 mr-2" />
                Made in Malaysia 🇲🇾
              </Badge>
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="py-24 px-4">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-gray-400">Choose the plan that fits your business</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  name: 'STARTER',
                  price: 'RM99',
                  period: '/month',
                  features: ['3 automation workflows', 'Basic analytics', 'Email support', '100 tasks/day'],
                  cta: 'Start Free Trial',
                  popular: false
                },
                {
                  name: 'PRO',
                  price: 'RM299',
                  period: '/month',
                  features: ['Unlimited workflows', 'Advanced analytics', 'Priority support', '1,000 tasks/day', 'Custom integrations'],
                  cta: 'Start Free Trial',
                  popular: true
                },
                {
                  name: 'ENTERPRISE',
                  price: 'Custom',
                  period: '',
                  features: ['Everything in Pro', 'Dedicated support', 'Custom development', 'Unlimited tasks', 'API access'],
                  cta: 'Schedule Demo',
                  popular: false
                }
              ].map((plan, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className={`p-8 h-full flex flex-col ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-[#d4af37]/10 to-transparent border-[#d4af37]/50 relative' 
                      : 'bg-gradient-to-br from-white/[0.03] to-transparent border-white/[0.05]'
                  }`}>
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4af37] text-black">
                        Most Popular
                      </Badge>
                    )}
                    <div className="text-center mb-6">
                      <h3 className="text-sm font-semibold text-gray-400 mb-2">{plan.name}</h3>
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold text-white">{plan.price}</span>
                        <span className="text-gray-400 ml-2">{plan.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300">
                          <CheckCircle2 className="w-5 h-5 text-[#d4af37] flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full ${
                        plan.popular
                          ? 'bg-[#d4af37] hover:bg-[#b8941f] text-black'
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent"></div>
          
          <div className="container mx-auto max-w-5xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-6">
                Ready to Automate Your Business?
              </h2>
              <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Join Malaysian entrepreneurs who are saving hours daily with automation
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  onClick={handleTryDemo}
                  disabled={isLoading}
                  className="bg-[#d4af37] hover:bg-[#b8941f] text-black font-bold text-lg px-10 py-7 rounded-full shadow-lg shadow-[#d4af37]/50"
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
                <a href="https://wa.me/601163969241" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-[#d4af37]/30 hover:bg-[#d4af37]/10 text-white font-semibold text-lg px-10 py-7 rounded-full"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Schedule Demo
                  </Button>
                </a>
              </div>
              <p className="text-sm text-gray-500">No credit card required • Setup in 5 minutes</p>
            </motion.div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-12 px-4 border-t border-white/[0.05]">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-yellow-600 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="text-white font-bold">sanztech</div>
                    <div className="text-xs text-gray-500">automation.solution</div>
                  </div>
                </div>
                <p className="text-sm text-gray-500">AI-Powered Business Automation for Malaysian Entrepreneurs</p>
              </div>

              {/* Links */}
              <div>
                <h4 className="text-white font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><Link to="/" className="hover:text-[#d4af37] transition-colors">Home</Link></li>
                  <li><Link to="/workflow" className="hover:text-[#d4af37] transition-colors">Features</Link></li>
                  <li><Link to="/showcase" className="hover:text-[#d4af37] transition-colors">Templates</Link></li>
                  <li><button onClick={handleTryDemo} className="hover:text-[#d4af37] transition-colors">Demo</button></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li><a href="https://www.tiktok.com/@adamsannzz" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors">TikTok</a></li>
                  <li><Link to="/privacy" className="hover:text-[#d4af37] transition-colors">Privacy</Link></li>
                  <li><Link to="/terms" className="hover:text-[#d4af37] transition-colors">Terms</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Contact</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:sanztechsolution@gmail.com" className="hover:text-[#d4af37] transition-colors">sanztechsolution@gmail.com</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <a href="https://wa.me/601163969241" className="hover:text-[#d4af37] transition-colors">+60 11-6396 9241</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-white/[0.05] flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-gray-500">© 2024 SanzTech Automation Solution. Made in KL 🇲🇾</p>
              <div className="flex items-center gap-4">
                <a href="https://www.tiktok.com/@adamsannzz" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#d4af37] transition-colors">
                  <Video className="w-5 h-5" />
                </a>
                <a href="https://wa.me/601163969241" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#d4af37] transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
