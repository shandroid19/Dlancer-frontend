import Header from "@/components/Header";
import { useEffect, useRef, useState } from "react";
import { useERC20Balances, useMoralis,useWeb3Contract } from "react-moralis";
import { abi,addresses,BUSDabi } from "@/constants";
import { useRouter } from "next/router";
import { ethers } from "ethers";

export default function SubmitWork(){
    const {chainId:chainIdhex,isWeb3Enabled} = useMoralis();
    const chainId= parseInt(chainIdhex);
    const contractAddress= addresses[chainId]?addresses[chainId][addresses[chainId].length-1]:null;
    const {account} = useMoralis();
    const router= useRouter();
    const tokenAddress = '0x21E0F5d54E45CE43f465a19AA3668F03be118CfC'
    const params = router.query;
    const [task,setTask] = useState({});
    const [conaddr,setConaddr] = useState('0x0');
    // const task = {
    //     name:"Todo List",
    //     description:"Develop a todo list which has the following features",
    //     deadline:8,
    //     reward:7,
    //     testcases: [
    //         {input:"shan",output:"Hey my name is shan"},
    //         {input:"sasuke",output:"Hey my name is sasuke"},
    //         {input:"naruto",output:"Hey my name is naruto"},
    //     ]
    // }
    const code = useRef(" ");

    useEffect(() => {
        if (router.query.taskid) {
          fetch(`http://localhost:5000/api/projects/gettask/${router.query.taskid}`)
            .then((res) => {
              if (!res.ok) throw new Error(res.json().message);
              return res.json();
            })
            .then((task) => {
              setConaddr(task.contractAddress)
            })
            .catch((e) => {
              console.error(e)
            })
        }
      }, [router.query.taskid])
    
    var {runContractFunction:getValues} = useWeb3Contract(
        {
            abi:abi,
            contractAddress:conaddr,
            functionName:"getValues",
            chainId:chainId,
        }
    )
    useEffect(()=>{
        try{
            if(conaddr!='0x0')
                getValues().then((arraydata)=>{
                console.log(arraydata)
                const resObj = {
                taskName:arraydata[0],
                description:arraydata[1],
                employee:arraydata[2],
                reward:ethers.utils.formatEther(arraydata[3]),
                deadline:arraydata[4].toString(),
                cancelled:arraydata[5],
                completed:arraydata[6]    
                };
            console.log(resObj)
            setTask(resObj);
            });
            
            // console.log(resObj)
        }catch(e) {
            console.error(e.message);
        }
    },[conaddr]);

    

    const submit = async ()=>{
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const taskContract = new ethers.Contract(contractAddress, abi, signer);
            const tx = await taskContract.completeTask();
            tx.wait(1);
            console.log(await taskContract.isCompleted());
        } catch(e){
            console.log(e)
        }
    }

    const handleDelete = ()=>{
        fetch('http://localhost:5000/api/tasks/'+projectid+'?taskid='+task._id,{method:'DELETE'}).then((res)=>{
            if(res.status!=200) throw new Error(res.json().message);
            window.location.reload();
        }).catch((e)=>{
            console.error(e);
        })
    }
      

    const onCancel = async ()=>{
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const taskContract = new ethers.Contract(contractAddress, abi, signer);
            const tx = await taskContract.cancelTask();
            tx.wait(1);
            console.log(await taskContract.isCancelled());
            const cancelled = await taskContract.isCancelled();
            if(cancelled)
                handleDelete();
        } catch(e){
            console.log(e)
        }
    }



    // const testcases= task.testcases.map((testcase,key)=>{
    //     return <div key={key} className="row my-3">
    //         <div className="col-sm-6">
    //             {testcase.input}
    //         </div>
    //         <div className="col-sm-6">
    //             {testcase.output}
    //         </div>
    //     </div>
    // })

    return<>
    <Header/>
    <div  className="card text-dark my-5">
        <div className="card-body">
            <div className="container">
                <div className="row my-3">
                    <div className="col-sm-3 ">
                        <b>Task Name:</b>
                    </div>
                    <div className="col-sm-9 ">
                        {task.taskName}
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-sm-3 ">
                        <b>Description:</b>
                    </div>
                    <div className="col-sm-9 ">
                        {task.description} hrs
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-sm-3 ">
                        <b>Remaining time:</b>
                    </div>
                    <div className="col-sm-9 ">
                        {task.deadline} hrs
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-sm-3 ">
                       <b> Reward:</b>
                    </div>
                    <div className="col-sm-9">
                        {task.reward} USD
                    </div>
                </div>
                {/* <div className="row my-3">
                    <div className="col-sm-3 ">
                       <b> Test Cases:</b>
                    </div>
                    <div className="col-sm-9">
                    <div className="row">
                        <div className="col-sm-6">
                            <b>Inputs</b>
                        </div>
                        <div className="col-sm-6">
                            <b>Outputs</b>
                        </div>
                    </div>
                        {testcases}
                    </div>
                </div> */}
                <div className="row my-3">
                    <div className="col-sm-3 ">
                       <b> Your code:</b>
                    </div>
                    <div className="col-sm-9">
                        <textarea className="form-control" ref={code} rows={6}/>
                    </div>
                </div>
                <div className="row">
                <div className="col-lg-1 col-md-2 col-sm-3">
                    <button className="btn btn-primary" onClick={submit}>Submit task</button>
                </div>
                <div className="col-lg-1 col-md-2 col-sm-3">
                    <button className="btn btn-danger" onClick={onCancel}>Cancel task</button>
                </div>
            </div>
            </div>
            
        </div>
    </div>
    </>
}