import axios, { AxiosRequestConfig } from 'axios';

class HttpsRequestService {
  public static async get<T>(
    url: string, params: Record<string, unknown> = {},
  ): Promise<T | null> {
    try {
      const response = await axios.get(url, { params });

      if (!response.data) {
        return null;
      }
      return response.data;
    } catch (e: unknown) {
      console.log(e);
      return null;
    }
  }

  public static async post<T>(
    url: string, data: Record<string, string>, config: AxiosRequestConfig = {},
  ): Promise<T | null> {
    try {
      const response = await axios.post(url, data, config);

      if (response.status < 200) {
        return null;
      }
      return response.data;
    } catch (e: unknown) {
      console.log(e);
      return null;
    }
  }
}

export default HttpsRequestService;
