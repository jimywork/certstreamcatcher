
const catcherstream = require('../index');
const certstream = require("certstream");


const regex = /(outlook|office365|microsoft|windows|protonmail|tutanota|hotmail|gmail|google|outlook|yahoo|google|yandex|twitter|facebook|tumblr|reddit|youtube|linkedin|instagram|flickr|whatsapp|localbitcoin|poloniex|coinhive|bithumb|kraken|bitstamp|bittrex|blockchain|bitflyer|coinbase|hitbtc|lakebtc|bitfinex|bitconnect|coinsbank|paypal|moneygram|westernunion|bankofamerica|wellsfargo|citigroup|santander|morganstanley|barclays|hsbc|scottrade|ameritrade|merilledge|bank|amazon|overstock|alibaba|aliexpress|leboncoin|netflix|skype|github|cgi-bin)/gi;
const tlds = ['.io','.gq','.ml','.cf','.tk','.xyz','.pw','.cc','.club','.work','.top','.support','.bank','.info','.study','.party','.click','.country','.stream','.gdn','.mom','.xin','.kim','.men', '.loan', '.download', '.racing', '.online', '.center', '.ren', '.gb', '.win', '.review', '.vip', '.party', '.tech', '.science', '.business', '.com', '.000webhostapp.com', '.heroku.com', '.wix.com', '.audio','.br','.fun', '.tv', '.rest', '.protection', '.marketing', '.ltda'];

var client = new certstream(function(certstream) {  
	catcherstream.certstreamClientPhishing(certstream, regex, tlds, {tlds: true});
});

client.connect();