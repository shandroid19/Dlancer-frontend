import TaskCard from "./TaskCard"
import Link from "next/link"

export default function TaskList({tasks,projectid,usermode}){
    //if usermode is 0 then display request button
    //if usermode is 1 then do not display any button
    //if usermode is 2 then display add task button
    const listed = tasks.map((task,key)=>{
        return <TaskCard key={key} usermode={usermode} projectid={projectid} task={task}/>
    })
    return <><div className="container m-3">
        {listed}
        <div className="row d-flex justify-content-center">
            <div className="col-sm-3">
                {usermode==2?<Link href={`/projects/${projectid}/addtask`}>
                    <div className="card shadow">
                        <div className="card-body text-center bg-primary text-white">
                            Add task
                        </div>
                    </div>
                </Link>:usermode==1?<></>:
                <a>
                <div className="card  shadow" data-toggle="modal" data-target="#projectRequestModal">
                    <div className="card-body text-center bg-primary text-white">
                        Request 
                    </div>
                </div>
            </a>}
            </div>
        </div>
        </div>

        
        </>
}

