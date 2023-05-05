import Header from "@/components/Header";
import { useRef, useState } from "react";
import { skillsets } from "@/constants";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";
import { headers } from "@/next.config";

export default function CreateProject(){
    const router = useRouter();
    const {account} = useMoralis();
    const [skills, setSkills] = useState([]);
    const name= useRef('')
    const description = useRef('') 
    const branch = useRef('')
    const repo = useRef('')
    const handleSkillAdd = (e) => {
        const selectedSkill = e.target.value;
        if (!skills.includes(selectedSkill)) {
          setSkills([...skills, selectedSkill]);
        }    
      }
    
      const handleCreate = ()=>{
        console.log(name.current.value,description.current.value,skills)
        fetch('http://localhost:5000/api/projects/'+account,
        {
            method:"POST",
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                projName:name.current.value,
                description:description.current.value,
                // repo:repo.current.value,
                // branch:branch.current.value,
                skills:skills
            })
        }).then((res)=>{
            if(res.status!=200) throw new Error(res.json().message);
            console.log("project successfully created");
            router.push('/projects');
        }).catch((e)=>console.log(e.message))
      }

    return <>
        <Header/>

{/* MODAL STARTS HERE */}
<div className="modal fade" id="projectCreateModal" tabIndex="-1" role="dialog" aria-labelledby="projectCreateModal" aria-hidden="true">
    <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" > Collaboration Request</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        Are you sure your want to create project?
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
        <button type="button" onClick={handleCreate} className="btn btn-success" data-dismiss="modal">Yes</button>
      </div>
    </div>
    </div>
    </div>
    {/* MODAL ENDS HERE */}

        <div className="container p-5">
            <div className="card shadow">
            <div className="card-header bg1 text-center display-6">
                        Create a project
                    </div>
                <div className="card-body">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className='col-md-3'>
                                <b>Name:</b>
                            </div>
                            <div className='col-md-6'>
                                <input className="form-control" ref={name} placeholder="enter the project name" type={"text"}></input>
                            </div>
                        </div>

                        <div className="row d-flex justify-content-center my-4">
                            <div className='col-md-3'>
                                <b>Description:</b>
                            </div>
                            <div className='col-md-6'>
                                <textarea ref={description} placeholder="enter the description" className="form-control" rows={4} ></textarea>
                            </div>
                        </div>

                        <div className="row d-flex justify-content-center my-4">
                            <div className='col-md-3'>
                                <b>Repo link:</b>
                            </div>
                            <div className='col-md-6'>
                                <input type="text" ref={repo} placeholder="enter the github repository link" className="form-control" />
                            </div>
                        </div>

                        <div className="row d-flex justify-content-center my-4">
                            <div className='col-md-3'>
                                <b>Default branch:</b>
                            </div>
                            <div className='col-md-6'>
                                <input type='text' ref={branch} placeholder="enter the branch" className="form-control" rows={4} />
                            </div>
                        </div>


                <div className="row d-flex justify-content-center my-4">

                <div className='col-md-3'>
                <b htmlFor="skills">Skills:</b>
                </div>
                <div className="col-md-6">
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
                        <div className="row d-flex justify-content-center">
                            <div className="col text-center">
                            <button className="btn shadow bg-primary text-white"  data-toggle="modal" data-target="#projectCreateModal">
                                        Create project
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}