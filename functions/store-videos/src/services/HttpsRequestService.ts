import axios, { AxiosError } from 'axios';

class HttpsRequestService {
    public static async get<T>(url: string): Promise<T | null> {
        try {
            const response = await axios.get(url);

            if (!response.data) {
                return null;
            }
            return response.data as T;
        } catch (err: unknown) {
            const axiosError = err as AxiosError;
            console.log(axiosError.response.status);
            console.log(axiosError.response.data);
            return null;
        }
    }
}

export default HttpsRequestService;
