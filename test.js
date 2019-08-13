const https = require('https');


https.get('https://meme-api.herokuapp.com/gimme', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
    const obj = JSON.parse(d);
    console.log(d.url)
  });

}).on('error', (e) => {
  console.error(e);
});
