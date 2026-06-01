import { useState } from "react"
import '../styles/addtask.css'
import { useNavigate } from "react-router-dom";
export default function AddTask() {
    
    const [taskData, setTaskData] = useState({
    title: "",
    description: ""
    });
    const navigate = useNavigate();
     const handleAddTask = async (event) => {
    event.preventDefault();
       
        console.log(taskData);
        let result = await fetch("http://localhost:3100/add-task", {
            method: "POST",
            body: JSON.stringify(taskData),
            credentials:'include',
            headers: {
                "Content-Type": "application/json"
            }
           
        })
        result = await result.json();
        if (result.success) {
            alert("Task added successfully");
            navigate("/");
        } else {
            alert("Try after sometime");
        }
    }
    return (
        <div className="box">
            <h1>start Adding </h1>
            <form onSubmit={handleAddTask}>
                <label htmlFor="title">Title</label>
                <input onChange={(event) => setTaskData({...taskData, title:event.target.value})} type="text"  name="title" placeholder="Enter task title" />
                <br />
                <label htmlFor="description">Description</label>
                <textarea onChange={(event) => setTaskData({...taskData, description:event.target.value})} rows="4" name="description" placeholder="Enter task description"></textarea>
               
                <button type="submit" className="btn">Add New Task</button>
            </form>
        </div>
    )
}
