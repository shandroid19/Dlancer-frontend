import User from "./User";
import { useState,useEffect } from "react";
import { skillsets } from "@/constants";

export default function Users(){
    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU";
    const [data,setData] = useState([]
  //     [
  //     {username:"employee",id:"0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",bio:"hardworker",skills:[0,1,2,3],tasks:"5/9",image:image},
  //     {username:"shandroid",id:"0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",bio:"hardworker",skills:[1,2,3,4,5],tasks:"5/9",image:image},
  //     {username:"owner",id:"0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",bio:"hardworker",skills:[10,12,15,16],tasks:"5/9",image:image}
  // ]
  )
  

    useEffect(()=>{
      fetch('http://localhost:5000/api/users/').then((res)=>{
        return res.json(); 
      }).then((res)=>{
        console.log(res)
        setData(res)
        // setData(res)
      }).catch((e)=>console.log(e))
    },[]) 


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
        </div>
      </div>
      <div className="container">
          <UsersList data={data} filterText={filterText} />
      </div>
        </>

}