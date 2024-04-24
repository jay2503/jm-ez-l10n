"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.l10n = void 0;
const fs = __importStar(require("fs"));
const _ = __importStar(require("lodash"));
exports.l10n = {
    locale: "en",
    translations: { en: {} },
    setLocale: function (locale) {
        var _a;
        exports.l10n.locale = locale;
        exports.l10n.translations[locale] = (_a = exports.l10n.translations[locale]) !== null && _a !== void 0 ? _a : {};
    },
    setTranslations: function (locale, translations) {
        exports.l10n.translations[locale] = translations;
    },
    addTranslations: function (locale, translations) {
        exports.l10n.translations[locale] = _.merge(exports.l10n.translations[locale], translations);
    },
    setTranslationsFile: function (locale, file) {
        const translations = exports.l10n.getTranslationsFromFile(file);
        exports.l10n.setTranslations(locale, translations);
    },
    addTranslationsFile: function (locale, file) {
        const translations = exports.l10n.getTranslationsFromFile(file);
        exports.l10n.addTranslations(locale, translations);
    },
    t: function (key, obj) {
        const locale = exports.l10n.locale;
        let translation = exports.l10n.translations[locale][key];
        if (translation) {
            _.forEach(obj, (value, key) => {
                translation = translation.replace(new RegExp("{{" + key + "}}", "g"), value);
            });
        }
        return translation !== null && translation !== void 0 ? translation : new Error("Translation not found for " + key);
    },
    getTranslationsFromFile: function (file) {
        let translations = {};
        try {
            translations = JSON.parse(fs.readFileSync(file, "utf8"));
        }
        catch (e) {
            console.log(new Error(JSON.stringify({
                file: file,
                message: "Translation file is not having proper JSON format",
                error: e.message,
            })));
        }
        return translations;
    },
    enableL10N: function (anyObject, locale) {
        anyObject.t = exports.l10n.t.bind(exports.l10n);
        anyObject.locale = locale;
    },
    enableL10NExpress: function (request, response, next) {
        let locale = exports.l10n.locale;
        if (request.headers["x-l10n-locale"]) {
            locale = request.headers["x-l10n-locale"];
        }
        exports.l10n.enableL10N(request, locale);
        next();
    },
};
//# sourceMappingURL=index.js.map