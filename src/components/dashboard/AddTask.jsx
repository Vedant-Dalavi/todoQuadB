import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import LoopOutlinedIcon from '@mui/icons-material/LoopOutlined';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, addTaskWithInsight } from '../../redux/slices/taskSlice';


const AddTask = () => {

    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState(null);
    const dispatch = useDispatch();

    const handleAddTask = () => {
        if (!title) return alert("Task Name is required!");

        const newTask = {
            id: Date.now(),
            title,
            dueDate,
            completed: false,
            important: false,
            reminder: "",
            repeat: "None",
            note: "",
            steps: [],
            createdDate: new Date().toISOString(),
        };

        dispatch(addTaskWithInsight(newTask));
        setTitle('');
        setDueDate('');
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAddTask();
        }
    }

    const dark = useSelector((state) => state.theme.darkMode)

    return (
        <div className={`py-4 flex flex-row gap-x-12 w-full justify-between ${!dark ? "bg-gradient-to-b from-white to-[#35793729] border-t-2 border-b-2 " : "bg-[#2F3630] text-white"} `}>

            {/* task input */}
            <div className="pt-11 px-5 flex flex-col gap-y-12 w-full">

                <input type="text"
                    placeholder="Add A Task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="outline-none bg-transparent"
                />

                <div className="flex gap-x-5 text-gray-500 text-md items-center">

                    <NotificationsOutlinedIcon />
                    <LoopOutlinedIcon />
                    <input type="date"
                        placeholder='Due Date'
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className='bg-transparent outline-none'

                    />


                </div>

            </div>

            <div className="flex flex-col items-end justify-end px-5 w-full">
                <button className={`py-2 px-4  ${!dark ? "bg-[#35793729]" : "bg-[#357937E0]"} rounded-md`} onClick={() => handleAddTask()}>Add Task</button>
            </div>

        </div >
    )
};

export default AddTask;