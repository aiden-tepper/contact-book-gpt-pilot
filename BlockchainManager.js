const Web3 = require('web3');
const ContractJson = require('../build/contracts/Contacts.json');

class BlockchainManager {
  constructor (provider) {
    this.web3 = new Web3(new Web3.providers.HttpProvider(provider));
    this.abi = ContractJson.abi;
    this.bytecode = ContractJson.bytecode;
  }

  async deployContract (privateKey) {
    const deployTxObject = new this.web3.eth.Contract(this.abi)
      .deploy({ data: this.bytecode })
      .encodeABI();
    const deployTxOptions = {
      data: deployTxObject
    };    
    const signedTx = await this.web3.eth.accounts.signTransaction(deployTxOptions, privateKey);
    const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return receipt.contractAddress;
  }

  getContract (address) {
    return new this.web3.eth.Contract(this.abi, address);
  }
}

module.exports = BlockchainManager;