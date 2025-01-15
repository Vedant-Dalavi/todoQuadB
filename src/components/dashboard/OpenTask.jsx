import { useDispatch, useSelector } from "react-redux";
import { closeOpenTask, deleteTask, favorite, updateTask } from "../../redux/slices/taskSlice";
import { Add, CheckBoxOutlineBlankSharp, CheckBoxOutlined, CloseOutlined, Delete, LoopOutlined, NotificationsNoneOutlined, Star, StarOutline } from "@mui/icons-material";
import { CalendarIcon } from "@mui/x-date-pickers";
import { differenceInDays } from 'date-fns';


const OpenTask = ({ task }) => {

    const dispatch = useDispatch();

    const calculateTimeDifference = (createdAt) => {
        const now = new Date();
        const updatedDate = new Date(createdAt);


        const daysDifference = differenceInDays(now, updatedDate);

        if (daysDifference == 1) {
            return `${daysDifference} Yesterday`;
        }
        else if (daysDifference == 0) {
            return `Today`;
        }
        else {
            return `on ${createdAt}`;
        }
    };

    console.log(task)

    const dark = useSelector((state) => state.theme.darkMode)


    return (
        <div className={`w-[50%] ${!dark ? "bg-[#EEF6EF]" : "bg-[#2C2C2C]"
            } flex flex-col h-screen`}>
            {/* task info */}
            <div className="py-6 pl-8 flex-grow overflow-y-auto">
                <div className="flex justify-between py-4 pr-10 border-t-2 border-[#496E4B33]">
                    <div className="flex gap-x-2">
                        {task.completed === true ? (
                            <div className="flex gap-x-2">
                                <div onClick={() => dispatch(updateTask(task))}>
                                    <CheckBoxOutlined />
                                </div>
                                <strike>{task.title}</strike>
                            </div>
                        ) : (
                            <div className="flex gap-x-2">
                                <div onClick={() => dispatch(updateTask(task))}>
                                    <CheckBoxOutlineBlankSharp />
                                </div>
                                <p>{task.title}</p>
                            </div>
                        )}
                    </div>

                    <div onClick={() => dispatch(favorite(task))} className="cursor-pointer">
                        {task.important === true ? <Star /> : <StarOutline />}
                    </div>
                </div>

                <div className="flex gap-x-2 py-4 pr-10 border-t-2 border-[#496E4B33]">
                    <Add />
                    <p>Add Step</p>
                </div>

                <div className="flex gap-x-2 py-4 pr-10 border-t-2 border-[#496E4B33]">
                    <NotificationsNoneOutlined />
                    <p>Set Reminder</p>
                </div>

                <div className="flex gap-x-2 py-4 pr-10 border-t-2 border-[#496E4B33]">
                    <CalendarIcon />
                    <p>Add Due Date</p>
                </div>

                <div className="flex gap-x-2 py-4 pr-10 border-t-2 border-[#496E4B33]">
                    <LoopOutlined />
                    <p>Repeat</p>
                </div>

                <div className="flex gap-x-2 px-7 py-4 border-t-2 border-[#496E4B33]">
                    <textarea
                        type="text"
                        placeholder="Add Notes"
                        className="outline-none bg-transparent w-full h-24"
                    />
                </div>
            </div>

            {/* close and delete task */}
            <div className={`flex justify-between items-center px-4 py-4 border-t-2 border-[#496E4B33] sticky bottom-0`}>
                <div onClick={() => dispatch(closeOpenTask())} className="cursor-pointer">
                    <CloseOutlined />
                </div>

                <div>
                    <p>Created {calculateTimeDifference(task.createdDate)}</p>
                </div>

                <div onClick={() => dispatch(deleteTask(task))} className="cursor-pointer">
                    <svg
                        width="24"
                        height="27"
                        viewBox="0 0 24 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.02666 26.6417C4.25888 26.6417 3.61832 26.385 3.10499 25.8717C2.59166 25.3583 2.33443 24.7172 2.33332 23.9483V3.30834H0.666656V1.64167H7.33332V0.358337H17.3333V1.64167H24V3.30834H22.3333V23.95C22.3333 24.7167 22.0767 25.3572 21.5633 25.8717C21.05 26.3861 20.4089 26.6428 19.64 26.6417H5.02666ZM8.67999 21.6417H10.3467V6.64167H8.67999V21.6417ZM14.32 21.6417H15.9867V6.64167H14.32V21.6417Z"
                            fill="black"
                        />
                    </svg>
                </div>
            </div>
        </div>

    )
};

export default OpenTask;