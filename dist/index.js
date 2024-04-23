"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.L10n = void 0;
const lodash_1 = __importDefault(require("lodash"));
const fs_1 = __importDefault(require("fs"));
class L10n {
    constructor() {
        this.locale = "en";
        this.translations = { en: {} };
        this.enableL10NExpress = this.enableL10NExpress.bind(this);
    }
    setLocale(locale) {
        var _a;
        this.locale = locale;
        this.translations[locale] = (_a = this.translations[locale]) !== null && _a !== void 0 ? _a : {};
    }
    setTranslations(locale, translations) {
        this.translations[locale] = translations;
    }
    addTranslations(locale, translations) {
        this.translations[locale] = lodash_1.default.merge(this.translations[locale], translations);
    }
    setTranslationsFile(locale, file) {
        const translations = this.getTranslationsFromFile(file);
        this.setTranslations(locale, translations);
    }
    addTranslationsFile(locale, file) {
        const translations = this.getTranslationsFromFile(file);
        this.addTranslations(locale, translations);
    }
    t(key, obj) {
        const locale = this.locale;
        let translation = this.translations[locale][key];
        if (translation) {
            lodash_1.default.forEach(obj, (value, key) => {
                translation = translation.replace(new RegExp("{{" + key + "}}", "g"), value);
            });
        }
        return translation !== null && translation !== void 0 ? translation : new Error("Translation not found for " + key);
    }
    getTranslationsFromFile(file) {
        let translations = {};
        try {
            translations = JSON.parse(fs_1.default.readFileSync(file, "utf8"));
        }
        catch (e) {
            console.log(new Error(JSON.stringify({
                file: file,
                message: "Translation file is not having proper JSON format",
                error: e.message,
            })));
        }
        return translations;
    }
    enableL10N(anyObject, locale) {
        anyObject.t = this.t.bind(this);
        anyObject.locale = locale;
    }
    enableL10NExpress(request, response, next) {
        let locale = this.locale;
        if (request.headers["x-l10n-locale"]) {
            locale = request.headers["x-l10n-locale"];
        }
        this.enableL10N(request, locale);
        next();
    }
}
exports.L10n = L10n;
//# sourceMappingURL=index.js.map