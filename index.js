const Telegraf = require("telegraf");
const https = require("https");
const cheerio = require("cheerio");
const pluralize = require("numeralize-ru").pluralize;
const cloudscraper = require("cloudscraper");

let comments = [];
let pdMemes = [];

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
    '"Кто я из Наруто" - кто ты из Наруто\n' +
      '"Дайте мем" - мем из /r/dankmemes\n' +
      '"Айти" - рандомный коммент с ebanoe.it\n' +
      '"пд" - рандомная картинка из треда со смешными картинками prodota.ru\n' +
      '"Quakoosha" - Quakoosha\n' +
      '"каво" - каво\n' +
      '"Стетхем" - цитаты от Стетхема\n'
  )
);

/**
 * Who are you from Naruto
 */
bot.hears(/кто я из наруто/gi, ctx => {
  console.log("кто я из наруто");
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
  console.log("артом");
  try {
    today = new Date();
    const artemIsBack = new Date(2019, 9, 20);
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
  console.log("дайте мем");
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
 * Random meme from prodota
 */
bot.hears(/пд/i, ctx => {
  console.log("пд");
  try {
    const scrape = function(callback) {
      let page = Math.floor(Math.random() * 204);
      const options = {
        method: "GET",
        url: `https://prodota.ru/forum/index.php?showtopic=216714&page=${page}`
      };
      cloudscraper(options).then(html => {
        let $ = cheerio.load(html);
        const links = $(".post.entry-content span");
        let pos = 0;
        $(links).each(function() {
          const pdMemeUrl = $(this)
            .find(".bbc_img")
            .attr("src");
          if (
            (pdMemeUrl !== "") &
            (pdMemeUrl !== undefined) &
            (pdMemeUrl !== /prodota/gi)
          ) {
            pdMemes[pos] = pdMemeUrl;
            console.log(pos + ": " + pdMemeUrl);
            pos++;
          }
        });
        if (callback) callback();
      });
    };

    scrape(function() {
      randomComment();
    });

    const randomComment = function() {
      const x = Math.floor(Math.random() * pdMemes.length);
      console.log("x = " + x);
      ctx.replyWithPhoto({ url: pdMemes[x] });
      pdMemes.length = 0;
    };
  } catch (e) {
    console.error(e);
    ctx.reply("Что-то сломалось");
  }
});

/**
 * Smart quote
 */
bot.hears(/стетхем/gi, ctx => {
  try {
    const options = {
      method: "GET",
      url: `https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=xml&lang=ru`
    };

    cloudscraper(options).then(html => {
      let $ = cheerio.load(html);
      const quoteText = $("quotetext");
      const quoteAuthor = $("quoteauthor");
      ctx.reply(quoteText.text() + "\n\n" + quoteAuthor.text());
    });
  } catch (e) {
    console.error(e);
    ctx.reply("Что-то сломалось");
  }
});


/**
 * Smart quote
 */
bot.hears(/гороскоп/gi, ctx => {
  try {
    const options = {
      method: "GET",
      url: `http://stoboi.ru/gorodaily/horoscope.php?id=1`
    };

    cloudscraper(options).then(html => {
      let $ = cheerio.load(html);
      const quoteText = $("p"); 
      ctx.reply(quoteText.text());
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
  console.log("айти");
  const cloudscraperSsl = require("cloudscraper").defaults({
    agentOptions: {
      ciphers: "ECDHE-ECDSA-AES128-GCM-SHA256"
    }
  });
  try {
    const options = {
      method: "GET",
      url: "https://ebanoe.it/2019/10/06/nerds-essense/"
    };

    const scrape = function(callback) {
      cloudscraperSsl(options).then(html => {
        let $ = cheerio.load(html);
        const links = $(".comment-body p");
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
 * Sorry
 */
bot.hears("Извините", ctx => ctx.reply("Извинил"));

bot.launch();
