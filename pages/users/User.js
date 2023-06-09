import Link from "next/link";
import styles from '../../styles/Users.module.css'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { skillsets } from "@/constants";
export default function User({id,username,tasks,skills,image}){
    const [showMoreSkills,setShowMoreSkills] = useState(false)
    const router = useRouter()
    return <div style={{height:'100%'}} className="card shadow">
            <div className="card-body">
                <div className="container">
                    <div className="row d-flex justify-content-center ">
                        <div className="col-md-5 col-lg-4 col-sm-6 d-flex align-items-center">
                            <img className={styles.cardimg} src={image}/>
                        </div>
                        <div className="col-md-7 col-lg-8 col-sm-6 ">
                            <div className='row mb-auto'>
                                <div className="col-12">
                                   <h4> {username} </h4>
                                </div>
                    
                                <div className="col-12">
                                    {tasks} tasks completed
                                </div>
                                
                <div className="col-12" style={{overflowY:'scroll',maxHeight:'6rem'}}>
                {skills.slice(0, 3).map((skill, key) => {
                return (
                <span key={key} className="badge bg-secondary m-1">
             {skillsets[skill]}
                 </span>
                    );
                })}
            {showMoreSkills &&
                skills.slice(3).map((skill, key) => {
                  return (
                     <span key={key} className="badge bg-secondary m-1">
                         {skillsets[skill]}
                        </span>
                    );
                    })}
                {skills.length > 3 && (
                <a href="#" className="d-block" onClick={() => setShowMoreSkills(!showMoreSkills)}>
                    {showMoreSkills ? "See less" : "See more"}
            </a>
                )}
                </div>
                {/* <div className="row">
                    <div className="col">
                        <button onClick={()=>router.push(`/users/${id}`)} className="btn btn-primary btn-small text-white">
                            View Profile
                        </button>
                    </div>
                </div> */}
                            </div>
                        </div>

                    
                    </div>
                </div>
            </div>
            <div className="card-footer d-flex justify-content-end">
            <button onClick={()=>router.push(`/users/${id}`)} className="btn btn-primary btn-small text-white">
                            View Profile
                        </button>
            </div>
        </div>
    // return <div style={{height:'100%'}} className="card shadow">
    //         <div className="card-body">
    //             <div className="container">
    //                 <div className="row d-flex justify-content-center ">
    //                     <div className="col-md-4 col-lg-3 col-sm-6 d-flex align-items-center ">
    //                         <img className={styles.cardimg} src={image}/>
    //                     </div>
    //                     <div className="col-md-8 col-lg-9 col-sm-6">
    //                         <div className='row'>
    //                             <div className="col-sm-6">
    //                                 Name:
    //                             </div>
    //                             <div className="col-sm-6">
    //                                 {username}
    //                             </div>
    //                             <div className="col-sm-6">
    //                                 Completed:
    //                             </div>
    //                             <div className="col-sm-6">
    //                                 {tasks}
    //                             </div>
    //                             <div className="col-sm-6">
    //                                 Skills:
    //                             </div>
    //             <div className="col-sm-6" style={{overflowY:'scroll',maxHeight:'6rem'}}>
    //             {skills.slice(0, 3).map((skill, key) => {
    //             return (
    //             <span key={key} className="badge bg-secondary">
    //          {skillsets[skill]}
    //              </span>
    //                 );
    //             })}
    //         {showMoreSkills &&
    //             skills.slice(3).map((skill, key) => {
    //               return (
    //                  <span key={key} className="badge bg-secondary">
    //                      {skillsets[skill]}
    //                     </span>
    //                 );
    //                 })}
    //             {skills.length > 3 && (
    //             <a href="#" className="d-block" onClick={() => setShowMoreSkills(!showMoreSkills)}>
    //                 {showMoreSkills ? "See less" : "See more"}
    //         </a>
    //             )}
    //             </div>
    //             <div className="row">
    //                 <div className="col-md-2 col-sm-4">
    //                     <button onClick={()=>router.push(`/users/${id}`)} className="btn btn-primary btn-small text-white">
    //                         View 
    //                     </button>
    //                 </div>
    //             </div>
    //                         </div>
    //                     </div>

                    
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
}