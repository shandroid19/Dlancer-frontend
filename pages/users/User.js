import Link from "next/link";
import styles from '../../styles/Users.module.css'
import { useState } from "react";
import { useRouter } from "next/router";
const skillsets = [
    'React.js',
    'AngularJS',
    'Vue.js',
    'Ember.js',
    'Backbone.js',
    'Node.js',
    'Django',
    'Spring Boot',
    'Flutter',
    'React Native',
    'Xamarin',
    'Swift',
    'Kotlin',
    'MySQL',
    'MongoDB',
    'Oracle',
    'PostgreSQL',
    'SQL Server',
    'Amazon Web Services (AWS)',
    'Microsoft Azure',
    'Google Cloud Platform (GCP)',
    'Docker',
    'Kubernetes',
    'Jenkins',
    'Ansible',
    'Terraform',
    'JavaScript',
    'Python',
    'Java',
    'Ruby',
    'C++',
    'Jest',
    'Selenium',
    'Cypress',
    'JUnit',
    'Pytest',
    'TensorFlow',
    'PyTorch',
    'Scikit-learn',
    'Keras',
    'OpenCV'
    ];
export default function User({id,username,tasks,skills,image}){
    const [showMoreSkills,setShowMoreSkills] = useState(false)
    const router = useRouter()
    return<>
        {/* <Link className={styles.cardlink} href={`/users/${id}`}> */}
        <div style={{height:'100%'}} className="card shadow">
            <div className="card-body">
                <div className="container">
                    <div className="row d-flex justify-content-center ">
                        <div className="col-md-4 col-lg-3 col-sm-6 d-flex align-items-center ">
                            <img className={styles.cardimg} src={image}/>
                        </div>
                        <div className="col-md-8 col-lg-9 col-sm-6">
                            <div className='row'>
                                <div className="col-sm-6">
                                    Name:
                                </div>
                                <div className="col-sm-6">
                                    {username}
                                </div>
                                <div className="col-sm-6">
                                    Completed:
                                </div>
                                <div className="col-sm-6">
                                    {tasks}
                                </div>
                                <div className="col-sm-6">
                                    Skills:
                                </div>
                                {/* <div className="col-sm-6">
                                    {skills.map((skill,key)=>{
                                        return <span key={key} className="badge bg-secondary">{skillsets[skill]}</span>
                                    })}
                                </div> */}


                <div className="col-sm-6" style={{overflowY:'scroll',maxHeight:'6rem'}}>
                {skills.slice(0, 3).map((skill, key) => {
                return (
                <span key={key} className="badge bg-secondary">
             {skillsets[skill]}
                 </span>
                    );
                })}
            {showMoreSkills &&
                skills.slice(3).map((skill, key) => {
                  return (
                     <span key={key} className="badge bg-secondary">
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
                <div className="row">
                    <div className="col-md-2 col-sm-4">
                        <button onClick={()=>router.push(`/users/${id}`)} className="btn btn-primary btn-small text-white">
                            View 
                        </button>
                    </div>
                </div>
                            </div>
                        </div>

                    
                    </div>
                </div>
            </div>
        </div>
        {/* </Link> */}
    </>
}