import Header from "@/components/Header"
import TaskList from "@/components/TaskList"

const data = [
    {id:1,name:"todo",description:"develop a todo app",testcases:"testcases set 1",reward:5,deadline:8},
    {id:2,name:"company website",description:"develop a company website",testcases:"testcases set 2",reward:6,deadline:8},
    {id:3,name:"code",description:"code ",testcases:"testcases",reward:7,deadline:8},
]
export default function SubmitWork(){
    return <>
        <Header/>
        <div className="container my-5">
            <div className="row d-flex justify-content-center">
                <div className="col-sm-6 d-flex justify-content-center"><h3>Assigned Tasks</h3></div>
            </div>
            <div className="row d-flex justify-content-center">
                <TaskList data={data}/>
            </div>
            <div className="row d-flex justify-content-center">
                <div className="col-sm-6 d-flex justify-content-center"><h3>Your Tasks</h3></div>
            </div>
            <div className="row d-flex justify-content-center">
                <TaskList data={data}/>
            </div>
        </div>
        
    </>
}