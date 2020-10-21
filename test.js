// const cheerio = require("cheerio");
// const utf8 = require('utf8');
// const https = require("https");
// const cloudscraper = require("cloudscraper");

// const https = require("https");
// var pag = [];

// let s = "гороскоп лев"
// var words = s.split(' ');
// let y = words[1];
// console.log(y);



//     try {
//       https
//         .get("https://query1.finance.yahoo.com/v8/finance/chart/RUB=X?region=US&lang=en-US&includePrePost=false&interval=2m&range=1d&corsDomain=finance.yahoo.com&.tsrc=finance", res => {
//         //   console.log("statusCode:", res.statusCode);
//         //   console.log("headers:", res.headers);
  
//           res.on("data", d => {
//             process.stdout.write(d);
//             const obj = JSON.parse(d);
//             const memeUrl = obj.regularMarketPrice;
//             const memeTitle = obj.regularMarketPrice;
//             // console.log(memeTitle);
//           });
//         })
//         .on("error", e => {
//           console.error(e);
//         });
//     } catch (e) {
//       console.error(e);
//     }



// // const options = {
// //   method: "GET",
// //   url: `http://www.profinance.ru/`
// // };

// // cloudscraper(options).then(html => {
// //   let $ = cheerio.load(html);
// //   const usd = $("body > table:nth-child(2) > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td:nth-child(6) > table:nth-child(8) > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(2) > td:nth-child(2)");
// //   const euro = $("body > table:nth-child(2) > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td:nth-child(6) > table:nth-child(8) > tbody > tr:nth-child(3) > td > table > tbody > tr:nth-child(3) > td:nth-child(2)");

// //   console.log("USD " + usd.text() +"\nEuro " + euro.text());
// // });



// // const timeStamp = Math.round(new Date().getTime()/1000.0);
// // https
// // .get(`https://coronavirus.zone/data.json?${timeStamp}`, res => {
// //   res.on("data", d => {
// //     process.stdout.write(d);
// //     const obj = JSON.parse(d);

// //     let totalCases = 0;
// //     let totalDeaths = 0;
// //     let data;

// //     for(let num in obj) {
// //       data += ("🤒 " + obj[num].cases);
// //       if ( parseInt(obj[num].death) != 0) {
// //         data += (" ☠" + obj[num].death);
// //       }
// //       data += (" " + obj[num].region + "\n");
// //       totalCases += parseInt(obj[num].cases);
// //       totalDeaths += parseInt(obj[num].death);
// //    }
// //    data += ("\n" + "🤒 " + totalCases + " ☠" + totalDeaths + " Total");
// //    console.log(data);


// //    const timer = ms => new Promise( res => setTimeout(res, ms));
// //    timer(3000).then(_=>console.log("aga"));
// //     // console.log({ url: memeUrl }, { caption: memeTitle });


// //   });
// // })
// // .on("error", e => {
// //   console.error(e);
// // });
