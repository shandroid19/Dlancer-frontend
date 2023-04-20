import Link from "next/link"
import { skillsets } from "@/constants"
import { useState } from "react";
import { useRouter } from "next/router";
export default function ProjectCard({project}){
    const router = useRouter()
    const [showMoreSkills,setShowMoreSkills] = useState(false)
    return <div style={{height:'100%'}} className="card shadow">
            <div className="card-body">
                <div className="container  d-flex flex-column">
                    <div className="row d-flex justify-content-center ">
                            <div className='row my-1'>
                                <div className="col-sm-6">
                                   <b>Title:</b>
                                </div>
                                <div className="col-sm-6">
                                    {project.projectName}
                                </div>
                            </div>
                            <div className='row my-1'>
                                <div className="col-sm-6">
                                    <b>Tasks:</b>
                                </div>
                                <div className="col-sm-6">
                                    {project.tasks.length}
                                </div>
                            </div>
                            <div className='row my-1'>
                                <div className="col-sm-6">
                                    <b>Collaborators:</b>
                                </div>
                                <div className="col-sm-6">
                                    {project.collaborators.length}
                                </div>
                            </div>
                            <div className='row my-1'>
                                <div className="col-sm-6">
                                    <b>Skills:</b>
                                </div>
                                <div className="col-sm-6" style={{overflowY:'scroll',maxHeight:'6rem'}}>
                {project.requiredSkills.slice(0, 3).map((skill, key) => {
                return (
                <span key={key} className="badge bg-secondary">
             {skillsets[skill]}
                 </span>
                    );
                })}
            {showMoreSkills &&
                project.requiredSkills.slice(3).map((skill, key) => {
                  return (
                     <span key={key} className="badge bg-secondary">
                         {skillsets[skill]}
                        </span>
                    );
                    })}
                {project.requiredSkills.length > 3 && (
                <a href="#" className="d-block" onClick={() => setShowMoreSkills(!showMoreSkills)}>
                    {showMoreSkills ? "See less" : "See more"}
            </a>
                )}
                </div>
                            </div>
                            <div className='row my-1'>
                                <div className="col-sm-6">
                                    <b>Status:</b>
                                </div>

                                <div className="col-sm-6">
                                    {!project.status?<span className="badge bg-success">Open</span>:<span className="badge bg-danger">Closed</span>}
                                </div>
                            </div>
                        
                    </div>
                </div>
            </div>
            <div className="card-footer d-flex flex-row-reverse">
            <button className="btn btn-primary btn-sm" onClick={()=>{router.push(`/projects/${project._id}`)}}>View</button>

            </div>
        </div>
        {/* </Link> */}
       

}