import { useMoralis } from "react-moralis"
import { useState } from "react";

export default function Certificate({title,org,link,currentuser,id}){
    const {account} = useMoralis();
    
     

     const handleRemoveCertificate = ()=>{
        fetch('http://localhost:5000/api/users/removecert/'+account+'?certID='+id,
        {
            method:'DELETE',
        }).then((res)=>{
            if(res.status!==200) throw new Error("there was an error while removing certificate")
            console.log("successfully deleted");
            window.location.reload()
        }).catch((e)=>{
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
                    {currentuser==account?<div className="col-sm-4">
                        <a data-toggle="modal" data-target="#removeCertificateModal" target="_blank" className="btn btn-danger text-white">
                            Delete
                        </a>
                    </div>:<></>}
                    
                </div>
                
            </div>
        </div>
    </div>


     

     {/* MODAL STARTS HERE */}
     <div className="modal fade" id="removeCertificateModal" tabIndex="-1" role="dialog" aria-labelledby="certificateModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" >Remove Certificate</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>Are you sure you want to remove this certificate?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={handleRemoveCertificate}>Remove</button>
      </div>
    </div>
  </div>
</div>
    {/* MODAL ENDS HERE */}
    </>
}