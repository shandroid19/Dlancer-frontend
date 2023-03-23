import TaskCard from "./TaskCard"
import Link from "next/link"

export default function TaskList({tasks,projectid,usermode}){
    const listed = tasks.map((task,key)=>{
        return <TaskCard key={key} usermode={usermode} projectid={projectid} task={task}/>
    })
    return <div className="container m-3">
        {listed}
        <div className="row d-flex justify-content-center">
            <div className="col-sm-3">
                <Link href={`/projects/${projectid}/addtask`}>
                    <div className="card shadow">
                        <div className="card-body text-center bg-primary text-white">
                            Add task
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        </div>
}