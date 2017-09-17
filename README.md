# sos-api-node

An interface with the SOS Inventory api for node, because sos inventory is weird and i dont want anyone to go through the same pain i did

## Installation

  `npm install sos-api-node`

## Usage

```javascript
    var sosHelper = require('sos-api-node');

    //GET THESE BY EMAILING support@sosinventory.com
    sosKey = 'xxxxxxxxxxxxx'
    sosSecret = 'xxxxxxxxxxxxxxxx'

    /* returns the url needed to authroize the api
     * @param {string} - oauth key, obtained from sos
     * @param {string} - oauth signature / secret / password obtained from sos
     * @param {string} - callback url, to put in the redirect link to call back to
     * @param {function} - callback, to call after it has finished, needs one parameter for the url
     */
    sosHelper.getAuthorizeUrl(sosKey, sosSecret, 'http://www.google.com', function(data) {
      //redirect to data when they finish authorizing will come back with a querystring in the form:
      // auth_token=<access-token>&oauth_token_secret=<access-token-secret>
      // if it doesnt work, which it has a high chance, just email support@sosinventory.com
    });

    sosToken = 'whatever you got from the url'
    sosTokenSecret = 'whatever you got from the url'
    dataUrl = 'live.sosinventory.com/api/v1/items';

    /* returns data from the api
     * @param {string} - oauth key, obtained from sos
     * @param {string} - oauth signature / secret / password obtained from sos
     * @param {string} - oauth token, obtained from the link returned in the previous function
     * @param {string} - oauth token secret, obtained from the link returned in the previous function
     * @param {string} - where to access data
     * @param {function} - callback, to put the returned data into, needs one parameter for the data
     */
    sosHelper.getData(sosKey, sosSecret, sosToken, sosTokenSecret, dataUrl, function(data){
      console.log(data);
    });

````