import Link from "next/link"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function TaskCard({task,projectid,usermode}){
    const router = useRouter();
    const [data, setData] = useState(null);


    const handleDelete = ()=>{
        fetch('http://localhost:5000/api/tasks/'+projectid+'?taskid='+task._id,{method:'DELETE'}).then((res)=>{
            if(res.status!=200) throw new Error(res.json().message);
            window.location.reload();
        }).catch((e)=>{
            console.error(e);
        })
    }
    
    const handleView = ()=>{
        fetch('http://localhost:5000/api/tasks/',).then((res)=>{
            if(res.status!=200) throw new Error(res.json().message);
            return res.json();
        })
        .then((res)=>{
            if (res.title && res.description) {
                setData(res);
              } else {
                throw new Error("Title and description not found");
              }
        })
        .catch((e)=>{
            console.error(e);
        })
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
             
                        {usermode!=0?
                            <div className="col-sm-6 col-md-4 d-flex flex-row-reverse">
                        <div className="btn btn-danger" onClick={handleDelete}>Remove</div>
                         <div className="btn btn-primary" data-toggle="modal" data-target="#viewModal" onClick={handleView}>View</div>
                         </div>
                        :
                        <div className="col-sm-6 col-md-4 d-flex flex-row-reverse">
                        <div className="btn btn-primary" onClick={()=>{router.push(`/projects/${projectid}/${task.id}`)}}>Open</div>
                            </div>
                    }


<div className="modal fade" id="viewModal" tabIndex="-1" role="dialog" aria-hidden="true">
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
                    {data?.employee}
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    reward:
                </div>
                <div className="col-sm-8">
                    {data?.reward} ETH
                </div>
            </div>
            <div className="row">
                <div className="col-sm-4">
                    deadline:
                </div>
                <div className="col-sm-8">
                    {data?.deadline}
                </div>
            </div>
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
