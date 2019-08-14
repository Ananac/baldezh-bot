const Telegraf = require("telegraf");
const https = require("https");
const http = require("http");
const pluralize = require("numeralize-ru").pluralize;

var characters = [
  "Наруто Удзумаки",
  "Саске Учиха",
  "Сакура Харуно",
  "Какаши Хатаке",
  "Орочимару",
  "Кабуто Якуши",
  "Асума Сарутоби",
  "Гаара",
  "Джирайя",
  "Забуза Момочи",
  "Ино Яманака",
  "Ирука Умино",
  "Итачи Учиха",
  "Канкуро",
  "Киба Инузука",
  "Майто Гай",
  "Неджи Хьюга",
  "Рок Ли",
  "Темари",
  "Хаку",
  "Хината Хьюга",
  "Хирузен Сарутоби",
  "Цунаде",
  "Чоуджи Акимичи",
  "Шикамару Нара",
  "Шино Абураме",
  "Ты Пидор"
];

const bot = new Telegraf("860469083:AAElj7TvrvxwtOghWazeuucmticDiLDR_38");
bot.start(ctx => ctx.reply("Дарова!"));
bot.help(ctx =>
  ctx.reply(
    '"Кто я из Наруто" - кто ты из Наруто\n"Дайте мем" - мем из /dankmemes'
  )
);
bot.hears(/кто я из наруто/gi, ctx => {
  try {
    const characterNum = Math.floor(Math.random() * characters.length);
    ctx.replyWithPhoto(
      { source: `${__dirname}/img/${characterNum}.jpg` },
      { caption: characters[characterNum] }
    );
  } catch (e) {
    console.error(e);
    ctx.reply("Что-то сломалось");
  }
});
bot.hears(/артем/gi, ctx => {
  try {
    today = new Date();
    const artemIsBack = new Date(2019, 7, 26);
    const one_day = 1000 * 60 * 60 * 24;
    const days = Math.ceil((artemIsBack.getTime() - today.getTime()) / one_day);
    ctx.reply(
      "Артем, вернется в Коноху через " +
        days + " " +
        pluralize(days, "день", "дня", "дней")
    );
  } catch (e) {
    console.error(e);
    ctx.reply("Что-то сломалось");
  }
});
bot.hears(/дайте мем/gi, ctx => {
  try {
    https
      .get("https://meme-api.herokuapp.com/gimme/dankmemes", res => {
        console.log("statusCode:", res.statusCode);
        console.log("headers:", res.headers);

        res.on("data", d => {
          process.stdout.write(d);
          var obj = JSON.parse(d);
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
bot.hears(/покеда/gi, ctx => ctx.reply("До свидания"));
bot.command('ud', ({ reply }) => {
  try {
    http
    .get(`http://api.urbandictionary.com/v0/define?term=322`, res => {
      console.log("statusCode:", res.statusCode);
      console.log("headers:", res.headers);
    
      res.on("data", function(chunk) {
        console.log("BODY: " + chunk);
        reply(chunk);
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
