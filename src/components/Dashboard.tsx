import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Bot, 
  Workflow, 
  Video, 
  ListTodo, 
  Zap, 
  HelpCircle, 
  Settings, 
  Menu,
  X,
  User,
  BarChart3,
  CheckCircle2,
  Clock,
  Sparkles,
  Link2
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const taskProgressData = [
  { day: "Mon", tasks: 180 },
  { day: "Tue", tasks: 165 },
  { day: "Wed", tasks: 210 },
  { day: "Thu", tasks: 195 },
  { day: "Fri", tasks: 240 },
  { day: "Sat", tasks: 155 },
  { day: "Sun", tasks: 130 },
];

const pipelineStatusData = [
  { name: "Active", value: 65, color: "#d4af37" },
  { name: "Pending", value: 25, color: "#f5f5dc" },
  { name: "Failed", value: 10, color: "#dc2626" },
];

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Bot, label: "Maya Agent", path: "/maya" },
  { icon: Workflow, label: "Workflows", path: "/workflows" },
  { icon: Link2, label: "Link Bio Automation", path: "/linkbio" },
  { icon: Video, label: "TikTok Automation", path: "/tiktok" },
  { icon: ListTodo, label: "Tasks", path: "/tasks" },
  { icon: Zap, label: "Triggers", path: "/triggers" },
];

