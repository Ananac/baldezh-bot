const Telegraf = require("telegraf");
const https = require("https");
const cheerio = require("cheerio");
const pluralize = require("numeralize-ru").pluralize;
const cloudscraper = require("cloudscraper")
const comments = [];

const characters = [
  "",
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
  "Ты Пидор",
  "Наруто Удзумаки"
];

const bot = new Telegraf("860469083:AAElj7TvrvxwtOghWazeuucmticDiLDR_38");
bot.use((ctx, next) => {
  const start = new Date();
  return next(ctx).then(() => {
    const ms = new Date() - start;
    console.log("Response time %sms", ms);
  });
});
bot.start(ctx => ctx.reply("Дарова!"));
bot.help(ctx =>
  ctx.reply(
    '"Кто я из Наруто" - кто ты из Наруто\n"Дайте мем" - мем из /r/dankmemes\n"Айти" - рандомный коммент с ebanoe.it'
  )
);

/**
 * Who are you from Naruto
 */
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

/**
 * Artem's vacation ends in..
 */
bot.hears(/артом/gi, ctx => {
  try {
    today = new Date();
    const artemIsBack = new Date(2019, 7, 26);
    const one_day = 1000 * 60 * 60 * 24;
    const days = Math.ceil((artemIsBack.getTime() - today.getTime()) / one_day);
    ctx.reply(
      "Артем вернется в Коноху через " +
        days +
        " " +
        pluralize(days, "день", "дня", "дней")
    );
  } catch (e) {
    console.error(e);
    ctx.reply("Что-то сломалось");
  }
});

/**
 * Random meme from r/dankmemes/
 */
bot.hears(/дайте мем/gi, ctx => {
  try {
    https
      .get("https://meme-api.herokuapp.com/gimme/dankmemes", res => {
        console.log("statusCode:", res.statusCode);
        console.log("headers:", res.headers);

        res.on("data", d => {
          process.stdout.write(d);
          const obj = JSON.parse(d);
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

/**
 * Random comment from ebanoe.it
 */
bot.hears(/айти/i, ctx => {
  try {
    const options = {
      method: "GET",
      url: "https://ebanoe.it/2019/07/31/flexdev-trick/"
    };

    const scrape = function(callback) {
      cloudscraper(options).then(html => {
        let $ = cheerio.load(html);
        const links = $(".comment-body");
        $(links).each(function(i, link) {
          const comment = $(this)
            .contents()
            .text();
          if ((comment !== undefined) & (comment !== "")) {
            comments[i] = comment;
          }
        });
        if (callback) callback();
      });
    };

    scrape(function() {
      randomComment();
    });

    const randomComment = function() {
      const x = Math.floor(Math.random() * comments.length);
      if ((comments[x] === undefined) | (comments[x] === "")) {
        console.log("Empty comment, randomming new...");
        randomComment();
      } else {
        ctx.reply(comments[x]);
      }
    };
  } catch (e) {
    console.error(e);
    ctx.reply("Что-то сломалось");
  }
});

/**
 * Say goodbye
 */
bot.hears(/покеда/gi, ctx => ctx.reply("До свидания"));

/**
 * Quakoosha
 */
bot.hears(/Quakoosha/gi, ctx =>
  ctx.replyWithSticker("CAADBAADQAADL9_4CQr9fwscIkInFgQ")
);

/**
 * Kavo
 */
bot.hears("каво", ctx =>
  ctx.replyWithPhoto({ source: `${__dirname}/img/kavo.jpg` })
);

/**
 * Random meme from prodota
 */
bot.hears(/пд/i, ctx => {
  try {
    const options = {
      method: "GET",
      url: "https://prodota.ru/forum/index.php?showtopic=207546&page=60"
    };

    const scrape = function(callback) {
      cloudscraper(options).then(html => {
        let $ = cheerio.load(html);
        const links = $('span');

        $(links).each(function(i, link) {
          var sop = $(this)
            .find(".bbc_img")
            .attr("src");
          if ((sop !== "") & (sop !== undefined) & (sop !== /prodota/gi)) {
            pag[i] = sop;
            console.log(sop);
          }
        });
        if (callback) callback();
      });
    };

    scrape(function() {
      randomComment();
    });

    const randomComment = function() {
      const x = Math.floor(Math.random() * pag.length);
      console.log("x = " + x);
      if ((pag[x] === undefined) | (pag[x] === "") | (pag[x] === /prodota/gi)) {
        console.log("Empty comment");
        randomComment();
      } else {
        ctx.replyWithPhoto({ source: pag[x] });
      }
    };
  } catch (e) {
    console.error(e);

    ctx.reply("Что-то сломалось");
  }
});

bot.launch();
