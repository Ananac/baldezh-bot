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
  const mainlandChinaCases = $("#mvp-content-main > table.wp-block-table.aligncenter.is-style-stripes > tbody > tr:nth-child(32) > td:nth-child(2) > strong").contents().text().replace(',', '');
  const mainlandChinaDeaths = $("#mvp-content-main > table.wp-block-table.aligncenter.is-style-stripes > tbody > tr:nth-child(32) > td:nth-child(3) > strong").contents().text();
  const chinaRegionsCases = $("#mvp-content-main > table:nth-child(7) > tbody > tr:nth-child(5) > td:nth-child(2) > strong").contents().text();
  const chinaRegionsDeaths = $("#mvp-content-main > table:nth-child(7) > tbody > tr:nth-child(5) > td:nth-child(3) > strong").contents().text();
  const internationalCases = $("#mvp-content-main > table:nth-child(9) > tbody > tr:nth-child(16) > td:nth-child(2) > strong").contents().text();
  const internationalDeaths = $("#mvp-content-main > table:nth-child(9) > tbody > tr:nth-child(16) > td:nth-child(3) > strong").contents().text();

  console.log(data + 
    "\n\n" + 
    "China" + 
    "\n" + 
    "Cases:" + (parseInt(mainlandChinaCases) + parseInt(chinaRegionsCases)) +
    "\n" + 
    "Deaths:" + (parseInt(mainlandChinaDeaths) + parseInt(chinaRegionsDeaths)) +
    "\n\n" +
    "International" +
    "\n" + 
    "Cases:" + internationalCases +
    "\n" + 
    "Deaths:" + internationalDeaths);
});