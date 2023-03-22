import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Modal from '@mui/material/Modal';

import AddWorkflow from './AddWorkflow';

import ConvertWorkflow from './convertWorkflow';

export default function Workflows (){
  const [Workflows, setWorkflows] = useState({}); 
  const [WorkflowsName, setWorkflowsName] = useState([]);
  const [WorkflowEdit, setWorkflowEdit] = useState({});

  const [tmpName, setTmpname] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function addToWorkflowNameFun(){
    setWorkflowsName((objName) => 
      [...objName, tmpName]
    )

    setWorkflows((obj)=>{
      obj[tmpName] = {"name": tmpName, "id": uuidv4(), "trigger":{"name":""}, "task":[], "queue":[]}
      return obj
    })
    
    setTmpname("");
  }

  return (
    <div className='main'>
        
        <AddWorkflow WorkflowEdit={WorkflowEdit} setWorkflowEdit={setWorkflowEdit} setWorkflows={setWorkflows} />
        
        <div className='footer'>
          {WorkflowsName.map((wfID, index)=>
            <button onClick={()=> setWorkflowEdit(Workflows[wfID])} className='btn' key={index}>{wfID}</button>
          )} 
          <button className='btn' onClick={handleOpen}>+</button>
          <button className='btn-right' onClick={()=> ConvertWorkflow(Workflows)}>Convert & Download</button>
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
          <button onClick={()=> {addToWorkflowNameFun(); handleClose();}}>Add Workflow</button>
          </div>
        </Modal>

      </div>
  );
}