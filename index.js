import TelegramBot from 'node-telegram-bot-api';

// Устанавливаем токен, который выдавал нам бот.
var token = '860469083:AAElj7TvrvxwtOghWazeuucmticDiLDR_38';
// Включить опрос сервера
var bot = new TelegramBot(token, {polling: true});

// Написать мне ... (/echo Hello World! - пришлет сообщение с этим приветствием.)
bot.onText(/\/echo (.+)/, function (msg, match) {
    var fromId = msg.from.id;
    var resp = match[1];
    bot.sendMessage(fromId, resp);
});

// Простая команда без параметров.
bot.on('message', function (msg) {
    var chatId = msg.chat.id;
    // Фотография может быть: путь к файлу, поток(stream) или параметр file_id
    var photo = 'bot.jpg';
    bot.sendPhoto(chatId, photo, {caption: 'Милые котята'});
});