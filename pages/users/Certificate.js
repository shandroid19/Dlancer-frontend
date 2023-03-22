export default function Certificate({title,org,verified,link}){
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
                <div className="row d-flex flex-row-reverse">
                    <div className="col-3 col-sm-2">
                        {verified?<span className="badge bg-success">Verified</span>:<span className="badge bg-danger">Unverified</span>}
                    </div>
                </div>
            </div>
        </div>
    </div>
}