const cloudscraper = require("cloudscraper");
const cheerio = require("cheerio");
const utf8 = require('utf8');
const http = require("http");

// const https = require("https");
// var pag = [];

// let s = "гороскоп лев"
// var words = s.split(' ');
// let y = words[1];
// console.log(y);
let pdMemes = [];

console.log("пд");
  try {
    const scrape = function(callback) {
      let page = Math.floor(Math.random() * 284);
      const options = {
        method: "GET",
        url: `https://prodota.ru/forum/topic/216714/page/7/`
      };
      cloudscraper(options).then(html => {
        let $ = cheerio.load(html);
        const links = $(".cPost_contentWrap p");
        let pos = 0;
        $(links).each(function() {
          const pdMemeUrl = $(this)
            .find("img")
            .attr("data-src");
          if (
            (pdMemeUrl !== "") &&
            (pdMemeUrl !== undefined) &&
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
      pdMemes.length = 0;
    };
  } catch (e) {
    console.error(e);
  }
