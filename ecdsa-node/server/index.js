const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0x02f8fd323d3a0b53b7d1db4b4e2a9f56b0d0712e1dde6ebc8ef6ac7ca980498bbe": 100,
  "0x303527f71cabca2de3c4c74827a8c55f95267dbb1228d5a6de1cf0c584c4e2ca": 50,
  "0x0263c6fc9c9cb205d6b166db82465c2c94b86b459ff1ff7eb69e3e8647d2f327f4": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
