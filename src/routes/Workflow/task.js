import React from 'react';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import { v4 as uuidv4 } from 'uuid';
import Dropdown from 'react-dropdown';

export default function Task ({taskName, setTaskName, task, setTask, triggerName}){
    const [taskEdit, setTaskEdit] = useState( {"name": "", "id": "", "code":"", "enqueue_to": "", "dequeue_from":"", "trigger":""} );
    
    const [tmpName, setTmpname] = useState("");

    const [taskCode, setTaskCode] = useState("");
    const [taskEnqueue_to, setTaskEnqueue_to] = useState("");
    const [taskDequeue_from, setTaskDequeue_from] = useState("");
    const [taskTrigger, setTaskTrigger] = useState("");



    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        setTaskCode(taskEdit.code)
        setTaskEnqueue_to(taskEdit.enqueue_to)
        setTaskDequeue_from(taskEdit.dequeue_from)
        setTaskTrigger(taskEdit.trigger)

     }, [taskEdit]);

    function addToObjectNameFun(){
        setTaskName((taskName) => 
        [...taskName, tmpName]
        )

        setTask((obj)=>{
            obj[tmpName] = {"name": tmpName, "id": uuidv4(), "code":"", "enqueue_to": "", "dequeue_from":"", "trigger":""}
            return obj
        })

        setTmpname("");
    }

    function edittotaskobj(){
        setTaskEdit((tmpeditobj)=>{
            tmpeditobj.code = taskCode;
            tmpeditobj.enqueue_to = taskEnqueue_to;
            tmpeditobj.dequeue_from = taskDequeue_from;
            tmpeditobj.trigger = taskTrigger;
            return tmpeditobj;
        });

        setTask((tmpobj)=> {
            tmpobj[taskEdit.name] = taskEdit
            return tmpobj
        })
    }

    return (
        <div className='main'>
        
            <div>Name: {taskEdit.name}</div>
            <div>Id: {taskEdit.id}</div>
            <div>Code: 
                <textarea  
                    value={taskCode} 
                    onChange={(e) => {
                        const val = e.target.value;
                        setTaskCode(val);
                    }}
                />
            </div>
            <div>enqueue_to 
                <input  
                    value={taskEnqueue_to} 
                    onChange={(e) => setTaskEnqueue_to(e.target.value)}
                />
            </div>
            <div>dequeue_from 
                <input  
                    value={taskDequeue_from} 
                    onChange={(e) => setTaskDequeue_from(e.target.value)}
                />
            </div>
            <div>trigger
                <Dropdown options={triggerName}
                    value={taskTrigger} 
                    onChange={(e) => {
                        const val = e.value;
                        setTaskTrigger(val);
                    }}  
                    placeholder="Select an option"
                />
            </div>
            <button onClick={()=>edittotaskobj()}>Save taskObj</button>


            <div className='footer'>
                {taskName.map((objectsID, index)=>
                    <button onClick={()=> setTaskEdit(task[objectsID])} className='btn' key={index}>{objectsID}</button>
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
                    <button onClick={()=> {addToObjectNameFun(); handleClose();}}>Add Task</button>
                </div>
            </Modal>

        </div>
    );
}