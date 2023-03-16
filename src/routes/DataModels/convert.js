import React from 'react';

export default function Convert (objs){
    var objectsToSend = [];
    
    const keys = Object.keys(objs);

    keys.forEach((key, index) => {
        let tmpobj ={"$id": objs[key]["id"] ,"name": key,  "verdis_version": "1.0", "type": "object", "properties":[], "required": [], "import": []};

        objs[key]["data"].forEach(ob =>{ 
            var tmpItemType = ["number", "string", "boolean", "object", "integer", "array"];
            let tempProp = {};
            tempProp["name"] = ob.name;
            tempProp["type"] = ob.dataType;
            tempProp["required"] = ob.required;
            tempProp["autoGen"] = ob.autoGen;
            if(ob.autoGen){
                tempProp["autoGenType"] = ob.autoGenType;
            }
            
            if(ob.required)
                tmpobj["required"].push(ob.name);

            if(ob.dataType === "array"){
                tempProp["items"] = { "type": ob["TypeOption"]["itemType"] };

                if(!tmpItemType.includes(ob["TypeOption"]["itemType"]) && !tmpobj["import"].includes(ob["TypeOption"]["itemType"])){
                    tmpobj["import"].push(ob["TypeOption"]["itemType"]);
                }
            }
            if(ob.dataType === "string"){
                if(ob["TypeOption"]["name"] === "Length"){
                    tempProp["minLength"] = ob["TypeOption"]["minValue"];
                    tempProp["maxLength"] = ob["TypeOption"]["maxValue"];
                }
                else if(ob["TypeOption"]["name"] === "Pattern-Regex"){
                    tempProp["pattern"] = ob["TypeOption"]["value"];
                }
                else if(ob["TypeOption"]["name"] === "Format"){
                    tempProp["format"] = ob["TypeOption"]["formatType"];
                }
            }

            tmpobj["properties"].push(tempProp);
        });

        tmpobj["properties"].push({"name":"lifecycle","type":"object","properties":[{"name":"createdAt","type":"string","format":"date-time","required":true,"autoGen":true},{"name":"updatedAt","type":"string","format":"date-time","required":true,"autoGen":true},{"name":"deletedAt","type":"string","format":"date-time","required":true,"autoGen":true}]});
        
        objectsToSend.push(tmpobj)
        DownloadJSON(tmpobj);
    });

    
    console.log(JSON.stringify(objectsToSend) )
    console.log(objs)
}

function DownloadJSON(obj){
    const strobj = JSON.stringify(obj);
    const element = document.createElement("a");
    const file = new Blob([strobj], {type: 'application/json'});
    element.href = URL.createObjectURL(file);
    element.download = `${obj.name}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
}