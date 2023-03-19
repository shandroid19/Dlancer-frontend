import Link from "next/link"

const TaskCard = ({task})=>{
    return <Link style={{textDecoration:"none"}} href={`/tasks/${task.id}`}>
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

export default function TaskList({data}){
    const listed = data.map((task,key)=>{
        return <TaskCard key={key} task ={task}/>
    })
    return <div className="container m-3">{listed}</div>
}