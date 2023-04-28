import User from "./User";
import { useState,useEffect } from "react";
import { skillsets } from "@/constants";
import { useMoralis } from "react-moralis";

export default function Users(){
    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU";
    const [data,setData] = useState([])
    const [tasks,setTasks] = useState([])
    const [projects,setProjects] = useState([])
    const {account} = useMoralis();
    useEffect(()=>{
      fetch('http://localhost:5000/api/users/getfilters/'+account).then((res)=>{
        return res.json(); 
      }).then((res)=>{
        setTasks(res.tasks)
        setProjects(res.projects);
        // setData(res)
      }).catch((e)=>console.log(e))
    },[]) 


    useEffect(()=>{
      fetch('http://localhost:5000/api/users/').then((res)=>{
        return res.json(); 
      }).then((res)=>{
        setData(res)
        // setData(res)
      }).catch((e)=>console.log(e))
    },[]) 
    
    
    const handleProject = (e)=>{
      if(e.target.value==0) return;
      fetch('http://localhost:5000/api/tasks/recommendprojects/'+e.target.value).then((res)=>{
        return res.json(); 
      }).then((res)=>{
        setData(res);
        document.getElementById("taskselect").text=0;
        document.getElementById("taskselect").value=0;
        // setData(res)
        // setData(res)
      }).catch((e)=>console.log(e))
    }

    const handleTask = (e)=>{
      if(e.target.value==0) return;
      fetch('http://localhost:5000/api/tasks/recommendtasks/'+e.target.value).then((res)=>{
        return res.json(); 
      }).then((res)=>{
        console.log(res)
        setData(res);
        document.getElementById("projectselect").text=0;
        document.getElementById("projectselect").value=0;
      }).catch((e)=>console.log(e))
    }

    const [filterText, setFilterText] = useState("");

    function UsersList({data, filterText}) {
        const filteredData = data.filter((project) => {
          const titleMatch = project.username.toLowerCase().includes(filterText.toLowerCase());
          const skillsMatch = project.skills.some((skill) => skillsets[skill].toLowerCase().includes(filterText.toLowerCase()));
          const idMatch = project.walletID.toLowerCase().includes(filterText.toLowerCase());
          return titleMatch || skillsMatch || idMatch;
        });
      
        const listed = filteredData.map((item,key)=>{
          return <div key={key} className="col-md-6 col-lg-4">
          <User id={item.walletID} username={item.username} skills={item.skills} tasks={item.tasksCompleted?.length} image={item.image}></User>
          </div>
        });
        return  <div className="row d-flex justify-content-center">{listed}</div>;
      }

    const handleFilterChange = (event) => {
    setFilterText(event.target.value);
    };
    const userslist = data.map((item,key)=>{
        return <div key={key} className="col-md-6 col-lg-4">
        <User id={item.id} username={item.username} bio={item.bio} skills={item.skills} tasks={item.tasks} image={item.image}></User>
        </div>
    })


    
    return <>
    <div className="container p-5">
        <div className="row d-flex justify-content-center">
          <div className="col-sm-4">
            <input type="text" placeholder="Search..." className="form-control" value={filterText} onChange={handleFilterChange} />
          </div>
          <div className="col-sm-4">
          <select
            id="projectselect"

            className="form-control"
            // id="skillSelect"
            onChange={handleProject}
            >
          <option value={0}>select project</option>
            {projects?.map((item,key)=>{
                return <option key={key} value={item._id}>{item.projectName}</option>
            })}

          </select>    

          <select
            id="taskselect"
            className="form-control"
            // id="skillSelect"
            onChange={handleTask}
            >
          <option value={0}>select task</option>
            {tasks?.map((item,key)=>{
                return <option key={key} value={item.taskId}>{item.taskName}</option>
            })}

          </select>   
          </div>
        </div>
      </div>
      <div className="container">
          <UsersList data={data} filterText={filterText} />
      </div>
        </>

}