const Telegraf = require("telegraf");

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
// bot.help((ctx) => ctx.reply('Ну, давай-давай, пришли стикер'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears(/кто я из наруто/gi, ctx =>
  ctx.reply(characters[Math.floor(Math.random() * characters.length)])
);
bot.launch();