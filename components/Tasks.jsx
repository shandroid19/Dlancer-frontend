import { useMoralis, useWeb3Contract } from "react-moralis"
import {abi,addresses} from '../constants/index'
import { ethers } from "ethers";
import {useNotification} from "web3uikit"
export default function Task(){
    const {chainId:chainIdhex,isWeb3Enabled} = useMoralis();
    const chainId= parseInt(chainIdhex);
    const reward = ethers.utils.parseEther("5");
    const contractAddress= addresses[chainId]?addresses[chainId][0]:null;
    const dispatch = useNotification();
    const {runContractFunction:activateTask} = useWeb3Contract(
        {
            abi:abi,
            contractAddress:contractAddress,
            functionName:"activateTask",
            params:{_reward:reward},
            chainId:chainId,
            msgValue:reward
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

    const activatesuccess = async(tx)=>{
        await tx.wait(1);
        dispatch({
            type:"info",
            message:"Transaction complete",
            title:"transaction notification",
            position:"topR",
            icon:"bell"
        })
    }
    const {runContractFunction:cancelTask} = useWeb3Contract(
        {
            abi:abi,
            contractAddress:contractAddress,
            functionName:"cancelTask",
            chainId:chainId,
        }
    )
    return(<div className="container bg-dark ">
        <div className="row justify-content-center d-flex">
            <div className="col-sm-3">
        <button className="btn btn-sm btn-primary" onClick={async()=>{
            if(isWeb3Enabled){
            activateTask({onSuccess:activatesuccess});}
            }}>Activate</button>
            </div>
            <div className="col-sm-3">
    <button className="btn btn-sm btn-success" onClick={async()=>{
            if(isWeb3Enabled){
            const completed = await completeTask();
            console.log(completed)
        }
            }}>complete</button>
</div>
<div className="col-sm-3">
    <button className="btn btn-sm btn-danger" onClick={async()=>{
            if(isWeb3Enabled){
            const cancelled = await cancelTask();
            console.log(cancelled)
        }
            }}>cancel</button>
        </div>
        </div>
        
    </div>)
}