import { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../services/axiosInstance";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);


    const fetchTasks = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await axiosInstance.get("/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            setTasks(response.data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    // CRUD STATE HANDLERS
    const addTask = (task) => {
        setTasks(prev => [task, ...prev]);
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task._id !== id));
    };

    const updateTask = (updatedTask) => {
        setTasks(prev =>
            prev.map(task =>
                task._id === updatedTask._id ? updatedTask : task
            )
        );
    };


    useEffect(() => {
        fetchTasks();
    }, []);


    return (
        <TaskContext.Provider value={{
            tasks,
            setTasks,
            fetchTasks,
            loading,
            addTask,
            deleteTask,
            updateTask
        }}>
            {children}
        </TaskContext.Provider>
    );
};


export const useTasks = () => useContext(TaskContext);