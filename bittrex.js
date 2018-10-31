const request = require('superagent')

const calculateSign = require('./calculateSign')

const bittrexData = {
  name: 'bittrex',
  baseUrl: 'https://bittrex.com/api/v1.1/',
  getBalance: 'account/getbalance/',
  getWithdrawalHistory: 'account/getwithdrawalhistory/',
  getDepositHistory: 'account/getdeposithistory/'
}

let selectedFunc = process.argv[2]
let apiKey = process.argv[3]
let apiSecret = process.argv[4]
let coin = process.argv[5]

// balances
function getBalance (apiKey, apiSecret, coin) {
  let nonce = 'time()'
  let url = bittrexData.baseUrl + bittrexData.getBalance + '?apikey=' + apiKey + '&currency=' + coin + '&nonce=' + nonce
  request
    .get(url)
    .set('apisign', calculateSign(url, apiSecret))
    .then(resp => {
      // eslint-disable-next-line no-console
      console.log(resp.body)
    })
}

// withdrawals
function getWithdrawals (apiKey, apiSecret) {
  let nonce = 'time()'
  let url = bittrexData.baseUrl + bittrexData.getWithdrawalHistory + '?apikey=' + apiKey + '&nonce=' + nonce
  request
    .get(url)
    .set('apisign', calculateSign(url, apiSecret))
    .then(resp => {
      // eslint-disable-next-line no-console
      console.log('withdrawals: ', resp.body)
    })
}

// deposits
function getDeposits (apiKey, apiSecret) {
  let nonce = 'time()'
  let url = bittrexData.baseUrl + bittrexData.getDepositHistory + '?apikey=' + apiKey + '&nonce=' + nonce
  request
    .get(url)
    .set('apisign', calculateSign(url, apiSecret))
    .then(resp => {
      // eslint-disable-next-line no-console
      console.log('Deposits: ', resp.body)
    })
}

// runner

function runner (func, key, secret, coin) {
  if (func === 'withdrawals') {
    getWithdrawals(key, secret)
  } else if (func === 'deposits') {
    getDeposits(key, secret)
  } else if (func === 'balance') {
    if (coin !== undefined) {
      getBalance(key, secret, coin)
    } else {
      // eslint-disable-next-line no-console
      console.log('Error: ', 'coin not specified (BTC or ETH)')
    }
  } else {
    // eslint-disable-next-line no-console
    console.log('command not recognised')
  }
}

runner(selectedFunc, apiKey, apiSecret, coin)
