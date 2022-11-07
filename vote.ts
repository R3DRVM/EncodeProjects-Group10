import { ethers } from "hardhat";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config()

async function main() {
const contractAddress = process.argv[2];
const proposalIndex = process.argv[3];
const provider = ethers.getDefaultProvider("goerli", {alchemy: process.env.ALCHEMY_API_KEY});
const wallet = new ethers.Wallet(process.env.MNEMONIC ?? "");
const signer = wallet.connect(provider);
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
