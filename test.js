const cloudscraper = require("cloudscraper");
const cheerio = require("cheerio");

const options = {
  method: "GET",
  url: "https://ebanoe.it/2019/08/15/voxel-worlds-review-2/"
};

cloudscraper(options).then(html => {
  let $ = cheerio.load(html);
  console.log(
    $("#div-comment-299239")
      .contents()
      .eq(2)
      .text()
  );
});
