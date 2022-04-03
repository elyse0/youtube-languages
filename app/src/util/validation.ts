import { IVideo } from '@/types/YoutubeApi';

const isString = (x: unknown): x is string => typeof x === 'string';

const isVideo = (x: unknown): x is IVideo => {
  if (x === null || typeof x === 'string' || typeof x === 'number') {
    return false;
  }

  // @ts-ignore
  return isString(x._id) && isString(x.title) && isString(x.description) && isString(x.channelTitle)
    // @ts-ignore
    && isString(x.channelId) && isString(x.thumbnailUrl) && isString(x.publishedAt);
};

const isVideoArray = (x: unknown): x is IVideo[] => {
  if (!Array.isArray(x)) {
    return false;
  }

  return !x.some((item) => !isVideo(item));
};

export { isVideo, isVideoArray, isString };
