import User from "./User";
import { useState } from "react";

export default function Users(){
    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU";
    const data = [
        {username:"employee",id:"0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",bio:"hardworker",skills:["React.js","Python","Tensorflow"],tasks:"5/9",image:image},
        {username:"shandroid",id:"0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",bio:"hardworker",skills:["ethers","flutter","linux"],tasks:"5/9",image:image},
        {username:"owner",id:"0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",bio:"hardworker",skills:["SQL","django","angular"],tasks:"5/9",image:image}
    ];
    const [filterText, setFilterText] = useState("");

    function UsersList({data, filterText}) {
        const filteredData = data.filter((project) => {
          const titleMatch = project.username.toLowerCase().includes(filterText.toLowerCase());
          const skillsMatch = project.skills.some((skill) => skill.toLowerCase().includes(filterText.toLowerCase()));
          const idMatch = project.id.toLowerCase().includes(filterText.toLowerCase());
          return titleMatch || skillsMatch || idMatch;
        });
      
        const listed = filteredData.map((item,key)=>{
          return <div key={key} className="col-md-6 col-lg-4">
          <User id={item.id} username={item.username} skills={item.skills} tasks={item.tasks} image={item.image}></User>
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