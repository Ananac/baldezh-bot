const cloudscraper = require("cloudscraper");
const cheerio = require("cheerio");
var pag = [];

const options = {
  method: "GET",
  url: "https://ebanoe.it/2019/08/15/voxel-worlds-review-2/"
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
  // for (var i = 0; i < pag.length; i++) {
  //   console.log(i + ": " + pag[i]);
  // }
  const x = Math.floor(Math.random() * pag.length);
  console.log("x = " + x);
  if ((pag[x] === undefined) | (pag[x] === "")) {
    console.log("Empty comment");
    fi();
  } else {
    console.log(pag[x]);
  }
});

const fi = function() {
  const x = Math.floor(Math.random() * pag.length);
  console.log("x = " + x);
  if ((pag[x] === undefined) | (pag[x] === "")) {
    console.log("Empty comment");
    fi();
  } else {
    console.log(pag[x]);
  }
};
