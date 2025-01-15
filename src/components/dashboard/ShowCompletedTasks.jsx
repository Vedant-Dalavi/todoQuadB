
import { CheckBoxOutlined, Star, StarOutline } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { favorite, setOpenTask, updateTask } from "../../redux/slices/taskSlice";

const ShowCompletedTasks = ({ tasks }) => {

    const dispatch = useDispatch();
    return (
        <div className=" mt-2">

            <p className="pb-2">Completed</p>

            {tasks.map((task, index) => (

                <div key={index}>

                    {task.completed && (
                        <div className="flex justify-between py-4 border-t-2 border-[#496E4B33]">
                            <div className="flex gap-x-2 cursor-pointer">
                                <div onClick={() => dispatch(updateTask(task))}>
                                    <CheckBoxOutlined />
                                </div>
                                <p onClick={() => dispatch(setOpenTask(task))} ><strike>{task.title}</strike></p>
                            </div>

                            <div onClick={() => dispatch(favorite(task))} className="cursor-pointer">
                                {task.important == true ? <Star /> : <StarOutline />}
                            </div>


                        </div>
                    )}

                </div>

            ))}

        </div>
    )
};

export default ShowCompletedTasks;