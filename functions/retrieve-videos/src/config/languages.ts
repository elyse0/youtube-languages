interface LanguageConfig {
    videoCollection: string,
    channelBlacklist?: string
}

const config: Record<string, LanguageConfig> = {
    french: {
        videoCollection: 'french',
        channelBlacklist: 'frenchChannelBlacklist',
    },
    chinese: {
        videoCollection: 'chinese',
    },
};

const getLanguageConfig = (language: string): LanguageConfig | null => {
    const languageConfig = config[language];
    return languageConfig || null;
};

export { getLanguageConfig };
