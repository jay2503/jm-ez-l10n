# jm-ez-l10n
Easy Localization for NodeJS 

## Installation
```sh
npm install jm-ez-l10n
```

## Usage
Load language files, in your main server.js/index.js file,

```js
var l10n = require('jm-ez-l10n');
// Set Translations by json file
l10n.setTranslationsFile('en', 'translation.en.json');
l10n.setTranslationsFile('fr', 'translation.fr.json');
```

Now in anyother project file, you can just simply use it! 
e.g. example.js 

```js
var l10n = require('jm-ez-l10n');
console.log(l10n.t("HEL")); // Hello!
```

## Examples
```js
var l10n = require('jm-ez-l10n');

// Set Translations by pure js object
l10n.setTranslations('en', {
    "HEL" : "Hello!",
    "INF_THANK_YOU" : "Thank you for singup with us!"
});

l10n.setTranslations('fr', {
    "HEL" : "salut!",
    "INF_THANK_YOU" : "Nous vous remercions de singup avec nous!"
});

l10n.setLocale('en'); // You may ignore this line as default locale is 'en'

console.log(l10n.t("HEL")); // Hello!

l10n.setLocale('fr');
console.log(l10n.t("HEL")); // salut!

// Set Translations by json file
l10n.setTranslationsFile('en', 'translation.en.json');
l10n.setTranslationsFile('fr', 'translation.fr.json');

l10n.setLocale('en');
console.log(l10n.t("HEL")); // Hello!

l10n.setLocale('fr');
console.log(l10n.t("HEL")); // salut!


// Variables and add translation to existing
l10n.setTranslations('en', {
    "MSG_N_ITEM_FOUND" : "{{num}} items found!",
    "DISPLAY_PAGE_NUMBER" : "Displaying {{current}} of {{total}} records"
});

l10n.setLocale('en');
console.log(l10n.t("MSG_N_ITEM_FOUND", {"num": 10})); // 10 items found!
console.log(l10n.t("DISPLAY_PAGE_NUMBER", {"current": 10, total: 25})); // Displaying 10 of 25 records
```

## License
The MIT License (MIT)
