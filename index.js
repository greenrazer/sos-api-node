'use strict';

let https = require("https");

// uses https module to get information from shopify
function httpsGet(options, onResult)
{
    let req = https.request(options, function(res)
    {
        let output = '';

        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            onResult(output);
        });
    });

    req.on('error', function(err) {
        console.log('error: ' + err.message);
    });

    req.end();
};


// converts the data obtained from sos into a url 
function getTokenUrl(data, callbackUrl){
  let holder = data.split(/[&=]/);
  let requestToken = holder[1];
  let requestTokenSecret = holder[3];

  return 'https://live.sosinventory.com/api/authorize.aspx?oauth_token=' + requestToken + '&oauth_callback="' + callbackUrl + '"'
}

// returns object to interface with sos's api
module.exports = {
  /* returns the url needed to authroize the api
   * @param {string} - oauth key, obtained from sos
   * @param {string} - oauth signature / secret / password obtained from sos
   * @param {string} - callback url, to put in the redirect link to call back to
   * @param {function} - callback, to call after it has finished, needs one parameter for the url
   */
  getAuthorizeUrl: function(key, secret, callbackUrl, callback) {
    httpsGet(
      {
        host: 'live.sosinventory.com',
        method: 'GET',
        port: 443,
        path: '/api/v1/oauth/request_token',
        headers: {
            'Authorization': 'OAuth oauth_version="1.0",oauth_signature_method="PLAINTEXT",oauth_consumer_key="' + key + '",oauth_signature="' + secret + '&"'
        }
      },  function(data) {
        callback(getTokenUrl(data, callbackUrl));
      }
    );
  },
  /* returns data from the api
   * @param {string} - oauth key, obtained from sos
   * @param {string} - oauth signature / secret / password obtained from sos
   * @param {string} - oauth token, obtained from the link returned in the previous function
   * @param {string} - oauth token secret, obtained from the link returned in the previous function
   * @param {string} - where to access data
   * @param {function} - callback, to put the returned data into, needs one parameter for the data
   */
  getData: function(key, secret, token, tokenSecret, url, callback) {
    let path = url.split('.com')[1];
    httpsGet(
      {
        host: 'live.sosinventory.com',
        method: 'GET',
        port: 443,
        path: path,
        headers: {
            'Authorization': 'OAuth oauth_version="1.0",oauth_signature_method="PLAINTEXT",oauth_consumer_key="' + key + '",oauth_token="' + token + '",oauth_signature="' + secret + '&' + tokenSecret + '"'
        }
      }, function(data) {
        callback(data);
      }
    );
  },
}