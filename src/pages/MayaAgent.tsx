import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bot, 
  MessageSquare,
  Zap,
  Brain,
  Sparkles,
  Settings,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const agentCapabilities = [
  { 
    title: "Natural Language Processing", 
    description: "Understand and process human language with advanced AI models",
    icon: Brain,
    status: "active"
  },
  { 
    title: "Multi-Modal Responses", 
    description: "Generate text, images, and structured data based on context",
    icon: Sparkles,
    status: "active"
  },
  { 
    title: "Workflow Integration", 
    description: "Seamlessly integrate with existing automation workflows",
    icon: Zap,
    status: "active"
  },
  { 
    title: "Real-time Processing", 
    description: "Process requests and generate responses in real-time",
    icon: Play,
    status: "active"
  }
];

const recentConversations = [
  { id: 1, query: "Create a workflow for social media posting", status: "completed", timestamp: "2 min ago" },
  { id: 2, query: "Analyze TikTok engagement metrics", status: "completed", timestamp: "15 min ago" },
  { id: 3, query: "Set up automated email responses", status: "processing", timestamp: "1 hour ago" },
  { id: 4, query: "Generate monthly performance report", status: "completed", timestamp: "2 hours ago" }
];

export default function MayaAgent() {
  const navigate = useNavigate();
  const [inputMessage, setInputMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([
    { 
      id: 1, 
      type: "agent", 
      message: "Hello! I'm Maya, your AI automation assistant. How can I help you optimize your workflows today?", 
      timestamp: new Date() 
    }
  ]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: conversationHistory.length + 1,
      type: "user",
      message: inputMessage,
      timestamp: new Date()
    };

    setConversationHistory(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsProcessing(true);

    // Simulate AI processing
    setTimeout(() => {
      const agentResponse = {
        id: conversationHistory.length + 2,
        type: "agent",
        message: `I've processed your request: "${inputMessage}". I can help you set up an automated workflow for this task. Would you like me to create a template or customize it further?`,
        timestamp: new Date()
      };
      setConversationHistory(prev => [...prev, agentResponse]);
      setIsProcessing(false);
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-[#d4af37]/20 text-[#d4af37] border-[#d4af37]/30";
      case "processing": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-[#d4af37]/20 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center">
            <Bot className="w-6 h-6 text-black" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-white">Maya Agent</h2>
            <p className="text-gray-400 mt-1">Your intelligent automation assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/10"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black hover:opacity-90">
            <Play className="w-4 h-4 mr-2" />
            Start Session
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Capabilities Grid */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Agent Capabilities</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {agentCapabilities.map((capability, index) => (
              <Card 
                key={index}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-6 hover:shadow-xl hover:shadow-[#d4af37]/10 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors">
                    <capability.icon className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <Badge className={getStatusColor(capability.status)}>
                    {capability.status}
                  </Badge>
                </div>
                <h4 className="font-semibold text-white mb-2">{capability.title}</h4>
                <p className="text-gray-400 text-sm">{capability.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Interface */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Chat with Maya</h3>
              
              {/* Conversation History */}
              <div className="h-96 overflow-y-auto space-y-4 mb-4">
                {conversationHistory.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md rounded-2xl p-4 ${
                        msg.type === 'user'
                          ? 'bg-[#d4af37] text-black'
                          : 'bg-[#2a2a2a] text-white border border-[#d4af37]/20'
                      }`}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs opacity-60 mt-2">
                        {msg.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="flex justify-start">
                    <div className="bg-[#2a2a2a] border border-[#d4af37]/20 rounded-2xl p-4">
                      <div className="flex items-center gap-2">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-[#d4af37] rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm text-gray-400">Maya is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="flex gap-3">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Maya about automation, workflows, or anything else..."
                  className="flex-1 bg-[#2a2a2a] border-[#d4af37]/20 text-white placeholder-gray-400"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isProcessing}
                  className="bg-gradient-to-r from-[#d4af37] to-[#b8941f] text-black hover:opacity-90 disabled:opacity-50"
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {recentConversations.map((conv) => (
                  <div key={conv.id} className="flex items-start gap-3 p-3 rounded-lg bg-[#2a2a2a] hover:bg-[#333333] transition-colors">
                    <div className="w-8 h-8 rounded-full bg-[#d4af37]/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-4 h-4 text-[#d4af37]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{conv.query}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className={getStatusColor(conv.status)}>
                          {conv.status}
                        </Badge>
                        <span className="text-xs text-gray-400">{conv.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="w-full justify-start bg-[#2a2a2a] hover:bg-[#333333] text-white border border-[#d4af37]/20">
                  <Zap className="w-4 h-4 mr-2" />
                  Create New Workflow
                </Button>
                <Button className="w-full justify-start bg-[#2a2a2a] hover:bg-[#333333] text-white border border-[#d4af37]/20">
                  <Play className="w-4 h-4 mr-2" />
                  Run Automation Test
                </Button>
                <Button className="w-full justify-start bg-[#2a2a2a] hover:bg-[#333333] text-white border border-[#d4af37]/20">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset Agent Session
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}