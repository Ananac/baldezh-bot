const cheerio = require("cheerio");
const utf8 = require('utf8');
const https = require("https");
const cloudscraper = require("cloudscraper");

// const https = require("https");
// var pag = [];

// let s = "гороскоп лев"
// var words = s.split(' ');
// let y = words[1];
// console.log(y);


https
.get("https://coronavirus.zone/data.json?1580369390169", res => {
  res.on("data", d => {
    process.stdout.write(d);
    const obj = JSON.parse(d);

    let totalCases = 0;
    let totalDeaths = 0;
    let data;

    for(let num in obj) {
      data = data + ("🤒 " + obj[num].cases);
      if ( parseInt(obj[num].death) != 0) {
        data = data + (" ☠" + obj[num].death);
      }
      data = data + (" " + obj[num].region + "\n");
      totalCases = totalCases + parseInt(obj[num].cases);
      totalDeaths = totalDeaths + parseInt(obj[num].death);
   }
   data = data + ("\n" + "🤒 " + totalCases + " ☠" + totalDeaths + " Total");
   console.log(data);

    // console.log({ url: memeUrl }, { caption: memeTitle });
  });
})
.on("error", e => {
  console.error(e);
});
