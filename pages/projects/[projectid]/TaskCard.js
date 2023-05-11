import Link from "next/link"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { abi,addresses} from "@/constants";
import { ethers } from "ethers";


export default function TaskCard({task,projectid,usermode}){
    const router = useRouter();
    const [data, setData] = useState(null);
    const {chainId:chainIdhex,isWeb3Enabled} = useMoralis();
    const chainId = parseInt(chainIdhex);
    const [fileContent, setFileContent] = useState('');

  const handleDownload = async () => {
    if (data.completed) {
      fetch(`http://localhost:5000/api/projects/gettask/${task._id}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.json().message);
        return res.json();
      })
      .then((taskdata) => {
        setFileContent(taskdata.code);
        const element = document.createElement('a');
      const file = new Blob([taskdata.code], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${task.taskName}.txt`;
      document.body.appendChild(element);
      element.click();
      })
      .catch((e) => {
        console.error(e)
      })
      
      
    }
  };    
    const {runContractFunction:getValues} = useWeb3Contract(
        {
            abi:abi,
            contractAddress:task.contractAddress,
            functionName:"getValues",
            chainId:chainId,
        }
    )

    const {runContractFunction:getRefund} = useWeb3Contract(
        {
            abi:abi,
            contractAddress:task.contractAddress,
            functionName:"getRefund",
            chainId:chainId,
        }
    )
    const handleDelete = ()=>{
        fetch('http://localhost:5000/api/tasks/'+projectid+'?taskid='+task._id,{method:'DELETE'}).then((res)=>{
            if(res.status!=200) throw new Error(res.json().message);
            window.location.reload();
        }).catch((e)=>{
            console.error(e);
        })
    }
    
    const handleRefund= ()=>{
        getRefund().then((res)=>{
            if(!res) throw new Error("Refund not successful");
            handleDelete();
        }).catch((e)=>{
            console.error(e);
        })
    }

    const handleView = async()=>{
        // fetch('http://localhost:5000/api/tasks/',).then((res)=>{
        //     if(res.status!=200) throw new Error(res.json().message);
        //     return res.json();
        // })
        // .then((res)=>{
        //     if (res.title && res.description) {
        //         setData(res);
        //       } else {
        //         throw new Error("Title and description not found");
        //       }
        // })
        // .catch((e)=>{
        //     console.error(e);
        // })
        // const provider = ethers.getDefaultProvider();
        // const taskContract = new ethers.Contract(task.contractAddress, abi,provider);
        // console.log(taskContract)
        try{
           const arraydata = await getValues();
           const resObj = {
            title:arraydata[0],
            description:arraydata[1],
            employee:arraydata[2],
            reward:ethers.utils.formatEther(arraydata[3]),
            deadline:arraydata[4].toString(),
            cancelled:arraydata[5],
            completed:arraydata[6]    
            }
            setData(resObj);
        }catch(e) {
            console.error(e.message)
        }
    }
    function formatTime(seconds) {
        const days = Math.floor(seconds / (24 * 60 * 60));
        const hours = Math.floor(seconds / (60 * 60)) % 24;
        const minutes = Math.floor(seconds / 60) % 60;
        const remainingSeconds = seconds % 60;
        return `${days.toString().padStart(2, '0')}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      }
       return <div  className="card shadow text-dark my-3">
        <div className="card-body">
            <div className="container ">
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6 col-md-2">
                        <b>Task Name:</b>
                    </div>
                    <div className="col-sm-6 col-md-2">
                        {task.taskName}
                    </div>
                    <div className="col-sm-6 col-md-2">
                        <b>Freelancer:</b>
                    </div>
                    <div className="col-sm-6 col-md-2">
                        {task.freelancer.slice(0,6)}...{task.freelancer.slice(task.freelancer.length-4)}
                    </div>
                   

             
                        {usermode==2?
                            <div className="col-sm-6 col-md-4 d-flex flex-row-reverse">
                        {/* <div className="btn btn-danger" onClick={handleDelete}>Remove</div> */}
                         <div className="btn btn-primary" data-toggle="modal" data-target={`#viewModal${task._id}`} onClick={handleView}>View</div>
                         </div>
                        :usermode==1?
                        <div className="col-sm-6 col-md-4 d-flex flex-row-reverse">
                        <div className="btn btn-primary" onClick={()=>{router.push(`/projects/${projectid}/${task._id}`)}}>Open</div>
                            </div>:<></>
                    }


<div className="modal fade" id={`viewModal${task._id}`} tabIndex="-1" role="dialog" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{data?.title}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="container">
            <div className="row">
                <div className="col-sm-4">
                    description:
                </div>
                <div className="col-sm-8">
                    {data?.description}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    Freelancer:
                </div>
                <div className="col-sm-8">
                {data?.employee.slice(0,6)}...{data?.employee.slice(data?.employee.length-4)}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    reward:
                </div>
                <div className="col-sm-8">
                    {data?.reward} USD
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    deadline:
                </div>
                <div className="col-sm-8">
                    {(data?.deadline-Math.floor(Date.now() / 1000))>0?formatTime(data?.deadline-Math.floor(Date.now() / 1000)):"Exceeded"}
                </div>
            </div>
            {data?.completed? <button className="btn btn-sm btn-primary d-block my-1" onClick={handleDownload}>Download code</button>:<></>}
            {data?.completed?<span className="badge bg-success">Completed</span>:<></>}
            {data?.completed?<></>:<></>}
            {(data?.deadline-Math.floor(Date.now() / 1000))<0 && !data?.cancelled?
            <div className="row d-flex flex-row-reverse d-flex mt-2">
                <div className="col">
                    <button className="btn btn-primary btn-sm" data-dismiss="modal" onClick={handleRefund}>
                        Reclaim
                    </button>
                    </div>
            </div>
            :<></>}
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>


                </div>
            </div>
            

        </div>

        


    </div>
}
