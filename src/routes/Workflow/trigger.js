import React from 'react';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { v4 as uuidv4 } from 'uuid';
import Dropdown from 'react-dropdown';

export default function Trigger ({trigger, settrigger, triggerName, settriggerName, taskName}){
    const [triggerEdit, settriggerEdit] = useState({"name": "", "id": "", "properties":"", "trigger_task": ""});
    
    const [tmpName, setTmpname] = useState("");

    const [triggerProperties, setTriggerProperties] = useState("");
    const [trigger_task, setTrigger_task] = useState("");



    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setTriggerProperties(triggerEdit.properties)
        setTrigger_task(triggerEdit.trigger_task)

     }, [triggerEdit]);

    function addToObjectNameFun(){
        settriggerName((triggerName) => 
        [...triggerName, tmpName]
        )

        settrigger((obj)=>{
            obj[tmpName] = {"name": tmpName, "id": uuidv4(), "properties":"", "trigger_task": ""}
            return obj
        })

        setTmpname("");
    }

    function edittotriggerobj(){
        settriggerEdit((tmpeditobj)=>{
            tmpeditobj.properties = triggerProperties;
            tmpeditobj.trigger_task = trigger_task;
            return tmpeditobj;
        });

        settrigger((tmpobj)=> {
            tmpobj[triggerEdit.name] = triggerEdit
            return tmpobj
        })
    }

    return (
        <div className='main'>
        
            <div>Name: {triggerEdit.name}</div>
            <div>Id: {triggerEdit.id}</div>
            <div>properties: 
                <textarea  
                    value={triggerProperties} 
                    onChange={(e) => {
                        const val = e.target.value;
                        setTriggerProperties(val);
                    }}
                />
            </div>
            <div>trigger_task
                <Dropdown options={taskName}
                    value={trigger_task} 
                    onChange={(e) => {
                        const val = e.value;
                        setTrigger_task(val);
                    }}  
                    placeholder="Select an option"
                />
            </div>
            <button onClick={()=>edittotriggerobj()}>Save triggerObj</button>


            <div className='footer'>
                {triggerName.map((objectsID, index)=>
                    <button onClick={()=> settriggerEdit(trigger[objectsID])} className='btn' key={index}>{objectsID}</button>
                )} 
                <button className='btn' onClick={handleOpen}>+</button>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className='modaldiv'
            >
                <div className='modal-content'>
                    <input
                        type="text"
                        value={tmpName}
                        onChange={(e) => {
                            const val = e.target.value;
                            setTmpname(val);
                        }}
                    />
                    <button onClick={()=> {addToObjectNameFun(); handleClose();}}>Add trigger</button>
                </div>
            </Modal>

        </div>
    );
}