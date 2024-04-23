import _ from "lodash";
import fs from "fs";

interface Translations {
  [locale: string]: { [key: string]: string };
}

export class L10n {
  locale: string;
  translations: Translations;

  constructor() {
    this.locale = "en";
    this.translations = { en: {} };
    this.enableL10NExpress = this.enableL10NExpress.bind(this);
  }

  setLocale(locale: string) {
    this.locale = locale;
    this.translations[locale] = this.translations[locale] ?? {};
  }

  setTranslations(locale: string, translations: { [key: string]: string }) {
    this.translations[locale] = translations;
  }

  addTranslations(locale: string, translations: { [key: string]: string }) {
    this.translations[locale] = _.merge(
      this.translations[locale],
      translations
    );
  }

  setTranslationsFile(locale: string, file: string) {
    const translations = this.getTranslationsFromFile(file);
    this.setTranslations(locale, translations);
  }

  addTranslationsFile(locale: string, file: string) {
    const translations = this.getTranslationsFromFile(file);
    this.addTranslations(locale, translations);
  }

  t(key: string, obj?: { [key: string]: string }) {
    const locale = this.locale;
    let translation = this.translations[locale][key];
    if (translation) {
      _.forEach(obj, (value, key) => {
        translation = translation.replace(
          new RegExp("{{" + key + "}}", "g"),
          value
        );
      });
    }
    return translation ?? new Error("Translation not found for " + key);
  }

  private getTranslationsFromFile(file: string): { [key: string]: string } {
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
  }

  enableL10N(anyObject: { [key: string]: any }, locale: string) {
    anyObject.t = this.t.bind(this);
    anyObject.locale = locale;
  }

  enableL10NExpress(request: any, response: any, next: () => void) {
    let locale = this.locale;
    if (request.headers["x-l10n-locale"]) {
      locale = request.headers["x-l10n-locale"];
    }
    this.enableL10N(request, locale);
    next();
  }
}
