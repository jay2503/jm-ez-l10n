// index.ts / server.ts
import { l10n } from "./index"; // Assuming index.ts exists
// Express Middleware works beautifully here...
import express from "express";

// Set Translations by pure js object
l10n.setTranslations("en", {
  HEL: "Hello!",
  INF_THANK_YOU: "Thank you for signup with us!",
});

l10n.setTranslations("fr", {
  HEL: "salut!",
  INF_THANK_YOU: "Nous vous remercions de signup avec nous!",
});

// Set Translations by json file
l10n.setTranslationsFile("en", "translation.en.json");
l10n.setTranslationsFile("fr", "translation.fr.json");

// Variables and add translation to existing
l10n.addTranslations("en", {
  MSG_N_ITEM_FOUND: "{{num}} items found!",
  DISPLAY_PAGE_NUMBER: "Displaying {{current}} of {{total}} records",
});

const anyObj: any = {}; // Renamed variable "any" to "anyObj" to avoid conflict with TypeScript keyword
l10n.enableL10N(anyObj, "en");
console.log(anyObj.t("MSG_N_ITEM_FOUND", { num: 10 })); // 10 items found!
console.log(l10n.t("DISPLAY_PAGE_NUMBER", { current: "10", total: "25" })); // Displaying 10 of 25 records

const app = express();

app.listen(1338, function () {
  console.log("parse-server-example running on port 1338");
});

// Using custom header X-L10N-Locale
app.use(l10n.enableL10NExpress);
app.post("/anyReq", function (req: any, res) {
  console.log(req.t("MSG_N_ITEM_FOUND", { num: 10 })); // 10 items found!
});
