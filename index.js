const express = require('express')
const Web3 = require('web3')
const app = express()
const morgan = require('morgan')
const port = 3000;

function start() {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan('dev'))

  app.get('/balance', async (req, res) => {
    let address = req.body.address
    let balance = null
    let web3 = new Web3('https://mainnet.infura.io/v3/4482bff00d4643709d3c09c3020fbcd0')
    
    if (address) {
      balance = await web3.eth.getBalance(address)
      balance = await web3.utils.fromWei(balance, 'ether')  
    }
  
    let response = `${balance} Ether`
    res.send(response)
  });

  app.listen(port, () => {
    console.log('Server on port: ' + port)
  })
}

start()