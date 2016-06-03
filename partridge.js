const qs = require('querystring');
const request = require('request');
const cheerio = require('cheerio');
const Promise = require('bluebird');

// 'cookie: __cfduid=d2693c614e20ecab6176f0607bf3649b91464167735; _ga=GA1.2.1360040696.1464167738; _gat=1'

const domain = 'https://partridge.cloud';

const parseSceneGifUrl = (href, thumb) => {
    const id = href.match(/id=(.+)/),
        path = thumb.match(/\/(grabs\/.+)\//);
    return `${path[1]}/gif/${id[1]}.gif`;
};

module.exports = str => {

    return new Promise((resolve, reject) => {
        const uri = `${domain}/inc/quote-finder.php`,
            method = 'POST',
            headers = {
                'x-requested-with': 'XMLHttpRequest',
                'referer': domain,
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body = qs.stringify({ str });
        request({ uri, headers, body, method }, (err, res, html) => {
            if (err) {
                reject(err);
                return;
            }
            if (res.statusCode !== 200) {
                reject(res);
                return;
            }
            const $ = cheerio.load(html);
            const firstResult = $('.search-result').first();
            const href = `${domain}/${firstResult.find('a').attr('href')}`;
            const thumb = `${domain}/${firstResult.find('img').attr('src')}`;
            const gif = `${domain}/${parseSceneGifUrl(href, thumb)}`;
            resolve({ href, thumb, gif });
        });
    });
};
