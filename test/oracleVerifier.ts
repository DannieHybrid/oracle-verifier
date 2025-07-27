import { expect } from "chai";
import { ethers } from "hardhat";
import { OracleVerifier } from "../typechain-types";

describe("OracleVerifier", function () {
  it("should deploy and verify a real signed message", async function () {
    const [signer] = await ethers.getSigners();

    const OracleVerifierFactory = await ethers.getContractFactory(
      "OracleVerifier"
    );
    const oracleVerifier = (await OracleVerifierFactory.deploy(
      signer.address
    )) as OracleVerifier;

    await oracleVerifier.waitForDeployment();

    const message = "oracle approved this";
    const messageBytes = ethers.toUtf8Bytes(message);
    const messageHash = ethers.keccak256(messageBytes);
    const signature = await signer.signMessage(messageBytes);

    const tx = await oracleVerifier.verify(messageHash, signature);
    await tx.wait();

    const isVerified = await oracleVerifier.isVerified(messageHash);
    expect(isVerified).to.equal(true);
  });

  it("should reject an invalid signature", async function () {
    const [signer, attacker] = await ethers.getSigners();

    const OracleVerifierFactory = await ethers.getContractFactory(
      "OracleVerifier"
    );
    const oracleVerifier = (await OracleVerifierFactory.deploy(
      signer.address
    )) as OracleVerifier;

    await oracleVerifier.waitForDeployment();

    const message = "oracle approved this";
    const messageBytes = ethers.toUtf8Bytes(message);
    const messageHash = ethers.keccak256(messageBytes);
    const fakeSig = await attacker.signMessage(messageBytes);

    await expect(
      oracleVerifier.verify(messageHash, fakeSig)
    ).to.be.revertedWithCustomError(oracleVerifier, "InvalidSignature");
  });
});
