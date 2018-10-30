import React from 'react'
import request from 'superagent'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      currencyInfo: false,
      withdrawalInfo: false,
      coin: '',
      apiKey: '',
      apiSecret: ''
    }
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitBalance = this.handleSubmitBalance.bind(this)
    this.handleSubmitWithdrawals = this.handleSubmitWithdrawals.bind(this)
  }

  handleChange (e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    })
  }

  handleKeyUp (e) {
    if (e.keyCode === 13) {
      this.handleSubmit()
    }
  }

  handleSubmitBalance (e) {
    e.preventDefault()
    let apiKey = this.state.apiKey
    let apiSecret = this.state.apiSecret
    let coin = this.state.coin
    request
      .get('/api/v1/bittrex/balance')
      .set('API-Key', apiKey)
      .set('API-Secret', apiSecret)
      .set('coin', coin)
      .set('Accept', 'application/json')
      .then(res => {
        this.setState({
          currencyInfo: res.body.result
        })
      }
      )
      .catch(err => {
        throw err
      })
  }

  handleSubmitWithdrawals (e) {
    e.preventDefault()
    let apiKey = this.state.apiKey
    let apiSecret = this.state.apiSecret
    request
      .get('/api/v1/bittrex/withdrawal')
      .set('API-Key', apiKey)
      .set('API-Secret', apiSecret)
      .set('Accept', 'application/json')
      .then(res => {
        this.setState({
          withdrawalInfo: res.body.result
        })
      }
      )
      .catch(err => {
        throw err
      })
  }

  render () {
    return (
      <div className = 'page'>
        <h1>BITTREX API ---- ETHEREUM BALANCE</h1>
        <form>
          <label> API KEY </label>
          <br/>
          <input name='apiKey' id='apiKey' onChange={this.handleChange} required autoComplete='off' value={this.state.apiKey}>
          </input>
          <br/>
          <label> API SECRET </label>
          <br/>
          <input name='apiSecret' id='apiSecret' onChange={this.handleChange} required autoComplete='off' value={this.state.apiSecret}>
          </input>
          <br/>
          <label> CURRENCY </label>
          <br/>
          <select name='coin' id='coin' required onChange={this.handleChange}>
            <option> </option>
            <option value="ETH">ETHEREUM</option>
            <option value="BTC">BITCOIN</option>
          </select>
          <br/>
          <button className='submitButton' onClick={this.handleSubmitBalance}>
            Get Balance
          </button>
          <button className='submitButton' onClick={this.handleSubmitWithdrawals}>
            Get withdrawal
          </button>
        </form>
        {this.state.currencyInfo && <div>
          {this.state.currencyInfo.Currency}: {this.state.currencyInfo.Balance}
        </div>}
        {this.state.withdrawalInfo && <div>
          Withdrawals:

          {this.state.withdrawalInfo.map(withdrawal => {
            return (
              <div key={withdrawal.PaymentUuid}>
                <p> currency : {withdrawal.Currency} </p>
                <p> Amount: {withdrawal.Amount}</p>
                <p> Opened: {withdrawal.Opened}</p>
              </div>
            )
          })}
        </div>}
      </div>
    )
  }
}

export default App
