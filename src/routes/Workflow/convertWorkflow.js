export default function ConvertWorkflow (triggerObj, taskObj ){
    var objectsToSend = {};
    
    objectsToSend["workflow"] = {"name":"workflow1","verdis_version":"1.0"};

    objectsToSend["triggers"] = [];
    const trigkeys = Object.keys(triggerObj);
    trigkeys.forEach((key, index) => {
        objectsToSend["triggers"].push(triggerObj[key])
    });


    objectsToSend["tasks"] = [];
    const taskKeys = Object.keys(taskObj);
    taskKeys.forEach((key, index) => {
        objectsToSend["tasks"].push(taskObj[key])
    });


    DownloadJSON(objectsToSend);
    console.log(JSON.stringify(objectsToSend) )
}

function DownloadJSON(obj){
    const strobj = JSON.stringify(obj);
    const element = document.createElement("a");
    const file = new Blob([strobj], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `${obj.name}.json`;
    document.body.appendChild(element);
    element.click();
}