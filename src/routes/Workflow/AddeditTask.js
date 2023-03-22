import React from 'react';
import { useState, useEffect } from 'react';

export default function AddEditTask ({idx, WorkFlowTask, WorkFlowQueue, setWorkFlowQueue, setWorkFlowTask}){
    const [queueProperties, setQueueProperties] = useState("");
    const [queueName, setQueueName] = useState("");
    const [taskCode, setTaskCode] = useState("");
    const [taskName, setTaskName] = useState("");

    useEffect(() => {
        if(WorkFlowTask[idx] && WorkFlowQueue[idx]){
            setQueueName(WorkFlowQueue[idx].name);
            setQueueProperties(WorkFlowQueue[idx].properties);
            setTaskCode(WorkFlowTask[idx].code);
            setTaskName(WorkFlowTask[idx].name);
        }
    }, [WorkFlowTask[idx]]);

    function edittotaskobj(){
        var tmpTask = {"name": taskName, "code": taskCode};
        var tmpQueue = {"name": queueName, "properties": queueProperties};

        setWorkFlowQueue((a)=>{
            a[idx] = tmpQueue;
            return a;
        });

        setWorkFlowTask((a)=>{
            a[idx] = tmpTask;
            return a;
        });
    }

    if(idx != -1)
    return (
        <div className='notacommonclassname'>
            <div>Queue Name: 
                <input  
                    value={queueName} 
                    onChange={(e) => setQueueName(e.target.value)}
                />
            </div>
            <div>Queue Properties: 
                <textarea  
                    value={queueProperties} 
                    onChange={(e) => {
                        const val = e.target.value;
                        setQueueProperties(val);
                    }}
                />
            </div>
            <div>Task Name: 
                <input  
                    value={taskName} 
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </div>
            <div>Task Code: 
                <textarea  
                    value={taskCode} 
                    onChange={(e) => {
                        const val = e.target.value;
                        setTaskCode(val);
                    }}
                />
            </div>
            <button onClick={()=>edittotaskobj()}>Save queue & task</button>
        </div>
    );

    else return(<>Click something</>)
}