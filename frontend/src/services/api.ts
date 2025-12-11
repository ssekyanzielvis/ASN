import { apiClient } from './apiClient';
import { Project, NewsArticle, Category, Collaboration, SiteSettings, AuthTokens } from '../types';

// Projects
export const projectService = {
  getAll: (params?: any) => apiClient.get<Project[]>('/projects/', params),
  getBySlug: (slug: string) => apiClient.get<Project>(`/projects/${slug}/`),
  getFeatured: () => apiClient.get<Project[]>('/projects/featured/'),
  getByType: (type: string) => apiClient.get<Project[]>(`/projects/by_type/?type=${type}`),
  create: (data: FormData) => apiClient.post<Project>('/projects/', data),
  update: (slug: string, data: FormData) => apiClient.put<Project>(`/projects/${slug}/`, data),
  delete: (slug: string) => apiClient.delete(`/projects/${slug}/`),
};

// News
export const newsService = {
  getAll: (params?: any) => apiClient.get<NewsArticle[]>('/news/', params),
  getBySlug: (slug: string) => apiClient.get<NewsArticle>(`/news/${slug}/`),
  getLatest: (count: number = 3) => apiClient.get<NewsArticle[]>(`/news/latest/?count=${count}`),
  create: (data: any) => apiClient.post<NewsArticle>('/news/', data),
  update: (slug: string, data: any) => apiClient.put<NewsArticle>(`/news/${slug}/`, data),
  delete: (slug: string) => apiClient.delete(`/news/${slug}/`),
};

// Categories
export const categoryService = {
  getAll: () => apiClient.get<Category[]>('/categories/'),
  getBySlug: (slug: string) => apiClient.get<Category>(`/categories/${slug}/`),
};

// Collaborations
export const collaborationService = {
  submit: (data: Collaboration) => apiClient.post<Collaboration>('/collaborations/', data),
  getAll: () => apiClient.get<Collaboration[]>('/collaborations/'),
  markReviewed: (id: number) => apiClient.post(`/collaborations/${id}/mark_reviewed/`),
  updateStatus: (id: number, status: string) => 
    apiClient.post(`/collaborations/${id}/update_status/`, { status }),
};

// Site Settings
export const settingsService = {
  get: () => apiClient.get<SiteSettings>('/settings/current/'),
};

// Authentication
export const authService = {
  login: async (username: string, password: string): Promise<AuthTokens> => {
    const response = await apiClient.post<AuthTokens>('/token/', { username, password });
    localStorage.setItem('access_token', response.access);
    localStorage.setItem('refresh_token', response.refresh);
    return response;
  },
  
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
  
  refreshToken: async (): Promise<string> => {
    const refresh = localStorage.getItem('refresh_token');
    if (!refresh) throw new Error('No refresh token');
    
    const response = await apiClient.post<{ access: string }>('/token/refresh/', { refresh });
    localStorage.setItem('access_token', response.access);
    return response.access;
  },
  
  verifyToken: async (): Promise<boolean> => {
    const token = localStorage.getItem('access_token');
    if (!token) return false;
    
    try {
      await apiClient.post('/token/verify/', { token });
      return true;
    } catch {
      return false;
    }
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('access_token');
  },
};
