// https://eth-ropsten.alchemyapi.io/v2/-byOFMkDcOI1jrG8Z2IDkma9kf8uyKbE

require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0', 
  networks:{
    ropsten:{
      url: 'https://eth-ropsten.alchemyapi.io/v2/-byOFMkDcOI1jrG8Z2IDkma9kf8uyKbE',
      accounts:['4c1a343316d16b7cc9f36a6aba40ea48770e2c727609f0814e17e5cd317c620b']
    }
  }
}