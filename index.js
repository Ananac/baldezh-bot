const Telegraf = require('telegraf')

const bot = new Telegraf('860469083:AAElj7TvrvxwtOghWazeuucmticDiLDR_38')
bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()