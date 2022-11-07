import { ethers } from 'ethers';
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv' 
dotenv.config()

async function main() {

  const contractAddress = process.argv[2];
  const targetAddress = process.argv[3];
  const provider = ethers.getDefaultProvider("goerli", {etherscan: process.env.ETHERSCAN_API_KEY});
  const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? ""); // get wallet from metamask
  const signer = wallet.connect(provider);
  console.log(`I am connected to ${signer.address}`)
  // TODO
  const ballotContractFactory =  new Ballot__factory(signer);
  const ballotContract = await ballotContractFactory.attach(contractAddress);
  const tx = await ballotContract.giveRightToVote(targetAddress)
  await tx.wait()
  console.log(`gave right to vote to ${targetAddress} for contract ${contractAddress}`)
  console.log(`transaction hash is ${tx.hash}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
