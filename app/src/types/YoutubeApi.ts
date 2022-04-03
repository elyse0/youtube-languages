export interface IBasicThumbnail {
  url: string,
  width: number,
  height: number
}

export interface IChannelThumbnail {
  url: string
}

export type IVideoThumbnail = IBasicThumbnail

export type IPlaylistThumbnail = IBasicThumbnail

export interface ISearchResultVideoThumbnails {
  default: IChannelThumbnail,
  medium: IChannelThumbnail,
  high: IChannelThumbnail
}

export interface ISearchResultChannelThumbnails {
  default: IVideoThumbnail,
  medium: IVideoThumbnail,
  high: IVideoThumbnail
}

export interface ISearchResultPlaylistThumbnails {
  default: IPlaylistThumbnail,
  medium: IPlaylistThumbnail,
  high: IPlaylistThumbnail
}

export type ISearchResultThumbnails =
  ISearchResultChannelThumbnails
  | ISearchResultPlaylistThumbnails
  | ISearchResultVideoThumbnails

export interface ISearchResultIdBasic {
  kind: string,
}

export interface ISearchResultVideoId extends ISearchResultIdBasic {
  videoId: string
}

export interface ISearchResultChannelId extends ISearchResultIdBasic {
  channelId: string
}

export interface ISearchResultPlaylistId extends ISearchResultIdBasic {
  playlistId: string
}

export type ISearchResultId = ISearchResultVideoId | ISearchResultChannelId | ISearchResultPlaylistId

export interface ISearchResultSnippet {
  publishedAt: string,
  channelId: string,
  title: string,
  description: string,
  thumbnails: ISearchResultThumbnails,
  channelTitle: string,
  liveBroadcastContent: string
  publishedTime: string
}

export interface ISearchResult {
  kind: 'youtube#searchResult',
  etag: string,
  id: ISearchResultId,
  snippet: ISearchResultSnippet
}

export interface ISearchListResponse {
  kind: 'youtube#searchListResponse',
  etag: string,
  nextPageToken?: string,
  prevPageToken?: string,
  regionCode: string,
  pageInfo: {
    totalResults: number,
    resultsPerPage: number
  },
  items: ISearchResult[]
}

export interface IVideo {
  _id: string,
  title: string,
  description: string,
  channelTitle: string,
  channelId: string,
  thumbnailUrl: string
  publishedAt: string,
}
