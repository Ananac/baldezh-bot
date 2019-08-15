const cloudscraper = require("cloudscraper");
const cheerio = require("cheerio");
var pag = [];

const options = {
  method: "GET",
  url: "https://ebanoe.it/2019/08/10/model-dev/"
};

var scrape = function(callback) {
  cloudscraper(options).then(html => {
    let $ = cheerio.load(html);
    const links = $(".comment-body p");

    $(links).each(function(i, link) {
      var sop = $(this)
        .contents()
        .text();
      if ((sop !== "") & (sop !== undefined)) {
        pag[i] = sop;
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
  if ((pag[x] === undefined) | (pag[x] === "")) {
    console.log("Empty comment");
    randomComment();
  } else {
    console.log(pag[x]);
  }
};
