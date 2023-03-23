import Link from "next/link"
export default function ProjectCard({project}){
    return <div className="col-md-4"><Link href={`/projects/${project.id}`}>
        <div className="card shadow">
            <div className="card-body">
                <div className="container">
                    <div className="row d-flex justify-content-center ">
                            <div className='row my-2'>
                                <div className="col-sm-6">
                                   <b>Title:</b>
                                </div>
                                <div className="col-sm-6">
                                    {project.title}
                                </div>
                            </div>
                            <div className='row my-2'>
                                <div className="col-sm-6">
                                    <b>tasks:</b>
                                </div>
                                <div className="col-sm-6">
                                    {project.tasks}
                                </div>
                            </div>
                            <div className='row my-2'>
                                <div className="col-sm-6">
                                    <b>Collaborators:</b>
                                </div>
                                <div className="col-sm-6">
                                    {project.collaborators}
                                </div>
                            </div>
                            <div className='row my-2'>
                                <div className="col-sm-6">
                                    <b>Skills:</b>
                                </div>
                                <div className="col-sm-6">
                                    {project.skills.map((skill)=>{
                                        return <span className="badge bg-secondary">{skill}</span>
                                    })}
                                </div>
                            </div>
                            <div className='row my-2'>
                                <div className="col-sm-6">
                                    <b>Status:</b>
                                </div>

                                <div className="col-sm-6">
                                    {project.status?<span className="badge bg-success">Open</span>:<span className="badge bg-danger">Closed</span>}
                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>
        </div>
        </Link>
        </div>

}