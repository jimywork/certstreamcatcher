# Certstreamcatcher
Catching phishing by observing [certificate transparency logs](https://www.certificate-transparency.org/known-logs). This tool is based on regex with effective standards for detecting phishing sites in real time using [certstream](https://github.com/CaliDog/certstream-js).


[![Demo](https://github.com/6IX7ine/certstreamcatcher/blob/master/demo.gif?raw=true)](https://twitter.com/6IX7ine)


### Installation

```
$ cd /opt/
$ git clone https://github.com/6IX7ine/certstreamcatcher.git
$ cd certstreamcatcher
$ npm install
```

### npm package

To install certstreamcatcher using `npm` run:

  	npm install --save certstreamcatcher
       
### Try on npm runkit

This is a playground to test certstreamcatcher

[https://npm.runkit.com/certstreamcatcher](https://npm.runkit.com/certstreamcatcher)
    
### Usage
The certstreamcatcher is extremely simple, all you have to do is to import the library **certstreamcatcher** and certstream register the callback and call **certstreamClientPhishing** and pass the callback parameter to certstreamClientPhishing.

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
To execute the program save the above code and execute with the command:
```
$ node certstreamcatcher.js
```

### Phishing 

[![Phishing](https://pbs.twimg.com/media/DQxrV45UIAEG__2.jpg)](https://twitter.com/6IX7ine/status/943229448614182912)
<hr>

[![Phishing](https://pbs.twimg.com/media/DQm6oTgXcAEQIq_.jpg)](https://twitter.com/6IX7ine/status/943229448614182912)



## Donations
* XMR: `49m12JEEC6HPCHkLMX5QL4SrDQdKwh6eb4Muu8Z9CwA9MwemhzFQ3VcgHwyuR73rC22WCymTUyep7DVrfN3GPt5JBCekPrR`
