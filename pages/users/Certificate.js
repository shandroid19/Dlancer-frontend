import { useMoralis } from "react-moralis"

export default function Certificate({title,org,link,id}){
    const {account} = useMoralis();
    return <><div className="card">
        <div className="card-body">
            <div className="container">
                <div className="row">
                    <div className="col-sm-4">
                        <b>Title</b>
                    </div>
                    <div className="col-sm-8">
                        {title}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <b>Organization</b>
                    </div>
                    <div className="col-sm-8">
                        {org}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <b>link</b>
                    </div>
                    <div className="col-sm-8">
                        {link}
                    </div>
                </div>
                
            </div>
        </div>
    </div>


     {/* MODAL STARTS HERE */}
     <div className="modal fade" id="certificateModal" tabIndex="-1" role="dialog" aria-labelledby="certificateModal" aria-hidden="true">
    <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" > Request for verification</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="container">
            <div className='row d-flex justify-content-center'>
                <div className='col-sm-3 col-md-2 d-flex align-items-center'>
                    <b>authority email:</b>
                </div>
                <div className='col-sm-9 col-md-10'>
                    <input type={'email'} className="form-control">

                    </input>
                </div>
            </div>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-success" >Request</button>
      </div>
    </div>
    </div>
    </div>
    {/* MODAL ENDS HERE */}
    </>
}