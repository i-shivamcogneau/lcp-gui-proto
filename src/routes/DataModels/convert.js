import React from 'react';

export default function Convert (objs){
    var objectsToSend = [];
    
    const keys = Object.keys(objs);

    keys.forEach((key, index) => {
        let tmpobj ={"$id": objs[key]["id"] ,"name": key,  "verdis_version": "1.0", "type": "object", "properties":[], "required": []};

        objs[key]["data"].forEach(ob =>{ 
            let tempProp = {};
            tempProp["name"] = ob.name;
            tempProp["type"] = ob.dataType;
            tempProp["required"] = ob.required;
            tempProp["autoGen"] = ob.autoGen;

            if(ob.required)
                tmpobj["required"].push(ob.name);

            if(ob.dataType === "array"){
                tempProp["items"] = { "type": ob["TypeOption"]["itemType"] };
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

        tmpobj["properties"].push({"name":"lifecycle","type":"object","properties":[{"name":"createdAt","type":"string","format":"date-time"},{"name":"updatedAt","type":"string","format":"date-time"},{"name":"deletedAt","type":"string","format":"date-time"}]});
        
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