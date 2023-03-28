import Header from '@/components/Header';
import { useRouter } from 'next/router'
import { useRef,useState } from 'react';
import { useMoralis } from 'react-moralis';
import styles from '../../styles/Users.module.css'
import Certificate from './Certificate';
import Project from './Project';
export default function Profile(){
    const router = useRouter();
    const {userid}=router.query;
    const imgurl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU";
    const [data,setData] = useState({username:"employee",id:"0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
    skills:["React.js","Python","Tensorflow"],
    tasks:"5/9",image:imgurl,
    location:"Bangalore",
    tasks:"5/6",
    email:"employee@gmail.com"
});
const [newSkill, setNewSkill] = useState("");

const inviteproject = useRef();
const projects = [
    {
        title:"brain tumor",
        tasks:5,
        status:1
    },
    {
        title:"social media",
        tasks:5,
        status:0
    },
    {
        title:"ChatGPT",
        tasks:5,
        status:1
    },
];

const certificates = [
    {title:"web3",org:"coursera",link:"link here",verified:1},
    {title:"react.js",org:"coursera",link:"link here",verified:1},
    {title:"deep learning",org:"coursera",link:"link here",verified:0},
    {title:"fundamentals of blockchain",org:"coursera",link:"link here",verified:0},
    {title:"advanced data structues with java",org:"coursera",link:"link here",verified:1},
];

const {account} = useMoralis();

const accountprojects = [{id:1,title:"Todo app"},{id:2,title:"Self balancing robot"},{id:3,title:"gyroscope"}];

const projectlist = projects.map((project,key)=>{
    return <div className='row my-3'><Project key={key} tasks={project.tasks} title={project.title} status={project.status}/></div>
})

const certificatelist = certificates.map((cert,key)=>{
    return <div className='row my-3'><Certificate key={key} id={data.id} title={cert.title} org = {cert.org} link={cert.link} verified={cert.verified}/></div>
})

const invite = ()=>{
    console.log("invite for project id",inviteproject.current.value,"sent to user",account)
}




const handleRemoveSkill = (key) => {
    setData((prevData) => {
      return {
        ...prevData,
        skills: prevData.skills.filter((skill, index) => index !== key)
      };
    });
    console.log(data);
  };
  
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() !== "") {
      setData((prevData) => {
        return {
          ...prevData,
          skills: [...prevData.skills, newSkill]
        };
      });
      setNewSkill("");
    }
    
  };
  const [edit,setEdit] = useState(false);
  const handleSave = ()=>{
    console.log('saved');
    setEdit(false);
}


  const editprofile = <form className="container" >
  <div className='card-body'>
    <div className='container'>
      <div className='row d-flex justify-content-center py-5'>
        <div className='col-xl-1 col-lg-2 col-md-2 col-sm-3 p-5 p-sm-0 d-flex align-items-center'>
          <img className={styles.cardimg} src={imgurl}></img>
        </div>
        <div className='col-lg-4'>
          <div className='container'>
            <div className='row my-2'>
              <div className='col-6'>
                <b>Username:</b>
              </div>
              <div className='col-6 '>
                <input type="text" className='form-control' name="username" defaultValue={data.username} />
              </div>
            </div>
           
            <div className='row my-2'>
              <div className='col-6'>
                <b>Email:</b>
              </div>
              <div className='col-6'>
                <input type="email" className='form-control' name="email" defaultValue={data.email} />
              </div>
            </div>
            
            <div className='row my-2'>
              <div className='col-6'>
                <b>Location:</b>
              </div>
              <div className='col-6'>
                <input type="text" className='form-control' name="location" defaultValue={data.location} />
              </div>
            </div>
            <div className='row my-2'>
            <div className='col-6'>
                <b>Skills:</b>
            </div>
            <div className='col-6'>
         <div className="input-group my-2">
                <input type="text" className="form-control" placeholder="Add a skill" value={newSkill} onChange={(e) => setNewSkill(e.target.value)} />
                <button className="btn btn-primary" onClick={handleAddSkill}>Add</button>
             </div>
                {data.skills.map((skill, key) => {
                return (
                    <span key={key} className="badge bg-secondary mx-1" onClick={() => handleRemoveSkill(key)}>
                    {skill}
                    <span className="ms-1 fw-bold">x</span>
                    </span>
                 );
                })}
    
             </div>
            </div>
            <div className="btn shadow bg-primary" onClick={handleSave}>
              <div onClick={handleSave} className="card-body text-center text-white">
                Save
              </div>
            </div>
        
          </div>
        </div>
      </div>
    </div>
  </div>
