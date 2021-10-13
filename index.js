const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

const userBalances = {
  "user-1": {
    "BTC": "0.5",
    "ETH": "2"
  },
  "user-2": {
    "BTC": "0.1",
  },
  "user-3": {
    "ETH": "5",
  },
}

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/getBalance/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const userString = `user-${userId}`
    const userData = userBalances[userString];
    let totalBalance = 0;
    if (userData.BTC !== undefined) {
      let btcPrice = await getCurrentPrice("btcusd");
      totalBalance += parseFloat(userData.BTC) * btcPrice;
    }
    if (userData.ETH !== undefined) {
      let ethPrice = await getCurrentPrice("ethusd");
      totalBalance += parseFloat(userData.ETH) * ethPrice;
    }

    const returnStatement = `${userString} total balance is: USD ${totalBalance.toFixed(2)}`;
    res.status(200).send(returnStatement);
  } catch (error) {
    res.status(400).send(error);
  }
})

async function getCurrentPrice(coin) {
  try {
    let response = await axios.get(`https://www.bitstamp.net/api/v2/ticker/${coin}`);
    return parseFloat(response.data.last);
  } catch (error) {
    console.error(error);
  }
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})