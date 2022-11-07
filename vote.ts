import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config()

async function main() {
const contractAddress = "0xF2299632a664E2d445ee11E42Af3B9AA7eFA2c84";
const proposalIndex = process.argv[3];
const provider = ethers.getDefaultProvider("goerli", {alchemy: process.env.ALCHEMY_API_KEY});
const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");const signer = wallet.connect(provider);
const ballotContractFactory = new Ballot__factory(signer);
    const ballotContract = ballotContractFactory.attach(
      contractAddress
    );
const tx = await ballotContract.vote(proposalIndex);
tx.wait();
console.log(`Thanks for voting!: ${proposalIndex} `)
    }


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
