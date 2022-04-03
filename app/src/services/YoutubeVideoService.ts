import HttpsRequestService from '@/services/HttpsRequestService';

import { IVideo } from '@/types/YoutubeApi';

interface GetVideosRequest {
  language: string,
  afterDate?: string,
  beforeDate?: string,
  blacklisted?: boolean,
  title?: string,
}

class YoutubeVideoService {
  private static retrieveVideosUrl = process.env.VUE_APP_FUNCTION_RETRIEVE_VIDEOS_URL

  private static banChannelUrl = process.env.VUE_APP_FUNCTION_BAN_CHANNEL_URL

  static async getVideos(request: GetVideosRequest): Promise<IVideo[] | null> {
    const response = await HttpsRequestService.get<IVideo[]>(
      YoutubeVideoService.retrieveVideosUrl,
      {
        language: request.language,
        afterDate: request.afterDate,
        beforeDate: request.beforeDate,
        blacklisted: request.blacklisted,
        title: request.title,
      },
    );

    return response || null;
  }

  static async banChannel(channelId: string, token: string): Promise<string | null> {
    const response = await HttpsRequestService.post<string>(
      YoutubeVideoService.banChannelUrl,
      { channelId },
      { headers: { Authorization: `Bearer ${token}` } },
    );

    return response || null;
  }
}

export default YoutubeVideoService;
export { GetVideosRequest };
