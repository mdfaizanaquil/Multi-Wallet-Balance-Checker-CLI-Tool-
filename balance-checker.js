const { ethers } = require("ethers");
const fs = require("fs");
const chalk = require("chalk");
require("dotenv").config();

const RPC_URL = process.env.RPC_URL;

if (!RPC_URL) {
    console.error(chalk.red("❌ Missing RPC_URL in .env file."));
    process.exit(1);
}

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

async function checkBalances() {
    try {
        const data = fs.readFileSync('wallets.txt', 'utf8');
        const addresses = data.split(/\r?\n/).filter(line => ethers.utils.isAddress(line));

        if (addresses.length === 0) {
            console.log(chalk.yellow("⚠️ No valid addresses found in wallets.txt"));
            return;
        }

        console.log(chalk.blue(`Checking balances for ${addresses.length} wallets...`));
        console.log("----------------------------------------");

        const balancePromises = addresses.map(address => provider.getBalance(address));
        const balances = await Promise.all(balancePromises);

        addresses.forEach((address, index) => {
            const balanceInEther = ethers.utils.formatEther(balances[index]);
            console.log(`${chalk.white(address)}: ${chalk.green(parseFloat(balanceInEther).toFixed(4))} ETH`);
        });

        console.log("----------------------------------------");

    } catch (error) {
        if (error.code === 'ENOENT') {
            console.error(chalk.red("❌ Error: wallets.txt file not found. Please create it and add your wallet addresses."));
        } else {
            console.error(chalk.red("❌ An error occurred:"), error.message);
        }
    }
}

checkBalances();
