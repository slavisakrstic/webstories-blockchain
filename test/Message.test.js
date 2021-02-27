/**
 * Test smart contract on local ganache instance
 */
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

/**
 * Use ganache local provider 
 */
const provider = ganache.provider();
const web3 = new Web3(provider);

/**
 * Import compiled smart contract (bytecode and ABI)
 */
const { interface, bytecode } = require('../compile')

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  console.log(accounts);

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hello!'] })
    .send({ from: accounts[0], gas: '1000000' });

  inbox.setProvider(provider);
});

describe('Message', () => {
  it('deploys a contract', async () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.strictEqual(message, 'Hello!');
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('Hi Slavisa!').send({
      from: accounts[0]
    });

    const message = await inbox.methods.message().call();
    assert.strictEqual(message, 'Hi Slavisa!');
  });
});