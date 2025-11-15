import { useState, useRef } from 'react';
import { Upload, Video, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { tiktokService } from '@/services/tiktokService';
import { useToast } from '@/components/ui/use-toast';

export default function TikTokUpload() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [privacyLevel, setPrivacyLevel] = useState('PUBLIC_TO_EVERYONE');
  const [disableComment, setDisableComment] = useState(false);
  const [disableDuet, setDisableDuet] = useState(false);
  const [disableStitch, setDisableStitch] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [publishId, setPublishId] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('video/')) {
        toast({
          title: 'Invalid file type',
          description: 'Please select a video file',
          variant: 'destructive',
        });
        return;
      }

      // Validate file size (max 4GB for TikTok)
      if (file.size > 4 * 1024 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Video must be less than 4GB',
          variant: 'destructive',
        });
        return;
      }

      setVideoFile(file);
      setUploadStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!videoFile || !title) {
      toast({
        title: 'Missing information',
        description: 'Please select a video and enter a title',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);
    setUploadStatus('idle');

    try {
      const id = await tiktokService.publishVideo({
        videoFile,
        title,
        description,
        privacyLevel: privacyLevel as any,
        disableComment,
        disableDuet,
        disableStitch,
      });

      setPublishId(id);
      setUploadStatus('success');
      
      toast({
        title: 'Upload successful!',
        description: 'Your video is being processed by TikTok',
      });

      // Reset form
      setVideoFile(null);
      setTitle('');
      setDescription('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload video to TikTok',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const handleAuth = () => {
    const authUrl = tiktokService.getAuthUrl();
    window.location.href = authUrl;
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gold-400">TikTok Video Upload</h1>
          <p className="text-gray-400">Upload videos directly to your TikTok account</p>
        </div>

        {/* Auth Card */}
        <Card className="bg-gray-900 border-gold-500/20">
          <CardHeader>
            <CardTitle className="text-gold-400">Authentication</CardTitle>
            <CardDescription>Connect your TikTok account to start uploading</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleAuth} className="w-full bg-gold-500 hover:bg-gold-600 text-black">
              <Video className="mr-2 h-4 w-4" />
              Connect TikTok Account
            </Button>
          </CardContent>
        </Card>

        {/* Upload Form */}
        <Card className="bg-gray-900 border-gold-500/20">
          <CardHeader>
            <CardTitle className="text-gold-400">Upload Video</CardTitle>
            <CardDescription>Fill in the details and upload your video</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* File Upload */}
            <div className="space-y-2">
              <Label htmlFor="video" className="text-gold-400">Video File</Label>
              <div className="flex items-center gap-4">
                <Input
                  id="video"
                  type="file"
                  accept="video/*"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  className="bg-gray-800 border-gold-500/30 text-white"
                />
                {videoFile && (
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    {videoFile.name}
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gold-400">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter video title"
                maxLength={150}
                className="bg-gray-800 border-gold-500/30 text-white"
              />
              <p className="text-xs text-gray-500">{title.length}/150 characters</p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gold-400">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter video description with hashtags"
                maxLength={2200}
                rows={4}
                className="bg-gray-800 border-gold-500/30 text-white"
              />
              <p className="text-xs text-gray-500">{description.length}/2200 characters</p>
            </div>

            {/* Privacy Level */}
            <div className="space-y-2">
              <Label htmlFor="privacy" className="text-gold-400">Privacy Level</Label>
              <Select value={privacyLevel} onValueChange={setPrivacyLevel}>
                <SelectTrigger className="bg-gray-800 border-gold-500/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PUBLIC_TO_EVERYONE">Public</SelectItem>
                  <SelectItem value="MUTUAL_FOLLOW_FRIENDS">Friends</SelectItem>
                  <SelectItem value="SELF_ONLY">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <Label className="text-gold-400">Video Settings</Label>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="comments" className="text-sm text-gray-300">Disable Comments</Label>
                <Switch
                  id="comments"
                  checked={disableComment}
                  onCheckedChange={setDisableComment}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="duet" className="text-sm text-gray-300">Disable Duet</Label>
                <Switch
                  id="duet"
                  checked={disableDuet}
                  onCheckedChange={setDisableDuet}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="stitch" className="text-sm text-gray-300">Disable Stitch</Label>
                <Switch
                  id="stitch"
                  checked={disableStitch}
                  onCheckedChange={setDisableStitch}
                />
              </div>
            </div>

            {/* Upload Button */}
            <Button
              onClick={handleUpload}
              disabled={!videoFile || !title || uploading}
              className="w-full bg-gold-500 hover:bg-gold-600 text-black font-semibold"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload to TikTok
                </>
              )}
            </Button>

            {/* Status Messages */}
            {uploadStatus === 'success' && (
              <div className="flex items-center gap-2 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <div>
                  <p className="text-green-400 font-semibold">Upload Successful!</p>
                  <p className="text-sm text-gray-400">Publish ID: {publishId}</p>
                </div>
              </div>
            )}

            {uploadStatus === 'error' && (
              <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="text-red-400 font-semibold">Upload Failed. Please try again.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="bg-gray-900 border-gold-500/20">
          <CardHeader>
            <CardTitle className="text-gold-400">Requirements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-400">
            <p>• Video format: MP4, MOV, WEBM</p>
            <p>• Max file size: 4GB</p>
            <p>• Duration: 3 seconds - 10 minutes</p>
            <p>• Resolution: Minimum 720p recommended</p>
            <p>• Aspect ratio: 9:16 (vertical) recommended</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