const bottomNavItems = [
  { icon: HelpCircle, label: "Support" },
  { icon: Settings, label: "Settings" },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  const handleNavClick = (label: string, path?: string) => {
    setActiveNav(label);
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-black/40 backdrop-blur-xl border-r border-[#d4af37]/20 transition-all duration-300 z-50 ${
          sidebarCollapsed ? "w-16 md:w-20" : "w-64"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#d4af37]/20">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center">
                <Settings className="w-4 h-4 md:w-6 md:h-6 text-black" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-[#d4af37]">sanztech</h1>
                <p className="text-[10px] md:text-xs text-gray-400">automation.solution</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hover:bg-[#d4af37]/10 hover:text-[#d4af37] h-8 w-8"
          >
            {sidebarCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col justify-between h-[calc(100%-72px)] md:h-[calc(100%-88px)]">
          <div className="p-2 md:p-4 space-y-1 md:space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label, item.path)}
                className={`w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg transition-all duration-200 ${
                  activeNav === item.label
                    ? "bg-[#d4af37] text-black font-semibold shadow-lg shadow-[#d4af37]/20"
                    : "text-gray-300 hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
                }`}
              >
                <item.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm md:text-base">{item.label}</span>}
              </button>
            ))}
          </div>

          <div className="p-2 md:p-4 space-y-1 md:space-y-2 border-t border-[#d4af37]/20">
            {bottomNavItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label)}
                className="w-full flex items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 rounded-lg text-gray-300 hover:bg-[#d4af37]/10 hover:text-[#d4af37] transition-all duration-200"
              >
                <item.icon className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-sm md:text-base">{item.label}</span>}
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "ml-16 md:ml-20" : "ml-64"
        }`}
      >
        {/* Header */}
        <header className="flex items-center justify-between p-4 md:p-6 border-b border-[#d4af37]/20 bg-black/20 backdrop-blur-sm">
          <div>
            <h2 className="text-xl md:text-3xl font-bold text-white">Dashboard</h2>
            <p className="text-gray-400 mt-1 text-xs md:text-base">Welcome back to your automation control center</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#d4af37]/10 hover:bg-[#d4af37]/20 border border-[#d4af37]/30"
          >
            <User className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37]" />
          </Button>
        </header>

        {/* Content */}
        <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          {/* Metrics Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4 md:p-6 hover:shadow-xl hover:shadow-[#d4af37]/10 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">Active Pipelines</p>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">12</h3>
                  <p className="text-[#d4af37] text-xs md:text-sm flex items-center gap-1">
                    <span>+2</span>
                    <span className="text-gray-500 hidden md:inline">from last month</span>
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors">
                  <BarChart3 className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37]" />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4 md:p-6 hover:shadow-xl hover:shadow-[#d4af37]/10 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">Tasks Completed</p>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">1,234</h3>
                  <p className="text-[#d4af37] text-xs md:text-sm flex items-center gap-1">
                    <span>+180</span>
                    <span className="text-gray-500 hidden md:inline">from last month</span>
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors">
                  <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37]" />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4 md:p-6 hover:shadow-xl hover:shadow-[#d4af37]/10 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">Avg. Time</p>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">2.5h</h3>
                  <p className="text-gray-400 text-xs md:text-sm flex items-center gap-1">
                    <span>-15m</span>
                    <span className="text-gray-500 hidden md:inline">from last month</span>
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37]" />
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4 md:p-6 hover:shadow-xl hover:shadow-[#d4af37]/10 transition-all duration-300 group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-400 text-xs md:text-sm mb-1 md:mb-2">Automations</p>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-1 md:mb-2">5,483</h3>
                  <p className="text-[#d4af37] text-xs md:text-sm flex items-center gap-1">
                    <span>+502</span>
                    <span className="text-gray-500 hidden md:inline">from last month</span>
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#d4af37]/10 flex items-center justify-center group-hover:bg-[#d4af37]/20 transition-colors">
                  <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#d4af37]" />
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Task Progress Chart */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Task Progress</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={taskProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#888"
                    tick={{ fill: '#888', fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#888"
                    tick={{ fill: '#888', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #d4af37',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Bar 
                    dataKey="tasks" 
                    fill="#d4af37" 
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Performance Trend Chart */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Performance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={performanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis 
                    dataKey="day" 
                    stroke="#999"
                    tick={{ fill: '#999' }}
                  />
                  <YAxis 
                    stroke="#999"
                    tick={{ fill: '#999' }}
                    domain={[70, 100]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1a1a1a',
                      border: '1px solid #d4af37',
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="performance" 
                    stroke="#d4af37" 
                    strokeWidth={3}
                    dot={{ fill: '#d4af37', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#b8941f' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>


            {/* Performance Metrics & Pipeline Status */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Pipeline Status</h3>
              <div className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pipelineStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pipelineStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1a1a1a',
                        border: '1px solid #d4af37',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-4 md:gap-6 mt-4">
                {pipelineStatusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs md:text-sm text-gray-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent Activities & Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Recent Activities */}
            <Card className="lg:col-span-2 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-bold text-white">Recent Activities</h3>
                <Button variant="ghost" size="sm" className="text-[#d4af37] hover:text-[#b8941f] hover:bg-[#d4af37]/10">
                  View All
                </Button>
              </div>
              <div className="space-y-4">
                {[
                  { action: "TikTok Automation", status: "completed", time: "2 minutes ago", description: "Uploaded 5 videos successfully" },
                  { action: "Workflow Trigger", status: "running", time: "5 minutes ago", description: "Started pipeline #WKF-234" },
                  { action: "Maya Agent", status: "completed", time: "15 minutes ago", description: "Processed 23 customer queries" },
                  { action: "Task Automation", status: "failed", time: "1 hour ago", description: "Failed to complete batch processing" },
                  { action: "Data Export", status: "completed", time: "2 hours ago", description: "Exported 1.2GB of analytics data" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-all duration-200">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'completed' ? 'bg-[#d4af37]' :
                      activity.status === 'running' ? 'bg-[#d4af37]' :
                      'bg-gray-600'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-white">{activity.action}</h4>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{activity.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] border-[#d4af37]/20 p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Quick Actions</h3>
              <div className="space-y-3">
                {[
                  { icon: Zap, label: "Run Maya Agent", description: "Start AI assistant workflow" },
                  { icon: Video, label: "TikTok Batch", description: "Process 10 videos" },
                  { icon: Workflow, label: "Create Workflow", description: "Build new automation" },
                  { icon: ListTodo, label: "Bulk Tasks", description: "Generate 50 tasks" }
                ].map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start gap-3 h-auto py-3 bg-black/30 border-[#d4af37]/20 hover:bg-[#d4af37]/10 hover:border-[#d4af37]/40 text-white transition-all duration-200"
                  >
                    <action.icon className="w-4 h-4 text-[#d4af37]" />
                    <div className="text-left">
                      <div className="text-sm font-medium">{action.label}</div>
                      <div className="text-xs text-gray-400">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

const performanceTrendData = [
  { day: 'Mon', performance: 85 },
  { day: 'Tue', performance: 92 },
  { day: 'Wed', performance: 78 },
  { day: 'Thu', performance: 88 },
  { day: 'Fri', performance: 95 },
  { day: 'Sat', performance: 90 },
  { day: 'Sun', performance: 87 }
];