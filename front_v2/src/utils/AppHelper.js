import Web3 from 'web3';
import tpAbi from './tp_abi';

const cryptoTpAddress = '0x04231AbfEd378BEf66B730D07680C5fF6534e515';

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
  return new window.web3.eth.Contract(tpAbi, cryptoTpAddress);
}


function loadTp () {
  console.log("loading...");
  load().then(r => console.log("Ready"));
  console.log('load');
}
export default loadTp

