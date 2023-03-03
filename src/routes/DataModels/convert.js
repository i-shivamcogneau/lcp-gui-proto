import React from 'react';

export default function Convert (objs){
    var objectsToSend = [];
    
    const keys = Object.keys(objs);

    keys.forEach((key, index) => {
        // console.log(`${key}: ${JSON.stringify(objs[key])}`);
        let tmpobj ={"$id": objs[key]["id"] ,"name": key, "type": "object", "properties":{}, "required": []};

        objs[key]["data"].forEach(ob =>{ 
            tmpobj["properties"][ob.name] = {"type": ob.dataType}
            if(ob.required)
                tmpobj["required"].push(ob.name);

            if(ob.dataType === "array"){
                tmpobj["properties"][ob.name]["items"] = { "type": ob["TypeOption"]["itemType"] };
            }
            if(ob.dataType === "string"){
                if(ob["TypeOption"]["name"] === "Length"){
                    tmpobj["properties"][ob.name]["minLength"] = ob["TypeOption"]["minValue"] ;
                    tmpobj["properties"][ob.name]["maxLength"] = ob["TypeOption"]["maxValue"] ;
                }
                else if(ob["TypeOption"]["name"] === "Pattern-Regex"){
                    tmpobj["properties"][ob.name]["pattern"] = ob["TypeOption"]["value"];
                }
                else if(ob["TypeOption"]["name"] === "Format"){
                    tmpobj["properties"][ob.name]["pattern"] = ob["TypeOption"]["formatType"];
                }
            }
        });

        tmpobj["properties"]["lifecycle"] = {"type":"object","properties":{"created":{"type":"number","format":"date-time"},"updated":{"type":"string","format":"date-time"},"deleted":{"type":"string","format":"date-time"}}};

        objectsToSend.push(tmpobj)
    });

    
    console.log(JSON.stringify(objectsToSend) )
    console.log(objs)
}
