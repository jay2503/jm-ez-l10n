var _ = require("lodash");
var fs = require('fs');

var l10n = {
    locale: "en",
    translations: {
        "en": {}
    }
}

l10n.setLocale = function (locale) {
    l10n.locale = locale;
    l10n.translations[locale] = !l10n.translations[locale] ? {} : l10n.translations[locale];
}

l10n.setTranslations = function (locale, translations) {
    l10n.translations[locale] = translations;
}

l10n.addTranslations = function (locale, translations) {
    l10n.translations[locale] = _.merge(l10n.translations[locale], translations);
}

l10n.setTranslationsFile = function (locale, file) {
    var translations = getTranslationsFromFile(file);
    l10n.setTranslations(locale, translations)
}

l10n.addTranslationsFile = function (locale, file) {
    var translations = getTranslationsFromFile(file);
    l10n.addTranslations(locale, translations);
}

l10n.t = l10n.translate = function (key, obj) {
    var translation = l10n.translations[l10n.locale][key];
    if (translation) {
        _.forEach(obj, function (value, key) {
            translation = translation.replace(new RegExp('{{'+key+'}}', 'g'), value);
        });
    }
    return translation ? translation : new Error("Translation not found");
}

var getTranslationsFromFile = function (file) {
    var translations = {};
    try {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (e) {
        console.log(new Error(JSON.stringify({
            "file": file,
            "message": "Translation file is not having proper JSON format",
            "error": e.message
        })));
    }
}

module.exports = l10n;