# Multi-Wallet Balance Checker

A simple yet powerful command-line (CLI) tool to check the native token balance (e.g., ETH) of multiple wallet addresses. Ideal for developers and airdrop farmers managing several wallets.

## Features

- Reads wallet addresses from a `wallets.txt` file.
- Connects to any EVM-compatible network via a configurable RPC URL.
- Displays a clean, color-coded list of balances in the terminal.

## Setup

1.  **Clone & Install:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    npm install ethers dotenv chalk
    ```

2.  **Create `wallets.txt`:**
    * Create a file named `wallets.txt` in the same folder.
    * Add your wallet addresses to this file, with one address per line.

3.  **Configure `.env` file:**
    * Create a file named `.env` and add your RPC URL:
        ```env
        RPC_URL="YOUR_INFURA_OR_ALCHEMY_RPC_URL"
        ```

4.  **Run the checker:**
    ```bash
    node balance-checker.js
    ```
