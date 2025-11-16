const baseUrl = import.meta.env.VITE_BRIDGE_URL || 'http://localhost:9000';

export const bridgeService = {
  async getAuthUrl(): Promise<string> {
    const res = await fetch(`${baseUrl}/tiktok/auth/url`);
    const data = await res.json();
    return data.url;
  },
  async initUpload(payload: {
    title: string;
    description?: string;
    privacyLevel?: 'PUBLIC_TO_EVERYONE' | 'MUTUAL_FOLLOW_FRIENDS' | 'SELF_ONLY';
    disableComment?: boolean;
    disableDuet?: boolean;
    disableStitch?: boolean;
  }): Promise<{ publish_id: string; upload_url?: string }> {
    const res = await fetch(`${baseUrl}/tiktok/video/init`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  },
  async uploadVideo(video: File, publishId?: string): Promise<{ ok: boolean; publish_id?: string }> {
    const form = new FormData();
    form.append('video', video);
    if (publishId) form.append('publish_id', publishId);
    const res = await fetch(`${baseUrl}/tiktok/video/upload`, {
      method: 'POST',
      body: form,
    });
    const data = await res.json();
    return data;
  },
  async getPublishStatus(publishId: string): Promise<any> {
    const res = await fetch(`${baseUrl}/tiktok/publish/status?publish_id=${encodeURIComponent(publishId)}`);
    return await res.json();
  },
  async scheduleTask(task: {
    title: string;
    url?: string;
    schedule?: string;
    enabled: boolean;
    hashtags?: string[];
    description?: string;
  }): Promise<any> {
    const res = await fetch(`${baseUrl}/tiktok/schedule`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    return await res.json();
  },
  async getAutomationStatus(): Promise<{ pending: number; running: number; completed: number; failed: number }> {
    const res = await fetch(`${baseUrl}/automation/status`);
    return await res.json();
  },
};

export default bridgeService;