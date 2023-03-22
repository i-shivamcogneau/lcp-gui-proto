export default function ConvertWorkflow (objs){
    var objectsToSend = [];
    const keys = Object.keys(objs);

    keys.forEach((key, index) => {
        var tmpObjWF = {};    
        tmpObjWF["workflow"] = {"name": key, "verdis_version":"1.0"};
        tmpObjWF["trigger"] = objs[key]["trigger"];
        tmpObjWF["trigger"]["trigger_task"] = objs[key]["task"][0]["name"];
        tmpObjWF["task"] = [];
        
        for(let i=0; i<objs[key]["task"].length; i++){
            let tmpTaskObj = {};
            tmpTaskObj["name"]=objs[key]["task"][i]["name"];
            tmpTaskObj["code"]=objs[key]["task"][i]["code"];
            tmpTaskObj["dequeue_from"] = objs[key]["queue"][i]["name"];
            if(i+1 == objs[key]["task"].length){
                tmpTaskObj["enqueue_to"] = "";
            }else{                
                tmpTaskObj["enqueue_to"] = objs[key]["queue"][i+1]["name"];
            }

            tmpObjWF["task"].push(tmpTaskObj);
        }

        objectsToSend.push(tmpObjWF)
        DownloadJSON(tmpObjWF);
        console.log(JSON.stringify(tmpObjWF))
    });

}

function DownloadJSON(obj){
    let nm = obj["workflow"]["name"]
    const strobj = JSON.stringify(obj);
    const element = document.createElement("a");
    const file = new Blob([strobj], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `${nm}.json`;
    document.body.appendChild(element);
    element.click();
}