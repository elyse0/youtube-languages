const getVideoLink = (videoId: string): string => `https://youtu.be/${videoId}`;

const getChannelLink = (channelId: string): string => `https://www.youtube.com/channel/${channelId}/videos`;

export { getVideoLink, getChannelLink };
