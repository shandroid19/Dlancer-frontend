import Link from "next/link"

export default function TaskCard({task,projectid,usermode}){
    return <Link style={{textDecoration:"none"}} href={usermode==1?`/projects/${projectid}/${task.id}`:'#'}>
        <div  className="card shadow text-dark my-3">
        <div className="card-body">
            <div className="container ">
                <div className="row">
                    <div className="col-sm-6 col-md-2">
                        <b>Task Name:</b>
                    </div>
                    <div className="col-sm-6 col-md-2">
                        {task.title}
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
