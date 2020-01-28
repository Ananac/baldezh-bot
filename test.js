const cheerio = require("cheerio");
const utf8 = require('utf8');
const http = require("http");
const cloudscraper = require("cloudscraper");

// const https = require("https");
// var pag = [];

// let s = "гороскоп лев"
// var words = s.split(' ');
// let y = words[1];
// console.log(y);

const options = {
  method: "GET",
  url: `https://bnonews.com/index.php/2020/01/the-latest-coronavirus-cases/`
};

cloudscraper(options).then(html => {
  let $ = cheerio.load(html);
  const data = $("#mvp-content-main > p:nth-child(2) > strong").contents().text();
  console.log(data);
});