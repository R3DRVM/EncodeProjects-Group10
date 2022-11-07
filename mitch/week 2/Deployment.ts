import { ethers } from 'hardhat';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { Ballot, Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv' 
dotenv.config()

async function main() {

// MetaMask requires requesting permission to connect users accounts

// The MetaMask plugin also allows signing transactions to
// send ether and pay to change state within the blockchain.
// For this, you need the account signer...
  console.log("Deploying Ballot contract");
  console.log("Proposals: ");
  const proposals = process.argv.slice(2);
  proposals.forEach((element, index) => {
    console.log(`Proposal N. ${index + 1}: ${element}`);
  });
  const provider = new ethers.providers.AlchemyProvider( "goerli", process.env.ALCHEMY_API_KEY)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  const signer = wallet.connect(provider);
  const balance = await signer.getBalance();
  console.log(`I am connected to ${signer.address}`)
  console.log(`this address has a balance of ${balance} wei`)
  // TODO
  const ballotContractFactory =  new Ballot__factory(signer);
  const ballotContract = await ballotContractFactory.deploy( 
    convertStringArrayToBytes32(proposals)
    );
  await ballotContract.deployed();
  console.log(`smart contract was deployed at ${ballotContract.address}`)
  const txHash = await ballotContract.deployTransaction;
  await txHash.wait()
  console.log(`the transaction hash of the contract deployment is ${txHash}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

        function convertStringArrayToBytes32(array: string[]) {
            const bytes32Array = [];
            for (let index = 0; index < array.length; index++) {
              bytes32Array.push(ethers.utils.formatBytes32String(array[index]));
            }
            return bytes32Array;
          }