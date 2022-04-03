// eslint-disable-next-line no-shadow
const OLanguage = {
    Chinese: 'chinese',
    English: 'english',
    French: 'french',
} as const;

const languageConfigurations: Record<string, LanguageService.LanguageConfig> = {
    chinese: {
        name: OLanguage.Chinese,
        code: 'zh-Hans',
        isSupported: false,
    },
    french: {
        name: OLanguage.French,
        code: 'fr',
        isSupported: true,
    },
    english: {
        name: OLanguage.English,
        code: 'us',
        isSupported: true,
    },
};

const getLanguageConfig = (language: string): LanguageService.LanguageConfig | null => {
    const lowercaseLanguage = language.toLowerCase();

    const languageConfig = languageConfigurations[lowercaseLanguage];
    return languageConfig || null;
};

export default getLanguageConfig;
export { OLanguage };
