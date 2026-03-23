export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiClient {
  get<T>(path: string): Promise<ApiResponse<T>>;
  post<T>(path: string, body: unknown): Promise<ApiResponse<T>>;
  put<T>(path: string, body: unknown): Promise<ApiResponse<T>>;
  patch<T>(path: string, body: unknown): Promise<ApiResponse<T>>;
  delete<T>(path: string): Promise<ApiResponse<T>>;
}

export interface ApiClientConfig {
  baseUrl: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export class FetchApiClient implements ApiClient {
  constructor(private config: ApiClientConfig) {}

  private async request<T>(method: ApiMethod, path: string, body?: unknown): Promise<ApiResponse<T>> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeout ?? 10000);

    try {
      const response = await fetch(`${this.config.baseUrl}${path}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...this.config.headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        const error: ApiError = {
          message: response.statusText,
          status: response.status,
          code: response.status.toString(),
        };
        throw error;
      }

      const data = await response.json();
      return { data, status: response.status };
    } catch (err) {
      clearTimeout(timeout);
      if (err instanceof Error && err.name === 'AbortError') {
        throw { message: 'Request timeout', status: 408, code: 'TIMEOUT' } as ApiError;
      }
      throw err;
    }
  }

  get<T>(path: string): Promise<ApiResponse<T>> {
    return this.request<T>('GET', path);
  }

  post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('POST', path, body);
  }

  put<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', path, body);
  }

  patch<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', path, body);
  }

  delete<T>(path: string): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', path);
  }
}
