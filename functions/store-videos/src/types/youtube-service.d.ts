declare namespace YoutubeServiceApi {
    interface YoutubeServiceSearchRequest {
        apiKey: string,
        keyword: string,
        publishedAfter: string,
        pageToken?: string,
        relevanceLanguage?: string,
        videoCaption?: string,
        searchType?: string,
        maxResults?: number,
        regionCode?: string
    }
}