</form>

const displayprofile =  <div className="container">
<div className='card-body'>
    <div className='container'>
        <div className='row d-flex justify-content-center py-5'>
            <div className='col-xl-1 col-lg-2 col-md-2 col-sm-3 p-5 p-sm-0 d-flex align-items-center'>
                <img className={styles.cardimg} src={imgurl}></img>
            </div>
            <div className='col-lg-4'>
                <div className='container'>
                    <div className='row my-2'>
                        <div className='col-6'>
                            <b>Username:</b>
                        </div>
                        <div className='col-6 '>
                            {data.username}
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-6'>
                            <b>Wallet:</b>
                        </div>
                        <div className='col-6'>
                            {data.id.slice(0,6)}...{data.id.slice(data.id.length-4)}
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-6'>
                            <b>Email:</b>
                        </div>
                        <div className='col-6'>
                            {data.email}
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-6'>
                            <b>Task completed:</b>
                        </div>
                        <div className='col-6'>
                            {data.tasks}
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-6'>
                            <b>Location:</b>
                        </div>
                        <div className='col-6'>
                            {data.location}
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-6'>
                            <b>Skills:</b>
                        </div>
                        <div className='col-6'>
                        {data.skills.map((skill,key)=>{
                            return <span key={key} className="badge bg-secondary">{skill}</span>
                        })}
                        </div>
                    </div>

                        {account?.toLowerCase()==data.id.toLowerCase()?
                        <div onClick={()=>setEdit(1)} className="btn shadow bg-primary text-center text-white ">
                        Edit profile
                    </div>:
                        <div className="btn shadow bg-primary text-center text-white " data-toggle="modal" data-target="#projectInviteModal">
                            Invite for collaboration
                        </div>
                        
                        }

                </div>
            </div>
        </div>
    </div>
</div>
</div> 
  

    return<>
    <Header/>
    {edit?editprofile:displayprofile}

   

    {/* MODAL STARTS HERE */}
    <div className="modal fade" id="projectInviteModal" tabIndex="-1" role="dialog" aria-labelledby="projectInviteModal" aria-hidden="true">
    <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" > Collaboration Invite</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="container">
            <div className='row d-flex justify-content-center'>
                <div className='col-sm-3 col-md-2 d-flex align-items-center'>
                    <b>Project:</b>
                </div>
                <div className='col-sm-9 col-md-10'>
                    <select ref = {inviteproject} className="form-control my-1 mr-sm-2" >
                        {accountprojects.map((item,key)=>{
                            return <option key={key} value={item.id}>{item.title}</option>
                        })}
                    </select> 
                </div>
            </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-success" onClick={invite}>Invite</button>
      </div>
    </div>
    </div>
    </div>
    {/* MODAL ENDS HERE */}


    <div className='container p-5 bg-light rounded'>
        <div className='row d-flex justify-content-center'>
            <div className='col-md-6 d-flex justify-content-center'>
                <div className='container'>
                <div className='row d-flex justify-content-center'>
                    <h3 className='justify-content-center d-flex'>Projects</h3>
                </div>
                <div className='row'>
                    <div style={{height:'70vh',overflowY:'scroll'}} className='container bg-secondary p-sm-5'>
                        {projectlist}
                    </div>
                </div>
                </div>
            </div>
            <div className='col-md-6 d-flex justify-content-center'>
            <div className='container'>
                <div className='row d-flex justify-content-center'>
                    <h3 className='justify-content-center d-flex'>Certificates</h3>
                </div>
                <div className='row'>
                    <div style={{height:'70vh',overflowY:'scroll'}} className='container bg-secondary p-sm-5'>
                        {certificatelist}
                    </div>
                </div>
                </div>
                
            </div>
        </div>
    </div>
    </>
}