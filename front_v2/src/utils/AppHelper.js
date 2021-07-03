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
        updateStatus('Ready!');
      }

      function updateStatus(status) {
        const statusEl = document.getElementById('status');
        statusEl.innerHTML = status;
        console.log(status);
      }

      async function loadContract() {
        return await new window.web3.eth.Contract(tpAbi, cryptoTpAddress);
      }

const loadTp = () => {
  load();
  return window.contract !== undefined;
} 
export default loadTp
 
