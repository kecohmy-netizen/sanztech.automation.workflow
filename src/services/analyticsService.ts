/**
 * Analytics Service
 * Track clicks, views, conversions untuk semua links
 */

export interface AnalyticsEvent {
  id: string;
  linkId: string;
  type: 'view' | 'click' | 'conversion';
  timestamp: Date;
  metadata: {
    source?: string;
    device?: string;
    location?: string;
    referrer?: string;
    userAgent?: string;
    revenue?: string;
  };
}

export interface LinkAnalytics {
  linkId: string;
  period: 'today' | 'week' | 'month' | 'all';
  views: number;
  clicks: number;
  conversions: number;
  revenue: number;
  ctr: number; // Click-through rate
  conversionRate: number;
  avgRevenue: number;
  trend: {
    views: number; // percentage change
    clicks: number;
    conversions: number;
    revenue: number;
  };
}

class AnalyticsService {
  private events: Map<string, AnalyticsEvent[]>;
  private linkStats: Map<string, LinkAnalytics>;

  constructor() {
    this.events = new Map();
    this.linkStats = new Map();
    this.loadFromStorage();
  }

  /**
   * Track view event
   */
  trackView(linkId: string, metadata?: AnalyticsEvent['metadata']): void {
    this.trackEvent({
      id: this.generateId(),
      linkId,
      type: 'view',
      timestamp: new Date(),
      metadata: metadata || {}
    });
  }

  /**
   * Track click event
   */
  trackClick(linkId: string, metadata?: AnalyticsEvent['metadata']): void {
    this.trackEvent({
      id: this.generateId(),
      linkId,
      type: 'click',
      timestamp: new Date(),
      metadata: metadata || {}
    });
  }

  /**
   * Track conversion event
   */
  trackConversion(linkId: string, revenue: number, metadata?: AnalyticsEvent['metadata']): void {
    this.trackEvent({
      id: this.generateId(),
      linkId,
      type: 'conversion',
      timestamp: new Date(),
      metadata: {
        ...metadata,
        revenue: revenue.toString()
      }
    });
  }

  /**
   * Track generic event
   */
  private trackEvent(event: AnalyticsEvent): void {
    const events = this.events.get(event.linkId) || [];
    events.push(event);
    this.events.set(event.linkId, events);
    
    // Update stats
    this.updateLinkStats(event.linkId);
    
    // Save to storage
    this.saveToStorage();
    
    console.log(`📊 Tracked ${event.type} for link ${event.linkId}`);
  }

  /**
   * Get analytics for specific link
   */
  getLinkAnalytics(linkId: string, period: LinkAnalytics['period'] = 'all'): LinkAnalytics {
    const events = this.getEventsForPeriod(linkId, period);
    
    const views = events.filter(e => e.type === 'view').length;
    const clicks = events.filter(e => e.type === 'click').length;
    const conversions = events.filter(e => e.type === 'conversion').length;
    
    const revenue = events
      .filter(e => e.type === 'conversion')
      .reduce((sum, e) => sum + parseFloat(e.metadata.revenue || '0'), 0);

    const ctr = views > 0 ? (clicks / views) * 100 : 0;
    const conversionRate = clicks > 0 ? (conversions / clicks) * 100 : 0;
    const avgRevenue = conversions > 0 ? revenue / conversions : 0;

    // Calculate trend (compare with previous period)
    const trend = this.calculateTrend(linkId, period);

    return {
      linkId,
      period,
      views,
      clicks,
      conversions,
      revenue,
      ctr,
      conversionRate,
      avgRevenue,
      trend
    };
  }

  /**
   * Get events for specific period
   */
  private getEventsForPeriod(linkId: string, period: LinkAnalytics['period']): AnalyticsEvent[] {
    const allEvents = this.events.get(linkId) || [];
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      default:
        return allEvents;
    }

