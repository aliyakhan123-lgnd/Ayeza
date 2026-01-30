const fs = require("fs");
const path = require("path");

// ===== CONFIG =====
const ADMIN_ID = "61550534939001";

// state file
const statePath = path.join(__dirname, "aliya_state.json");
if (!fs.existsSync(statePath)) {
  fs.writeFileSync(statePath, JSON.stringify({ on: false }));
}

// ===== REPLIES =====

// user ke liye gali (HAR MESSAGE)
const galiReplies = [
  "LAND BHAKT 

ABE XHUP BE TERI MAKI CHUT",
  "ABE CHALA JA BHOSDIKE LAND BHAKT",
  "IDHAR KYO APNI MA CHUDWA RHA LAND BHAKT",
  "TERI BHAN KI CHUT KA PRIZE BTA LAND BHAKT ",
  "TERI BHANN TOP KI RNDI HENA LANDBHAKT ",
  "TERI BHANN KA GANG REP KRWA DUNGI LAND BHAKT",
"TERI GAND ME LODA HE KYA RNDI KE",
"TERI BHAN KA BHOSDA LAND BHKT",
"TERI BHAN KI BACHEDANI FAD KE BAXHA NIKAL LUNGI  LANDBHAKT ",
];

// admin / owner ke liye ache replies
const adminReplies = [
  "Ji boss 😎",
  "Owner ke liye ALIYA hamesha ready 💖",
  "Bolo sir ✨"
];

module.exports = {
  config: {
    name: "aliyagalireply",
    eventType: "message"
  },

  async run({ api, event }) {
    try {
      const { body, senderID, threadID, messageID } = event;
      if (!body) return;

      const msg = body.toLowerCase().trim();
      const state = JSON.parse(fs.readFileSync(statePath));

      // ❌ bot khud ko reply na kare
      if (senderID === api.getCurrentUserID()) return;

      // ================= ADMIN =================
      if (senderID === ADMIN_ID) {

        // ON
        if (msg === "aliya on") {
          state.on = true;
          fs.writeFileSync(statePath, JSON.stringify(state));
          return api.sendMessage(
            "✦ Official ALIYA ✦\n\n😈 MODE ON",
            threadID,
            messageID
          );
        }

        // OFF
        if (msg === "aliya off") {
          state.on = false;
          fs.writeFileSync(statePath, JSON.stringify(state));
          return api.sendMessage(
            "✦ Official ALIYA ✦\n\n🙂 MODE OFF",
            threadID,
            messageID
          );
        }

        // admin normal message
        if (!state.on) return;

        const adminReply =
          adminReplies[Math.floor(Math.random() * adminReplies.length)];

        return api.sendMessage(
          `✦ Official ALIYA ✦\n\n${adminReply}`,
          threadID,
          messageID
        );
      }

      // ================= USER =================

      // bot off hai
      if (!state.on) return;

      // USER ke HAR message pe gali
      const reply =
        galiReplies[Math.floor(Math.random() * galiReplies.length)];

      return api.sendMessage(
        `✦ Official ALIYA ✦\n\n${reply}`,
        threadID,
        messageID
      );

    } catch (err) {
      console.log("[ALIYA ERROR]:", err.message);
    }
  }
};
