import Header from "@/components/Header";
import React, {useEffect, useState} from "react";
import ProjectCard from "./ProjectCard";
import { useMoralis } from "react-moralis";

// const data = [
//   {id:1,title:"todo",collaborators:2,tasks:5,status:1,skills:["golang","python"]},
//   {id:2,title:"website",collaborators:2,tasks:6,status:0,skills:["react.js","python"]},
//   {id:3,title:"application",collaborators:2,tasks:5,status:1,skills:["flutter","js"]},
// ]




function ProjectList({data, filterText}) {
  console.log(data)
  const filteredData = data.filter((project) => {
    const titleMatch = project.projectName.toLowerCase().includes(filterText.toLowerCase());
    const skillsMatch = project.requiredSkills.some((skill) => skill.toLowerCase().includes(filterText.toLowerCase()));
    return titleMatch || skillsMatch;
  });

  const listed = filteredData.map((project,key)=>{
    return <div className="col-md-4"><ProjectCard key={key} project ={project}/></div>
  });
  return <div className="row d-flex justify-content-center">{listed}</div>;
}

export default function SearchProjects() {
 
  const [filterText, setFilterText] = useState("");
  const [data,setData] = useState([]);
  const {account}= useMoralis();
  useEffect(()=>{
    fetch('http://localhost:5000/api/projects/searchprojects?walletID='+account).then((res)=>{
      if(res.status!=200)
        throw new Error(res.json().message);
      return res.json();
    }).then((res)=>{
      setData(res);
    }) 
  },[])

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
