// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';

import VideoStoreManager from '@/services/VideoStoreManager';

import { isString, isStringArray } from '@/util/validation';
import { getYesterdayISODateString } from '@/util/date';

import getLanguageConfig from '@/config/language';

const main = async (req: express.Request, res: express.Response) => {
    if (req.method !== 'POST') {
        return res.status(501).json({ error: `Method ${req.method} is not supported` });
    }

    const {
        youtubeApiKey, keywords, language, videoCollection, wordBlacklistCollection,
    } = req.body;

    if (!isString(youtubeApiKey)) {
        return res.status(400).json({ error: "Please provide your 'youtubeApiKey'" });
    }

    if (!isStringArray(keywords)) {
        return res.status(400).json({ error: "Please provide your 'keywords' in an array" });
    }

    if (!isString(language)) {
        return res.status(400).json({ error: "Please provide a valid target 'language'" });
    }
    const languageConfig = getLanguageConfig(language);
    if (!languageConfig) {
        return res.status(400).json({ error: "Please provide a valid target 'language'" });
    }

    if (!isString(videoCollection)) {
        return res.status(400).json({ error: "Please provide your 'videoCollection'" });
    }

    const publishedAfter = getYesterdayISODateString();

    const videoStoreManagerConfig: VideoStoreManagerApi.Configuration = {
        language: languageConfig,
        database: {
            videoCollection,
            wordBlacklistCollection,
        },
        youtube: {
            keywords,
            publishedAfter,
            apiKey: youtubeApiKey,
        },
    };

    await VideoStoreManager.execute(videoStoreManagerConfig);

    return res.status(200).json({ message: 'Youtube videos updated' });
};

export { main };
