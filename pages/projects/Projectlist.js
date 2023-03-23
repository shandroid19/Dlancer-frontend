import Link from "next/link"
import "../../styles/Projects.module.css"
const ProjectCard = ({project})=>{
    return <div className="col-md-4"><Link href={`/projects/${project.id}`}>
        <div className="card">
            <div className="card-body">
                <div className="container">
                    <div className="row d-flex justify-content-center ">
                            <div className='row'>
                                <div className="col-sm-6">
                                   Title:
                                </div>
                                <div className="col-sm-6">
                                    {project.title}
                                </div>
                                <div className="col-sm-6">
                                    tasks:
                                </div>
                                <div className="col-sm-6">
                                    {project.tasks}
                                </div>
                                <div className="col-sm-6">
                                    Collaborators:
                                </div>
                                <div className="col-sm-6">
                                    {project.collaborators}
                                </div>
                                <div className="col-sm-6">
                                    Status:
                                </div>
                                <div className="col-sm-6">
                                    {project.status?<span className="badge bg-primary">Open</span>:<span className="badge bg-primary">Closed</span>}
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        </Link>
        </div>

}

export default function ProjectList({data}){
    const listed = data.map((project,key)=>{
        return <ProjectCard key={key} project ={project}/>
    })
    return <div className="row d-flex justify-content-center">{listed}</div>
}