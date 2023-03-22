export default function Project({title,tasks,status}){
    return <div className="card">
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
                        <b>Tasks completed</b>
                    </div>
                    <div className="col-sm-8">
                        {tasks}
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                        <b>status</b>
                    </div>
                    <div className="col-sm-8">
                        {status?<span className="badge bg-success">Open</span>:<span className="badge bg-danger">Closed</span>}
                    </div>
                </div>
            </div>
        </div>
    </div>
}