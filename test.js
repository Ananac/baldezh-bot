const https = require('https');


https.get('https://meme-api.herokuapp.com/gimme', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
    var obj = JSON.parse(d);
    console.log(obj.url)
  });

}).on('error', (e) => {
  console.error(e);
});