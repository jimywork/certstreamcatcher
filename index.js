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

const yellow = color.yellow.underline;
const danger = color.redBright.underline;
const white = color.white.underline;

const certificates = status.addItem('certificates');

const mapping = {
    "a": ["à", "á", "â", "ã", "ä", "å", "ā", "ă", "ą", "ǎ", "ȁ", "ȃ", "ȧ", "ḁ", "ẚ", "ạ"],
    "b": ["ḃ", "ḅ", "ḇ", "ƀ"],
    "c": ["ç", "ć", "ĉ", "ċ", "č"],
    "d": ["ḋ", "ḍ", "ḏ", "ḑ", "ḓ", "đ"],
    "e": ["è", "é", "ê", "ë", "ĕ", "ė", "ę", "ě", "ȅ", "ȇ", "ȩ", "ḙ", "ḛ", "ẹ", "ẽ"],
    "f": ["ḟ"],
    "g": ["ĝ", "ğ", "ġ", "ģ", "ǧ", "ǵ", "ḡ"],
    "h": ["ĥ", "ȟ", "ḣ", "ḥ", "ḧ", "ḩ", "ḫ", "ẖ"],
    "i": ["ì", "í", "î", "ï", "ĩ", "ī", "ĭ", "į", "ǐ", "ȉ", "ȋ", "ḭ", "ị"],
    "j": ["ĵ", "ǰ"],
    "k": ["ķ", "ǩ", "ḱ", "ḳ", "ḵ"],
    "l": ["ĺ", "ļ", "ľ", "ŀ", "ḷ", "ḻ", "ḽ", "ι", "ł"],
    "m": ["ḿ", "ṁ", "ṃ", "ϻ"],
    "n": ["ñ", "ń", "ņ", "ň", "ŉ", "ǹ", "ṅ", "ṇ", "ṉ", "ṋ"],
    "o": ["ò", "ó", "ô", "õ", "ö", "ō", "ŏ", "ő", "ơ", "ǒ", "ǫ", "ố", "ȍ", "ȏ", "ȯ", "ọ", "ø", "ộ"],
    "p": ["ṕ", "ṗ", "ϸ"],
    "r": ["ŕ", "ŗ", "ř", "ȑ", "ȓ", "ṙ", "ṛ", "ṟ", "ґ"],
    "s": ["ŝ", "ş", "š", "ș", "ṡ", "ṣ"],
    "t": ["ţ", "ť", "ț", "ṫ", "ṭ", "ṯ", "ṱ", "ẗ"],
    "u": ["ù", "ú", "û", "ü", "ũ", "ū", "ŭ", "ů", "ű", "ų", "ư", "ǔ", "ȕ", "ȗ", "ṳ", "ṵ", "ṷ", "ụ"],
    "v": ["ṽ", "ṿ"],
    "w": ["ŵ", "ẁ", "ẃ", "ẅ", "ẇ", "ẉ", "ẘ"],
    "x": ["ẋ", "ẍ"],
    "y": ["ý", "ÿ", "ŷ", "ȳ", "ẏ", "ẙ", "ỳ", "ỵ", "ỹ"],
    "z": ["ź", "ż", "ž", "ẑ", "ẓ", "ẕ"]
}

module.exports = {

    certstreamClientPhishing: function (certstream, regex, tlds, options) {

        this.certstream = certstream;
        this.regex = regex;
        this.tlds = tlds;


        var settings = {
            tlds: false
        };

        if (!options) {
            options = {};
        }

        for (var option in settings) {
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

        lodash.forEach(domains, function (domains) {


            if (lodash.startsWith(domains, '*.')) {
                domains = lodash.replace(domains, '*.', '', 0);
            }

            // Expressões regulares criadas com base no comportamento dos sites de phishing 

            let keywords = (domains.match(regex) || []); // Keywords do dominio inteiro

            // Filter o dominio
            let domain = tld.parse(domains)
                .domain;

            // Filter subdominio
            let subdomain = tld.parse(domains)
                .subdomain;
            let tlddomain = tld.parse(domains)
                .publicSuffix;


            if ((lodash.isNull(subdomain) && lodash.isEmpty(subdomain))) {
                return;
            } // Dominios com o subdomain vazio ou null
            if ((lodash.isNull(domain) && lodash.isEmpty(domain))) {
                return;
            }

            subdomain = (subdomain.match(regex) || []); // Subdomain Keywords
            domain = (domain.match(regex) || []); // Domain Keywords

            const dashed = (domains.match(/\-/g) || [])
                .length;

            const points = (domains.match(/(\.)/g) || [])
                .length;


            // Certificados gratuitos são mais propensos a serem utilizados para phishing

            let suspicious = false;

            lodash.forEach(certs, function (cert) {
                if (lodash.hasIn(cert, "subject")) {
                    lodash.forOwn(cert, function (keyword) {
                        if (lodash.includes(cert.subject.aggregated, "Let's Encrypt") || lodash.includes(cert.subject.aggregated, "CACert free certificate") ||
                            lodash.includes(cert.subject.aggregated, "StartSSL" ||
                                lodash.includes(cert.subject.aggregated, "Cloudflare") ||
                                lodash.includes(cert.subject.aggregated, "Free SSL"))) {
                            suspicious = true;
                        }
                    });
                }
            });


            if (lodash.startsWith(domains, 'xn--', 0)) {

                let punyncode = punycode.toUnicode(domains);
                let punydecode = punycode.ucs2.decode(punyncode);

                lodash.forEach(punydecode, function (punycode) {

                    if (punycode >= 128) {
                        for (var keyword in mapping) {

                            var maps = mapping[keyword];

                            for (var keywords in maps) {
                                punyncode = punyncode.replace(maps[keywords], keyword);
                            }
                        }
                    }
                });

                keywords = (punyncode.match(regex) || [])
                    .length;

                if (keywords >= 1) {
                    console.log(`[!] Punycode ${danger(`${domains}`)}`);
                }

                return;
            }



            if (settings.tlds) {

                // Retorn apenas os tlds passados como parametro

                lodash.forEach(tlds, function (tld) {
                    if (lodash.includes(tld, tlddomain)) {

                        lodash.forEach(keywords, function (keyword) {

                            if (suspicious) {

                                if (lodash.startsWith(subdomain, keyword, 0) && subdomain.length >= 1) {
                                    console.log(`[!] Suspicious ${danger(`${domains}`)}`);
                                    return;

                                }

                                if (lodash.startsWith(domain, keyword, 0) && domain.length >= 1) {
                                    console.log(`[!] Suspicious ${danger(`${domains}`)}`);
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

                lodash.forEach(keywords, function (keyword) {

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

                        if ((subdomain.length >= 1 || domain.length >= 1) || (dashed >= 3 || points >= 3)) {
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

status.start({
    pattern: '{spinner.cyan} {certificates} Certs {spinner.toggle}  Elapsed time {uptime}'
});
