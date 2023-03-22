export default function ConvertWorkflow (objs){
    var objectsToSend = [];
    const keys = Object.keys(objs);

    keys.forEach((key, index) => {
        var tmpObjWF = {};    
        tmpObjWF["workflow"] = {"name": key, "verdis_version":"1.0"};
        tmpObjWF["trigger"] = objs[key]["trigger"];
        tmpObjWF["task"] = objs[key]["task"];

        // objs[key]["data"].forEach(ob =>{ 
        //     var tmpItemType = ["number", "string", "boolean", "object", "integer", "array"];
        //     let tempProp = {};
        //     tempProp["name"] = ob.name;
        //     tempProp["type"] = ob.dataType;
        //     tempProp["required"] = ob.required;
        //     tempProp["autoGen"] = ob.autoGen;
        //     if(ob.autoGen){
        //         tempProp["autoGenType"] = ob.autoGenType;
        //     }
            
        //     if(ob.required)
        //         tmpobj["required"].push(ob.name);

        //     if(ob.dataType === "array"){
        //         tempProp["items"] = { "type": ob["TypeOption"]["itemType"] };

        //         if(!tmpItemType.includes(ob["TypeOption"]["itemType"]) && !tmpobj["import"].includes(ob["TypeOption"]["itemType"])){
        //             tmpobj["import"].push(ob["TypeOption"]["itemType"]);
        //         }
        //     }
        //     if(ob.dataType === "string"){
        //         if(ob["TypeOption"]["name"] === "Length"){
        //             tempProp["minLength"] = ob["TypeOption"]["minValue"];
        //             tempProp["maxLength"] = ob["TypeOption"]["maxValue"];
        //         }
        //         else if(ob["TypeOption"]["name"] === "Pattern-Regex"){
        //             tempProp["pattern"] = ob["TypeOption"]["value"];
        //         }
        //         else if(ob["TypeOption"]["name"] === "Format"){
        //             tempProp["format"] = ob["TypeOption"]["formatType"];
        //         }
        //     }

        //     tmpobj["properties"].push(tempProp);
        // });

        // tmpobj["properties"].push({"name":"lifecycle","type":"object","properties":[{"name":"createdAt","type":"string","format":"date-time","required":true,"autoGen":true},{"name":"updatedAt","type":"string","format":"date-time","required":true,"autoGen":true},{"name":"deletedAt","type":"string","format":"date-time","required":true,"autoGen":true}]});
        
        // objectsToSend.push(tmpobj)
        // DownloadJSON(tmpobj);
        console.log(JSON.stringify(tmpObjWF))
    });


    // var objectsToSend = {};
    
    // objectsToSend["workflow"] = {"name":"workflow1","verdis_version":"1.0"};

    // objectsToSend["triggers"] = [];
    // const trigkeys = Object.keys(triggerObj);
    // trigkeys.forEach((key, index) => {
    //     objectsToSend["triggers"].push(triggerObj[key])
    // });


    // objectsToSend["tasks"] = [];
    // const taskKeys = Object.keys(taskObj);
    // taskKeys.forEach((key, index) => {
    //     objectsToSend["tasks"].push(taskObj[key])
    // });


    // DownloadJSON(objectsToSend);
    // console.log(JSON.stringify(objectsToSend) )
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