/**
 * TikTok API Service
 * Handles video upload and content management via TikTok Content Posting API
 */

interface TikTokConfig {
  clientKey: string;
  clientSecret: string;
  redirectUri: string;
  accessToken?: string;
}

interface VideoUploadParams {
  videoFile: File | Blob;
  title: string;
  description?: string;
  privacyLevel?: 'PUBLIC_TO_EVERYONE' | 'MUTUAL_FOLLOW_FRIENDS' | 'SELF_ONLY';
  disableComment?: boolean;
  disableDuet?: boolean;
  disableStitch?: boolean;
  brandContentToggle?: boolean;
  brandOrganicToggle?: boolean;
}

interface TikTokVideoResponse {
  data: {
    publish_id: string;
    upload_url: string;
  };
  error?: {
    code: string;
    message: string;
  };
}

class TikTokService {
  private config: TikTokConfig;
  private baseUrl = 'https://open.tiktokapis.com/v2';

  constructor(config: TikTokConfig) {
    this.config = config;
  }

  /**
   * Generate OAuth authorization URL
   */
  getAuthUrl(scope: string[] = ['video.upload', 'video.publish']): string {
    const params = new URLSearchParams({
      client_key: this.config.clientKey,
      scope: scope.join(','),
      response_type: 'code',
      redirect_uri: this.config.redirectUri,
      state: this.generateState(),
    });

    return `https://www.tiktok.com/v2/auth/authorize?${params.toString()}`;
  }

  /**
   * Exchange authorization code for access token
   */
  async getAccessToken(code: string): Promise<string> {
    const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_key: this.config.clientKey,
        client_secret: this.config.clientSecret,
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: this.config.redirectUri,
      }),
    });

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`TikTok Auth Error: ${data.error.message}`);
    }

    this.config.accessToken = data.access_token;
    return data.access_token;
  }

  /**
   * Initialize video upload
   */
  async initializeUpload(params: VideoUploadParams): Promise<TikTokVideoResponse> {
    if (!this.config.accessToken) {
      throw new Error('Access token required. Please authenticate first.');
    }

    const response = await fetch(`${this.baseUrl}/post/publish/video/init/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post_info: {
          title: params.title,
          description: params.description || '',
          privacy_level: params.privacyLevel || 'PUBLIC_TO_EVERYONE',
          disable_comment: params.disableComment || false,
          disable_duet: params.disableDuet || false,
          disable_stitch: params.disableStitch || false,
          brand_content_toggle: params.brandContentToggle || false,
          brand_organic_toggle: params.brandOrganicToggle || false,
        },
        source_info: {
          source: 'FILE_UPLOAD',
          video_size: params.videoFile.size,
        },
      }),
    });

    return await response.json();
  }

  /**
   * Upload video file to TikTok
   */
  async uploadVideo(uploadUrl: string, videoFile: File | Blob): Promise<void> {
    const formData = new FormData();
    formData.append('video', videoFile);

    const response = await fetch(uploadUrl, {
      method: 'PUT',
      body: videoFile,
      headers: {
        'Content-Type': 'video/mp4',
      },
    });

    if (!response.ok) {
      throw new Error(`Video upload failed: ${response.statusText}`);
    }
  }

  /**
   * Complete video upload and publish
   */
  async publishVideo(params: VideoUploadParams): Promise<string> {
    try {
      // Step 1: Initialize upload
      const initResponse = await this.initializeUpload(params);
      
      if (initResponse.error) {
        throw new Error(`Init failed: ${initResponse.error.message}`);
      }

      const { publish_id, upload_url } = initResponse.data;

      // Step 2: Upload video file
      await this.uploadVideo(upload_url, params.videoFile);

      // Step 3: Return publish ID for status checking
      return publish_id;
    } catch (error) {
      console.error('TikTok publish error:', error);
      throw error;
    }
  }

  /**
   * Check video publish status
   */
  async checkPublishStatus(publishId: string): Promise<any> {
    if (!this.config.accessToken) {
      throw new Error('Access token required');
    }

    const response = await fetch(
      `${this.baseUrl}/post/publish/status/fetch/?publish_id=${publishId}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.config.accessToken}`,
        },
      }
    );

    return await response.json();
  }

  /**
   * Generate random state for OAuth
   */
  private generateState(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  /**
   * Set access token manually
   */
  setAccessToken(token: string): void {
    this.config.accessToken = token;
  }
}

// Export singleton instance
export const tiktokService = new TikTokService({
  clientKey: import.meta.env.VITE_TIKTOK_CLIENT_KEY || '',
  clientSecret: import.meta.env.VITE_TIKTOK_CLIENT_SECRET || '',
  redirectUri: import.meta.env.VITE_TIKTOK_REDIRECT_URI || 'https://bio.sanztech.online/tiktok/callback',
});

export default TikTokService;
