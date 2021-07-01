
var cryptoTp;
var userAccount;

    function startApp(){
      var cryptoTpAddress = "0xa32c98518E31Da77FbFd5a3fA1A380Dd6d1aA16d";
      cryptoTp = new web3js.eth.Contract(tpABI, cryptoTpAddress);
      
      const ethereumButton = document.querySelector('.enableEthereumButton');
      const showAccount = document.querySelector('.showAccount');

      ethereumButton.addEventListener('click', () => {
        getAccount();
      });
      
      /*var accountInterval = setInterval( async function() {
        // Comprobar si la cuenta ha sido cambiada
      
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        console.log('addr: ', accounts[0]);
        if (accounts[0] !== userAccount) {
          userAccount = accounts[0];
          // Llamar la función que va a updatear la UI with de la nueva cuenta
          console.log('addr: ', userAccount);
        }
      }, 100);*/
      // 2. Crea el código `setInterval` justo aquí
    }


    async function getAccount() {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      showAccount.innerHTML = account;
    }

    /*function getCoursesList(id) {
      return cryptoTp.methods.courses(id).call()
    }

    function createCourse(id, name, prof, credits) {
      return cryptoTp.methods.createCourse(id, name, prof, credits, []).send()
    }*/

    ethereum.on('accountsChanged', function (accounts) {
      // Time to reload your interface with accounts[0]!
    });


    const loginApp = () => {
    window.addEventListener('load', async() => {
      // Aquí se comprueba si Web3.js ha sido inyecto por el navegador (Mist/MetaMask)
    console.log("verificando...")
      if (window.ethereum) {
        // Usar el proveedor Mist/MetaMask
        console.log("creando web3")
        web3js = new Web3(ethereum);
      } else {
        alert('Para continuar por favor instale el plugin de Metamask ')
      }
      // Ahora ya puedes acceder libremente a tu DApp y usar Web3:
      startApp()
    });
  }
