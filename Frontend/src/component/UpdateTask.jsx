import { useState, useEffect } from "react"
import '../styles/addtask.css'
import { useNavigate,useParams } from "react-router-dom";

export default function UpdateTask() {
    
const [taskData, setTaskData] = useState({
    title: "",
    description: ""
    });
    const navigate = useNavigate();
    const { id } = useParams();
    
    

   useEffect(() => {
    getTask(id);
}, [id]);

    const getTask = async (id) => { 
        let task = await fetch("http://localhost:3100/task/" + id);
        task = await task.json()
        if (task.result) {
          setTaskData(task.result);
        }

    }
 
 



    
    const updateTask = async () => {
        console.log("function called ", taskData);
        let task = await fetch("http://localhost:3100/update-task", {
            method: "PUT",
            body: JSON.stringify({ ...taskData }),
            headers: {
                "Content-Type": "application/json",
            
            }
        });
        task = await task.json();
        if (task) {
            alert("Task updated successfully");
            navigate("/");
        }
    }

 
     
    return (
        <div className="box1">
            <h1>Update Task</h1>
            
                <label htmlFor="title">Title</label>
                <input value={taskData.title} onChange={(event) => setTaskData({...taskData, title:event.target.value})} type="text"  name="title" placeholder="Enter task title" />
                <br />
                <label htmlFor="description">Description</label>
                <textarea value={taskData.description} onChange={(event) => setTaskData({...taskData, description:event.target.value})} rows="4" name="description" placeholder="Enter task description"></textarea>
               
                <button onClick={updateTask} className="btn1">Update Task</button>
            
        </div>
    )
}
