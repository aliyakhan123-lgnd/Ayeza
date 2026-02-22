const fs = require('fs-extra');
const path = require('path');

const configPath = path.join(__dirname, 'config.json');
const cookiePath = path.join(__dirname, 'cookies.json');

let botModule = null;
let botStarted = false;

const BRAND_NAME = "SARDAR RDX";
const BOT_VERSION = "0.6";
const BRAND_WHATSAPP = "+923301068874";
const BRAND_EMAIL = "sardarrdx@gmail.com";

// Config read karo
function getConfig() {
  try {
    return fs.readJsonSync(configPath);
  } catch {
    return {
      BOTNAME: 'SARDAR RDX',
      PREFIX: '.',
      ADMINBOT: ['100009012838085'],
      TIMEZONE: 'Asia/Karachi',
      PREFIX_ENABLED: true,
      REACT_DELETE_EMOJI: '😡',
      ADMIN_ONLY_MODE: false,
      AUTO_ISLAMIC_POST: true,
      AUTO_GROUP_MESSAGE: true,
      APPROVE_ONLY: false
    };
  }
}

// Cookies ko appstate mein convert karo
function cookiesToAppstate(cookies) {
  const appstate = [];
  
  // Har cookie ko appstate format mein convert karo
  for (let [key, value] of Object.entries(cookies)) {
    appstate.push({
      key: key,
      value: value,
      domain: ".facebook.com",
      path: "/",
      expires: "2099-12-31T23:59:59Z"
    });
  }
  
  return appstate;
}

// Cookies file se read karo
function getCookies() {
  try {
    return fs.readJsonSync(cookiePath);
  } catch (error) {
    console.log('❌ cookies.json nahi mili!');
    return null;
  }
}

// Bot start karo
async function startBot() {
  try {
    // Pehle check karo cookies.json hai ya nahi
    if (!fs.existsSync(cookiePath)) {
      console.log('\n❌ ERROR: cookies.json nahi mili!');
      console.log('\n📝 YEH FILE BANAO: cookies.json');
      console.log('📝 ISME YEH LIKHO:');
      console.log(`
{
    "c_user": "APNI_ID_YAHAN",
    "xs": "APNA_XS_YAHAN",
    "fr": "APNA_FR_YAHAN"
}

🚀 COOKIES KAISE LEIN:
1. Facebook kholo
2. F12 dabao
3. Console mein ye likho:
   document.cookie
4. Jo mile, usme se c_user, xs aur fr copy karo
      `);
      return;
    }
    
    // Branding dikhao
    console.log(`\n╔═══════════════════════════════════════════════════╗`);
    console.log(`║  ██████╗ ██████╗ ██╗  ██╗    ██████╗  ██████╗  ████████╗║`);
    console.log(`║  ██╔══██╗██╔══██╗╚██╗██╔╝    ██╔══██╗██╔═══██╗ ╚══██╔══╝║`);
    console.log(`║  ██████╔╝██║  ██║ ╚███╔╝     ██████╔╝██║   ██║    ██║   ║`);
    console.log(`║  ██╔══██╗██║  ██║ ██╔██╗     ██╔══██╗██║   ██║    ██║   ║`);
    console.log(`║  ██║  ██║██████╔╝██╔╝ ██╗    ██████╔╝╚██████╔╝    ██║   ║`);
    console.log(`║  ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝    ╚═════╝  ╚═════╝     ╚═╝   ║`);
    console.log(`╠═══════════════════════════════════════════════════╣`);
    console.log(`║                    v${BOT_VERSION}                              ║`);
    console.log(`║ WhatsApp: ${BRAND_WHATSAPP}                           ║`);
    console.log(`║ Email: ${BRAND_EMAIL}                      ║`);
    console.log(`╚═══════════════════════════════════════════════════╝\n`);
    
    console.log('[BOT] SARDAR RDX shuru ho raha hai...');
    
    // Cookies lo
    const cookies = getCookies();
    if (!cookies) {
      console.log('❌ Cookies load nahi hui');
      return;
    }
    
    // Cookies ko appstate mein badlo
    const appstate = cookiesToAppstate(cookies);
    
    // Yeh appstate use karo
    console.log('✅ Cookies se appstate ban gaya');
    console.log('🔄 Bot login kar raha hai...');
    
    // Yahan apna bot ka code aayega
    // Aapke bot mein jahan appstate use hota hai, wahan 'appstate' variable pass karo
    
    botModule = require('./rdx');
    
    // Agar bot module mein startBot function appstate leta hai
    if (botModule.startBot && botModule.startBot.length > 0) {
      botModule.startBot(appstate);
    } else {
      // Nahi to ye try karo
      console.log('⚠️ Bot module mein appstate parameter nahi hai');
      console.log('🚀 Direct bot start kar rahe hain...');
      botModule.startBot();
    }
    
    botStarted = true;
    console.log('[BOT] ✅ SARDAR RDX online ho gaya! 🚀');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Bot start karo
startBot();

// Ctrl+C dabane par
process.on('SIGINT', () => {
  console.log('\n👋 Bot band ho raha hai...');
  process.exit(0);
});
