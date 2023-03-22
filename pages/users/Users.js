import User from "./User";

export default function Users(){
    const image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU";
    const data = [
        {username:"employee",id:"0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec",skills:["React.js","Python","Tensorflow"],tasks:"5/9",image:image},
        {username:"shandroid",id:"0xFABB0ac9d68B0B445fB7357272Ff202C5651694a",skills:["React.js","Python","Tensorflow"],tasks:"5/9",image:image},
        {username:"owner",id:"0xdF3e18d64BC6A983f673Ab319CCaE4f1a57C7097",skills:["React.js","Python","Tensorflow"],tasks:"5/9",image:image}
    ];
    const userslist = data.map((item,key)=>{
        return <div key={key} className="col-md-6 col-lg-4">
        <User id={item.id} username={item.username} skills={item.skills} tasks={item.tasks} image={item.image}></User>
        </div>
    })
    return <div className="container-fluid p-5 d-flex ">
            <div className="row">
                {userslist}
            </div>
        </div>
}