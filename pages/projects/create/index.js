import Header from "@/components/Header";

export default function CreateProject(){
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
        <button type="button" className="btn btn-success" >Yes</button>
      </div>
    </div>
    </div>
    </div>
    {/* MODAL ENDS HERE */}

        <div className="container p-5">
            <div className="card shadow">
            <div className="card-header text-center display-6">
                        Create a task
                    </div>
                <div className="card-body">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className='col-md-3'>
                                <b>Name:</b>
                            </div>
                            <div className='col-md-6'>
                                <input className="form-control" type={"text"}></input>
                            </div>
                        </div>

                        <div className="row d-flex justify-content-center my-4">
                            <div className='col-md-3'>
                                <b>Description:</b>
                            </div>
                            <div className='col-md-6'>
                                <textarea className="form-control" rows={4} ></textarea>
                            </div>
                        </div>
                        <div className="row d-flex  justify-content-center">
                            <div className="col-md-3">
                            <div className="btn shadow bg-primary " data-toggle="modal" data-target="#projectCreateModal">
                                        <div className="card-body text-center text-white">
                                        Create project
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}