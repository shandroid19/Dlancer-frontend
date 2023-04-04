import Header from "@/components/Header"
import TaskList from "@/pages/projects/[projectid]/TaskList"
import ProjectList from "./Projectlist"

// const data = [
//     {id:1,title:"todo",collaborators:2,tasks:5,status:1},
//     {id:2,title:"website",collaborators:2,tasks:6,status:0},
//     {id:3,title:"application",collaborators:2,tasks:5,status:1},
// ]
const data = [
    {id:1,title:"todo",collaborators:2,tasks:5,status:1,skills:["golang","python"]},
    {id:2,title:"website",collaborators:2,tasks:6,status:0,skills:["react.js","python"]},
    {id:3,title:"application",collaborators:2,tasks:5,status:1,skills:["flutter","js"]},
  ]
export default function ProjectsPage(){
    return <>
        <Header/>
        <div className="container my-5">
            <div className="row d-flex justify-content-center my-5">
                <div className="col-sm-6 d-flex justify-content-center"><h3>Assigned Projects</h3></div>
            </div>
            <div className="container p-5 bg-light">
                <ProjectList data={data}/>
                </div>
            <div className="row d-flex justify-content-center my-5">
                <div className="col-sm-6 d-flex justify-content-center"><h3>Your projects</h3></div>
            </div>
            <div className="container p-5 bg-light">
                <ProjectList data={data}/>
            </div>
        </div>
        
    </>
}