import { ethers } from 'ethers';
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv' 
dotenv.config()

async function main() {

      const contractAddress = process.argv[2];
      const delegateAddress = process.argv[3];
      const provider = ethers.getDefaultProvider("goerli", {etherscan: process.env.ETHERSCAN_API_KEY});
      const wallet = ethers.Wallet.fromMnemonic(process.env.MNEMONIC ?? ""); // get wallet from metamask
      const signer = wallet.connect(provider);
      console.log(`I am connected to ${signer.address}`)
      const ballotContractFactory =  new Ballot__factory(signer);
      const ballotContract = await ballotContractFactory.attach(contractAddress)

      const delegate = await ballotContract.delegate(delegateAddress);
      await delegate.wait();
      console.log(`transaction hash is ${delegate.hash}`)
      const delegateVoter = await ballotContract.voters(delegateAddress);
      console.log(
        `Voter at ${delegateAddress} has voter weight of ${delegateVoter.weight}`
      );
      return;
      
    }
    
main().catch((error) => {
console.error(error);
process.exitCode = 1;
});
