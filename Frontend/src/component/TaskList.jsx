import { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/list.css";

export default function List() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    let list = await fetch("http://localhost:3100/tasks", {
      credentials: "include",
    });
    list = await list.json();

    if (list.success) {
      setTasks(list.result);
    } else {
      alert("Try after sometime");
    }
  };

  const DeleteTask = async (id) => {
    let item = await fetch("http://localhost:3100/delete/" + id, {
      method: "DELETE",
      credentials: "include",
    });
    item = await item.json();

    if (item.success) {
      console.log("Task deleted successfully");
      getTasks();
    } else {
      alert("Try after sometime");
    }
  };
  const selectAll = (event) => {
    if (event.target.checked) {
      let items = tasks.map((item) => item._id);
      setSelectedTask(items);
    } else {
      setSelectedTask([]);
    }
  };

  const selectSingleItem = (id) => {
    if (selectedTask.includes(id)) {
      let items = selectedTask.filter((item) => item !== id);
      setSelectedTask(items);
    } else {
      setSelectedTask([id, ...selectedTask]);
    }
  };

  const deleteMultiple = async () => {
    console.log(selectedTask);

    let item = await fetch("http://localhost:3100/delete-multiple", {
      credentials: "include",
      method: "delete",
      body: JSON.stringify(selectedTask),
      headers: {
        "Content-Type": "application/json",
      },
    });
    item = await item.json();
    if (item.success) {
      getTasks();
      setSelectedTask([]);
    } else {
      alert("Try after sometime");
    }
  };

  return (
    <div className="list-container">
      <h1> To-Do List</h1>

      <button onClick={deleteMultiple} className="delete-item delete-multiple">
        Delete
      </button>

      <ul className="task-list">
        <li className="task-item">
          <input onChange={selectAll} type="checkbox" />
        </li>
        <li className="task-item">S.NO</li>
        <li className="task-item">Title</li>
        <li className="task-item">Description</li>
        <li className="task-item">Actions</li>

        {tasks &&
          tasks.map((item, index) => (
            <Fragment key={item._id}>
              <li className="task-item1">
                <input
                  onChange={() => selectSingleItem(item._id)}
                  checked={selectedTask.includes(item._id)}
                  type="checkbox"
                />
              </li>
              <li className="task-item1">{index + 1}</li>
              <li className="task-item1">{item.title}</li>
              <li className="task-item1">{item.description}</li>
              <li className="task-item1">
                <button
                  className="delete-item"
                  onClick={() => DeleteTask(item._id)}
                >
                  Delete
                </button>

                <Link to={"update/" + item._id} className="update-item">
                  Update
                </Link>
              </li>
            </Fragment>
          ))}
      </ul>
      {/* <button onClick={deleteMultiple} className="delete-item delete-multiple">
        Delete
      </button> */}
    </div>
  );
}
