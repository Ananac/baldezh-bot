const https = require('https');
const pluralize = require('numeralize-ru').pluralize;

today = new Date();
const artemIsBack = new Date(2019, 7, 26);
var one_day = 1000 * 60 * 60 * 24;
const days = Math.ceil((artemIsBack.getTime() - today.getTime()) / one_day);
console.log("Артем, вернется в Коноху через " +  days + " " + pluralize(days, 'день', 'дня', 'дней'));
