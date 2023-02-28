import React from 'react';
import './ObjectAdd.css';
import { useState, useEffect } from 'react';

export default function ObjectAdd ({objEdit, setObj, setObjEdit}){

    const [dataName, setDataName] = useState([]);
    const [dataType, setDataType] = useState([]);

    function addStuffArr(){
        setDataName((a)=> [...a, ""])
        setDataType((a)=> [...a, ""])
    }

    function SaveToEditobj(){
        // from 2 arrays to array of objects
        let arrToobjs = [];
        for(let i in dataName){
            arrToobjs.push({name:dataName[i], dataType: dataType[i]})
        }

        // to edit json obj
        setObjEdit((cureditObj)=> {
            cureditObj.data = arrToobjs;
            let tmpO = cureditObj;
            return cureditObj;
        })

        // save to setObj
        // already happending how??    
        
        setObj((objs)=>{
            objs[objEdit.name] = objEdit;
            return objs;
        })
        
    }

    useEffect(() => {
        let tmpdName = []
        let tmpdType = []
        for(let i in objEdit.data){
            tmpdName.push(objEdit.data[i].name);
            tmpdType.push(objEdit.data[i].dataType);
        }

        setDataName(tmpdName)
        setDataType(tmpdType)

     }, [objEdit]);

    if(Object.keys(objEdit).length === 0){
        return(<>Create/Select an Object</>);
    }
    return(
        <div className='main'>
            <div className='objTitle'>
                <span className='objTitle'>Name: {objEdit.name}</span>
                <span className='objTitle'>Id: {objEdit.id}</span>
            </div>


            <div className="float-container">
                <div className="float-child">
                    {dataName.map((item, index) => (
                        <div key={index}>
                        <input
                            className='key-input'
                            key={index}
                            type="text"
                            value={dataName[index]}
                            onChange={(e) => {
                                const val = e.target.value;
                                setDataName((prevArr) => {
                                const result = [...prevArr];
                                result[index] = val;
                                return result;
                            });
                            }}
                        /></div>
                    ))} 
                </div>  
                <div className="float-child">
                    {dataType.map((item, index) => (
                        <div key={index}>
                        <input
                        className='property-input'
                            key={index}
                            type="text"
                            value={dataType[index]}
                            onChange={(e) => {
                                const val = e.target.value;
                                setDataType((prevArr) => {
                                const result = [...prevArr];
                                result[index] = val;
                                return result;
                            });
                            }}
                        /></div>
                    ))}
                </div>
            </div>
            <button onClick={()=> addStuffArr()}>+</button>            
            <button onClick={()=> SaveToEditobj()}>Save</button>
        </div>
    );
}
