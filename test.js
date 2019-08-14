const http = require('http');

http
.get(`http://api.urbandictionary.com/v0/define?term=322`, res => {
  console.log("statusCode:", res.statusCode);
  console.log("headers:", res.headers);

  res.on("data", function(chunk) {
    console.log("BODY: " + chunk);
  });
})
.on("error", e => {
  console.error(e);
});
