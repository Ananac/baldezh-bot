const cloudscraper = require("cloudscraper");
const cheerio = require("cheerio");

const http = require("http");

// const https = require("https");
// var pag = [];



    const options = {
      method: "GET",
      url: `https://api.forismatic.com/api/1.0/?method=getQuote&key=457653&format=xml&lang=ru`
    };

    cloudscraper(options).then(html => {
      let $ = cheerio.load(html);
      const quotetext = $("quotetext");      
      const quoteauthor = $("quoteauthor");
      console.log(quotetext.text());
      console.log(quoteauthor.text());
    });

