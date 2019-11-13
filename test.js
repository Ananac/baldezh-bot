// const cloudscraper = require("cloudscraper");
// const cheerio = require("cheerio");

const http = require("http");

// const https = require("https");
// var pag = [];

http.get("http://rzhunemogu.ru/RandJSON.aspx?CType=11", res => {
  console.log("statusCode:", res.statusCode);
  console.log("headers:", res.headers);

  res.on("data", d => {
    process.stdout.write(d);
    const obj = JSON.parse(d);
    const memeUrl = obj.content;
    console.log(memeUrl);
  });
});
