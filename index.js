const Web3 = require('web3');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlockchainManager = require('./BlockchainManager');
const web3 = new Web3();
const app = express();
const dbURL = 'mongodb://localhost/test';
const contractManager = new BlockchainManager('http://localhost:8545');
app.use(bodyParser.json());
async function connectWithRetry() {
    mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB is connected'))
    .catch(err => {
        console.log('MongoDB connection unsuccessful, retry after 5 seconds.', err);
        setTimeout(connectWithRetry, 5000)
    })
}
connectWithRetry();
app.get('/contact', async (req, res) => {
  const contract = contractManager.getContract(req.body.contractAddress);
  const contact = await contract.methods.getContact().call({ from: req.body.account });
  res.json(contact);
});
app.post('/contact', async (req, res) => {
  const contract = contractManager.getContract(req.body.contractAddress);
  await contract.methods.addOrUpdateContact(
    req.body.name,
    req.body.company,
    req.body.email,
    req.body.phoneNumber,
    req.body.note,
    req.body.lastInteraction
  ).send({ from: req.body.account });
  res.sendStatus(200);
});
app.put('/contact', async (req, res) => {
  const contract = contractManager.getContract(req.body.contractAddress);
  await contract.methods.addOrUpdateContact(
    req.body.name,
    req.body.company,
    req.body.email,
    req.body.phoneNumber,
    req.body.note,
    req.body.lastInteraction
  ).send({ from: req.body.account });
  res.sendStatus(200);
});
app.delete('/contact', async (req, res) => {
  const contract = contractManager.getContract(req.body.contractAddress);
  await contract.methods.deleteContact().send({ from: req.body.account });
  res.sendStatus(200);
});
app.listen(3000, () => {
  console.log('Server started');
});
