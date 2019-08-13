const https = require('https');

console.log(getUrl())

async function getUrl() {
    try {
      const {statusCode, headers, data} = await https.get('https://meme-api.herokuapp.com/gimme');
      console.log('statusCode:', statusCode);
      console.log('headers:', headers);
      const obj = data ? JSON.parse(data) : null;
      console.log(obj);
      return obj;
    } catch(e) {
      console.error(e);
    }
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  async function demo() {
    console.log('Taking a break...');
    await sleep(2000);
    console.log('Two seconds later, showing sleep in a loop...');
  
    // Sleep in loop
    for (let i = 0; i < 5; i++) {
      if (i === 3)
        await sleep(2000);
      console.log(i);
    }
  }
  
  demo();
