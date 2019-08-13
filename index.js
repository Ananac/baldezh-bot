const Telegraf = require("telegraf");
const https = require("https");

var characters = [
  "Наруто Удзумаки",
  "Саскэ Утиха",
  "Сакура Харуно"
];

const bot = new Telegraf("860469083:AAElj7TvrvxwtOghWazeuucmticDiLDR_38");
bot.start(ctx => ctx.reply("Дарова!"));
bot.help(ctx =>
  ctx.reply(
    '"Кто я из Наруто" - кто ты из Наруто\n"Дайте мем" - мем из /dankmemes'
  )
);
// bot.on('sticker', (ctx) => ctx.reply('👍'))

bot.hears(/кто я из наруто/gi, ctx => {
  try {
    const characterNum = Math.floor(Math.random() * characters.length);
    ctx.replyWithPhoto({ source: `${__dirname}/img/${characterNum}.jpg` }, { caption: characters[characterNum] });
  } catch (e) {
    console.error(e);
    ctx.reply("Что-то сломалось");
  }
});

bot.hears(/артем/gi, ctx => ctx.reply("Артем, вернись в Коноху!"));
bot.hears(/максим/gi, ctx => ctx.reply("Максим, вернись в Коноху!"));
bot.hears(/дайте мем/gi, ctx => {
  try {
    https
      .get("https://meme-api.herokuapp.com/gimme/dankmemes", res => {
        console.log("statusCode:", res.statusCode);
        console.log("headers:", res.headers);

        res.on("data", d => {
          process.stdout.write(d);
          var obj = JSON.parse(d);
          console.log(obj.url);
          const memeUrl = obj.url;
          const memeTitle = obj.title;
          ctx.replyWithPhoto({ url: memeUrl }, { caption: memeTitle });
        });
      })
      .on("error", e => {
        console.error(e);
      });
  } catch (e) {
    console.error(e);
    ctx.reply("Что-то сломалось");
  }
});
bot.launch();
