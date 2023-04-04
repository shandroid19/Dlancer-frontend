import Link from "next/link"
import "../../styles/Projects.module.css"
import ProjectCard from "../search/ProjectCard"
// const ProjectCard = ({project})=>{
//     return <div className="col-md-4 my-4"><Link href={`/projects/${project.id}`}>
//         <div className="card">
//             <div className="card-body">
//                 <div className="container">
//                     <div className="row d-flex justify-content-center ">
//                             <div className='row'>
//                                 <div className="col-sm-6">
//                                    Title:
//                                 </div>
//                                 <div className="col-sm-6">
//                                     {project.title}
//                                 </div>
//                                 <div className="col-sm-6">
//                                     tasks:
//                                 </div>
//                                 <div className="col-sm-6">
//                                     {project.tasks}
//                                 </div>
//                                 <div className="col-sm-6">
//                                     Collaborators:
//                                 </div>
//                                 <div className="col-sm-6">
//                                     {project.collaborators}
//                                 </div>
//                                 <div className="col-sm-6">
//                                     Status:
//                                 </div>
//                                 <div className="col-sm-6">
//                                     {project.status?<span className="badge bg-success">Open</span>:<span className="badge bg-danger">Closed</span>}
//                                 </div>
//                             </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </Link>
//         </div>

// }

export default function ProjectList({data}){
    const listed = data.map((project,key)=>{
        // return <ProjectCard key={key} project ={project}/>
        return <div className="col-md-4 my-4"><ProjectCard key={key} project={project}/></div>
    })
    return <div className="row d-flex justify-content-center">{listed}
    <div className="col-md-4 my-4">
        <Link href={`/projects/create`}>
        <div className="card">
            <div className="card-body text-light bg-primary text-center">
                Add project
            </div>
        </div>
        </Link>
    </div>
    </div>
}