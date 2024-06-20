require('dotenv').config();
const { Bot } = require("grammy");
const mysql = require('mysql2/promise');

const bot = new Bot(process.env.TELEGRAM_TOKEN);

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

const cron = setInterval(async () => {
  bot.start();
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute(`
      SELECT * FROM items
      WHERE exp BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 3 MONTH)
    `);

    if (rows.length > 0) {
      for (const item of rows) {
        const message = `你的小物 "${item.name}" 在 ${item.exp} 將要到期~~ 趕快做使用吧！`;
        try {
          await bot.api.sendMessage(process.env.TELEGRAM_CHAT_ID, message);
        } catch (telegramError) {
          console.error('Error sending Telegram message for item:', item, telegramError);
        }
      }
    }

  } catch (dbError) {
    console.error('Error querying database:', dbError);
  } finally {

    if (connection) {
      try {
        await connection.end();
      } catch (closeError) {
        console.error('Error closing the database connection:', closeError);
      }
    }
  }
}, 1000 * 600)
process.on('SIGINT', () => {
  clearInterval(cron)
  process.exit(0)
})
