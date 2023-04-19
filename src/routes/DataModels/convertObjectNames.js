import React from 'react';

export default function ConvertObjectnames (objNames){
    var objectsToSend = {};
    objectsToSend["names"] = objNames;

    DownloadJSON(objectsToSend);
    console.log(JSON.stringify(objectsToSend) )
}

function DownloadJSON(obj){
    const strobj = JSON.stringify(obj);
    const element = document.createElement("a");
    const file = new Blob([strobj], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `objNmaes.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}