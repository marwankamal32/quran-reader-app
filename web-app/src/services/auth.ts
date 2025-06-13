interface User {
  id: string;
  email: string;
  name?: string;
  picture?: string;
  created_at: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class AuthService {
  private static instance: AuthService;
  private readonly API_BASE_URL = 'http://localhost:8000';
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'auth_user';

  private constructor() {}

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  // Token management
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // User management
  getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  // Auth state
  isAuthenticated(): boolean {
    const token = this.getToken();
    const user = this.getUser();
    return !!(token && user);
  }

  // OAuth flow
  initiateGoogleLogin(): void {
    window.location.href = `${this.API_BASE_URL}/auth/google/login`;
  }

  // Handle OAuth callback (if needed)
  async handleOAuthCallback(code: string, state?: string): Promise<AuthResponse> {
    const params = new URLSearchParams({ code });
    if (state) params.append('state', state);

    const response = await fetch(`${this.API_BASE_URL}/auth/google/callback?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`OAuth callback failed: ${response.statusText}`);
    }

    const authData: AuthResponse = await response.json();
    
    // Store auth data
    this.setToken(authData.access_token);
    this.setUser(authData.user);
    
    return authData;
  }

  // API requests with auth
  async apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${this.API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      // Token expired or invalid
      this.logout();
      throw new Error('Authentication expired');
    }

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  // Get current user from API
  async getCurrentUser(): Promise<User> {
    return this.apiRequest<User>('/auth/me');
  }

  // Logout
  async logout(): Promise<void> {
    try {
      // Call logout endpoint
      await this.apiRequest('/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear local storage
      this.removeToken();
      this.removeUser();
      window.location.href = '/';
    }
  }

  // Legacy Google Auth (for backwards compatibility)
  async legacyGoogleAuth(googleUser: {
    email: string;
    name?: string;
    picture?: string;
  }): Promise<AuthResponse> {
    const response = await fetch(`${this.API_BASE_URL}/google`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(googleUser),
    });

    if (!response.ok) {
      throw new Error(`Legacy auth failed: ${response.statusText}`);
    }

    const authData: AuthResponse = await response.json();
    
    // Store auth data
    this.setToken(authData.access_token);
    this.setUser(authData.user);
    
    return authData;
  }
}

export default AuthService.getInstance();
export type { User, AuthResponse, AuthState }; 