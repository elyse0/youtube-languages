// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';

import { Document } from 'mongodb';

const isString = (x: any): x is string => typeof x === 'string';

const getTitleQuery = (req: express.Request): Document => {
    const { title } = req.query;

    if (!isString(title)) {
        return { $match: {} };
    }

    return {
        $match: {
            $text: {
                $search: `"${title}"`,
            },
        },
    };
};

const getDateQuery = (req: express.Request): Document => {
    const { afterDate, beforeDate } = req.query;

    const pipeline: Document[] = [];

    if (isString(afterDate)) {
        pipeline.push({ publishedAt: { $gte: afterDate } });
    }

    if (isString(beforeDate)) {
        pipeline.push({ publishedAt: { $lte: beforeDate } });
    }

    if (!pipeline.length) {
        return { $match: {} };
    }

    return {
        $match: {
            $and: pipeline,
        },
    };
};

const getSortQuery = (req: express.Request): Document => {
    const { sortedBy } = req.query;

    if (isString(sortedBy)) {
        return { $sort: { sortedBy: -1 } };
    }

    return { $sort: { publishedAt: -1 } };
};

const getNotBlacklistedQuery = (req: express.Request, collection?: string): Document[] => {
    const { blacklisted } = req.query;

    if (!collection || (isString(blacklisted) && blacklisted.toLowerCase() === 'false')) {
        return [];
    }

    return [
        {
            $lookup: {
                from: collection,
                localField: 'channelId',
                foreignField: '_id',
                as: 'blacklisted',
            },
        },
        {
            $match: {
                blacklisted: { $size: 0 },
            },
        },
        {
            $project: {
                blacklisted: 0,
            },
        },
    ];
};

export {
    getTitleQuery, getDateQuery, getSortQuery, getNotBlacklistedQuery, isString,
};
