const cloudscraper = require("cloudscraper");
const cheerio = require("cheerio");

const http = require("http");

// const https = require("https");
// var pag = [];



    const options = {
      method: "GET",
      url: `http://stoboi.ru/gorodaily/horoscope.php?id=1`
    };

    cloudscraper(options).then(html => {
      let $ = cheerio.load(html);
      const quotetext = $("p");      
      console.log(quotetext.text() + "\n\n");
    });

