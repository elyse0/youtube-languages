// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import cors from 'cors';

import { MongoService } from '@elyse0/mongo-service';

import { getLanguageConfig } from '@/config/languages';

import {
    getDateQuery, getNotBlacklistedQuery, getSortQuery, getTitleQuery, isString,
} from '@/util';

const corsMiddleware = cors();

const main = async (req: express.Request, res: express.Response) => {
    corsMiddleware(req, res, async () => {
        if (req.method !== 'GET') {
            return res.status(501).json({ error: `Method ${req.method} is not supported` });
        }

        const { language } = req.query;
        if (!isString(language)) {
            return res.status(400).json({ message: "Please provide a valid target 'language'" });
        }
        const languageConfig = getLanguageConfig(language);
        if (!languageConfig) {
            return res.status(400).json({ message: 'Language is not supported' });
        }

        const titleQuery = getTitleQuery(req);
        const dateQuery = getDateQuery(req);
        const notBlacklistedQuery = getNotBlacklistedQuery(req, languageConfig.channelBlacklist);
        const sortQuery = getSortQuery(req);

        const database = await MongoService.create();
        const videos = await database.aggregation(
            languageConfig.videoCollection,
            [
                titleQuery,
                dateQuery,
                ...notBlacklistedQuery,
                sortQuery,
            ],
        );

        await database.disconnect();

        if (!videos.length) {
            return res.status(404).json({ error: 'There are no videos' });
        }

        return res.status(200).json(videos);
    });
};

export { main };
