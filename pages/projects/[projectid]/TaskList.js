import TaskCard from "./TaskCard"
import Link from "next/link"

export default function TaskList({tasks,projectid,usermode,mode=false}){
    //if usermode is 0 then display request button
    //if usermode is 1 then do not display any button
    //if usermode is 2 then display add task button
    const listed = usermode>0?tasks?.map((task,key)=>{
        return <TaskCard key={key} usermode={usermode} projectid={!projectid?task.projectID:projectid} task={task}/>
    }):<></>
    return <><div className="container m-3" >
        <div className="row d-flex justify-content-center mb-4" style={{maxHeight:"60vh",overflowY:'scroll'}}>
        {!tasks?.length?<p className="text-center py-5">Tasks have not been created yet</p>:listed}
       </div>
        <div className="row d-flex justify-content-center">
            <div className="col-sm-3">
                {usermode==2?<Link href={`/projects/${projectid}/addtask`}>
                    <div className="card shadow">
                        <div className="card-body text-center bg-primary text-white">
                            Add task
                        </div>
                    </div>
                </Link>:
                usermode==0 && mode?
                <div className="card shadow">
                        <button className=" btn text-center btn-primary text-white" data-toggle="modal" data-target="#projectRequestModal">
                            Request to join
                        </button>
                    </div>:<></>
                // usermode==1?<></>:
            //     <a>
            //     <div className="card  shadow" data-toggle="modal" data-target="#projectRequestModal">
            //         <div className="card-body text-center bg-primary text-white">
            //             Request 
            //         </div>
            //     </div>
            // </a>
            }
            </div>
        </div>
        </div>

        
        </>
}

