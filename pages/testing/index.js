import Header from "@/components/Header";
import { useMoralis,useWeb3Contract,useWeb3ExecuteFunction } from "react-moralis";
import { abi,addresses,BUSDabi } from "@/constants";
import { ethers } from "ethers";

export default function Testing(){
    const tokenAddress = '0x21E0F5d54E45CE43f465a19AA3668F03be118CfC'

    const {chainId:chainIdhex,isWeb3Enabled} = useMoralis();
    const chainId= parseInt(chainIdhex);
    const contractAddress= addresses[chainId]?addresses[chainId][addresses[chainId].length-1]:null;
    const {account} = useMoralis();

    const {error,runContractFunction:activateTask} = useWeb3Contract(
        {
            abi:abi,
            contractAddress:contractAddress,
            functionName:"activateTask",
            chainId:chainId,
            from:account
        }
    )

    const {runContractFunction:isActivated} = useWeb3Contract(
        {
            abi:abi,
            contractAddress:contractAddress,
            functionName:"isActivated",
            chainId:chainId,
        }
    )

    const {runContractFunction:completeTask} = useWeb3Contract(
        {
            abi:abi,
            contractAddress:contractAddress,
            functionName:"completeTask",
            chainId:chainId,
        }
    )


    
    // approve the spender to spend tokens
    

    const onActivate = async ()=>{
        
        try {
            //after deploying the contract on the backend, execute below functions using contractAddress obtained from serverside
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const taskContract = new ethers.Contract(contractAddress, abi, signer);
            const tokenContract = new ethers.Contract(tokenAddress, BUSDabi, signer);
            const approveTx = await tokenContract.connect(signer).approve(contractAddress,ethers.utils.parseUnits("5000") );
            const tx = await taskContract.activateTask();
            const result = await taskContract.isActivated();
            console.log(result)
            // const res = await tokenContract.balanceOf(contractAddress);
            // const res = await tokenContract.allowance(account,contractAddress);
            
            // console.log(ethers.utils.formatEther(res));
            console.log(await isActivated());
        } catch (error) {
            console.error(error);
        }
    }

    const onComplete = async ()=>{
        
        try {
            // console.log(ethers.utils.formatEther(res));
            // console.log(await completeTask());
            const taskCon = new ethers.Contract(contractAddress, abi, signer);
            console.log(await taskCon.isCompleted());

        } catch (error) {
            console.error(error);
        }
    }

    return<>
    <Header/>
    <div  className="card text-dark my-5">
        <div className="card-body">
            <div className="container">
                <div className="row">

                <div className="col-lg-1 col-md-2 col-sm-3">
                    <button className="btn btn-danger" onClick={onActivate}>Button</button>
                </div>

                <div className="col-lg-1 col-md-2 col-sm-3">
                    <button className="btn btn-danger" onClick={onComplete}>complete</button>
                </div>
            </div>
            </div>
            
        </div>
    </div>
    </>
}