import { getArrayFromCsv } from '@/util/csv';

const projectKeyFilename = process.env.PROJECT_KEY_FILENAME;
if (!projectKeyFilename) {
    throw Error('PROJECT_KEY_FILENAME is not set');
}

const projectId = process.env.PROJECT_ID;
if (!projectId) {
    throw Error('PROJECT_ID is not set');
}

const projectLocationId = process.env.PROJECT_LOCATION_ID;
if (!projectLocationId) {
    throw Error('PROJECT_LOCATION is not set');
}

const serviceAccountEmail = process.env.SERVICE_ACCOUNT_EMAIL;
if (!serviceAccountEmail) {
    throw Error('SERVICE_ACCOUNT_EMAIL is not set');
}

const taskTargetUrl = process.env.TASK_TARGET_URL;
if (!taskTargetUrl) {
    throw Error('TASK_TARGET_URL is not set');
}

const taskSchedule = process.env.TASK_SCHEDULE;
if (!taskSchedule) {
    throw Error('TASK_SCHEDULE is not set');
}

const taskTimezone = process.env.TASK_TIMEZONE;
if (!taskTimezone) {
    throw Error('TASK_TIMEZONE is not set');
}

const youtubeApiKey = process.env.YOUTUBE_API_KEY;
if (!youtubeApiKey) {
    throw Error('YOUTUBE_API_KEY is not set');
}

const keywords = process.env.KEYWORDS;
if (!keywords) {
    throw Error('KEYWORDS is not set');
}

const appLanguage = process.env.APP_LANGUAGE;
if (!appLanguage) {
    throw Error('APP_LANGUAGE is not set');
}

const videoCollection = process.env.VIDEO_COLLECTION;
if (!videoCollection) {
    throw Error('VIDEO_COLLECTION is not set');
}

const wordBlacklistCollection = process.env.WORD_BLACKLIST_COLLECTION;
if (!wordBlacklistCollection) {
    throw Error('WORD_BLACKLIST_COLLECTION is not set');
}

const config = {
    projectKeyFilename,
    projectId,
    projectLocationId,
    serviceAccountEmail,
    taskTargetUrl,
    taskSchedule,
    taskTimezone,
    youtubeApiKey,
    keywords: getArrayFromCsv(keywords),
    appLanguage,
    videoCollection,
    wordBlacklistCollection,
};

export default config;
