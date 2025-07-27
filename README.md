# 🔐 Oracle Verifier

A Solidity smart contract to **verify off-chain signatures on-chain**.  
This project helps ensure that messages signed by a trusted oracle (off-chain) can be verified and recorded on-chain.

---

## 📌 Overview

The OracleVerifier contract allows anyone to:

- Verify a message hash and its signature against an oracle’s public address.
- Track whether a particular message has already been verified.
- Ensure that only valid signatures from the oracle are accepted (ECDSA-based verification).

---

## 📁 Project Structure

oracle-verifier/
├── contracts/
│ └── OracleVerifier.sol # Main Solidity contract
├── test/
│ └── oracleVerifier.ts # Hardhat tests (TypeScript)
├── typechain-types/ # Auto-generated TypeChain typings
├── hardhat.config.ts # Hardhat configuration
├── package.json # Project dependencies & scripts
└── README.md # Project overview and usage

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

1. **Clone the repo**

```bash
git clone https://github.com/DannieHybrid/oracle-verifier.git
cd oracle-verifier
Install dependencies

bash
Copy
Edit
npm install
Compile the contracts

bash
Copy
Edit
npx hardhat compile
🧪 Running Tests
bash
Copy
Edit
npx hardhat test
Tests include:

Valid signature verification

Rejection of invalid signatures

Check that verified messages are recorded

✅ Example Use Case
Off-chain oracle signs a message:

js
Copy
Edit
const message = "oracle approved this";
const messageBytes = ethers.toUtf8Bytes(message);
const signature = await oracle.signMessage(messageBytes);
On-chain user calls:

solidity
Copy
Edit
oracleVerifier.verify(messageHash, signature);
The contract:

Recovers signer address from the signature

Confirms it matches the authorized oracle address

Marks message hash as verified

🔒 Contract Interface
constructor(address _oracle)
Sets the initial oracle address

verify(bytes32 messageHash, bytes memory signature)
Validates the signature and updates isVerified

isVerified(bytes32 messageHash) → bool
Checks whether a message hash was verified

🛠️ Tech Stack
Solidity 0.8.20

Hardhat

TypeScript + TypeChain

Chai + Ethers.js (Hardhat test runner)

📄 License
MIT

👤 Author
Dannie Hybrid

