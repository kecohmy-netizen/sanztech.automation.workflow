import React, { useState } from 'react';
import { NodeProps, Handle, Position } from 'reactflow';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { Share, Play, Settings } from 'lucide-react';

export interface TikTokAutopostNodeData {
  affiliateLinks?: string[];
  postSchedule?: string;
  hashtags?: string;
  captionTemplate?: string;
}

export default function TikTokAutopostNode({ data }: NodeProps<TikTokAutopostNodeData>) {
  const [links, setLinks] = useState<string[]>(data.affiliateLinks || []);
  const [newLink, setNewLink] = useState('');
  const [schedule, setSchedule] = useState(data.postSchedule || '0 9,12,18 * * *');
  const [hashtags, setHashtags] = useState(data.hashtags || '#affiliate #viral #fyp');
  const [caption, setCaption] = useState(data.captionTemplate || 'Check out this amazing product! 🔥\n\n{link}');

  const addLink = () => {
    if (newLink.trim() && !links.includes(newLink.trim())) {
      setLinks([...links, newLink.trim()]);
      setNewLink('');
    }
  };

  const removeLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  return (
    <Card className="min-w-[300px] bg-gradient-to-br from-black to-gray-900 border-2 border-[#d4af37] shadow-lg">
      <CardHeader className="bg-gradient-to-r from-[#d4af37] to-yellow-500 text-black pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Share className="w-4 h-4" />
          TikTok Autopost
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {/* Input Handle */}
        <Handle type="target" position={Position.Top} className="w-3 h-3 bg-[#d4af37]" />
        
        {/* Affiliate Links */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#d4af37]">Affiliate Links</Label>
          <div className="flex gap-2">
            <Input
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              placeholder="https://example.com/affiliate-link"
              className="flex-1 text-sm"
            />
            <Button onClick={addLink} size="sm" className="bg-[#d4af37] hover:bg-yellow-500 text-black">
              Add
            </Button>
          </div>
          {links.length > 0 && (
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {links.map((link, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                  <span className="text-xs truncate flex-1">{link}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeLink(index)}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-gray-300"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Post Schedule */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#d4af37]">Post Schedule (Cron)</Label>
          <Input
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            placeholder="0 9,12,18 * * *"
            className="text-sm"
          />
          <p className="text-xs text-gray-500">Example: 0 9,12,18 * * * (9AM, 12PM, 6PM daily)</p>
        </div>

        {/* Hashtags */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#d4af37]">Hashtags</Label>
          <Input
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            placeholder="#affiliate #viral #fyp"
            className="text-sm"
          />
        </div>

        {/* Caption Template */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-[#d4af37]">Caption Template</Label>
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Your caption template..."
            className="w-full h-20 p-2 text-sm border rounded-md resize-none"
            rows={3}
          />
          <p className="text-xs text-gray-500">Use {'{link}'} to insert affiliate link</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button className="flex-1 bg-[#d4af37] hover:bg-yellow-500 text-black">
            <Play className="w-3 h-3 mr-1" />
            Start Auto
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="w-3 h-3" />
          </Button>
        </div>

        {/* Output Handle */}
        <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-[#d4af37]" />
      </CardContent>
    </Card>
  );
}