import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { EHttpMethod } from "../types";

class HttpService {
  private http: AxiosInstance;
  private baseURL = process.env.REACT_APP_BACKEND_API_URL;

  constructor() {
    this.http = axios.create({
      baseURL: this.baseURL,
    });
  }

  private async request<T>(
    method: EHttpMethod,
    url: string,
    options: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.http.request<T>({
        method,
        url,
        ...options,
      });

      return response.data;
    } catch (error: unknown) {
      return this.handleError(error);
    }
  }

  public async get<T>(url: string, params?: unknown): Promise<T> {
    return this.request<T>(EHttpMethod.GET, url, {
      params,
    });
  }

  private handleError(error: unknown) {
    return Promise.reject(error);
  }
}

export const httpService = new HttpService();
