"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts / server.ts
const index_1 = require("./index"); // Assuming index.ts exists
// Express Middleware works beautifully here...
const express_1 = __importDefault(require("express"));
// Set Translations by pure js object
index_1.l10n.setTranslations("en", {
    HEL: "Hello!",
    INF_THANK_YOU: "Thank you for signup with us!",
});
index_1.l10n.setTranslations("fr", {
    HEL: "salut!",
    INF_THANK_YOU: "Nous vous remercions de signup avec nous!",
});
// Set Translations by json file
index_1.l10n.setTranslationsFile("en", "translation.en.json");
index_1.l10n.setTranslationsFile("fr", "translation.fr.json");
// Variables and add translation to existing
index_1.l10n.addTranslations("en", {
    MSG_N_ITEM_FOUND: "{{num}} items found!",
    DISPLAY_PAGE_NUMBER: "Displaying {{current}} of {{total}} records",
});
const anyObj = {}; // Renamed variable "any" to "anyObj" to avoid conflict with TypeScript keyword
index_1.l10n.enableL10N(anyObj, "en");
console.log(anyObj.t("MSG_N_ITEM_FOUND", { num: 10 })); // 10 items found!
console.log(index_1.l10n.t("DISPLAY_PAGE_NUMBER", { current: "10", total: "25" })); // Displaying 10 of 25 records
const app = (0, express_1.default)();
app.listen(1338, function () {
    console.log("parse-server-example running on port 1338");
});
// Using custom header X-L10N-Locale
app.use(index_1.l10n.enableL10NExpress);
app.post("/anyReq", function (req, res) {
    console.log(req.t("MSG_N_ITEM_FOUND", { num: 10 })); // 10 items found!
});
//# sourceMappingURL=examples.js.map