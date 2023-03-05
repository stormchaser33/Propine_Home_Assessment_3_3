# Portfolio Value Calculator
This program calculates the value of a cryptocurrency portfolio based on transaction data stored in a CSV file. The program reads the CSV file, fetches current token values using the CryptoCompare API, and then calculates the current value of each token in the portfolio based on its transactions.

##Installation
Clone the repository
Run npm install to install the required dependencies
##Usage
Place the CSV file with transaction data in the ./data directory.
Run the program with node index.js.
The program will output the current value of each token in the portfolio.
##API Key
To use the CryptoCompare API, you will need to obtain an API key. You can get a free API key by signing up on the CryptoCompare website.

By default, the program uses the API key 85050778798081515799695842eac105ffc69647bc9986fa0cd09d16da2cbf86. You can update this in the getPortfolioValue() function if you have a different API key.

##CSV File Format
The CSV file should have the following columns:

token: the token symbol (e.g., BTC, ETH)
transaction_type: the type of transaction (DEPOSIT or WITHDRAWAL)
amount: the amount of the token involved in the transaction.