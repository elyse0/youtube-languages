import HttpsRequestService from '@/services/HttpsRequestService';

import { getGetRequest } from '@/util/http';

const VideoCaptionMode = {
    Any: 'any',
    ClosedCaption: 'closedCaption',
    None: 'none',
} as const;

const SearchType = {
    Video: 'video',
} as const;

class YoutubeService {
    public static async search(request: YoutubeServiceApi.YoutubeServiceSearchRequest): Promise<YoutubeApi.Video[]> {
        const url = 'https://youtube.googleapis.com/youtube/v3/search';

        const searchListRequest: YoutubeApi.SearchListRequest = {
            part: 'snippet',
            key: request.apiKey,
            q: request.keyword,
            publishedAfter: request.publishedAfter,
            relevanceLanguage: request.relevanceLanguage,
            pageToken: request.pageToken,
            videoCaption: request.videoCaption ?? VideoCaptionMode.ClosedCaption,
            type: request.searchType ?? SearchType.Video,
            maxResults: request.maxResults ?? 50,
            regionCode: request.regionCode ?? 'US',
        };

        const requestUrl = getGetRequest(url, searchListRequest as unknown as Record<string, string>);
        const search: YoutubeApi.SearchListResponse | null = await HttpsRequestService.get(requestUrl);

        if (!search) {
            return [];
        }

        const videos: YoutubeApi.Video[] = search.items.map((item) => {
            const videoId = item.id as YoutubeApi.SearchResultVideoId;
            return {
                _id: videoId.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                channelTitle: item.snippet.channelTitle,
                channelId: item.snippet.channelId,
                thumbnailUrl: item.snippet.thumbnails.medium.url,
                publishedAt: item.snippet.publishedAt,
            };
        });

        if (!search.nextPageToken) {
            return videos;
        }

        return videos.concat(
            await YoutubeService.search({ ...request, pageToken: search.nextPageToken }),
        );
    }
}

export default YoutubeService;
