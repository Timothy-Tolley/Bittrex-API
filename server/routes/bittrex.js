const express = require('express')
const request = require('superagent')

const router = express.Router()

const calculateSign = require('../api/calculateSign')
const {bittrexSort} = require('../api/sorters/bittrex')

const bittrexData = {
  name: 'bittrex',
  baseUrl: 'https://bittrex.com/api/v1.1/',
  getBalance: 'account/getbalance/',
  getWithdrawalHistory: 'account/getwithdrawalhistory/',
  getDepositHistory: 'account/getdeposithistory/',
  sort: bittrexSort
}

router.get('/balance', (req, res) => {
  let apiKey = req.get('API-Key')
  let secret = req.get('API-Secret')
  let coin = req.get('coin')
  let nonce = 'time()'
  let url = bittrexData.baseUrl + bittrexData.getBalance + '?apikey=' + apiKey + '&currency=' + coin + '&nonce=' + nonce
  request
    .get(url)
    .set('apisign', calculateSign(url, secret))
    .then(resp => {
      res.json(resp.body)
    })
})

module.exports = router
