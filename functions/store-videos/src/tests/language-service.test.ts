import LanguageService from '@/services/LanguageService';

import { OLanguage } from '@/config/language';

describe('language-service', () => {
    it('should be valid french', () => {
        const text = 'Je pense que tout est possible friends en Xmas';
        const isTextValid = LanguageService.textIsValid(text, OLanguage.French);

        expect(isTextValid).toBe(true);
    });

    it('should be invalid french but valid english', () => {
        const text = 'WEEKLY VLOG | Skincare, The Ordinary, Haul, School, Cooking &amp; Friends';
        const isValidFrench = LanguageService.textIsValid(text, OLanguage.French);
        const isValidEnglish = LanguageService.textIsValid(text, OLanguage.English);

        expect(isValidFrench).toBe(false);
        expect(isValidEnglish).toBe(true);
    });

    it('should be invalid french and invalid english', () => {
        const text = '【ルームツアー】36坪 回遊動線や将来の事も考えた過ごしやすい平屋｜勾配天井で開放感抜群・キッチンが主役・木を沢山使った木の家・2LDK・エコワークス｜Room tour';
        const isValidFrench = LanguageService.textIsValid(text, OLanguage.French);
        const isValidEnglish = LanguageService.textIsValid(text, OLanguage.English);

        expect(isValidFrench).toBe(false);
        expect(isValidEnglish).toBe(false);
    });
});
