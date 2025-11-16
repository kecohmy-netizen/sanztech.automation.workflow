// AI Workflow Assistant - Helper component for workflow builder
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { useMaya } from '@/hooks/useMaya';
import { Sparkles, Loader2, Lightbulb, Zap } from 'lucide-react';

interface AIWorkflowAssistantProps {
  onWorkflowGenerated?: (workflow: any) => void;
  currentWorkflow?: any;
}

export function AIWorkflowAssistant({ 
  onWorkflowGenerated,
  currentWorkflow 
}: AIWorkflowAssistantProps) {
  const { suggestWorkflow, isLoading } = useMaya();
  const [description, setDescription] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const examplePrompts = [
    'Post to TikTok every day at 9 AM with AI-generated content',
    'Send email notification when new order arrives',
    'Update link bio when TikTok video gets 1000 views',
    'Generate weekly analytics report and send to Telegram',
    'Auto-reply to comments with AI responses',
  ];

  const handleGenerate = async () => {
    if (!description.trim()) return;
    
    const workflow = await suggestWorkflow(description);
    if (workflow && onWorkflowGenerated) {
      onWorkflowGenerated(workflow);
    }
  };

  const handleOptimize = async () => {
    if (!currentWorkflow) return;
    
    const optimizationPrompt = `Optimize this workflow: ${JSON.stringify(currentWorkflow)}`;
    const workflow = await suggestWorkflow(optimizationPrompt);
    if (workflow && onWorkflowGenerated) {
      onWorkflowGenerated(workflow);
    }
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-[#d4af37]/10 to-[#d4af37]/5 border-[#d4af37]/30">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-[#d4af37]" />
        <h3 className="text-lg font-bold text-[#d4af37]">AI Workflow Assistant</h3>
      </div>

      <div className="space-y-4">
        {/* Description Input */}
        <div>
          <label className="text-sm text-gray-400 mb-2 block">
            Describe your workflow in plain English
          </label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Send email when new order arrives and update inventory"
            className="bg-black/40 border-[#d4af37]/30 text-white min-h-[80px]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={handleGenerate}
            disabled={isLoading || !description.trim()}
            className="flex-1 bg-[#d4af37] hover:bg-[#b8941f] text-black font-semibold"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Workflow
              </>
            )}
          </Button>

          {currentWorkflow && (
            <Button
              onClick={handleOptimize}
              disabled={isLoading}
              variant="outline"
              className="border-[#d4af37]/30 hover:bg-[#d4af37]/10"
            >
              <Zap className="w-4 h-4 mr-2" />
              Optimize
            </Button>
          )}
        </div>

        {/* Example Prompts */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSuggestions(!showSuggestions)}
            className="text-gray-400 hover:text-[#d4af37] text-xs"
          >
            <Lightbulb className="w-3 h-3 mr-1" />
            {showSuggestions ? 'Hide' : 'Show'} example prompts
          </Button>

          {showSuggestions && (
            <div className="mt-2 space-y-2">
              {examplePrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => setDescription(prompt)}
                  className="w-full text-left text-xs text-gray-400 hover:text-[#d4af37] p-2 rounded bg-black/20 hover:bg-black/40 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Tips */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>💡 <strong>Tips:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Be specific about triggers (time, event, condition)</li>
            <li>Mention the actions you want to perform</li>
            <li>Include any conditions or logic</li>
            <li>Specify integrations (TikTok, email, etc.)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
