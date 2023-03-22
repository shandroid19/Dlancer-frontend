import TaskList from "@/components/TaskList"
import { useRouter } from "next/router"
export default function Project(){
    const router = useRouter();
    const project = {title:"todo app",description:"This is a todo app", collaborators:3,
        tasks:[
            {id:1,title:"todo",description:"develop a todo app",testcases:"testcases set 1",reward:5,deadline:8},
            {id:2,title:"company website",description:"develop a company website",testcases:"testcases set 2",reward:6,deadline:8},
            {id:3,title:"code",description:"code ",testcases:"testcases",reward:7,deadline:8},
        ]
    }

    return <div className="container p-5">
    <div className="card text-dark my-5">
    <div className="card-body">
        <div className="container">
            <div className="row my-3">
                <div className="col-sm-3 ">
                    <b>Title:</b>
                </div>
                <div className="col-sm-9 ">
                    {project.title}
                </div>
            </div>
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
                    {project.collaborators}
                </div>
            </div>
            <div className="row d-flex justify-content-center">
                <h3 className="d-flex justify-content-center">Tasks</h3>
            </div>
            <div className="row d-flex justify-content-center">
                {console.log(router.query.projectid)}
                <TaskList task={project.tasks} projectid={router.query.projectid}/>
            </div>
        </div>
        
    </div>
</div>
</div>
}