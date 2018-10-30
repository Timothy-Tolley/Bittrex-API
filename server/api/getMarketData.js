const request = require('superagent')

const calculateSign = require('./calculateSign')

module.exports = {getMarketData: function getMarketData (exchange, apiKey, apiSecret) {
  let nonce = 'time()'
  let url = exchange.baseUrl + exchange.orderHistory + '?apikey=' + apiKey + '&currency=ETH' + '&nonce=' + nonce
  request
    .get(url)
    .set('apisign', calculateSign(url, apiSecret))
    .then(res => {
      return res.body
    })
}}
