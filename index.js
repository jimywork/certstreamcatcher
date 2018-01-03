/**
 * Github
 * https://github.com/6IX7ine/certstreamcatcher
 * 
 * Copyright (c) 2017 Fábio Castro
 * Licensed under the MIT license.
 */


 'use strict'

 const tld = require('tldjs');
 const lodash = require('lodash');
 const color = require('cli-color');
 const status = require('node-status');
 const punycode = require('punycode');

 const yellowBright = color.yellowBright.underline;
 const yellow = color.yellow.underline;
 const danger = color.redBright.underline;
 const white = color.white.underline;
 const light = color.white.underline;

 let certificates = status.addItem('certificates');

 const maps = {

 	"Ѐ": "e",
 	"Ѕ": "s",
 	"Ї": "i",
 	"ą": "a",
 	"č": "c",
 	"ď": "d",
 	"ē": "e",
 	"ė": "e",
 	"ě": "e",
 	"ĝ": "g",
 	"ĥ": "h",
 	"ħ": "h",
 	"ĩ": "i",
 	"ī": "i",
 	"ĭ": "i",
 	"į": "i",
 	"ĵ": "j",
 	"ķ": "k",
 	"ĸ": "k",
 	"ĺ": "l",
 	"ļ": "l",
 	"ņ": "n",
 	"ň": "n",
 	"ŉ": "n",
 	"ŋ": "n",
 	"ō": "o",
 	"ŏ": "o",
 	"œ": "ae",
 	"ŗ": "r",
 	"ř": "r",
 	"ś": "s",
 	"ŝ": "s",
 	"ş": "s",
 	"ţ": "t",
 	"ť": "t",
 	"ŧ": "t",
 	"ų": "u",
 	"ŵ": "w",
 	"ŷ": "y",
 	"ź": "z",
 	"ſ": "f",
 	"ƀ": "b",
 	"Ɓ": "b",
 	"ƈ": "c",
 	"Ƙ": "k",
 	"Ɯ": "w",
 	"ƞ": "n",
 	"Ɵ": "e",
 	"Ơ": "o",
 	"ƥ": "p",
 	"Ʀ": "r",
 	"ƫ": "t",
 	"ư": "u",
 	"ƴ": "y",
 	"ƿ": "p",
 	"ǖ": "u",
 	"ǘ": "u",
 	"ǥ": "g",
 	"ǧ": "g",
 	"ǩ": "ǩ",
 	"ȁ": "a",
 	"ȃ": "a",
 	"ȅ": "e",
 	"ȇ": "e",
 	"ȉ": "i",
 	"ȍ": "o",
 	"ȏ": "o",
 	"ȑ": "r",
 	"ȓ": "r",
 	"ȕ": "u",
 	"ȗ": "u",
 	"ș": "s",
 	"ȟ": "h",
 	"ȡ": "d",
 	"ɋ": "a",
 	"ɍ": "r",
 	"ɑ": "a",
 	"ɗ": "d",
 	"Ε": "e",
 	"Α": "a",
 	"Β": "b",
 	"Γ": "r",
 	"Η": "h",
 	"Ζ": "z",
 	"Ι": "i",
 	"Κ": "k",
 	"Μ": "m",
 	"Ν": "n",
 	"Ρ": "p",
 	"Τ": "t",
 	"ά": "a",
 	"ή": "n",
 	"α": "a",
 	"β": "b",
 	"ο": "o",
 	"ρ": "p",
 	"ς": "c",
 	"χ": "x",
 	"ϲ": "c",
 	"ϳ": "j",
 	"ϸ": "p",
 	"ϻ": "m",
 	"à": "a",
 	"ạ": "a",
 	"ṣ": "s",
 	"ḳ": "k",
 	"ľ": "l",
 	"ā": "a",
 	"è": "e",
 	"ú": "u",
 	"ğ": "g",
 	"ű": "u",
 	"ő": "o",
 	"ḅ": "b",
 	"ẹ": "e",
 	"ṃ": "m",
 	"ł": "l",
 	"m": "m",
 	"š": "s",
 	"ɡ": "g",
 	"ũ": "u",
 	"e": "e",
 	"í": "i",
 	"ċ": "c",
 	"ố": "o",
 	"ế": "e",
 	"ệ": "e",
 	"ø": "o",
 	"ę": "e",
 	"ö": "o",
 	"ё": "e",
 	"ń": "n",
 	"ṁ": "m",
 	"ó": "o",
 	"é": "e",
 	"đ": "d",
 	"á": "a",
 	"ć": "c",
 	"ŕ": "r",
 	"ọ": "o",
 	"þ": "p",
 	"ñ": "n",
 	"õ": "o",
 	"ü": "u",
 	"â": "a",
 	"ı": "i",
 	"ᴡ": "w",
 	"ε": "e",
 	"ι": "l",
 	"å": "a",
 	"п": "n",
 	"ъ": "b",
 	"ä": "a",
 	"ç": "c",
 	"ê": "e",
 	"ë": "e",
 	"ï": "i",
 	"î": "i",
 	"ậ": "a",
 	"ḥ": "h",
 	"ý": "y",
 	"ṫ": "t",
 	"ẇ": "w",
 	"ḣ": "h",
 	"ã": "a",
 	"ì": "i",
 	'ả':"a",
 	"ṇ": "n",
 	"в":"b",
 	"т":"t",
 	"ẩ":"a",
 	"ộ": "o",
 	"ă":"a",
 	"ể":"e",
 	"ơ":"o",
 	"μ":"u",
 	"ð": "o",
 	"н":"h",
 	"ш":"w",
 	"ґ":"r",
 	"ỏ":"o",
 	"г": "r",
 	"к": "k"
 }


 status.start({
 	pattern: '{spinner.cyan} {certificates} Certs {spinner.toggle}  Elapsed time {uptime}'
 });

 module.exports = {

 	certstreamClientPhishing: function (certstream, regex, tlds, options) {

 		this.certstream = certstream;
 		this.regex = regex;
 		this.tlds = tlds;


 		var settings = {
 			tlds: false
 		};

 		if (!options) { options = {}; }

 		for(var option in settings) {
 			if (typeof options[option] !== 'undefined') {
 				settings[option] = options[option];
 			} else {
 				settings[option] = settings[option];
 			}
 		}

		// Retorna vazio se não retornar uma messagem de atualização

		if (!lodash.includes(certstream, 'certificate_update')) {
			return;
		}


		let domains = certstream.data.leaf_cert.all_domains;
		let certs = certstream.data.chain;

		lodash.forEach(domains, function(domains) {


			if (lodash.startsWith(domains, '*.')) {
				domains = lodash.replace(domains, '*.', 'www.', 0);
			}

			// Expressões regulares criadas com base no comportamento dos sites de phishing 

			const keywords = (domains.match(regex) || []); // Keywords do dominio inteiro

			// Filter o dominio
			let domain = tld.parse(domains).domain;

			// Filter subdominio
			let subdomain = tld.parse(domains).subdomain;
			let tlddomain = tld.parse(domains).publicSuffix;


			if ((lodash.isNull(subdomain) && lodash.isEmpty(subdomain))) { return; } // Dominios com o subdomain vazio ou null
			if ((lodash.isNull(domain) && lodash.isEmpty(domain))) { return; } 

			subdomain = (subdomain.match(regex) || []); // Subdomain Keywords
			domain = (domain.match(regex) || []); // Domain Keywords

			const dashed = (domains.match(/\-/g) || []).length;

			const points = (domains.match(/(\.)/g) || []).length;


		  	// Certificados gratuitos são mais propensos a serem utilizados para phishing

		  	let suspicious = false;

		  	lodash.forEach(certs, function(cert) {
		  		if (lodash.hasIn(cert,"subject")) {
		  			lodash.forOwn(cert, function(keyword) {
		  				if (lodash.includes(cert.subject.aggregated, "Let's Encrypt") || lodash.includes(cert.subject.aggregated, "CACert free certificate")
		  					|| lodash.includes(cert.subject.aggregated, "StartSSL"|| lodash.includes(cert.subject.aggregated, "Cloudflare")
		  						|| lodash.includes(cert.subject.aggregated, "Free SSL"))) 
		  				{
		  					suspicious = true;
		  				} 
		  			});
		  		}
		  	});

	  	 // Punycodes

	  	 if (lodash.startsWith(domains, 'xn--', 0)) {



	  	 	domains = punycode.toUnicode(domains);

	  	 	var unpunycode = domains;

	  	 	let punycodes = punycode.ucs2.decode(domains);

	  	 	lodash.forEach(punycodes, function(decimal) {

	  	 		if(decimal >= 128) { 

	  	 			let toCharCode = String.fromCharCode(decimal);

	  	 			for(var codes in maps) {
	  	 				domains = domains.replace(codes, maps[codes]);
	  	 			}
	  	 		}

	  	 	});

	  	 	var punycodekeywords = (domains.match(regex) || []);


	  	 	if (punycodekeywords.length >= 1) {
	  	 		console.log(`[!] Punycode ${danger(`${unpunycode}`)}`);
	  	 	}

	  	 	return;
	  	 }



	  	 if (settings.tlds) {

		  	  // Retorn apenas os tlds passados como parametro

		  	  lodash.forEach(tlds, function(tld) {
		  	  	if (lodash.includes(tld, tlddomain)) {

		  	  		lodash.forEach(keywords, function(keyword) {

		  	  			if (suspicious) {

		  	  				if (lodash.startsWith(subdomain, keyword, 0) && subdomain.length >= 1) {

		  	  					console.log(`[!] Suspicious ${danger(`${domains}`)}`);

		  	  					return;

		  	  				}

		  	  				if (lodash.startsWith(domain, keyword, 0) && domain.length >= 1) {

		  	  					console.log(`[!] Likely ${yellow(`${domains}`)}`);


		  	  					return;
		  	  				}


		  	  			} else {

		  	  				if (lodash.startsWith(subdomain, keyword, 0) && subdomain.length >= 1) {

		  	  					console.log(`[!] Likely ${yellow(`${domains}`)}`);

		  	  					return;
		  	  				}

		  	  				if (lodash.startsWith(domain, keyword, 0) && domain.length >= 1) {

		  	  					console.log(`[!] Potential ${white(`${domains}`)}`);

		  	  					return;

		  	  				}
		  	  			}

		  	  		});
		  	  	}
		  	  });

		  	} else {

		  		lodash.forEach(keywords, function(keyword) {

		  			if (suspicious) {

		  				if (lodash.startsWith(subdomain, keyword, 0) && subdomain.length >= 1) {

		  					console.log(`[!] Suspicious ${danger(`${domains}`)}`);

		  					return;

		  				}

		  				if (lodash.startsWith(domain, keyword, 0) && domain.length >= 1) {

		  					console.log(`[!] Likely ${yellow(`${domains}`)}`);

		  					return;
		  				}

		  			} else {

		  				if (lodash.startsWith(subdomain, keyword, 0) && subdomain.length >= 1) {

		  					console.log(`[!] Likely ${yellow(`${domains}`)}`);

		  					return;
		  				}

		  				if (lodash.startsWith(domain, keyword, 0) && domain.length >= 1) {

		  					console.log(`[!] Potential ${white(`${domains}`)}`);

		  					return;

		  				}
		  			}

		  		});
		  	}

		  });

certificates.inc();
}
}

