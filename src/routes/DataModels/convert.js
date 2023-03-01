import React from 'react';

export default function Convert (objs){
    var objectsToSend = [];
    
    const keys = Object.keys(objs);

    keys.forEach((key, index) => {
        // console.log(`${key}: ${JSON.stringify(objs[key])}`);
        let tmpobj ={"$id": key, "type": "object", "properties":{}};

        objs[key]["data"].forEach(ob =>{ 
            tmpobj["properties"][ob.name] = {"type": ob.dataType}
        })

        objectsToSend.push(tmpobj)
    });

    
    console.log(objectsToSend )
    console.log(objs)
}
