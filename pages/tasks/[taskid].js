// import Header from "@/components/Header";
// import { useRef } from "react";
// import { useMoralis,useWeb3Contract } from "react-moralis";
// import { abi,addresses } from "@/constants";
// import axios from "axios";
// import { useRouter } from "next/router";
// export default function SubmitWork(){
//     const router= useRouter();
//     const taskid = router.query;
//     const task = {
//         name:"Todo List",
//         description:"Develop a todo list which has the following features",
//         deadline:8,
//         reward:7,
//         testcases: [
//             {input:"shan",output:"Hey my name is shan"},
//             {input:"sasuke",output:"Hey my name is sasuke"},
//             {input:"naruto",output:"Hey my name is naruto"},
//         ]
//     }
//     const code = useRef(" ");
//       const submit = ()=>{
//       console.log("submitted"+code)
//     }
      

//     const {chainId:chainIdhex,isWeb3Enabled} = useMoralis();
//     const chainId= parseInt(chainIdhex);
//     const contractAddress= addresses[chainId]?addresses[chainId][0]:null;
//     const {runContractFunction:cancelTask} = useWeb3Contract(
//         {
//             abi:abi,
//             contractAddress:contractAddress,
//             functionName:"cancelTask",
//             chainId:chainId
//         }
//     )

//     const onCancel = async ()=>{
//         try{
//             await cancelTask();
//         }
//         catch(e){
//             console.error(e)
//         }
//     }



//     const testcases= task.testcases.map((testcase,key)=>{
//         return <div key={key} className="row my-3">
//             <div className="col-sm-6">
//                 {testcase.input}
//             </div>
//             <div className="col-sm-6">
//                 {testcase.output}
//             </div>
//         </div>
//     })
//     return<>
//     <Header/>
//     <div  className="card text-dark my-5">
//         <div className="card-body">
//             <div className="container">
//                 <div className="row my-3">
//                     <div className="col-sm-3 ">
//                         <b>Task Name:</b>
//                     </div>
//                     <div className="col-sm-9 ">
//                         {task.name}
//                     </div>
//                 </div>
//                 <div className="row my-3">
//                     <div className="col-sm-3 ">
//                         <b>Description:</b>
//                     </div>
//                     <div className="col-sm-9 ">
//                         {task.description} hrs
//                     </div>
//                 </div>
//                 <div className="row my-3">
//                     <div className="col-sm-3 ">
//                         <b>Remaining time:</b>
//                     </div>
//                     <div className="col-sm-9 ">
//                         {task.deadline} hrs
//                     </div>
//                 </div>
//                 <div className="row my-3">
//                     <div className="col-sm-3 ">
//                        <b> Reward:</b>
//                     </div>
//                     <div className="col-sm-9">
//                         {task.reward} ETH
//                     </div>
//                 </div>
//                 {/* <div className="row my-3">
//                     <div className="col-sm-3 ">
//                        <b> Test Cases:</b>
//                     </div>
//                     <div className="col-sm-9">
//                     <div className="row">
//                         <div className="col-sm-6">
//                             <b>Inputs</b>
//                         </div>
//                         <div className="col-sm-6">
//                             <b>Outputs</b>
//                         </div>
//                     </div>
//                         {testcases}
//                     </div>
//                 </div> */}
//                 <div className="row my-3">
//                     <div className="col-sm-3 ">
//                        <b> Your code:</b>
//                     </div>
//                     <div className="col-sm-9">
//                         <textarea className="form-control" ref={code} rows={6}/>
//                     </div>
//                 </div>
//                 <div className="row">
//                 <div className="col-lg-1 col-md-2 col-sm-3">
//                     <button className="btn btn-primary" onClick={submit}>Submit</button>
//                 </div>
//                 <div className="col-lg-1 col-md-2 col-sm-3">
//                     <button className="btn btn-danger" onClick={onCancel}>Cancel</button>
//                 </div>
//             </div>
//             </div>
            
