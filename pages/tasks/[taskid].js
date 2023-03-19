import Header from "@/components/Header";
import { useRef } from "react";
import { useMoralis,useWeb3Contract } from "react-moralis";
import { abi,addresses } from "@/constants";
import axios from "axios";
export default function SubmitWork({taskid}){
    const task = {
        name:"Todo List",
        description:"Develop a todo list which has the following features",
        deadline:8,
        reward:7,
        testcases: [
            {input:"shan",output:"Hey my name is shan"},
            {input:"sasuke",output:"Hey my name is sasuke"},
            {input:"naruto",output:"Hey my name is naruto"},
        ]
    }
    const code = useRef(" ");
    var options;
    if(code.current.value){
    options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: {base64_encoded: 'true', fields: '*'},
        headers: {
          'content-type': 'application/json',
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': '4095c8e687msh4ea109541a9080fp1b5a32jsn219ffab71803',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: '{"language_id":52,"source_code":"'+Buffer.from(code.current.value).toString('base64') +'","stdin":"SnVkZ2Uw","  "expected_output":"'+Buffer.from("hello").toString('base64')+'" }'
      };
    }
      const submit = ()=>{
      axios.request(options).then(function (response) {
          console.log(response.data);
      }).catch(function (error) {
          console.error(error);
      });
    }
      

    const {chainId:chainIdhex,isWeb3Enabled} = useMoralis();
    const chainId= parseInt(chainIdhex);
    const contractAddress= addresses[chainId]?addresses[chainId][0]:null;
    const {runContractFunction:cancelTask} = useWeb3Contract(
        {
            abi:abi,
            contractAddress:contractAddress,
            functionName:"cancelTask",
            chainId:chainId
        }
    )

    const onCancel = async ()=>{
        await cancelTask();
    }



    const testcases= task.testcases.map((testcase,key)=>{
        return <div key={key} className="row my-3">
            <div className="col-sm-6">
                {testcase.input}
            </div>
            <div className="col-sm-6">
                {testcase.output}
            </div>
        </div>
    })
    return<>
    <Header/>
    <div  className="card text-dark my-5">
        <div className="card-body">
            <div className="container">
                <div className="row my-3">
                    <div className="col-sm-3 ">
                        <b>Task Name:</b>
                    </div>
                    <div className="col-sm-9 ">
                        {task.name}
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-sm-3 ">
                        <b>Description:</b>
                    </div>
                    <div className="col-sm-9 ">
                        {task.description} hrs
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-sm-3 ">
                        <b>Remaining time:</b>
                    </div>
                    <div className="col-sm-9 ">
                        {task.deadline} hrs
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-sm-3 ">
                       <b> Reward:</b>
                    </div>
                    <div className="col-sm-9">
                        {task.reward} ETH
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-sm-3 ">
                       <b> Test Cases:</b>
                    </div>
                    <div className="col-sm-9">
                    <div className="row">
                        <div className="col-sm-6">
                            <b>Inputs</b>
                        </div>
                        <div className="col-sm-6">
                            <b>Outputs</b>
                        </div>
                    </div>
                        {testcases}
                    </div>
                </div>
                <div className="row my-3">
                    <div className="col-sm-3 ">
                       <b> Your code:</b>
                    </div>
                    <div className="col-sm-9">
                        <textarea className="form-control" ref={code} rows={6}/>
                    </div>
                </div>
                <div className="row">
                <div className="col-lg-1 col-md-2 col-sm-3">
                    <button className="btn btn-primary" onClick={submit}>Submit</button>
                </div>
                <div className="col-lg-1 col-md-2 col-sm-3">
                    <button className="btn btn-danger" onClick={onCancel}>Cancel</button>
                </div>
            </div>
            </div>
            
        </div>
    </div>
    </>
}