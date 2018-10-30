import React from 'react'
import request from 'superagent'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      marketInfo: false,
      coin: '',
      apiKey: '',
      apiSecret: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
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

  handleSubmit (e) {
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
          marketInfo: res.body.result
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
          <button className='submitButton' onClick={this.handleSubmit}>
            SUBMIT
          </button>
        </form>
        {this.state.marketInfo && <div>
          {this.state.marketInfo.Currency}: {this.state.marketInfo.Balance}
        </div>}
      </div>
    )
  }
}

export default App
