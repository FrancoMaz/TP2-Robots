import Web3 from 'web3';
import tpAbi from './tp_abi';
 
var cryptoTpAddress = "0xa32c98518E31Da77FbFd5a3fA1A380Dd6d1aA16d";

async function loadWeb3() {
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.enable();
  }
}

async function load() {
  await loadWeb3();
  window.contract = await loadContract();
  console.log("Ready!");
  console.log(window.contract)
}

async function loadContract() {
  return await new window.web3.eth.Contract(tpAbi, cryptoTpAddress);
}
      

function loadTp () {
  console.log("loading...");
  load();
  console.log('load');
} 
export default loadTp
 
