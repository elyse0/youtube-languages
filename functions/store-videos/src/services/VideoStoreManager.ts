import { MongoService } from '@elyse0/mongo-service';

import LanguageService from '@/services/LanguageService';
import YoutubeService from '@/services/YoutubeService';
import BlacklistChecker from '@/services/BlacklistChecker';

import { getYesterdayISODateString } from '@/util/date';
import { asyncFilter } from '@/util/async';

class VideoStoreManager {
    public static async execute(config: VideoStoreManagerApi.Configuration): Promise<void> {
        const database = await MongoService.create();

        const searchPromises = config.youtube.keywords.map((keyword) => YoutubeService.search({
            apiKey: config.youtube.apiKey,
            keyword,
            publishedAfter: getYesterdayISODateString(),
            relevanceLanguage: config.language.code,
        }));

        const searches = await Promise.all(searchPromises);

        const uniqueSearches = Array.from(new Set(searches.flat()));

        let youtubeVideos = uniqueSearches;
        if (config.language.isSupported) {
            youtubeVideos = uniqueSearches.filter((item) => LanguageService.textIsValid(item.title, config.language.name)
                || LanguageService.textIsValid(item.description, config.language.name));
        }

        let validatedYoutubeVideos = youtubeVideos;
        if (config.database.wordBlacklistCollection) {
            const blacklistChecker = new BlacklistChecker(database, config.database.wordBlacklistCollection);
            validatedYoutubeVideos = await asyncFilter<YoutubeApi.Video>(youtubeVideos, async (item) => await blacklistChecker.isTextValid(item.title) && await blacklistChecker.isTextValid(item.description));
        }

        console.log(`Unique searches: ${uniqueSearches.length}\nValid ${config.language.name} videos: ${youtubeVideos.length}\nValidated videos: ${validatedYoutubeVideos.length}`);

        const created = await database.createManyDocuments(config.database.videoCollection, validatedYoutubeVideos, { ordered: false });

        if (!created) {
            console.log('Probably there was a duplicate key error');
        }

        await database.disconnect();
    }
}

export default VideoStoreManager;
