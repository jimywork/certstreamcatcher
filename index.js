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

const yellowBright = color.yellowBright.underline;
const yellow = color.yellow.underline;
const danger = color.redBright.underline;
const white = color.white.underline;
const light = color.white.underline;

let certificates = status.addItem('certificates');


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

		lodash.forEach(domains, function(domains, index) {

			
			if (lodash.startsWith(domains, '*.')) {
				domains = lodash.replace(domains, '*.', 'www.');
			}


			// Expressões regulares criadas com base no comportamento dos sites de phishing 

			const keywords = (domains.match(regex) || []); // Keywords

			// Fitler Domain
			let domain = tld.parse(domains).domain;

			// Filter Subdomain
			let subdomain = tld.parse(domains).subdomain;

			if ((lodash.isNull(subdomain) && lodash.isEmpty(subdomain))) { return; } // Domains com o subdomain vazio ou null
			if ((lodash.isNull(domain) && lodash.isEmpty(domain))) { return; } // Domains com o subdomain vazio ou null

			subdomain = (subdomain.match(regex) || []);
			domain = (domain.match(regex) || []);

			// Expressões regulares criadas com base no comportamento dos sites de phishing

			const dashed = (domains.match(/\-/g) || []).length;

			const points = (domains.match(/(\.)/g) || []).length;

			if (settings.tlds) {

		  	  // Retorn apenas os tlds passados como parametro

		  	  lodash.forEach(tlds, function(tld) {
		  	  	if (!lodash.endsWith(domains, tld)) {
		  	  		return;
		  	  	}
		  	  });

		  	}

		  	// Certificados gratuitos são mais propensos a serem utilizados para phising

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

		  
	  		 // Remove os domains que começa com xn--

	  		 if (lodash.startsWith(domains, 'xn--', 0)) {
	  		 	return;
	  		 }

	  		 lodash.forEach(keywords, function(keyword) {

		        if (suspicious) {

		        	if (lodash.startsWith(subdomain, keyword, 0) && subdomain.length >= 1) {
		            	console.log('[!] Suspicious ' + danger(`${domains}`));
		        	}

			        if (lodash.startsWith(domain, keyword, 0) && domain.length >= 1) {
			            console.log('[!] Likely ' + yellow(`${domains}`));
			        }

		        } else {

		        	if (lodash.startsWith(subdomain, keyword, 0) && subdomain.length >= 1) {
		            	console.log('[!] Likely ' + yellow(`${domains}`));
		        	}

			        if (lodash.startsWith(domain, keyword, 0) && domain.length >= 1) {
			            console.log('[!] Potential ' + white(`${domains}`));
			        }
		        }
	
	  	 });
	  	
	  });
		certificates.inc();
 	}
}

status.start({
  pattern: '{spinner.cyan} {certificates} Certs {spinner.toggle}  Elapsed time {uptime}'
});
