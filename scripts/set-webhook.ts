import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const BOT_TOKEN = process.env.BOT_TOKEN;
const WEBHOOK_URL = process.env.WEBHOOK_URL;


if (!BOT_TOKEN || !WEBHOOK_URL) {
  console.error('Falta BOT_TOKEN o WEBHOOK_URL en .env');
  process.exit(1);
}

const url = `https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${WEBHOOK_URL}/api/webhook`;

fetch(url)
  .then((r) => r.json())
  .then((data) => {
    if (data.ok) {
      console.log(`✅ Webhook configurado: ${WEBHOOK_URL}/api/webhook`);
    } else {
      console.error('❌ Error:', data.description);
    }
  })
  .catch((err) => console.error('❌ Error de red:', err));