    return allEvents.filter(event => event.timestamp >= startDate);
  }

  /**
   * Calculate trend compared to previous period
   */
  private calculateTrend(linkId: string, period: LinkAnalytics['period']): LinkAnalytics['trend'] {
    const current = this.getLinkAnalytics(linkId, period);
    
    // Get previous period data
    const allEvents = this.events.get(linkId) || [];
    const now = new Date();
    let previousStart: Date;
    let previousEnd: Date;

    switch (period) {
      case 'today':
        previousStart = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        previousEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        previousStart = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
        previousEnd = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        previousStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        previousEnd = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      default:
        return { views: 0, clicks: 0, conversions: 0, revenue: 0 };
    }

    const previousEvents = allEvents.filter(
      e => e.timestamp >= previousStart && e.timestamp < previousEnd
    );

    const previousViews = previousEvents.filter(e => e.type === 'view').length;
    const previousClicks = previousEvents.filter(e => e.type === 'click').length;
    const previousConversions = previousEvents.filter(e => e.type === 'conversion').length;
    const previousRevenue = previousEvents
      .filter(e => e.type === 'conversion')
      .reduce((sum, e) => sum + parseFloat(e.metadata.revenue || '0'), 0);

    return {
      views: this.calculatePercentageChange(previousViews, current.views),
      clicks: this.calculatePercentageChange(previousClicks, current.clicks),
      conversions: this.calculatePercentageChange(previousConversions, current.conversions),
      revenue: this.calculatePercentageChange(previousRevenue, current.revenue)
    };
  }

  /**
   * Calculate percentage change
   */
  private calculatePercentageChange(previous: number, current: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  }

  /**
   * Update link stats cache
   */
  private updateLinkStats(linkId: string): void {
    const stats = this.getLinkAnalytics(linkId);
    this.linkStats.set(linkId, stats);
  }

  /**
   * Get all links analytics
   */
  getAllLinksAnalytics(period: LinkAnalytics['period'] = 'all'): LinkAnalytics[] {
    const linkIds = Array.from(this.events.keys());
    return linkIds.map(linkId => this.getLinkAnalytics(linkId, period));
  }

  /**
   * Get top performing links
   */
  getTopLinks(metric: 'views' | 'clicks' | 'conversions' | 'revenue', limit: number = 5): LinkAnalytics[] {
    const allStats = this.getAllLinksAnalytics();
    return allStats
      .sort((a, b) => b[metric] - a[metric])
      .slice(0, limit);
  }

  /**
   * Export analytics data
   */
  exportData(linkId?: string): string {
    const data = linkId 
      ? { [linkId]: this.events.get(linkId) }
      : Object.fromEntries(this.events);
    
    return JSON.stringify(data, null, 2);
  }

  /**
   * Clear analytics data
   */
  clearData(linkId?: string): void {
    if (linkId) {
      this.events.delete(linkId);
      this.linkStats.delete(linkId);
    } else {
      this.events.clear();
      this.linkStats.clear();
    }
    this.saveToStorage();
  }

  /**
   * Generate unique ID
   */
  private generateId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Save to localStorage
   */
  private saveToStorage(): void {
    try {
      const data = {
        events: Array.from(this.events.entries()),
        stats: Array.from(this.linkStats.entries())
      };
      localStorage.setItem('analytics_data', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save analytics:', error);
    }
  }

  /**
   * Load from localStorage
   */
  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem('analytics_data');
      if (data) {
        const parsed = JSON.parse(data);
        this.events = new Map(parsed.events);
        this.linkStats = new Map(parsed.stats);
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  }

  /**
   * Get real-time stats
   */
  getRealTimeStats(): {
    activeUsers: number;
    recentEvents: AnalyticsEvent[];
    topLinks: string[];
  } {
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);
    
    const recentEvents: AnalyticsEvent[] = [];
    const linkActivity = new Map<string, number>();

    this.events.forEach((events, linkId) => {
      const recent = events.filter(e => e.timestamp >= fiveMinutesAgo);
      recentEvents.push(...recent);
      linkActivity.set(linkId, recent.length);
    });

    const topLinks = Array.from(linkActivity.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([linkId]) => linkId);

    return {
      activeUsers: new Set(recentEvents.map(e => e.metadata.userAgent)).size,
      recentEvents: recentEvents.slice(-10),
      topLinks
    };
  }
}

// Export singleton instance
export const analyticsService = new AnalyticsService();

// Export for testing
export default AnalyticsService;
