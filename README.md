# 🔐 Oracle Verifier

Smart contract to verify off-chain signatures using ECDSA.

## ⚙️ Setup

```bash
npm install
npx hardhat compile
npx hardhat test
📄 Features
Verifies message hash + signature

Ensures signer is a trusted oracle

Tracks verified messages

🧪 Example
ts
Copy
Edit
const msg = "oracle approved this";
const bytes = ethers.toUtf8Bytes(msg);
const sig = await signer.signMessage(bytes);
oracleVerifier.verify(ethers.keccak256(bytes), sig);
🗂️ Structure
bash
Copy
Edit
contracts/          # OracleVerifier.sol
test/               # Tests
typechain-types/    # Auto-generated types
hardhat.config.ts   # Config
👤 Author
Dannie Hybrid — MIT License
