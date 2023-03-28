import Header from "@/components/Header";
import Link from "next/link";
export default function Requests(){
    const requests = [
        {project:1,userid:1,invite:1},
        {project:2,userid:2,invite:0},
        {project:3,userid:3,invite:1},
        {project:4,userid:4,invite:0},
        {project:5,userid:5,invite:1}
    ];

    const requestlist = requests.map((request)=>{
        const {invite,userid,project} = request;
        return <div className="row d-flex align-items-center ">
            <div className="col-sm-8">
            <Link href = {invite?`/projects/${project}`:`/users/${userid}`}>
                <div className="card-body text-center">
                    {invite?<p>{userid} has invited you to contribute to the project {project}</p>:<p>{userid} has sent a request to contribute to the project {project}</p>}
                </div>
            </Link>
            </div>
            <div className="col-sm-2  col-6 d-flex justify-content-center">
                <button className="btn btn-primary">
                Accept
                </button>
            </div>
            <div className="col-sm-2  col-6 d-flex justify-content-center">
                <button className="btn btn-danger">
                Reject
                </button>
            </div>
            <hr/>
        </div>
    })
    return <><Header/>
        <div className="container p-5">
            <div className="row d-flex justify-content-center">
            <div className="col-sm-6">
            <div  className="card">
                <div className="card-header">
                    Requests
                </div>
                <div style={{height:'70vh',overflowY:'scroll',overflowX:'hidden'}} className="card-body">
                    <div className="container">
                        {requestlist}
                    </div>
                </div>
            </div>
            </div>
            </div>
        </div>
    </>

}