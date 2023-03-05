const fs = require("fs");
const { parse } = require("csv-parse");
const axios = require('axios')

const readFile = async (filePath = "./data/transactions.csv") => {
  const data = [];
  const stream = fs.createReadStream(filePath)
    .pipe(parse({ delimiter: ",", columns: true, ltrim: true }));

  for await (const row of stream) {
    data.push(row);
  }

  return data;
};

const getTokenValue = async (tokens, apiKey) => {
  try {
    const { data: tokenValue } = await axios.get(`https://min-api.cryptocompare.com/data/pricemulti?fsyms=${tokens.join(",")}&tsyms=USD&api_key=${apiKey}`)
    return tokenValue;
  } catch(err) {
    console.error(err)
  }
}

const getPortfolioValue = async (filePath = "./data/transactions.csv", apiKey = "85050778798081515799695842eac105ffc69647bc9986fa0cd09d16da2cbf86") => {
  const data = await readFile(filePath);
  const portfolioResult = {};
  const tokens = [...new Set(data.map(item => item.token))];
  const tokenValues = await getTokenValue(tokens, apiKey);

  for (const item of data) {
    portfolioResult[item.token] = portfolioResult[item.token] ?? 0;
    if (item.transaction_type === "WITHDRAWAL") {
      portfolioResult[item.token] -= tokenValues[item.token]['USD'] * parseFloat(item.amount);
    }
    else if (item.transaction_type === "DEPOSIT") {
      portfolioResult[item.token] += tokenValues[item.token]['USD'] * parseFloat(item.amount);
    }
  }

  return portfolioResult;
}

(async function(){
  console.log(await getPortfolioValue());
})()
