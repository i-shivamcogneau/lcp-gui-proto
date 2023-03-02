import React from 'react';
import './ObjectAdd.css';
import { useState, useEffect } from 'react';
import Dropdown from 'react-dropdown';
import './dropdown.css';

export default function ObjectAdd ({objEdit, setObj, setObjEdit, options}){

    const [dataName, setDataName] = useState([]);
    const [dataType, setDataType] = useState([]);
    const [required, setRequired] = useState([]);
    const [strArrOption, setStrArrOption] = useState([]);

    const stroptions = ["none", "Length", "Pattern-Regex", "Format"];
    const strFormatoptions = ["date-time", "time", "date", "duration", "email", "hostname", "ipv4", "ipv6", "uuid", "uri", "regex"];

    function addStuffArr(){
        setDataName((a)=> [...a, ""])
        setDataType((a)=> [...a, ""])
        setRequired((a)=> [...a, false])
        setStrArrOption((a)=>[...a, {"name": "none"}])
    }

    function SaveToEditobj(){
        // from 2 arrays to array of objects
        let arrToobjs = [];
        for(let i in dataName){
            arrToobjs.push({name:dataName[i], dataType: dataType[i], required: required[i], TypeOption: strArrOption[i]})
        }

        // to edit json obj
        setObjEdit((cureditObj)=> {
            cureditObj.data = arrToobjs;
            return cureditObj;
        })

        // save to setObj
        setObj((objs)=>{
            objs[objEdit.name] = objEdit;
            return objs;
        })
        
    }

    useEffect(() => {
        let tmpdName = []
        let tmpdType = []
        let tmpdReq = []
        let tmpdStrOpt = []
        for(let i in objEdit.data){
            tmpdName.push(objEdit.data[i].name);
            tmpdType.push(objEdit.data[i].dataType);
            tmpdReq.push(objEdit.data[i].required);
            tmpdStrOpt.push(objEdit.data[i].StrOption)
        }

        setDataName(tmpdName)
        setDataType(tmpdType)
        setRequired(tmpdReq)
        setStrArrOption(tmpdStrOpt)

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
                        <Dropdown options={options} 
                            onChange={(e) => {
                                const val = e.value;
                                setDataType((prevArr) => {
                                const result = [...prevArr];
                                result[index] = val;
                                return result;
                            });
                            }}  placeholder="Select an option" />
                        </div>
                    ))}
                </div>
                <div className="float-child">
                    {required.map((item, index) => (
                        <div key={index}>
                        <input
                            className='key-input-required'
                            key={index}
                            type="checkbox"
                            value={required[index]}
                            onChange={(e) => {
                                setRequired((prevArr) => {
                                    const result = [...prevArr];
                                    result[index] = !result[index];
                                    return result;
                                });
                            }}
                        />
                        </div>
                    ))}
                </div>
                <div className="float-child">
                    {dataType.map((item, index) => (
                        <div key={index}>
                            {dataType[index] === "string" ?(
                                <div>
                                <Dropdown 
                                    options={stroptions} 
                                    value={stroptions[0]}
                                    onChange={(e) => {
                                        const val = e.value;
                                        setStrArrOption((prevArr) => {
                                            const result = [...prevArr];
                                            result[index] = {"name": val};
                                            return result;
                                        });
                                    }}  
                                    placeholder="Select an option" 
                                />
                                
                                {(() => {
                                    if (strArrOption[index]["name"] === "Pattern-Regex") {
                                    return (
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setStrArrOption((prevArr) => {
                                                    const result = [...prevArr];
                                                    result[index]["value"] = val;
                                                    return result;
                                                });
                                            }}
                                        />
                                    )
                                    } else if (strArrOption[index]["name"] === "Length") {
                                    return (
                                        <>
                                        <input
                                            type="number"
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setStrArrOption((prevArr) => {
                                                    const result = [...prevArr];
                                                    result[index]["minValue"] = val;
                                                    return result;
                                                });
                                            }}
                                        />
                                        <input
                                            type="number"
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                setStrArrOption((prevArr) => {
                                                    const result = [...prevArr];
                                                    result[index]["maxValue"] = val;
                                                    return result;
                                                });
                                            }}
                                        />                                        
                                        </>
                                    )
                                    } else if (strArrOption[index]["name"] === "Format") {
                                    return (
                                        <Dropdown 
                                            options={strFormatoptions} 
                                            value={strFormatoptions[0]}
                                            onChange={(e) => {
                                                const val = e.value;
                                                setStrArrOption((prevArr) => {
                                                    const result = [...prevArr];
                                                    result[index]["formatType"] = val;
                                                    return result;
                                                });
                                            }}  
                                            placeholder="Select an option" 
                                        />
                                    )
                                    }
                                })()}
                                </div>
                            ):(dataType[index] === "array" ?(
                            
                                <Dropdown options={options} 
                                    onChange={(e) => {
                                        const val = e.value;
                                        setStrArrOption((prevArr) => {
                                            const result = [...prevArr];
                                            result[index] = {"itemType": val};
                                            return result;
                                        });
                                    }}  
                                    placeholder="Any" 
                                />                            
                            ):(<div className="blank-space"></div>))}
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={()=> addStuffArr()}>+</button>            
            <button onClick={()=> SaveToEditobj()}>Save</button>
        </div>
    );
}
