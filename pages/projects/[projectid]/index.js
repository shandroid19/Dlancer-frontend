import TaskList from "./TaskList"
import { useRouter } from "next/router"
import Header from "@/components/Header";
import { useState,useEffect } from "react";
import { useMoralis } from "react-moralis";
export default function Project(){
    const router = useRouter();
    const [usermode,setusermode] = useState(1);
    const [project,setProject]  = useState({})
    //0: user - cannot view tasks and can request to collaborate to the project
    //1: collaborator - can view the tasks he is assigned to
    //2: owner - can view the all tasks but cannot open them. Can also add tasks
    const {account} = useMoralis();
    // const project = {title:"todo app",description:"This is a todo app", collaborators:3,
    //     tasks:[
    //         {id:1,title:"todo",description:"develop a todo app",testcases:"testcases set 1",reward:5,deadline:8},
    //         {id:2,title:"company website",description:"develop a company website",testcases:"testcases set 2",reward:6,deadline:8},
    //         {id:3,title:"code",description:"code ",testcases:"testcases",reward:7,deadline:8},
    //     ]
    // }
    useEffect(()=>{
        fetch("http://localhost:5000/api/projects/"+router.query.projectid).then((res)=>{
        if(res.status!=200) throw new Error(res.json().message);
            return res.json();
        }).then((res)=>{
            setProject(res)
            if(res.ownerID.walletID===account)
                setusermode(2);
            else if(res.collaborators.some(collaborator => collaborator.walletID === account))
                setusermode(1);
            else    
                setusermode(0);
        })
        .catch((e)=>console.log(e.message))
    },[])
    console.log(usermode)
    const request = ()=>{
        fetch('http://localhost:5000/api/req',{
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({initiatorId:account,resolverId:project.ownerID,projectId:project._id})
                })
        .then((res)=>{return res.json()})
        .then((res)=>{if(res.status==200 || 204) console.log(res); else throw new Error(res.message);
         alert(res.message)})
            .catch((e)=>console.error(e))
        console.log("request for collaboration from account:",account)
    }

    return <><Header></Header>

    {/* MODAL STARTS HERE */}
    <div className="modal fade" id="projectRequestModal" tabIndex="-1" role="dialog" aria-labelledby="projectRequestModal" aria-hidden="true">
    <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Collaboration Request</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        Are you sure you want to be a Collaborator for this project?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
        <button type="button" className="btn btn-success" data-dismiss="modal" onClick={request}>Yes</button>
      </div>
    </div>
    </div>
    </div>
    {/* MODAL ENDS HERE */}

    <div className="container p-5">
    <div className="card shadow text-dark my-5">
    <div className="card-header display-6 text-center bg1">
        {project.projectName}
    </div>
    <div className="card-body">
        <div className="container">
     
            <div className="row my-3">
                <div className="col-sm-3 ">
                    <b>Description:</b>
                </div>
                <div className="col-sm-9 ">
                    {project.description}
                </div>
            </div>
            <div className="row my-3">
                <div className="col-sm-3 ">
                    <b>Collaborators:</b>
                </div>
                <div className="col-sm-9 ">
                    {project.collaborators?.length }
                </div>
            </div>
            {usermode>0?<div className="row d-flex justify-content-center">
                <h3 className="d-flex justify-content-center">Tasks</h3>
            </div>:<></>}
            <div className="row d-flex justify-content-center">
                <TaskList tasks={project.tasks} usermode={usermode} projectid={router.query.projectid}/>
            </div>
            {/* <div className="row d-flex justify-content-center">
                <div className="col d-flex justify-content-center">
                <button className="btn btn-primary" data-toggle="modal" data-target="#projectRequestModal">
                    Request to join
                </button>
                </div>
            </div> */}
        </div>
        
    </div>
</div>
</div>
</>
}
