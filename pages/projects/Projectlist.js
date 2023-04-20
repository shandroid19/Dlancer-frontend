import Link from "next/link"
import "../../styles/Projects.module.css"
import ProjectCard from "../search/ProjectCard"

export default function ProjectList({data,mode}){
    const listed = data.map((project,key)=>{
        return <div className="col-md-6 my-4"><ProjectCard key={key} project={project}/></div>
    })
    return <div className="row d-flex justify-content-center">
        {listed}
    </div>
}