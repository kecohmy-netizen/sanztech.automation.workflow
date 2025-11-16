// Demo Storage Service - Isolated storage for demo users
// Each demo user gets their own localStorage namespace

class DemoStorageService {
  private getUserKey(userId: string, key: string): string {
    return `demo_${userId}_${key}`;
  }

  // Check if user is in demo mode
  isDemoUser(userId: string): boolean {
    return userId.startsWith('demo-');
  }

  // ============================================
  // WORKFLOWS
  // ============================================

  async getWorkflows(userId: string) {
    if (!this.isDemoUser(userId)) return [];

    const key = this.getUserKey(userId, 'workflows');
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : this.getDefaultWorkflows(userId);
  }

  async createWorkflow(userId: string, workflow: any) {
    if (!this.isDemoUser(userId)) return null;

    const workflows = await this.getWorkflows(userId);
    const newWorkflow = {
      ...workflow,
      id: `wf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    workflows.push(newWorkflow);
    const key = this.getUserKey(userId, 'workflows');
    localStorage.setItem(key, JSON.stringify(workflows));

    return newWorkflow;
  }

  async updateWorkflow(userId: string, id: string, updates: any) {
    if (!this.isDemoUser(userId)) return null;

    const workflows = await this.getWorkflows(userId);
    const index = workflows.findIndex((w: any) => w.id === id);

    if (index === -1) return null;

    workflows[index] = {
      ...workflows[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const key = this.getUserKey(userId, 'workflows');
    localStorage.setItem(key, JSON.stringify(workflows));

    return workflows[index];
  }

  async deleteWorkflow(userId: string, id: string) {
    if (!this.isDemoUser(userId)) return;

    const workflows = await this.getWorkflows(userId);
    const filtered = workflows.filter((w: any) => w.id !== id);

    const key = this.getUserKey(userId, 'workflows');
    localStorage.setItem(key, JSON.stringify(filtered));
  }

  // ============================================
  // TASKS
  // ============================================

  async getTasks(userId: string, status?: string) {
    if (!this.isDemoUser(userId)) return [];

    const key = this.getUserKey(userId, 'tasks');
    const data = localStorage.getItem(key);
    let tasks = data ? JSON.parse(data) : this.getDefaultTasks(userId);

    if (status) {
      tasks = tasks.filter((t: any) => t.status === status);
    }

    return tasks;
  }

  async createTask(userId: string, task: any) {
    if (!this.isDemoUser(userId)) return null;

    const tasks = await this.getTasks(userId);
    const newTask = {
      ...task,
      id: `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    tasks.push(newTask);
    const key = this.getUserKey(userId, 'tasks');
    localStorage.setItem(key, JSON.stringify(tasks));

    return newTask;
  }

  async updateTask(userId: string, id: string, updates: any) {
    if (!this.isDemoUser(userId)) return null;

    const tasks = await this.getTasks(userId);
    const index = tasks.findIndex((t: any) => t.id === id);

    if (index === -1) return null;

    tasks[index] = {
      ...tasks[index],
      ...updates,
      updated_at: new Date().toISOString(),
    };

    const key = this.getUserKey(userId, 'tasks');
    localStorage.setItem(key, JSON.stringify(tasks));

    return tasks[index];
  }

  // ============================================
  // LINKS
  // ============================================

  async getLinks(userId: string) {
    if (!this.isDemoUser(userId)) return [];

    const key = this.getUserKey(userId, 'links');
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : this.getDefaultLinks(userId);
  }

  async createLink(userId: string, link: any) {
    if (!this.isDemoUser(userId)) return null;

    const links = await this.getLinks(userId);
    const newLink = {
      ...link,
      id: `link_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      created_at: new Date().toISOString(),
    };

    links.push(newLink);
    const key = this.getUserKey(userId, 'links');
    localStorage.setItem(key, JSON.stringify(links));

    return newLink;
  }

  async updateLink(userId: string, id: string, updates: any) {
    if (!this.isDemoUser(userId)) return null;

    const links = await this.getLinks(userId);
    const index = links.findIndex((l: any) => l.id === id);

    if (index === -1) return null;

    links[index] = {
      ...links[index],
      ...updates,
    };

    const key = this.getUserKey(userId, 'links');
    localStorage.setItem(key, JSON.stringify(links));

    return links[index];
  }

  async deleteLink(userId: string, id: string) {
    if (!this.isDemoUser(userId)) return;

    const links = await this.getLinks(userId);
    const filtered = links.filter((l: any) => l.id !== id);

    const key = this.getUserKey(userId, 'links');
    localStorage.setItem(key, JSON.stringify(filtered));
  }

  // ============================================
  // ANALYTICS
  // ============================================

  async trackEvent(userId: string, linkId: string, eventType: string, revenue = 0, metadata = {}) {
    if (!this.isDemoUser(userId)) return null;

    const key = this.getUserKey(userId, 'analytics');
    const data = localStorage.getItem(key);
    const analytics = data ? JSON.parse(data) : [];

    const event = {
      id: `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user_id: userId,
      link_id: linkId,
      event_type: eventType,
      revenue,
      metadata,
      created_at: new Date().toISOString(),
    };

    analytics.push(event);
    localStorage.setItem(key, JSON.stringify(analytics));

    return event;
  }

  async getAnalytics(userId: string, linkId?: string, startDate?: Date, endDate?: Date) {
    if (!this.isDemoUser(userId)) return [];

    const key = this.getUserKey(userId, 'analytics');
    const data = localStorage.getItem(key);
    let analytics = data ? JSON.parse(data) : [];

    if (linkId) {
      analytics = analytics.filter((a: any) => a.link_id === linkId);
    }

    if (startDate) {
      analytics = analytics.filter((a: any) => new Date(a.created_at) >= startDate);
    }

    if (endDate) {
      analytics = analytics.filter((a: any) => new Date(a.created_at) <= endDate);
    }

    return analytics;
  }

  // ============================================
  // DEFAULT DATA
  // ============================================

  private getDefaultWorkflows(userId: string) {
    return [
      {
        id: 'wf_demo_1',
        user_id: userId,
        name: 'Welcome Workflow',
        description: 'Your first demo workflow',
        status: 'active',
        nodes: [],
        edges: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  }

  private getDefaultTasks(userId: string) {
    return [
      {
        id: 'task_demo_1',
        user_id: userId,
        title: 'Welcome to Demo Mode!',
        description: 'This is your personal demo workspace. All changes are saved locally.',
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: 'task_demo_2',
        user_id: userId,
        title: 'Try creating a workflow',
        description: 'Go to Workflows page and create your first automation',
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  }

  private getDefaultLinks(userId: string) {
    return [
      {
        id: 'link_demo_1',
        user_id: userId,
        title: 'Demo Link',
        url: 'https://example.com',
        position: 0,
        active: true,
        created_at: new Date().toISOString(),
      },
    ];
  }

  // ============================================
  // CLEANUP
  // ============================================

  clearUserData(userId: string) {
    if (!this.isDemoUser(userId)) return;

    const keys = ['workflows', 'tasks', 'links', 'analytics'];
    keys.forEach(key => {
      const storageKey = this.getUserKey(userId, key);
      localStorage.removeItem(storageKey);
    });

    console.log('🧹 Demo user data cleared:', userId);
  }

  clearAllDemoData() {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('demo_')) {
        localStorage.removeItem(key);
      }
    });

    console.log('🧹 All demo data cleared');
  }
}

// Export singleton instance
export const demoStorageService = new DemoStorageService();
export default demoStorageService;
