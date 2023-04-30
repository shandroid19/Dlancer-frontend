import Header from "@/components/Header"
import TaskList from "@/pages/projects/[projectid]/TaskList"
import ProjectList from "./Projectlist"
import Link from "next/link"
import { useMoralis } from "react-moralis"
import { useState,useEffect } from "react"
// const data = [
//     {id:1,title:"todo",collaborators:2,tasks:5,status:1},
//     {id:2,title:"website",collaborators:2,tasks:6,status:0},
//     {id:3,title:"application",collaborators:2,tasks:5,status:1},
// ]

// const data = [
//     {id:1,title:"todo",collaborators:2,tasks:5,status:1,requiredkills:["golang","python"]},
//     {id:2,title:"website",collaborators:2,tasks:6,status:0,skills:["react.js","python"]},
//     {id:3,title:"application",collaborators:2,tasks:5,status:1,skills:["flutter","js"]},
//   ]
export default function ProjectsPage(){
    const {account}=useMoralis();
    const [ ownedProjects, setOwnedProjects ] = useState([]);   
    const [ otherProjects, setOtherProjects ] = useState([]);   
    useEffect(()=>{
    fetch('http://localhost:5000/api/projects?walletID='+account).then((res)=>{
        return res.json();
    }).then((res)=>{
        setOwnedProjects(res)
    }).catch((e)=>{
        console.error(e);
    })
  },[])
  
  useEffect(()=>{
    fetch('http://localhost:5000/api/projects/other?walletID='+account).then((res)=>{
        return res.json();
    }).then((res)=>{
        console.log(res)
        setOtherProjects(res)
    }).catch((e)=>{
        console.error(e);
    })
  },[])
    return <>
        <Header/>
        <div className="container my-5">
            <div className="row d-flex justify-content-center my-5">
                <div className="col-sm-6 d-flex justify-content-center"><h3>Your Projects</h3></div>
            </div>
            <div className="container p-5 bg-light">
                <ProjectList data={ownedProjects} mode={true}/>
                <div className="row d-flex justify-content-center">
                <div className="col-md-4 my-4">
                <Link href={`/projects/create`}>
                <div className="card">
                    <div className="card-body text-light bg-primary text-center">
                        Add project
                    </div>
                 </div>
                </Link>
                </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center my-5">
                <div className="col-sm-6 d-flex justify-content-center"><h3>Assigned tasks</h3></div>
            </div>
            <div className="container p-5 bg-light">
                {/* <ProjectList data={otherProjects} mode={false}/> */}
                <TaskList tasks={otherProjects} usermode={0} projectid={null}/>
            </div>
        </div>
        
    </>
}