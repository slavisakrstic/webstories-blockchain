/**
 * Import truffle hdwallet provide so application can use rinkeby test eth network
 * web3 provider is use to "communacate" with smart contract
 * Import of the smart contract
 */
const HDWalletProvide = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

/**
 * Connect to rinkby eth test network 
 * Please provide your wallet mnemonic and infura access token (register on https://infura.io/ or use local ganache instance https://www.trufflesuite.com/ganache)
 */
const provider = new HDWalletProvide(
  '<mnemonic>',
  'https://rinkeby.infura.io/v3/<INFURA_Access_Token>'
);

const web3 = new Web3(provider);

const deploy = async () => {

  /**
   * Get eth accounts 
   * First one will be used for a demo
   */
  const accounts = await web3.eth.getAccounts();

  console.log(`Attempting to deploy from account ${accounts[0]}`);

  /**
   * Deploy smart contract to the eth test network
   */
  const inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hello'] })
    .send({ from: accounts[0], gas: '1000000' });

  /**
   * Call method setMessage from the smart contract 
   */
  await inbox.methods.setMessage('Hi from Slavisa!!!').send({
    from: accounts[0], gas: '1000000' 
  });

  /**
   * Log the address
   */
  console.log(inbox.options.address);
}

deploy();