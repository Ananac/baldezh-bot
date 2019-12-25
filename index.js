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

const genders = [
  "",
  "Agender - бесполый",
  "Androgyne - андроген, гермафродит (мужчиноженщина)",
  "Androgynous - мужеженственный (внутренне, по ощущениям)",
  "Bigender - ощущающие себя в разное время то мужчиной, то женщиной",
  "Cis - латинск. «пред-», т.е. «недо-» (без негативной коннотации)",
  "Cis Female - предженский, недоженский",
  "Cis Male - предмужской, недомужской",
  "Cis Man - предмужчина, недомужчина",
  "Cis Woman - предженщина, недоженщина",
  "Cisgender - предполовой, недополовой",
  "Cisgender Female - женский предпол, недополовой женский",
  "Cisgender Male - мужской предпол, недополовой мужской",
  "Cisgender Man - предполовой мужчина, недополовой мужчина",
  "Cisgender Woman - предполовая женщина, недополовая женщина",
  "Female to Male - от женского к мужскому",
  "FTM - женщина, хирургически, внешне, принявшая облик мужчины",
  "Gender Fluid - неустойчивый, «текучий»",
  "Gender Nonconforming - отрицающий традиционную классификацию",
  "Gender Questioning - пол, остающийся под вопросом",
  "Gender Variant - пол, допускающий несколько вариантов",
  "Genderqueer - свой особенный, своеобычный",
  "Intersex - межполовой",
  "Male to Female - от мужчины к женщине",
  "MTF - мужчина, хирургически, внешне, принявший облик женщины",
  "Neither - ни тот, ни другой (из двух традиционных)",
  "Neutrois - стремящиеся устранить половые признаки во внешнем виде",
  "Non-binary - отрицающий систему двух полов",
  "Other - другое",
  "Pangender - всеобщеполовой",
  "Trans Female - переходной к женскому половому состоянию",
  "Trans Male - переходной к мужскому половому состоянию",
  "Trans Man - переходной к мужчине",
  "Trans Person - переходной к лицу, вне половой классификации",
  "Trans Woman - переходной к женщине",
  "Transexual - транссексуальный",
  "Transexual Female - женский транссексуальный",
  "Transexual Male - мужской транссексуальный",
  "Transexual Man - мужчина транссексуал",
  "Transexual Person - лицо траннсексуал",
  "Transexual Woman - женщина транссексуал",
  "Transgender Female",
  "Transgender Male",
  "Transgender Man",
  "Transgender Person",
  "Transgender Woman",
  "Transmasculine - «за пределами мужского» (фантазии на тему мужского пола)",
  "Two-spirit - две души, «двудушный» (без негативной коннотации)",
  "Man",
  "Woman",
  "Ты пидор"
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
 * Genders
 */
bot.hears(/какой я гендер/gi, ctx => {
  console.log("какой я гендер");
  try {
    const genderNum = Math.floor(Math.random() * genders.length);
    ctx.reply(genders[genderNum]);
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
    ctx.editMessageText();
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
      .get("https://meme-api.herokuapp.com/gimme/notinteresting", res => {
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
      let page = Math.floor(Math.random() * 320);
      const options = {
        method: "GET",
        url: `https://prodota.ru/forum/topic/216714/page/${page}/`
      };
      cloudscraper(options).then(html => {
        let $ = cheerio.load(html);
        const links = $(".ipsType_normal p");
        let pos = 0;
        $(links).each(function() {
          const pdMemeUrl = $(this)
            .find("img")
            .attr("data-src");
          if (
            pdMemeUrl !== "" &&
            pdMemeUrl !== undefined &&
            !pdMemeUrl.match(/prodota/gi)
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
 * Gyroscooter
 */
bot.hears(/гироскоп/i, ctx => {
  try {
    let words = ctx.update.message.text.split(" ");
    let zodiacSign = words[1];
    let zodiacUrl;
    switch (zodiacSign) {
      case "овен":
        zodiacUrl = "aries";
        break;
      case "телець":
      case "телец":
        zodiacUrl = "taurus";
        break;
      case "близнюки":
      case "близнята":
      case "близнецы":
        zodiacUrl = "gemini";
        break;
      case "рак":
        zodiacUrl = "cancer";
        break;
      case "лев":
        zodiacUrl = "leo";
        break;
      case "дiва":
      case "дева":
        zodiacUrl = "virgo";
        break;
      case "терези":
      case "весы":
        zodiacUrl = "libra";
        break;
      case "скорпiон":
      case "скорпион":
        zodiacUrl = "scorpio";
        break;
      case "стрілець":
      case "стрелец":
        zodiacUrl = "sagittarius";
        break;
      case "козоріг":
      case "козерог":
        zodiacUrl = "capricorn";
        break;
      case "водолiй":
      case "водолей":
        zodiacUrl = "aquarius";
        break;
      case "риби":
      case "рыбы":
        zodiacUrl = "pisces";
        break;
      default:
        ctx.replyWithSticker("CAADAgADUgADq1fEC5C5TuFnWpzfFgQ");
        return;
    }

    const options = {
      method: "GET",
      url: `http://horo.tochka.net/ua/horoscopes/${zodiacUrl}`
    };

    cloudscraper(options).then(html => {
      let $ = cheerio.load(html);
      const quoteText = $("#Article p");
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
          if (comment !== undefined && comment !== "") {
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
      if (comments[x] === undefined || comments[x] === "") {
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
 * Say goodbye
 */
bot.hears(/до свидания/gi, ctx => ctx.reply("Покеда"));

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
 * Marginal
 */
bot.hears(/маргинал/gi, ctx =>
  ctx.replyWithPhoto({ source: `${__dirname}/img/marginal.jpg` })
);

/**
 * Sorry
 */
bot.hears("Извините", ctx => ctx.reply("Извинил"));

bot.launch();
