interface Translations {
    [locale: string]: {
        [key: string]: string;
    };
}
export declare class L10n {
    locale: string;
    translations: Translations;
    constructor();
    setLocale(locale: string): void;
    setTranslations(locale: string, translations: {
        [key: string]: string;
    }): void;
    addTranslations(locale: string, translations: {
        [key: string]: string;
    }): void;
    setTranslationsFile(locale: string, file: string): void;
    addTranslationsFile(locale: string, file: string): void;
    t(key: string, obj?: {
        [key: string]: string;
    }): string | Error;
    private getTranslationsFromFile;
    enableL10N(anyObject: {
        [key: string]: any;
    }, locale: string): void;
    enableL10NExpress(request: any, response: any, next: () => void): void;
}
export {};
