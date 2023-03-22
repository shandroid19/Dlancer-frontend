import Link from "next/link";
import styles from '../../styles/Users.module.css'
export default function User({id,username,tasks,skills,image}){
    return<>
        <Link className={styles.cardlink} href={`/users/${id}`}>
        <div className="card">
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
                                <div className="col-sm-6">
                                    {skills.map((skill,key)=>{
                                        return <span key={key} className="badge bg-secondary">{skill}</span>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    </>
}