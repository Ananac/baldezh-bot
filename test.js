const cloudscraper = require("cloudscraper");
const cheerio = require("cheerio");
var pag = [];

const page = Math.floor(Math.random() * 502);
const options = {
  method: "GET",
  url: `https://prodota.ru/forum/index.php?showtopic=215780&page=${page}`
};

  cloudscraper(options).then(html => {
    let $ = cheerio.load(html);
    const links = $('.post.entry-content span');

    $(links).each(function(i, link) {
      var sop = $(this).find(".bbc_img").attr('src');   
      if ((sop !== "") & (sop !== undefined) & (sop !== /prodota/gi)) {
        pag[i] = sop;
        console.log(sop);
      }
    });})

    console.log("voooot" + pag[4]);

// scrape(function() {
//   randomComment();
// });

// const randomComment = function() {
//   const x = Math.floor(Math.random() * pag.length);
//   console.log("x = " + x);
//   if ((pag[x] === undefined) | (pag[x] === "") | (pag[x] === /prodota/gi)) {
//     console.log("Empty comment");
//     randomComment();
//   } else {
//     console.log(pag[x]);
//   }
// };
