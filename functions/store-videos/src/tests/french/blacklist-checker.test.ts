import { MongoService } from '@elyse0/mongo-service';

import BlacklistChecker from '@/services/BlacklistChecker';

import { isString } from '@/util/validation';

import Video4rMyquGEAv8 from './samples/4rMyquGEAv8.json';
import Video7BpJeb2E6L8 from './samples/7BpJeb2E6L8.json';
import Video7NL3XcdKxxQ from './samples/7NL3XcdKxxQ.json';
import VideoN2jPMS3UiVA from './samples/N2jPMS3UiVA.json';
import VideoNVa8R1UkBw from './samples/NV-a8R1UkBw.json';
import VideoOH6sBelUfak from './samples/OH6sBelUfak.json';
import VideoXj45NEWae84 from './samples/Xj45NEWae84.json';
import VideobIDxgT2qpVA from './samples/bIDxgT2qpVA.json';
import Videoyad5gbIne8 from './samples/yad-5gbIne8.json';

describe('blacklist-checker', () => {
    let database: MongoService;
    let blacklistChecker: BlacklistChecker;

    beforeAll(async () => {
        const collection = process.env.MONGO_BLACKLISTED_WORDS_COLLECTION;

        if (!isString(collection)) {
            console.log('BlacklistChecker: Skipped');
            return;
        }

        database = await MongoService.create();
        blacklistChecker = new BlacklistChecker(database, collection);
    });

    afterAll(async () => {
        await database.disconnect();
    });

    it('should match "cheick", "faîda", "konate", "mamadou", "richesse", "salam"', async () => {
        const text = 'salam a tous je vous invite a écouter cette vidéo de notre cheick mamadou konate de faîda très rapide de richesse.';

        const matches = await blacklistChecker.getMatches(text);
        const expected = ['cheick', 'faîda', 'konate', 'mamadou', 'richesse', 'salam'];

        expect(matches).toEqual(expected);
    });

    it('should match "clauzele", "officiel.", "prophetesse"', async () => {
        const matches = await blacklistChecker.getMatches(Video7NL3XcdKxxQ.title);
        const expected = ['clauzele', 'officiel.', 'prophetesse', 'urgent'];

        expect(matches).toEqual(expected);
    });

    it('should match "culte", "pasteur"', async () => {
        const matches = await blacklistChecker.getMatches(Video7BpJeb2E6L8.description);
        const expected = ['culte', 'pasteur'];

        expect(matches).toEqual(expected);
    });

    it('should match "horoscope"', async () => {
        const matches = await blacklistChecker.getMatches(VideoXj45NEWae84.description);
        const expected = ['horoscope'];

        expect(matches).toEqual(expected);
    });

    it('should tag bIDxgT2qpVA as valid', async () => {
        const titleMatches = await blacklistChecker.getMatches(VideobIDxgT2qpVA.title);
        const descriptionMatches = await blacklistChecker.getMatches(VideobIDxgT2qpVA.description);

        expect(titleMatches).toEqual([]);
        expect(descriptionMatches).toEqual([]);
    });

    it('should tag yad-5gbIne8 as valid', async () => {
        const titleMatches = await blacklistChecker.getMatches(Videoyad5gbIne8.title);
        const descriptionMatches = await blacklistChecker.getMatches(Videoyad5gbIne8.description);

        expect(titleMatches).toEqual([]);
        expect(descriptionMatches).toEqual([]);
    });

    it('should tag OH6sBelUfak as valid', async () => {
        const titleMatches = await blacklistChecker.getMatches(VideoOH6sBelUfak.title);
        const descriptionMatches = await blacklistChecker.getMatches(VideoOH6sBelUfak.description);

        expect(titleMatches).toEqual([]);
        expect(descriptionMatches).toEqual([]);
    });

    it('should tag N2jPMS3UiVA as valid', async () => {
        const titleMatches = await blacklistChecker.getMatches(VideoN2jPMS3UiVA.title);
        const descriptionMatches = await blacklistChecker.getMatches(VideoN2jPMS3UiVA.description);

        expect(titleMatches).toEqual([]);
        expect(descriptionMatches).toEqual([]);
    });

    it('should tag NV-a8R1UkBw as valid', async () => {
        const titleMatches = await blacklistChecker.getMatches(VideoNVa8R1UkBw.title);
        const descriptionMatches = await blacklistChecker.getMatches(VideoNVa8R1UkBw.description);

        expect(titleMatches).toEqual([]);
        expect(descriptionMatches).toEqual([]);
    });

    it('should tag 4rMyquGEAv8 as valid', async () => {
        const titleMatches = await blacklistChecker.getMatches(Video4rMyquGEAv8.title);
        const descriptionMatches = await blacklistChecker.getMatches(Video4rMyquGEAv8.description);

        expect(titleMatches).toEqual([]);
        expect(descriptionMatches).toEqual([]);
    });
});
