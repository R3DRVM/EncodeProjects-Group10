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
  // assignContract
  const ballotContractFactory =  new Ballot__factory(signer);
  const ballotContract = await ballotContractFactory.attach(groupInfo.redrumBallotContractAddress)
  // check the voter information with isVoter
  const  isVoter = async(voterAddress: any) => {
    let checkVoter =  await ballotContract.voters(voterAddress)
    return checkVoter
  }
  // check the proposals and turn them into strings
  const getProposals = async () => {
   const one = await ethers.utils.parseBytes32String((await ballotContract.proposals(0)).name)  
   const two = await ethers.utils.parseBytes32String((await ballotContract.proposals(1)).name)  
   const three = await ethers.utils.parseBytes32String((await ballotContract.proposals(2)).name)  
        return `${one}, ${two}, ${three}`
  }
  // return voter info based on address variables
  console.log(await isVoter(groupInfo.masterMitch))
  console.log(await isVoter(groupInfo.voterMitch))
  // get the proposals and the winning proposal, log to console
  const proposals = await getProposals();
  const winningProposal = await ballotContract.winningProposal();
  const decodedWinningProposal = await ethers.utils.parseBytes32String((await ballotContract.proposals(winningProposal)).name)
  console.log(`The current proposals are ${proposals} with a vote count of ${(await ballotContract.proposals(0)).voteCount}, ${(await ballotContract.proposals(1)).voteCount}, ${(await ballotContract.proposals(2)).voteCount} respectively.`)
  console.log(`The current winning proposals is ${decodedWinningProposal}`)
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
          
