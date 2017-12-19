# Certstreamcatcher
Catching phishing by observing certificate transparency logs.


[![asciicast](https://pbs.twimg.com/media/DQ4lO1XXkAEFAfU.jpg:large)](https://twitter.com/6IX7ine/status/943229448614182912)

### npm package

To install certstreamcatcher using `npm` run:

    npm install --save certstreamcatcher
    
### Try on npm runkit

[https://npm.runkit.com/certstreamcatcher](https://npm.runkit.com/certstreamcatcher)
    
### Usage

```
const certstreamcatcher = require('certstreamcatcher'); 
const certstream = require("certstream");

const regex = /(wellsfargo|paypal|login|sign-in|secure|update|money|sslsecure||amazon|)/gi; # Keywords

const tlds = ['.io','.gq','.ml','.cf','.tk','.xyz','.pw','.cc']; # tlds 

var client = new certstream(function(certstream) {  
	certstreamcatcher.certstreamClientPhishing(certstream, regex, tlds, {tlds: true});
});

client.connect();
```

## Donations
* XMR: `49m12JEEC6HPCHkLMX5QL4SrDQdKwh6eb4Muu8Z9CwA9MwemhzFQ3VcgHwyuR73rC22WCymTUyep7DVrfN3GPt5JBCekPrR`
