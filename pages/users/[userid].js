import Header from '@/components/Header';
import { useRef,useState,useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import styles from '../../styles/Users.module.css'
import Certificate from './Certificate';
import ProjectCard from '../search/ProjectCard';
import { skillsets } from '@/constants';
import { useRouter } from 'next/router';
export default function Profile(){
    const [skills, setSkills] = useState([]);
    const [certlist,setCertlist] = useState([])
    const [projects,setProjects] = useState([])
    const [ownProjects,setOwnProjects] = useState([])
    const [edit,setEdit] = useState(false);
    const [newtitle,setTitle] = useState('');
    const [neworg,setOrg] = useState('');
    const [newlink,setLink] = useState('');
    const email = useRef("")
    const username = useRef("");
    const bio = useRef("");
    const location = useRef("");
    const router= useRouter();
    const imgurl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU";
    const [data,setData] = useState(
      {username:"employee",walletID:"0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
      skills:["React.js","Python","Tensorflow"],
      image:imgurl,
      location:"Bangalore",
      bio:"Hardworking student",
      tasks:"5/6",
      email:"employee@gmail.com"
});
useEffect(()=>{
    fetch('http://localhost:5000/api/users/'+router.query.userid).then((res)=>{
        return res.json();
    }).then((res)=>{
        setData(res)
        setSkills(res.skills)
    }).catch((e)=>{
        console.error(e);
    })
},[])

useEffect(()=>{
  fetch('http://localhost:5000/api/projects?walletID='+account).then((res)=>{
      return res.json();
  }).then((res)=>{
      setOwnProjects(res);
  }).catch((e)=>{
      console.error(e);
  })
},[])

useEffect(()=>{
  fetch('http://localhost:5000/api/users/certs/'+router.query.userid).then((res)=>{
      return res.json();
  }).then((res)=>{
      setCertlist(res)
  }).catch((e)=>{
      console.error(e);
  })
},[])

useEffect(()=>{
  fetch('http://localhost:5000/api/projects/otherprojects?walletID='+router.query.userid).then((res)=>{
      return res.json();
  }).then((res)=>{
    console.log(res)
      setProjects(res)
  }).catch((e)=>{
      console.error(e);
  })
},[])

const inviteproject = useRef();
// const projects= [{id:1,title:"todo",collaborators:2,tasks:5,status:1,skills:["golang","python"]},
//   {id:2,title:"website",collaborators:2,tasks:6,status:0,skills:["react.js","python"]},
//   {id:3,title:"application",collaborators:2,tasks:5,status:1,skills:["flutter","js"]},]

// const certificates = [
//     {title:"web3",org:"coursera",link:"link here",verified:1},
//     {title:"react.js",org:"coursera",link:"link here",verified:1},
//     {title:"deep learning",org:"coursera",link:"link here",verified:0},
//     {title:"fundamentals of blockchain",org:"coursera",link:"link here",verified:0},
//     {title:"advanced data structues with java",org:"coursera",link:"link here",verified:1},
// ];

const {account} = useMoralis();

const accountprojects = [{id:1,title:"Todo app"},{id:2,title:"Self balancing robot"},{id:3,title:"gyroscope"}];

const projectlist = projects.map((project,key)=>{
    return <div className='row my-3' key={key}>
      <div className='col-12'><ProjectCard  project ={project}/></div>
      {/* <ProjectCard key={key} tasks={project.tasks} title = {project.title} status = {project.status} /> */}
      {/* <Project key={key} tasks={project.tasks} title={project.title} status={project.status}/> */}
      </div>
})

const certificatelist = certlist.map((cert,key)=>{
    return <div className='row my-3' key={key}>
      <Certificate  currentuser={data.walletID} id={cert._id} title={cert.title} org = {cert.org} link={cert.link} verified={cert.verified}/>
      </div>
})

const invite = ()=>{
    fetch('http://localhost:5000/api/req',{
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify({initiatorId:account,resolverId:data._id,projectId:inviteproject.current.value})
                })
    .then((res)=>{return res.json()})
    .then((res)=>{if(res.status==200 || 204) console.log(res); else throw new Error(res.message);
       alert(res.message)})
    .catch((e)=>console.error(e))
    // {initiatorId (userid), resolverId (userid), projectId}
    console.log("invite for project id",inviteproject.current.value,"sent to user",account,data)
}

const handleSkillAdd = (e) => {
  const selectedSkill = e.target.value;
  if (!skills.includes(selectedSkill)) {
    setSkills([...skills, selectedSkill]);
  }    
}

const handleSkillRemove = (skill) => {
  setSkills(skills.filter((s) => s !== skill))
}

const handleAddCertificate = ()=>{
  fetch('http://localhost:5000/api/users/addcert/'+account,
  {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
          title:newtitle,
          org:neworg,
          link:newlink
      })
  }).then((res)=>{
      if(res.status!==200) throw new Error("there was an error while adding certificate")
      window.location.reload()}).catch((e)=>{
      console.error(e)
  })
}


  const handleSave = ()=>{
    console.log(router)
    // console.log(email.current.value,username.current.value, location.current.value, bio.current.value, skills);
    fetch('http://localhost:5000/api/users/edit/'+account, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username:username.current.value,
    email:email.current.value,
    location:location.current.value,
    bio:bio.current.value,
    skills
  })
}).then((res)=>{
  window.location.reload()
}).catch((e)=>console.log(e.message))
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
                <input type="text" className='form-control' ref={username} name="username" defaultValue={data.username} />
              </div>
            </div>

            <div className='row my-2'>
              <div className='col-6'>
                <b>Bio:</b>
              </div>
              <div className='col-6 '>
                <input type="text" className='form-control' ref={bio} name="bio" defaultValue={data.bio} />
              </div>
            </div>
           
            <div className='row my-2'>
              <div className='col-6'>
                <b>Email:</b>
              </div>
              <div className='col-6'>
                <input type="email" className='form-control' ref={email} name="email" defaultValue={data.email} />
              </div>
            </div>
            
            <div className='row my-2'>
              <div className='col-6'>
                <b>Location:</b>
              </div>
              <div className='col-6'>
                <input type="text" className='form-control' ref={location} name="location" defaultValue={data.location} />
              </div>
            </div>
            <div className='row my-2'>
            <div className='col-6'>
                <b>Skills:</b>
            </div>
            <div className='col-6'>
      
             <div className="input-group mb-3">
            <select
            className="form-control"
            id="skillSelect"
            onChange={handleSkillAdd}
            >
          <option defaultValue="">-- Select a skill --</option>
            {skillsets.map((item,key)=>{
                return <option key={key} value={key}>{item}</option>
            })}
          </select>
          </div>
                
                <div className="skills-list">
    {skills.map((skill, index) => (
      <span
        key={index}
        className="badge badge-secondary mr-2"
        onClick={() => handleSkillRemove(skill)}
      >
        {skillsets[skill]} &times;
      </span>
    ))}
  </div>
    
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
                            <b>Bio:</b>
                        </div>
                        <div className='col-6 '>
                            {data.bio}
                        </div>
                    </div>
                    <div className='row my-2'>
                        <div className='col-6'>
                            <b>Wallet:</b>
                        </div>
                        <div className='col-6'>
                            {data.walletID.slice(0,6)}...{data.walletID.slice(data.walletID.length-4)}
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
                            {data.tasksCompleted?.length}
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
                            return <span key={key} className="badge bg-secondary">{skillsets[skill]}</span>
                        })}
                        </div>
                    </div>
{console.log(account?.toLowerCase()==data.walletID.toLowerCase())}
                        {account?.toLowerCase()==data.walletID.toLowerCase()?
                        <div onClick={()=>setEdit(1)} className="btn shadow bg-primary text-center text-white ">
                        Edit profile
                    </div>:
                        ownProjects.length?
                        <div className="btn shadow bg-primary text-center text-white" data-toggle="modal" data-target="#projectInviteModal">
                            Invite for collaboration
                        </div>:<></>
                        
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
                        {ownProjects.map((item,key)=>{
                            return <option key={key} value={item._id}>{item.projectName}</option>
                        })}
                    </select> 
                </div>
            </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-success" data-dismiss="modal" onClick={invite}>Invite</button>
      </div>
    </div>
    </div>
    </div>
    {/* MODAL ENDS HERE */}


    {/* MODAL STARTS HERE */}
    <div className="modal fade" id="certificateModal" tabIndex="-1" role="dialog" aria-labelledby="certificateModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="certificateModalLabel">Add Certificate</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="form-group">
            <label htmlFor="certificateTitle">Title</label>
            <input type="text" className="form-control" value={newtitle} onChange={(e)=>setTitle(e.target.value)}  placeholder="Enter certificate title" />
          </div>
          <div className="form-group">
            <label htmlFor="certificateLink">Link</label>
            <input type="text" className="form-control" value={newlink}  onChange={(e)=>setLink(e.target.value)} id="certificateLink" placeholder="Enter certificate link" />
          </div>
          <div className="form-group">
            <label htmlFor="certificateOrg">Organization</label>
            <input type="text" className="form-control" value={neworg} onChange={(e)=>setOrg(e.target.value)} id="certificateOrg" placeholder="Enter certificate organization" />
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleAddCertificate}>Add</button>
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
                        {router.query.userid?.toLowerCase()==account?<div className='row my-2 justify-content-center d-flex'>
                          <div className='col-sm-6 justify-content-center d-flex'>
                            <button className='btn btn-primary'  data-toggle="modal" data-target="#certificateModal">
                              Add certificate
                            </button>
                          </div>
                        </div>:<></>}
                    </div>
                </div>
                </div>
                
            </div>
        </div>
    </div>
    </>
}