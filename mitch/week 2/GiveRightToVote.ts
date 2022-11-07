import { ethers } from 'hardhat';
import { Ballot__factory } from "../typechain-types";
import * as dotenv from 'dotenv' 
dotenv.config()

async function main() {

    const contractAddress = "0x8f1c4b0bb325ba77029aa172cb7c48746ee8faed"
    const targetAddress = "0x06263e1A856B36e073ba7a50D240123411501611"
    const redrumAddress = "0xF185087bE41f7Ae83690998f97C8c512b3a55f00"
    const haliAddress = "0x88476d163Bc73f465eFd937EE60855e1BB1c3Bb7"
  const provider = new ethers.providers.AlchemyProvider( "goerli", process.env.ALCHEMY_API_KEY)
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "");
  const signer = wallet.connect(provider);
  const balance = await signer.getBalance();
  console.log(`I am connected to ${signer.address}`)
  // TODO
  const ballotContractFactory =  new Ballot__factory(signer);
  const ballotContract = await ballotContractFactory.attach(contractAddress);
  const tx = await ballotContract.giveRightToVote(redrumAddress) && await ballotContract.giveRightToVote(haliAddress)
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