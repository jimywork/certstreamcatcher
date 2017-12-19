
const catcherstream = require('../index');
const certstream = require("certstream");

const regex = /(login|paypal|wallet|bittrex|blockchain|apple|netflix|accounts|verification|paypol|payypal|authentication|authorize|purchase|recover|confirm)/gi;
const tlds = ['.io','.gq','.ml','.cf','.tk','.xyz','.pw','.cc','.club','.work','.top','.support','.bank','.info','.study','.party','.click','.country','.stream','.gdn','.mom','.xin','.kim','.men', '.loan', '.download', '.racing', '.online', '.center', '.ren', '.gb', '.win', '.review', '.vip', '.party', '.tech', '.science', '.business', '.com', '.000webhostapp.com', '.heroku.com', '.wix.com', '.audio','.br','.fun', '.tv', '.rest', '.protection', '.marketing', '.ltda'];

var client = new certstream(function(certstream) {  
	catcherstream.certstreamClientPhishing(certstream, regex, tlds, {tlds: true});
});

client.connect();
