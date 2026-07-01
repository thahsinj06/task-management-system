import { useState } from "react";
import axiosInstance from "../services/axiosInstance";
import "./Tasks.css"
import { useTasks } from "../context/TaskContext";
function Tasks(){

    const [showForm,setShowForm] = useState(false);
    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [priority,setPriority] = useState("medium");
    
    const [selectedTask,setSelectedTask]=useState(null);
    const [editTask,setEditTask]=useState(null);
    const [search,setSearch] = useState("");
    const [filter,setFilter] = useState("all");
    const { tasks, addTask, deleteTask, updateTask } = useTasks();

    

    
    const handleAddTask = async()=>{

    try{

        const token = localStorage.getItem("token");


       const response = await axiosInstance.post(
            "/tasks",
            {
                title,
                description,
                priority
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );


        addTask(response.data);

        alert("Task added");
        setShowForm(false);
        
        setTitle("");
        setDescription("");
        setPriority("medium");



    }
    catch(error){

        console.error(error);

    }

};
   
      
    const handleDeleteTask = async(id)=>{

    try{

    const token = localStorage.getItem("token");


    await axiosInstance.delete(
    `/tasks/${id}`,
    {
    headers:{
    Authorization:`Bearer ${token}`
    }
    }
    );


        deleteTask(id);

        alert("Task deleted");


    


    }
    catch(error){

    console.error(error);

    }

    };

const handleStatusUpdate = async(id,status)=>{

    try{

        const token = localStorage.getItem("token");


        const response = await axiosInstance.put(
            `/tasks/${id}`,
            {
                completed:status
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );


        updateTask(response.data);


    }
    catch(error){

        console.error(error);

    }

};

     const filteredTasks = tasks.filter((task)=>{


const matchesSearch =
task.title
.toLowerCase()
.includes(search.toLowerCase());


const matchesFilter =

filter==="all"

||

(filter==="completed" && task.completed)

||

(filter==="pending" && !task.completed);



return matchesSearch && matchesFilter;


});     
const handleUpdateTask = async()=>{

try{

const token = localStorage.getItem("token");


const response = await axiosInstance.put(

`/tasks/${editTask._id}`,

{
title:editTask.title,
description:editTask.description,
priority:editTask.priority
},

{
headers:{
Authorization:`Bearer ${token}`
}
}

);


alert("Task updated");


setEditTask(null);
updateTask(response.data);



}
catch(error){

console.error(error);

}

};




    return(
        <div>

            <h1 className="page-title">
                My Tasks
                </h1>


         

            {
showForm && (

<div className="popup-overlay">


<div className="popup-window">


<h2>
Add New Task
</h2>



<input

placeholder="Task title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

/>



<textarea

placeholder="Description"

value={description}

onChange={(e)=>setDescription(e.target.value)}

/>



<select

value={priority}

onChange={(e)=>setPriority(e.target.value)}

>


<option value="low">
Low
</option>


<option value="medium">
Medium
</option>


<option value="high">
High
</option>


</select>


<br/><br/>



<button onClick={handleAddTask}>
Save Task
</button>


<button onClick={()=>setShowForm(false)}>
Cancel
</button>



</div>


</div>

)

}

<div className="task-controls">


<button 
className="add-task-btn"
onClick={()=>setShowForm(!showForm)}
>
+ Add Task
</button>



<input

className="search-box"

placeholder="Search tasks..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>



<select

className="filter-box"

value={filter}

onChange={(e)=>setFilter(e.target.value)}

>

<option value="all">
All
</option>

<option value="pending">
Pending
</option>

<option value="completed">
Completed
</option>


</select>


</div>



            <table className="task-table">

                <thead>


<tr>

<th>No</th>
<th>Title</th>
<th>Priority</th>
<th>Status</th>
<th>Actions</th>
</tr>
 </thead>

<tbody>

{
filteredTasks.map((task,index)=>(

<tr key={task._id}>

<td>
{index+1}
</td>


<td className={task.completed ? "task-done" : ""}>

{task.title}

</td>


<td>
{task.priority}
</td>


<td>

{
task.completed 
?
<span className="completed-status">
✅ Completed
</span>

:

<span>
⏳ Pending
</span>

}

</td>

<td>

<div className="action-buttons">

<button onClick={()=>setSelectedTask(task)}>
View
</button>

<button onClick={()=>setEditTask(task)}>
🖊️
</button>

<button onClick={()=>handleDeleteTask(task._id)}>
🗑️
</button>


{
task.completed ? (

<button onClick={()=>handleStatusUpdate(task._id,false)}>
↩️
</button>

) : (

<button onClick={()=>handleStatusUpdate(task._id,true)}>
✅
</button>

)
}



</div>

</td>


</tr>


))
}

</tbody>

            </table>
           
           
           
           
           
          
{
editTask && (

<div className="popup-overlay">


<div className="popup-window">


<h2>
Edit Task
</h2>


<input

value={editTask.title}

onChange={(e)=>

setEditTask({

...editTask,

title:e.target.value

})

}

/>


<textarea

value={editTask.description}

onChange={(e)=>

setEditTask({

...editTask,

description:e.target.value

})

}

/>


<select

value={editTask.priority}

onChange={(e)=>

setEditTask({

...editTask,

priority:e.target.value

})

}

>


<option value="low">
Low
</option>


<option value="medium">
Medium
</option>


<option value="high">
High
</option>


</select>


<br/><br/>


<button onClick={handleUpdateTask}>
Save Changes
</button>

<button onClick={()=>setEditTask(null)}>
Cancel
</button>


</div>


</div>

)

}          
           {
selectedTask && (

<div className="popup-overlay">


<div className="popup-window">


<h2>
Task Details
</h2>


<h3>
{selectedTask.title}
</h3>


<p className="task-description">
{selectedTask.description}
</p>


<p>
Priority: {selectedTask.priority}
</p>


<button onClick={()=>setSelectedTask(null)}>
Close
</button>


</div>


</div>

)}



</div>

)


        
    

}


export default Tasks;