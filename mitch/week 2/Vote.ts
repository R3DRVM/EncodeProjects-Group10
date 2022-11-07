import { ethers } from 'hardhat';
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv' 
dotenv.config()
import * as groupInfo from '../groupInfo'


async function main() {
  const provider = new ethers.providers.AlchemyProvider( "goerli", process.env.ALCHEMY_API_KEY)
  const voter = new ethers.Wallet(process.env.PRIVATE_KEY2 ?? "");
  const signer = voter.connect(provider);
  const balance = await signer.getBalance();
  console.log(`I am connected to ${signer.address}`)
  // TODO
  const ballotContractFactory =  new Ballot__factory(signer);
  const ballotContract = await ballotContractFactory.attach(groupInfo.redrumBallotContractAddress);
  const tx = await ballotContract.vote(0);
  await tx.wait()
  console.log(`transaction hash is ${tx.hash}`) 
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