//         </div>
//     </div>
//     </>
// }


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
    const [active,setActive] = useState(true);
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

    var {runContractFunction:cancelTask} = useWeb3Contract(
        {
            abi:abi,
            contractAddress:conaddr,
            functionName:"cancelTask",
            chainId:chainId,
        }
    )

    var {runContractFunction:isCancelled} = useWeb3Contract(
        {
            abi:abi,
            contractAddress:conaddr,
            functionName:"isCancelled",
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
            // console.log((resObj.deadline-Math.floor(Date.now() / 1000))>0 && !resObj.cancelled && !resObj.completed)
            setActive((resObj.deadline-Math.floor(Date.now() / 1000))>0 && !resObj.cancelled && !resObj.completed)
            setTask(resObj);
            });

            
            
            // console.log(resObj)
        }catch(e) {
            console.error(e.message);
        }
    },[conaddr]);

    

    const submit = async ()=>{
        fetch('http://localhost:5000/api/chatgpt/complete/'+router.query.taskid,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({address:conaddr,code:code.current.value})
        }).then((res)=>{
            if(!res.ok) throw new Error(res.json());
            return res.json();
        }).then((res)=>console.log(res)).catch((e)=>{
            console.error(e)
        })
        // try{
        //     const provider = new ethers.providers.Web3Provider(window.ethereum);
        //     const signer = provider.getSigner();
        //     const taskContract = new ethers.Contract(conaddr, abi, signer);
        //     const tx = await taskContract.completeTask();
        //     tx.wait(1);
        //     console.log(await taskContract.isCompleted());
        // } catch(e){
        //     console.log(e)
        // }
    }

    const handleDelete = ()=>{
        fetch('http://localhost:5000/api/tasks/'+router.query.projectid+'?taskid='+router.query.taskid,{method:'DELETE'}).then((res)=>{
            if(res.status!=200) throw new Error(res.json().message);
            router.push('/projects/'+router.query.projectid);
        }).catch((e)=>{
            console.error(e);
        })
    }
      

    const onCancel = async ()=>{
        if(conaddr!='0x0')
        try{

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            // const taskContract = new ethers.Contract(conaddr, abi, signer);
            // const tokenContract = new ethers.Contract(tokenAddress, BUSDabi, signer);

            // await tokenContract.mint(account, ethers.utils.parseUnits("5000"));
            // const approveTx = await tokenContract.connect(signer).approve(conaddr,ethers.utils.parseUnits("5000") );
            const txc = await cancelTask();
            if(txc===undefined) throw new Error("task could not be cancelled");
            handleDelete();
            
            // const balance = await tokenContract.balanceOf(conaddr);
            // console.log(balance.toString());
            // const tx = await taskContract.cancelTask();
            // tx.wait(1);
            // console.log(await taskContract.isCancelled());
            // const cancelled = await taskContract.isCancelled();
            // if(cancelled)
                // handleDelete();
        } catch(e){
            console.log(e)
        }
    }


    function formatTime(seconds) {
        const days = Math.floor(seconds / (24 * 60 * 60));
        const hours = Math.floor(seconds / (60 * 60)) % 24;
        const minutes = Math.floor(seconds / 60) % 60;
        const remainingSeconds = seconds % 60;
        return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
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
                        {task.description} 
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-sm-3 ">
                        <b>Remaining time:</b>
                    </div>
                    <div className="col-sm-9 ">
                        {task.deadline-Math.floor(Date.now() / 1000)>0?formatTime(task.deadline-Math.floor(Date.now() / 1000)):
                        "Time Limit Exceeded"} 
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
                <div className="row my-3">
                     <div className="col-sm-3 ">
                        <b> Your code:</b>
                     </div>
                     <div className="col-sm-9">
                         <textarea className="form-control" ref={code} rows={6}/>
                     </div>
                 </div>
                {console.log("heyyyy")}
               
                {active?
                <div className="row">
                <div className="col-lg-1 col-md-2 col-sm-3">
                    <button className="btn btn-primary" onClick={submit}>Submit task</button>
                </div>
                <div className="col-lg-1 col-md-2 col-sm-3">
                    <button className="btn btn-danger" data-toggle="modal" data-target="#cancelModal">Cancel task</button>
                </div>
                </div>
                :<></>
                }
            </div>
            
        </div>
    </div>
    {/* MODAL STARTS HERE */}
    <div className="modal fade" id="cancelModal" tabIndex="-1" role="dialog" aria-labelledby="cancelModal" aria-hidden="true">
    <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" > Cancel task</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="container">
            <div className='row d-flex justify-content-center'>
                <p className="card-text">Are you sure you want to Cancel this Task? This action cannot be reverted.</p>
            </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={onCancel}>Proceed</button>
      </div>
    </div>
    </div>
    </div>
    {/* MODAL ENDS HERE */}
    </>
}