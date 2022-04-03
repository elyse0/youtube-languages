declare namespace VideoStoreManagerApi {
    interface Configuration {
        language: LanguageService.LanguageConfig,
        youtube: {
            keywords: string[],
            apiKey: string,
            publishedAfter: string,
        }
        database: {
            videoCollection: string,
            wordBlacklistCollection?: string,
        },
    }
}
