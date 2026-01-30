const fs = require("fs");
const path = require("path");

// ===== CONFIG =====
const ADMIN_ID = "61550534939001";

// state file
const statePath = path.join(__dirname, "aliya_state.json");
if (!fs.existsSync(statePath)) {
  fs.writeFileSync(statePath, JSON.stringify({ on: false }, null, 2));
}

// ===== REPLIES =====

// GROUP replies (thoda hard)
const groupReplies = [
  "Abe chup re bhai 😑",
  "Group me bakchodi mat kar 🙄",
  "Dimag thanda rakh 😤",
  "Zyada hero mat ban 😒",
  "Bas kar bhai 😐"
];

// INBOX replies (soft / warning)
const inboxReplies = [
  "Inbox me shanti rakho 🙂",
  "Direct message dhang se bhejo 😌",
  "Please normal baat karo ✨",
  "Spam mat karo inbox me 🤏"
];

// admin replies
const adminReplies = [
  "Ji boss 😎",
  "Owner ke liye ALIYA ready 💖",
  "Bolo sir ✨"
];

module.exports = {
  config: {
    name: "aliyareply",
    eventType: "message"
  },

  async run({ api, event }) {
    try {
      const { body, senderID, threadID, messageID, isGroup } = event;
      if (!body) return;

      const msg = body.toLowerCase().trim();
      const state = JSON.parse(fs.readFileSync(statePath, "utf8"));

      // bot self-reply block
      if (senderID === api.getCurrentUserID()) return;

      // ============== ADMIN ==============
      if (senderID === ADMIN_ID) {

        if (msg === "aliya on") {
          state.on = true;
          fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
          return api.sendMessage(
            "✦ Official ALIYA ✦\n\n😈 MODE ON",
            threadID,
            messageID
          );
        }

        if (msg === "aliya off") {
          state.on = false;
          fs.writeFileSync(statePath, JSON.stringify(state, null, 2));
          return api.sendMessage(
            "✦ Official ALIYA ✦\n\n🙂 MODE OFF",
            threadID,
            messageID
          );
        }

        if (!state.on) return;

        const adminReply =
          adminReplies[Math.floor(Math.random() * adminReplies.length)];

        return api.sendMessage(
          `✦ Official ALIYA ✦\n\n${adminReply}`,
          threadID,
          messageID
        );
      }

      // ============== USERS ==============
      if (!state.on) return;

      // GROUP
      if (isGroup) {
        const reply =
          groupReplies[Math.floor(Math.random() * groupReplies.length)];

        return api.sendMessage(
          `✦ Official ALIYA ✦\n\n${reply}`,
          threadID,
          messageID
        );
      }

      // INBOX (DM)
      const inboxReply =
        inboxReplies[Math.floor(Math.random() * inboxReplies.length)];

      return api.sendMessage(
        `✦ Official ALIYA ✦\n\n${inboxReply}`,
        threadID,
        messageID
      );

    } catch (err) {
      console.log("[ALIYA ERROR]:", err);
    }
  }
};
