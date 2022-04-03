declare namespace YoutubeApi {

    interface SearchListRequest {
        part: string,
        key: string,
        q: string,
        type?: string,
        publishedAfter?: string,
        videoCaption?: string
        regionCode?: string,
        relevanceLanguage?: string,
        maxResults?: number,
        pageToken?: string,
    }

    interface BasicThumbnail {
        url: string,
        width: number,
        height: number
    }

    interface ChannelThumbnail {
        url: string
    }

    type VideoThumbnail = BasicThumbnail

    type PlaylistThumbnail = BasicThumbnail

    interface SearchResultVideoThumbnails {
        default: ChannelThumbnail,
        medium: ChannelThumbnail,
        high: ChannelThumbnail
    }

    interface SearchResultChannelThumbnails {
        default: VideoThumbnail,
        medium: VideoThumbnail,
        high: VideoThumbnail
    }

    interface SearchResultPlaylistThumbnails {
        default: PlaylistThumbnail,
        medium: PlaylistThumbnail,
        high: PlaylistThumbnail
    }

    type SearchResultThumbnails =
        SearchResultChannelThumbnails
        | SearchResultPlaylistThumbnails
        | SearchResultVideoThumbnails

    interface SearchResultIdBasic {
        kind: string,
    }

    interface SearchResultVideoId extends SearchResultIdBasic {
        videoId: string
    }

    interface SearchResultChannelId extends SearchResultIdBasic {
        channelId: string
    }

    interface SearchResultPlaylistId extends SearchResultIdBasic {
        playlistId: string
    }

    type ISearchResultId = SearchResultVideoId | SearchResultChannelId | SearchResultPlaylistId

    interface SearchResultSnippet {
        publishedAt: string,
        channelId: string,
        title: string,
        description: string,
        thumbnails: SearchResultThumbnails,
        channelTitle: string,
        liveBroadcastContent: string
        publishedTime: string
    }

    interface SearchResult {
        kind: 'youtube#searchResult',
        etag: string,
        id: ISearchResultId,
        snippet: SearchResultSnippet
    }

    interface SearchListResponse {
        kind: 'youtube#searchListResponse',
        etag: string,
        nextPageToken?: string,
        prevPageToken?: string,
        regionCode: string,
        pageInfo: {
            totalResults: number,
            resultsPerPage: number
        },
        items: SearchResult[]
    }

    interface Video {
        _id: string,
        title: string,
        description: string,
        channelTitle: string,
        channelId: string,
        thumbnailUrl: string
        publishedAt: string,
    }
}
