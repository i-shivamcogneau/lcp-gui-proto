import React from 'react';
import { useState, useEffect } from 'react';
import './AddWorkflow.css';
import AddEditTask from './AddeditTask';
import AddEditTrigger from './AddEditTrigger';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function AddWorkflow ({WorkflowEdit, setWorkflowEdit, setWorkflows }){
    const [WorkFlowTrigger, setWorkFlowTrigger] = useState({});
    const [WorkFlowTask, setWorkFlowTask] = useState([]);
    const [WorkFlowQueue, setWorkFlowQueue] = useState([]);
    const [comp, setcomp] = useState({"compn": "", "idx": -1});

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
     
    useEffect(() => {
        let tmpwfTask = [];
        let tmpwfQueue = [];
        
        for(let i in WorkflowEdit.task){
            tmpwfTask.push(WorkflowEdit.task[i]);
            tmpwfQueue.push(WorkflowEdit.queue[i]);
        }

        setWorkFlowTask(tmpwfTask);
        setWorkFlowQueue(tmpwfQueue);
        setWorkFlowTrigger(WorkflowEdit.trigger || "");
    }, [WorkflowEdit]);

    function addStuffArr(){
        setWorkFlowTask((a)=> [...a, {"name": "", "code": ""}]);
        setWorkFlowQueue((a)=> [...a, {"name": "", "properties": ""}]);
    }

    function SaveToEditobj(){
        setWorkflowEdit((cureditObj)=> {
            cureditObj.trigger = WorkFlowTrigger;
            cureditObj.task = WorkFlowTask;
            cureditObj.queue = WorkFlowQueue;
            return cureditObj;
        })

        setWorkflows((objs)=>{
            objs[WorkflowEdit.name] = WorkflowEdit;
            return objs;
        })
        
    }

    function Edittasks(tmpcmp, i=-1){
        setcomp({"compn": tmpcmp, "idx": i});
    }

    if(Object.keys(WorkflowEdit).length === 0){
        return(<>Create/Select a Workflow</>);
    }

    function onDragEnd(result) {
        if (!result.destination) {
            return;
        }
    
        const items = Array.from(WorkFlowTask);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
    
        setWorkFlowTask(items);

        const queueitems = Array.from(WorkFlowQueue);
        const [queuereorderedItem] = queueitems.splice(result.source.index, 1);
        queueitems.splice(result.destination.index, 0, queuereorderedItem);
    
        setWorkFlowQueue(queueitems);
    }
    
    return (<div className='wfmain'>
        <div className='wfleftside'>
            <div className='wfTitle'>
                <span className='wfTitle'>Name: {WorkflowEdit.name}</span>
                <br></br>
                <span className='wfTitle'>Id: {WorkflowEdit.id}</span>
            </div>

            <div className='trigger' style={{border: '1px solid rgba(0, 0, 0)', cursor: 'pointer'}} onClick={()=> Edittasks("trigger")}>
                <span className='wfTitle'>Trigger Name: {WorkFlowTrigger["name"] || ""}</span>
            </div>

            <div className='task'>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="workFlowTask">
                    {(provided, snapshot) => (
                        <div ref={provided.innerRef} style={{ backgroundColor: snapshot.isDraggingOver ? '#adadad' : 'grey' }} {...provided.droppableProps}>
                            {WorkFlowTask.map((wfTID, index) => (
                                <Draggable draggableId={index.toString()} index={index} key={index}>
                                    {(provided) => (
                                        <div key={index} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}  onClick={()=> Edittasks("task",index)}>
                                            <div className='wfTitle'>Queue Name: {WorkFlowQueue[index]["name"] || ""}</div>
                                            <div className='wfTitle'>Task Name: {WorkFlowTask[index]["name"] || ""}</div> 
                                            <hr></hr>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            </div>

            <div>
                <button onClick={()=> addStuffArr()}>+</button>            
                <button onClick={()=> SaveToEditobj()}>Save</button>       
                <button onClick={forceUpdate}>Re-Render</button>
            </div>
        </div>

        <div className='wfrightside'>
            {(() => {
                if (comp.compn == "task") {
                return (
                    <AddEditTask WorkFlowQueue={WorkFlowQueue} WorkFlowTask={WorkFlowTask} setWorkFlowQueue={setWorkFlowQueue} setWorkFlowTask={setWorkFlowTask} idx={comp.idx} />
                    )
                } else if (comp.compn == "trigger") {
                return (
                    <AddEditTrigger WorkFlowTrigger={WorkFlowTrigger} setWorkFlowTrigger={setWorkFlowTrigger} />
                    )
                }
            })()}
            
        </div>
            
        </div>);
}