import Link from "next/link"
import { useRouter } from "next/router";

export default function TaskCard({task,projectid,usermode}){
    const router = useRouter();
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleDelete = ()=>{
        fetch('http://localhost:5000/api/tasks/'+projectid+'?taskid='+task._id,{method:'DELETE'}).then((res)=>{
            if(res.status!=200) throw new Error(res.json().message);
            window.location.reload();
        }).catch((e)=>{
            console.error(e);
        })
    }
    
    const handleView = ()=>{
        fetch('https://digital.nhs.uk/restapi/oas/hello-world',).then((res)=>{
            if(res.status!=200) throw new Error(res.json().message);
            
        }).catch((e)=>{
            console.error(e);
        })
    }

       return <div  className="card shadow text-dark my-3">
        <div className="card-body">
            <div className="container ">
                <div className="row d-flex align-items-center">
                    <div className="col-sm-6 col-md-2">
                        <b>Task Name:</b>
                    </div>
                    <div className="col-sm-6 col-md-2">
                        {task.taskName}
                    </div>
                    <div className="col-sm-6 col-md-2">
                        <b>Freelancer:</b>
                    </div>
                    <div className="col-sm-6 col-md-2">
                        {task.freelancer.slice(0,6)}...{task.freelancer.slice(task.freelancer.length-4)}
                    </div>
             
                        {usermode!=0?
                            <div className="col-sm-6 col-md-4 d-flex flex-row-reverse">
                        <div className="btn btn-danger" onClick={handleDelete}>Remove</div>
                         <div className="btn btn-primary" onClick={handleView}>View</div>
                         </div>
                        :
                        <div className="col-sm-6 col-md-4 d-flex flex-row-reverse">
                        <div className="btn btn-primary" onClick={()=>{router.push(`/projects/${projectid}/${task.id}`)}}>Open</div>
                            </div>
                    }
                </div>
            </div>
        </div>

        {data && (
        <div className={` fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{data.title}</h5>
                <button type="button" className="close" onClick={toggleModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {data.description}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={toggleModal}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
}
