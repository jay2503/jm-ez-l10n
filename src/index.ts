import * as fs from "fs";
import * as _ from "lodash";

export const l10n: any = {
  locale: "en",
  translations: { en: {} },

  setLocale: function (locale: string) {
    l10n.locale = locale;
    l10n.translations[locale] = l10n.translations[locale] ?? {};
  },

  setTranslations: function (
    locale: string,
    translations: { [key: string]: string }
  ) {
    l10n.translations[locale] = translations;
  },

  addTranslations: function (
    locale: string,
    translations: { [key: string]: string }
  ) {
    l10n.translations[locale] = _.merge(
      l10n.translations[locale],
      translations
    );
  },

  setTranslationsFile: function (locale: string, file: string) {
    const translations = l10n.getTranslationsFromFile(file);
    l10n.setTranslations(locale, translations);
  },

  addTranslationsFile: function (locale: string, file: string) {
    const translations = l10n.getTranslationsFromFile(file);
    l10n.addTranslations(locale, translations);
  },

  t: function (key: string, obj?: { [key: string]: string }) {
    const locale = l10n.locale;
    let translation = l10n.translations[locale][key];
    if (translation) {
      _.forEach(obj, (value, key) => {
        translation = translation.replace(
          new RegExp("{{" + key + "}}", "g"),
          value
        );
      });
    }
    return translation ?? new Error("Translation not found for " + key);
  },

  getTranslationsFromFile: function (file: string): { [key: string]: string } {
    let translations: { [key: string]: string } = {};
    try {
      translations = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch (e: any) {
      console.log(
        new Error(
          JSON.stringify({
            file: file,
            message: "Translation file is not having proper JSON format",
            error: e.message,
          })
        )
      );
    }
    return translations;
  },

  enableL10N: function (anyObject: { [key: string]: any }, locale: string) {
    anyObject.t = l10n.t.bind(l10n);
    anyObject.locale = locale;
  },

  enableL10NExpress: function (request: any, response: any, next: () => void) {
    let locale = l10n.locale;
    if (request.headers["x-l10n-locale"]) {
      locale = request.headers["x-l10n-locale"];
    }
    l10n.enableL10N(request, locale);
    next();
  },
};
