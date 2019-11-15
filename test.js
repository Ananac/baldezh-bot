const cloudscraper = require("cloudscraper");
const cheerio = require("cheerio");
const utf8 = require('utf8');
const http = require("http");

// const https = require("https");
// var pag = [];

let s = "гороскоп лев"
var words = s.split(' ');
let y = words[1];
console.log(y);

    const options = {
      method: "GET",
      url: `http://stoboi.ru/gorodaily/horoscope.php?id=1`
    };

    cloudscraper(options).then(html => {
      let $ = cheerio.load(html);
      const quoteText = $("p");      
      console.log((quoteText.text()));
    });

