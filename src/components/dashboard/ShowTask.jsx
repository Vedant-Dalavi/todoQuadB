import { useSelector } from "react-redux";
import ShowCompletedTasks from "./ShowCompletedTasks";
import ShowPendingTasks from "./ShowPendingTasks";


const ShowTask = () => {

    const allTask = useSelector((state) => state.tasks.tasks);
    const dark = useSelector((state) => state.theme.darkMode)


    return (
        <div className={`${dark && "text-[#F5F5F5]"} px-4 w-full flex flex-col`}>

            {
                allTask.length <= 0 ? (
                    <div className="flex justify-center">
                        <p>No Task to show</p>
                    </div>

                ) : (

                    <div>

                        {/* show pending tasks */}
                        <ShowPendingTasks tasks={allTask} />

                        {/* show completed tasks */}
                        <ShowCompletedTasks tasks={allTask} />
                    </div>


                )
            }


        </div>
    )
};

export default ShowTask;