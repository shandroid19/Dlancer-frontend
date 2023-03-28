import Header from "@/components/Header";
import { useRef } from "react";
import { useMoralis,useWeb3Contract } from "react-moralis";
import { abi,addresses } from "@/constants";
import { useRouter } from "next/router";
export default function SubmitWork(){
    const router= useRouter();
    const params = router.query;
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
      const submit = ()=>{
      console.log("submitted")
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