import Header from "@/components/Header";
import React, {useState} from "react";
import ProjectCard from "./ProjectCard";

const data = [
  {id:1,title:"todo",collaborators:2,tasks:5,status:1,skills:["golang","python"]},
  {id:2,title:"website",collaborators:2,tasks:6,status:0,skills:["react.js","python"]},
  {id:3,title:"application",collaborators:2,tasks:5,status:1,skills:["flutter","js"]},
]

function ProjectList({data, filterText}) {
  const filteredData = data.filter((project) => {
    const titleMatch = project.title.toLowerCase().includes(filterText.toLowerCase());
    const skillsMatch = project.skills.some((skill) => skill.toLowerCase().includes(filterText.toLowerCase()));
    return titleMatch || skillsMatch;
  });

  const listed = filteredData.map((project,key)=>{
    return <div className="col-md-4"><ProjectCard key={key} project ={project}/></div>
  });
  return <div className="row d-flex justify-content-center">{listed}</div>;
}

export default function SearchProjects() {
  const [filterText, setFilterText] = useState("");
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };
  return (
    <>
      <Header />
      <div className="container p-5">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-4">
            <input type="text" placeholder="Search..." className="form-control" value={filterText} onChange={handleFilterChange} />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <ProjectList data={data} filterText={filterText} />
        </div>
      </div>
    </>
  );
}
