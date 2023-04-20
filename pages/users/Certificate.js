import { useMoralis } from "react-moralis"
import { useState } from "react";

export default function Certificate({title,org,link}){
    const {account} = useMoralis();
    const [newtitle,setTitle] = useState('');
     const [neworg,setOrg] = useState('');
     const [newlink,setLink] = useState('');
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
    return <><div className="card">
        <div className="card-body">
            <div className="container">
                <div className="row py-2">
                    <div className="col-sm-4">
                        <b>Title</b>
                    </div>
                    <div className="col-sm-8">
                        {title}
                    </div>
                </div>
                <div className="row py-2">
                    <div className="col-sm-4">
                        <b>Organization</b>
                    </div>
                    <div className="col-sm-8">
                        {org}
                    </div>
                </div>
                <div className="row py-2">
                    <div className="col-sm-4">
                        <a href={link} target="_blank" className="btn btn-primary text-white">
                            Open
                        </a>
                    </div>
                    
                </div>
                
            </div>
        </div>
    </div>


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
    </>
}