// Maya AI Demo Component - Showcase AI capabilities
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMaya } from '@/hooks/useMaya';
import { 
  Sparkles, 
  Loader2, 
  Workflow, 
  BarChart3, 
  MessageSquare,
  CheckCircle2,
  Copy
} from 'lucide-react';

export function MayaAIDemo() {
  const { generateContent, suggestWorkflow, analyzePerformance, isLoading } = useMaya();
  const [activeTab, setActiveTab] = useState<'content' | 'workflow' | 'analytics'>('content');
  
  // Content Generation
  const [contentTopic, setContentTopic] = useState('');
  const [contentType, setContentType] = useState<'caption' | 'description' | 'hashtags'>('caption');
  const [generatedContent, setGeneratedContent] = useState('');

  // Workflow Suggestion
  const [workflowDesc, setWorkflowDesc] = useState('');
  const [suggestedWorkflow, setSuggestedWorkflow] = useState<any>(null);

  // Analytics
  const [analyticsData, setAnalyticsData] = useState('');
  const [insights, setInsights] = useState('');

  const handleGenerateContent = async () => {
    if (!contentTopic.trim()) return;
    const content = await generateContent(contentType, contentTopic);
    if (content) setGeneratedContent(content);
  };

  const handleSuggestWorkflow = async () => {
    if (!workflowDesc.trim()) return;
    const workflow = await suggestWorkflow(workflowDesc);
    if (workflow) setSuggestedWorkflow(workflow);
  };

  const handleAnalyze = async () => {
    if (!analyticsData.trim()) return;
    try {
      const data = JSON.parse(analyticsData);
      const result = await analyzePerformance(data);
      if (result) setInsights(result);
    } catch (error) {
      setInsights('Invalid JSON data. Please provide valid analytics data.');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#d4af37]/20">
        <Button
          variant={activeTab === 'content' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('content')}
          className={activeTab === 'content' ? 'bg-[#d4af37] text-black' : ''}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Content Generation
        </Button>
        <Button
          variant={activeTab === 'workflow' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('workflow')}
          className={activeTab === 'workflow' ? 'bg-[#d4af37] text-black' : ''}
        >
          <Workflow className="w-4 h-4 mr-2" />
          Workflow Suggestion
        </Button>
        <Button
          variant={activeTab === 'analytics' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('analytics')}
          className={activeTab === 'analytics' ? 'bg-[#d4af37] text-black' : ''}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          Analytics Insights
        </Button>
      </div>

      {/* Content Generation Tab */}
      {activeTab === 'content' && (
        <Card className="p-6 bg-[#1a1a1a] border-[#d4af37]/20">
          <h3 className="text-xl font-bold text-[#d4af37] mb-4">AI Content Generation</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Content Type</label>
              <div className="flex gap-2">
                {(['caption', 'description', 'hashtags'] as const).map(type => (
                  <Button
                    key={type}
                    variant={contentType === type ? 'default' : 'outline'}
                    onClick={() => setContentType(type)}
                    className={contentType === type ? 'bg-[#d4af37] text-black' : 'border-[#d4af37]/30'}
                    size="sm"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Topic</label>
              <Input
                value={contentTopic}
                onChange={(e) => setContentTopic(e.target.value)}
                placeholder="e.g., automation tools, productivity tips"
                className="bg-black/40 border-[#d4af37]/30 text-white"
              />
            </div>

            <Button
              onClick={handleGenerateContent}
              disabled={isLoading || !contentTopic.trim()}
              className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Content
                </>
              )}
            </Button>

            {generatedContent && (
              <div className="mt-4 p-4 bg-black/40 rounded-lg border border-[#d4af37]/30">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-[#d4af37]">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="text-sm font-semibold">Generated Content</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(generatedContent)}
                    className="text-gray-400 hover:text-[#d4af37]"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-white whitespace-pre-wrap">{generatedContent}</p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Workflow Suggestion Tab */}
      {activeTab === 'workflow' && (
        <Card className="p-6 bg-[#1a1a1a] border-[#d4af37]/20">
          <h3 className="text-xl font-bold text-[#d4af37] mb-4">AI Workflow Suggestion</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Describe Your Workflow</label>
              <Textarea
                value={workflowDesc}
                onChange={(e) => setWorkflowDesc(e.target.value)}
                placeholder="e.g., When a new order comes in, send email notification and update inventory"
                className="bg-black/40 border-[#d4af37]/30 text-white min-h-[100px]"
              />
            </div>

            <Button
              onClick={handleSuggestWorkflow}
              disabled={isLoading || !workflowDesc.trim()}
              className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Workflow className="w-4 h-4 mr-2" />
                  Suggest Workflow
                </>
              )}
            </Button>

            {suggestedWorkflow && (
              <div className="mt-4 p-4 bg-black/40 rounded-lg border border-[#d4af37]/30">
                <div className="flex items-center gap-2 text-[#d4af37] mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">Suggested Workflow Structure</span>
                </div>
                <pre className="text-white text-sm overflow-x-auto">
                  {JSON.stringify(suggestedWorkflow, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <Card className="p-6 bg-[#1a1a1a] border-[#d4af37]/20">
          <h3 className="text-xl font-bold text-[#d4af37] mb-4">AI Analytics Insights</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Analytics Data (JSON)</label>
              <Textarea
                value={analyticsData}
                onChange={(e) => setAnalyticsData(e.target.value)}
                placeholder='{"views": 1234, "clicks": 189, "conversions": 23, "revenue": 567}'
                className="bg-black/40 border-[#d4af37]/30 text-white min-h-[100px] font-mono text-sm"
              />
            </div>

            <Button
              onClick={handleAnalyze}
              disabled={isLoading || !analyticsData.trim()}
              className="w-full bg-[#d4af37] hover:bg-[#b8941f] text-black font-semibold"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analyze Performance
                </>
              )}
            </Button>

            {insights && (
              <div className="mt-4 p-4 bg-black/40 rounded-lg border border-[#d4af37]/30">
                <div className="flex items-center gap-2 text-[#d4af37] mb-3">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">AI Insights</span>
                </div>
                <p className="text-white whitespace-pre-wrap">{insights}</p>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}
