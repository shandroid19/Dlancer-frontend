import { useRef } from "react";
import {useWeb3Contract,useMoralis} from 'react-moralis'
import { abi,addresses,BUSDabi } from "@/constants";
import { ethers } from "ethers";
export default function AddTask(){
    const tokenAddress = '0x21E0F5d54E45CE43f465a19AA3668F03be118CfC'
    const taskname = useRef("");
    const description = useRef("");
    const testCases = useRef([]);
    const contributor = useRef("");
    const reward = useRef("");
    const timelimit = useRef(0);
    const {chainId:chainIdhex} = useMoralis();
    const chainId = parseInt(chainIdhex);
    const contractAddress= addresses[chainId]?addresses[chainId][addresses[chainId].length-1]:null;
    const {runContractFunction:activateTask} = useWeb3Contract(
        {
            abi:abi,
            contractAddress:contractAddress,
            functionName:"activateTask",
            
            params:{_reward: ethers.utils.parseEther(reward.current?.value || "0")},
            chainId:chainId,
            
            msgValue:ethers.utils.parseEther(reward.current?.value || "0")
        }
    )

        const onActivate = async ()=>{
        
            try {
                //after deploying the contract on the backend, execute below functions using contractAddress obtained from serverside
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const taskContract = new ethers.Contract(contractAddress, abi, signer);
                const tokenContract = new ethers.Contract(tokenAddress, BUSDabi, signer);
                // const approveTx = await tokenContract.connect(signer).approve(contractAddress,ethers.utils.parseUnits("5000") );
                const tx = await taskContract.activateTask();
                const result = await taskContract.isActivated();
                console.log(result)
            } catch (error) {
                console.error(error);
            }
        }
   

    const TestCase = ()=>{
        return <div className="col-sm-10">
        <div className="form-group row my-3">
            <label htmlFor="title" className="col-sm-1 col-form-label">Input</label>
                <div className="col-sm-5">
                    <textarea type="text" className="form-control" />
                </div>
            <label htmlFor="title" className="col-sm-1 col-form-label">Output</label>
                <div className="col-sm-5">
                    <textarea type="text" className="form-control"/>
                </div>
            </div>
        </div>
    }


    return (
        <div className="container p-5">
        <div className="card">
            <div className="card-header">
                <div className="display-6 text-center">Create a Task</div>
            </div>
            <div className="card-body">
                <div className="container">
                    <div className="form-group row my-3">
                        <label htmlFor="title" className="col-sm-2 col-form-label">Task name</label>
                        <div className="col-sm-10">
                            <input ref={taskname} type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row my-3">
                        <label htmlFor="description" className="col-sm-2 col-form-label">Description</label>
                        <div className="col-sm-10">
                            <textarea type="text" ref={description} rows={4} className="form-control" />
                        </div>
                    </div>
                    <div className="form-group row my-3">
                        <label htmlFor="test cases" className="col-sm-2 col-form-label">Test Cases</label>
                        <TestCase></TestCase>
                    </div>
                    <div className="form-group row my-3">
                        <label htmlFor="time-limit" className="col-sm-2 col-form-label">Time limit</label>
                        <div className="col-sm-4"><input ref={timelimit} type="number" placeholder="in hrs" className="form-control"/></div>
                        
                        <label htmlFor="time-limit" className="col-sm-2 col-form-label">Reward</label>
                        <div className="col-sm-4"><input ref={reward} type="text" placeholder="in ETH" className="form-control"/></div>
                    </div>
                    <div className="form-group row my-3">
                    <label htmlFor="contributor" ref={contributor} className="col-sm-2 col-form-label">Contributor</label>
                        <div className="col-sm-4">
                        <select className="form-control my-1 mr-sm-2" >
                            <option defaultValue="0xFABB0ac9d68B0B445fB7357272Ff202C5651694a">Admin</option>
                            <option value="0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec">employee</option>
                            <option value="0x89E2Da7cAC0360e7796722bA47b40c46A9CFEF39">testnet</option>
                            <option value="0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097">owner</option>
                        </select>
                        </div>
                    </div>
                    <div className = "form-group row my-3 d-flex flex-row-reverse">
                        <div className="col-sm-1">
                        <button className="btn btn-primary" onClick={async()=>await onActivate()}>Create</button>
                        </div>
                        <div className="col-sm-1">
                        <button className="btn btn-danger ">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}