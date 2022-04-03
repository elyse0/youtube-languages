import LanguageDetect from 'languagedetect';

class LanguageService {
    public static detector = new LanguageDetect();

    public static threshold = 0.20;

    public static textIsValid(text: string, language: string): boolean {
        if (!(language === 'french' || language === 'english')) {
            return true;
        }
        const textLanguage = LanguageService.detector.detect(text);

        if (textLanguage[0] === undefined) {
            return false;
        }

        return textLanguage[0][0] === language && textLanguage[0][1] > LanguageService.threshold;
    }
}

export default LanguageService;
