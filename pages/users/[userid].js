import Header from '@/components/Header';
import { useRouter } from 'next/router'
import styles from '../../styles/Users.module.css'
import Certificate from './Certificate';
import Project from './Project';
export default function Profile(){
    const router = useRouter();
    const {userid}=router.query;
    const imgurl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU";
    const data = {username:"employee",id:"0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",
    skills:["React.js","Python","Tensorflow"],
    tasks:"5/9",image:imgurl,
    location:"Bangalore",
    tasks:"5/6",
    email:"employee@gmail.com"
};

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

const projectlist = projects.map((project,key)=>{
    return <div className='row my-3'><Project key={key} tasks={project.tasks} title={project.title} status={project.status}/></div>
})

const certificatelist = certificates.map((cert,key)=>{
    return <div className='row my-3'><Certificate key={key} title={cert.title} org = {cert.org} link={cert.link} verified={cert.verified}/></div>
})

    return<>
    <Header/>
    <div className="container">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
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