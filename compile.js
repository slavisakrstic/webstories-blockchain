const path = require('path');
const fs = require('fs');
const solc = require('solc');

/** 
 * Read Message.sol source code
 */
const msgPath = path.resolve(__dirname, 'contracts', 'Message.sol');
const source = fs.readFileSync(msgPath, 'utf8');

// Uncomment to see ABI and bytecode
// const { interface, bytecode } = solc.compile(source, 1).contracts[':Message']
// console.log(interface)
// console.log(bytecode)

/** 
 * Compile and export smart contract so it can be used in simple NodeJS app
 */
module.exports = solc.compile(source, 1).contracts[':Message'];