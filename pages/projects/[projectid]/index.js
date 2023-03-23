import TaskList from "./TaskList"
import { useRouter } from "next/router"
import Header from "@/components/Header";
import { useState } from "react";
export default function Project(){
    const router = useRouter();
    const [usermode,setusermode] = useState(0);
    //0: user - cannot view tasks and can request to collaborate to the project
    //1: collaborator - can view the tasks he is assigned to
    //2: owner - can view the all tasks but cannot open them. Can also add tasks
    const project = {title:"todo app",description:"This is a todo app", collaborators:3,
        tasks:[
            {id:1,title:"todo",description:"develop a todo app",testcases:"testcases set 1",reward:5,deadline:8},
            {id:2,title:"company website",description:"develop a company website",testcases:"testcases set 2",reward:6,deadline:8},
            {id:3,title:"code",description:"code ",testcases:"testcases",reward:7,deadline:8},
        ]
    }

    return <><Header></Header>
    <div className="container p-5">
    <div className="card shadow text-dark my-5">
    <div className="card-header display-6 text-center">
        {project.title}
    </div>
    <div className="card-body">
        <div className="container">
     
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
                <TaskList tasks={project.tasks} usermode={usermode} projectid={router.query.projectid}/>
            </div>
        </div>
        
    </div>
</div>
</div>
</>
}