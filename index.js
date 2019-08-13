const Telegraf = require("telegraf");
const https = require("https");

var characters = [
  "Наруто Удзумаки",
  "Саскэ Утиха",
  "Сакура Харуно",
  "Какаси Хатакэ",
  "Сино Абурамэ",
  "Тёдзи Акимити",
  "Ао",
  "Даруи",
  "Дзирайя",
  "Киба Инудзука",
  "Акамару",
  "Канкуро",
  "Киллер Би",
  "Майто Гай",
  "Анко Митараси",
  "Ибики Морино",
  "Ты Пидор",
  "Мифунэ",
  "Сикамару Нара",
  "Рикудо-сэннин",
  "Рин Нохара",
  "Рок Ли",
  "Сай",
  "Асума Сарутоби",
  "Конохамару Сарутоби",
  "Си",
  "Сидзунэ",
  "Тёдзюро",
  "Тиё",
  "Тэмари",
  "Тэн-Тэн",
  "Кусина Удзумаки",
  "Ирука Умино"
];

const bot = new Telegraf("860469083:AAElj7TvrvxwtOghWazeuucmticDiLDR_38");
bot.start(ctx => ctx.reply("Дарова!"));
bot.help(ctx => ctx.reply('Спроси "Кто я из Наруто"'));
// bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears(/кто я из наруто/gi, ctx =>
  ctx.reply(characters[Math.floor(Math.random() * characters.length)])
);
bot.hears(/артем/gi, ctx => ctx.reply("Артем, вернись в Коноху!"));
bot.hears(/максим/gi, ctx => ctx.reply("Максим, вернись в Коноху!"));
bot.command(/дайте мем/gi, ctx =>
  ctx.replyWithPhoto({ url: getUrl })
);
bot.launch();

function getUrl() {
  https
    .get("https://meme-api.herokuapp.com/gimme", res => {
      console.log("statusCode:", res.statusCode);
      console.log("headers:", res.headers);

      res.on("data", d => {
        process.stdout.write(d);
        var obj = JSON.parse(d);
        console.log(obj.url);
      });
    })
    .on("error", e => {
      console.error(e);
    });
}
