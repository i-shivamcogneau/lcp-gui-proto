import React from 'react';
import { useState } from 'react';

import Task from './Workflow/task';
import Trigger from './Workflow/trigger';

import ConvertWorkflow from './Workflow/convertWorkflow';

export default function Processes (){
  const [component, setComponent] = useState(); 
  const [trigger, settrigger] = useState({});
  const [triggerName, settriggerName] = useState([]);
  const [taskName, setTaskName] = useState([]);
  const [task, setTask] = useState({});

  return (
    <div>
      <button onClick={()=>setComponent("Trigger")}>Trigger</button>
      <button onClick={()=>setComponent("Task")}>Task</button>
      <button onClick={()=>ConvertWorkflow(trigger, task)}>Save and Download</button>

      {(() => {
        if (component == "Trigger") {
          return (
            <Trigger settrigger={settrigger} trigger={trigger} settriggerName={settriggerName} triggerName={triggerName} taskName={taskName} />
          )
        } else if (component == "Task") {
          return (
            <Task setTask={setTask} task={task} setTaskName={setTaskName} taskName={taskName} triggerName={triggerName}/>
          )
        }
      })()}

    </div>
  );
}