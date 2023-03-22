import React from 'react';
import { useState, useEffect } from 'react';

export default function AddEditTrigger ({WorkFlowTrigger, setWorkFlowTrigger}){
    const [triggerProperties, setTriggerProperties] = useState("");
    const [triggerName, setTriggerName] = useState("");

    useEffect(() => {
        if(WorkFlowTrigger){
            setTriggerName(WorkFlowTrigger.name);
            setTriggerProperties(WorkFlowTrigger.properties);
        }
    }, [WorkFlowTrigger]);

    function edittotaskobj(){
        setWorkFlowTrigger({"name":triggerName, "properties": triggerProperties});
    }

    return (
        <div className='notacommonclassname'>
            <div>Trigger Name: 
                <input  
                    value={triggerName} 
                    onChange={(e) => setTriggerName(e.target.value)}
                />
            </div>
            <div>Trigger Properties: 
                <textarea  
                    value={triggerProperties} 
                    onChange={(e) => {
                        const val = e.target.value;
                        setTriggerProperties(val);
                    }}
                />
            </div>
            <button onClick={()=>edittotaskobj()}>Save trigger</button>
        </div>
    );
}