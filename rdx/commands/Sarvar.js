module.exports.config = {
  name: "sarvar",
  version: "1.0.0",
  hasPermssion: 2, // sirf admin
  credits: "ALIYA OFFICIAL",
  description: "Auto masti messages (loop)",
  commandCategory: "group",
  usages: "sarvar on / sarvar off",
  cooldowns: 5
};

let intervalID = null;

module.exports.run = async function ({ api, event, args }) {
  const { threadID } = event;

  const header =
`⟪⟪ 𝗔𝗟𝗜𝗬𝗔 ⟫⟫
⚡ OFFICIAL ⚡`;

  const messages = [
    "TERI BHANNN KA BHOSDA",
    "SALE GANDU KE BACHE ",
    "CHAMAR KI OLADDDD",
    "TERI BHANNN KA REP KRWA DU",
    "TERI AMA KI CHUT PE CHAPAL MARU",
"TERI BHANN KI CHUT SE KHUN NIKAL DUNGI",
"TERI BHAMM KI CHUT BDI SEXY HE ",
"TERI AMA KI CHUT ME ACID DALL DU"
  ];

  if (args[0] === "off") {
    if (intervalID) {
      clearInterval(intervalID);
      intervalID = null;
      return api.sendMessage("❌ Sarvar mode OFF", threadID);
    } else {
      return api.sendMessage("⚠️ Sarvar already OFF", threadID);
    }
  }

  if (intervalID) {
    return api.sendMessage("⚠️ Sarvar already running", threadID);
  }

  let i = 0;
  intervalID = setInterval(() => {
    const msg =
`${header}

${messages[i]}`;

    api.sendMessage(msg, threadID);
    i++;
    if (i >= messages.length) i = 0; // restart loop
  }, 25000); // 25 sec

  api.sendMessage("✅ Sarvar mode ON", threadID);
};
