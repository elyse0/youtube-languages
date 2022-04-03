// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import cors from 'cors';
import jwks from 'jwks-rsa';
import jwt from 'express-jwt';
import jwtAuthz from 'express-jwt-authz';

import { MongoService } from '@elyse0/mongo-service';

import envConfig from '@/config/env';

const authenticationMiddleware = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: envConfig.auth0jwksUri,
    }),
    audience: envConfig.auth0Audience,
    issuer: envConfig.auth0Issuer,
    algorithms: ['RS256'],
    credentialsRequired: true,
});

const authorizationMiddleware = jwtAuthz(['create:ban'], {
    customScopeKey: 'permissions',
    checkAllScopes: true,
    failWithError: true,
});

const corsMiddleware = cors();

const main = (req: express.Request, res: express.Response) => {
    corsMiddleware(req, res, () => {
        // eslint-disable-next-line consistent-return
        authenticationMiddleware(req, res, async (err) => {
            if (err) {
                return res.status(401).json({ error: 'Provide auth token' });
            }

            authorizationMiddleware(req, res, async (authorizationError) => {
                if (authorizationError) {
                    return res.status(403).json({ error: 'Insufficient scope' });
                }

                if (req.method !== 'POST') {
                    return res.status(501).json({ error: `Method ${req.method} is not supported` });
                }

                const { channelId } = req.body;

                if (!channelId) {
                    return res.status(400).json({ error: 'Please provide \'channelId\' on req.body' });
                }

                const database = await MongoService.create();
                const blacklisted = await database.createDocument(envConfig.frenchChannelBlacklistCollection, { _id: channelId });

                await database.disconnect();

                if (!blacklisted) {
                    return res.status(400).json({ error: `Error blacklisting channelId '${channelId}'` });
                }

                return res.status(200).json({ error: `ChannelId '${channelId}' has been blacklisted` });
            });
        });
    });
};

export { main };
