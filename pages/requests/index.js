import Header from "@/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
export default function Requests(){
    // const requests = [
    //     {project:1,userid:1,invite:1},
    //     {project:2,userid:2,invite:0},
    //     {project:3,userid:3,invite:1},
    //     {project:4,userid:4,invite:0},
    //     {project:5,userid:5,invite:1}
    // ];
    const [requests,setRequests] = useState([]);
    const {account} = useMoralis();
    useEffect(()=>{
        fetch("http://localhost:5000/api/req/"+account).then((res)=>{
            if(res.status!=200) throw new Error(res.json().message);
            return res.json();
        }).then((res)=>{
            console.log(res)
            setRequests(res);
        }).catch((e)=>console.log(e))
    },[])

    const requestlist = requests.map((request)=>{
        const {mode,_doc,username,walletID} = request;
        const projectid = _doc.project._id;
        const project = _doc.project.projectName;
        const userid = _doc.user;
        return <div className="row d-flex align-items-center ">
            <div className="col-sm-8">
            <Link href = {mode?`/projects/${project}`:`/users/${userid}`}>
                <div className="card-body text-center">
                    {!mode?<p><Link href={`users/${walletID}`}>{username}</Link> has invited you to contribute to the project "{project}"</p>:<p>{username} has sent a request to contribute to the project {project}</p>}
                </div>
            </Link>
            </div>
            <div className="col-sm-2  col-6 d-flex justify-content-center">
                <button className="btn btn-primary">
                Accept
                </button>
            </div>
            <div className="col-sm-2  col-6 d-flex justify-content-center">
                <button className="btn btn-danger">
                Reject
                </button>
            </div>
            <hr/>
        </div>
    })
    return <><Header/>
        <div className="container p-5">
            <div className="row d-flex justify-content-center">
            <div className="col-sm-6">
            <div  className="card">
                <div className="card-header">
                    Requests
                </div>
                <div style={{height:'70vh',overflowY:'scroll',overflowX:'hidden'}} className="card-body">
                    <div className="container">
                        {requestlist}
                    </div>
                </div>
            </div>
            </div>
            </div>
        </div>
    </>

}