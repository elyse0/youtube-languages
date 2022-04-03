import { CloudSchedulerClient } from '@google-cloud/scheduler';

import envConfig from '@/config/env';

import { google } from '@google-cloud/scheduler/build/protos/protos';

// eslint-disable-next-line no-undef
import IJob = google.cloud.scheduler.v1.IJob

const client = new CloudSchedulerClient({
    projectId: envConfig.projectId,
    keyFilename: envConfig.projectKeyFilename,
});

const createHttpTask = async (): Promise<void> => {
    const uri = envConfig.taskTargetUrl;
    const httpMethod = 'POST';
    const headers = { 'Content-Type': 'application/json' };

    const payload = {
        youtubeApiKey: envConfig.youtubeApiKey,
        keywords: envConfig.keywords,
        language: envConfig.appLanguage,
        videoCollection: envConfig.videoCollection,
        wordBlacklistCollection: envConfig.wordBlacklistCollection,
    };

    const parent = client.locationPath(envConfig.projectId, envConfig.projectLocationId);
    const job: IJob = {
        httpTarget: {
            uri,
            httpMethod,
            headers,
            body: Buffer.from(JSON.stringify(payload)),
            oidcToken: {
                serviceAccountEmail: envConfig.serviceAccountEmail,
            },
        },
        schedule: envConfig.taskSchedule,
        timeZone: envConfig.taskTimezone,
    };

    const [response] = await client.createJob({ job, parent });
    console.log(response);
};

createHttpTask().then(() => {});
