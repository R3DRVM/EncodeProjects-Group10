import { ethers } from "ethers";
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv';
dotenv.config()

async function main() {
  const contractAddress = process.argv[2];
  const targetAddress = process.argv[3];
  const provider = ethers.getDefaultProvider("goerli", {alchemy: process.env.ALCHEMY_API_KEY});
  const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? "");
  const signer = wallet.connect(provider);
  console.log(`Connected to the wallet ${signer.address}`);
  const balance = await signer.getBalance();
  console.log(`This address has a balance of ${balance} wei`);
  if (balance.eq(0)) throw new Error("Insufficient funds");
  const ballotContractFactory = new Ballot__factory(signer);
    const ballotContract = ballotContractFactory.attach(
       contractAddress
    );
    const tx = await ballotContract.vote(targetAddress);
    await tx.wait();
    console.log("Voting rights have been granted");
    console.log(tx.hash);
}
  
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});