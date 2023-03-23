import Link from "next/link"

const TaskCard = ({task,projectid})=>{
    console.log(projectid)
    return <Link style={{textDecoration:"none"}} href={`/projects/${projectid}/${task.id}`}>
        <div  className="card text-dark my-5">
        <div className="card-body">
            <div className="container ">
                <div className="row">
                    <div className="col-sm-6 col-md-2">
                        <b>Task Name:</b>
                    </div>
                    <div className="col-sm-6 col-md-2">
                        {task.name}
                    </div>
                    <div className="col-sm-6 col-md-2">
                        <b>Remaining time:</b>
                    </div>
                    <div className="col-sm-6 col-md-2">
                        {task.deadline} hrs
                    </div>
                    <div className="col-sm-6 col-md-2">
                       <b> Reward:</b>
                    </div>
                    <div className="col-sm-6 col-md-2">
                        {task.reward} ETH
                    </div>
                </div>
            </div>
        </div>
    </div>
    </Link>
}

export default function TaskList({task,projectid}){
    const listed = task.map((task,key)=>{
        return <TaskCard key={key} projectid={projectid} task={task}/>
    })
    return <div className="container m-3">
        {listed}
        <div className="row d-flex justify-content-center">
            <div className="col-sm-3">
                <Link href={`/projects/${projectid}/addtask`}>
                <div className="card">
                    <div className="card-body text-center bg-primary text-white">
                        Add task
                    </div>
                </div>
                </Link>
            </div>
        </div>
        </div>
}