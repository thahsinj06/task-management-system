import { useTasks} from "../context/TaskContext";
import "./Dashboard.css";
function Dashboard(){

    const {tasks}=useTasks();


    const totalTasks = tasks.length;


    const completedTasks = tasks.filter(
        task => task.completed
    ).length;


    const pendingTasks = tasks.filter(
        task => !task.completed
    ).length;



    return(

        <div>


            <h1 className="page-title">
                Dashboard
            </h1>



            <p className="dashboard-subtitle">
                Welcome back! Here's your task overview.
            </p>




            <div className="stats-container">



                <div className="stat-card total-card">

                    <h3>
                        Total Tasks
                    </h3>

                    <p>
                        {totalTasks}
                    </p>

                </div>




                <div className="stat-card completed-card">

                    <h3>
                        Completed
                    </h3>

                    <p>
                        {completedTasks}
                    </p>

                </div>





                <div className="stat-card pending-card">

                    <h3>
                        Pending
                    </h3>

                    <p>
                        {pendingTasks}
                    </p>

                </div>



            </div>





            <h2 className="section-title">
    Recent Tasks
</h2>


{
    [...tasks]
    .sort(
        (a,b)=> new Date(b.createdAt) - new Date(a.createdAt)
    )
    .slice(0,5)
    .map((task)=>(


        <div 
        key={task._id}
        className="recent-task"
        >


            <h3>
                {task.title}
            </h3>


            <p>

                {
                    task.completed
                    ? "Completed"
                    : "Pending"
                }

            </p>


        </div>


    ))
}


           



        </div>

    )

}


export default Dashboard;