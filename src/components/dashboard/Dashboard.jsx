import { useSelector } from "react-redux";
import AddTask from "./AddTask";
import ShowTask from "./ShowTask";
import OpenTask from "./OpenTask";
import { ArrowDropDown } from "@mui/icons-material";

const Dashboard = () => {

    const openedTask = useSelector((state) => state.tasks.openTask);

    const toggle = useSelector((state) => state.tasks.sidebar);



    return (
        <div className={`w-full flex ${!toggle && "pl-12"} ${openedTask ? "flex-row gap-x-2" : "flex-col pr-12"} gap-y-2 `}>
            <div className="w-full">
                <div className="flex gap-x-2 items-center">
                    <p>To Do</p>
                    <ArrowDropDown />
                </div>
                <AddTask />
                <ShowTask />
            </div>

            {
                openedTask && (

                    <OpenTask task={openedTask} />
                )
            }

        </div>
    )
};

export default Dashboard;