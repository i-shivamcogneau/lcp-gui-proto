import React from 'react';
import { useState } from 'react';
import ObjectAdd from './ObjectAdd';
import './DataModel.css';
import { v4 as uuidv4 } from 'uuid';
import Convert from './convert';
import ConvertObjectnames from './convertObjectNames';
import Modal from '@mui/material/Modal';

export default function DataModel (){
  const [objName, setObjName] = useState([]);    // [{"objectname1" : "objid1"}]
  const [obj, setObj] = useState({});         //{"objectname1": {"id":uuid}}
  const [objEdit, setObjEdit] = useState({});
  const [options, setOptions] = useState(["number", "string", "boolean", "object", "integer", "array"]);

  const [tmpName, setTmpname] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function addToObjectNameFun(){
    setObjName((objName) => 
      [...objName, tmpName]
    )

    setObj((obj)=>{
      obj[tmpName] = {"name": tmpName, "id": uuidv4(), data:[]}
      return obj
    })

    setOptions((a)=> [...a, tmpName]);
    setTmpname("");
  }

  return(
      <div className='main'>
        
        <ObjectAdd objEdit={objEdit} setObj={setObj} setObjEdit={setObjEdit} options={options} />
        
        <div className='footer'>
          {objName.map((objectsID, index)=>
            <button onClick={()=> setObjEdit(obj[objectsID])} className='btn' key={index}>{objectsID}</button>
          )} 
          <button className='btn' onClick={handleOpen}>+</button>
          <button className='btn-right' onClick={()=> {Convert(obj); ConvertObjectnames(objName);}}>Convert & Download</button>
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
          <button onClick={()=> {addToObjectNameFun(); handleClose();}}>Add Object</button>
          </div>
        </Modal>

      </div>
  );
}
