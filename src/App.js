import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ethers } from 'ethers';

function App() {
  async function connect(){
    if(typeof window.ethereum!=undefined){
      window.ethereum.request({method:"eth_requestAccounts"}).then((e)=>console.log('connected'))
    }
    else{
      alert("please install metamask to connect your wallet")
    }
  }

  function fund(amount){
    console.log(`funding ${amount}...`);
    const provider = new ethers.providers.JsonRpcProvider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer)
  }

  return (
    <div>
    <button className='btn btn-sm btn-success' onClick={connect}>Connect</button>
    <button className='btn btn-sm btn-success' onClick={fund}>Fund</button>
    </div>
  );
}

export default App;
