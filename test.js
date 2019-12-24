const cheerio = require("cheerio");
const utf8 = require('utf8');
const http = require("http");

// const https = require("https");
// var pag = [];

// let s = "гороскоп лев"
// var words = s.split(' ');
// let y = words[1];
// console.log(y);

console.log("айти");
  var cloudscraperSsl = require("cloudscraper").defaults({
    agentOptions: {
      ciphers: 'ECDHE-ECDSA-AES128-GCM-SHA256'
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
        console.log(comments[x]);
      }
    };
  } catch (e) {
    console.error(e);
  }
