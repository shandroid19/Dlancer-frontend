// import '@/styles/globals.css'
// import 'bootstrap/dist/css/bootstrap.css'
// import { NotificationProvider } from 'web3uikit'
// import { MoralisProvider } from 'react-moralis'
// export default function App({ Component, pageProps }) {
//   const message =  <div className="container p-5">
//   <div className='row d-flex justify-content-center'>
//     <div className='col-sm-6'>
//       <div className='container'>
//   <div className='card shadow'>
//     <p>Connect to your wallet to Signin</p>
//     </div>
//     </div>
//     </div>
//     </div>
//     </div>
//   return <MoralisProvider initializeOnMount={false}>
//     <NotificationProvider>
//     <Component {...pageProps} />
//     </NotificationProvider>
//     </MoralisProvider>
// }
import '@/styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import { NotificationProvider } from 'web3uikit'
import { MoralisProvider, useMoralis } from 'react-moralis'
import {ConnectButton} from 'web3uikit'
import {router} from 'next/router'

function AppWrapper({ Component, pageProps }) {
  const { isWeb3Enabled,account } = useMoralis()

  // Show "please connect wallet to continue" page if wallet is not connected
  if (!isWeb3Enabled) {
    const message = (
      <div className="container p-5">
        <div className='row d-flex justify-content-center'>
          <div className='col-sm-6'>
            <div className='container'>
              <div className='card shadow'>
                <div className='card-body'>
                  <div className='container'>
                  <div className='row'>
                <h3 className='text-center'>Connect to your wallet to Signin</h3>
                </div>
                <div className='row d-flex justify-content-center py-5'>
                  <div className='col-sm-6 d-flex justify-content-center'>
                <ConnectButton/>
                </div>
                </div>
                </div>
                </div>
                {/* <button onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}>
                  Connect
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
    return message
  }else if(router.pathname!=='/'){
    fetch('http://localhost:5000/api/users/signin/'+account).then((res)=>{
      if(res.status!=200) throw new Error("User not registered")
      console.log("successfully logged in");
    }).catch((e)=>{
      console.error(e);
      // router.push('/');
    })
  }
  else if(router.pathname==='/'){
    fetch('http://localhost:5000/api/users/signin/'+account).then((res)=>{
      if(res.status!=200) throw new Error("User not registered")
      console.log("successfully logged in");
      router.push('/users/'+account);
    }).catch((e)=>{
      console.error(e);
    })
  }

  // If wallet is connected, render the Component
  return (
    <NotificationProvider>
      <Component {...pageProps} />
    </NotificationProvider>
  )
}

export default function App(props) {
  return (
    <MoralisProvider initializeOnMount={false}>
      <AppWrapper {...props} />
    </MoralisProvider>
  )
}
