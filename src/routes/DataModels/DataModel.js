import React from 'react';
import { useState } from 'react';
import ObjectAdd from './ObjectAdd';
import './DataModel.css';
import { v4 as uuidv4 } from 'uuid';

export default function DataModel (){
  const [objName, setObjName] = useState([]);    // [{"objectname1" : "objid1"}]
  const [obj, setObj] = useState({});         //{"objectname1": {"id":uuid}}
  const [objEdit, setObjEdit] = useState({});

  function addToObjectNameFun(){
    let tmpname =  "objectname"+(objName.length+1).toString();
    setObjName((objName) => 
      [...objName, tmpname]
    )

    setObj((obj)=>{
      obj[tmpname] = {"name": tmpname, "id": uuidv4(), data:[{name:"cyka", dataType: "number"}]}
      return obj
    })
  }

  return(
      <div className='main'>
        
        <ObjectAdd objEdit={objEdit} setObj={setObj} setObjEdit={setObjEdit}/>
        
        <div className='footer'>
          {objName.map((objectsID, index)=>
            <button onClick={()=> setObjEdit(obj[objectsID])} className='btn' key={index}>{objectsID}</button>
          )} 
          <button className='btn' onClick={()=> addToObjectNameFun()}>+</button>
        </div>
      </div>
  );
}
