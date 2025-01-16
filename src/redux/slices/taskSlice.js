import { createSlice } from '@reduxjs/toolkit';


// Function to save tasks to localStorage
const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Load tasks and open task from localStorage
let newTask = JSON.parse(localStorage.getItem('tasks') || "[]");
let open = JSON.parse(localStorage.getItem('openTask'));

// Initial state
const initialState = {
    tasks: newTask,
    openTask: open,
    sidebar: true,
    loading: false,
    error: null,
};


// Task slice
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload); // Add task to the state
            saveTasksToLocalStorage(state.tasks); // Save to localStorage
        },
        updateTask: (state, action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);

            if (state.openTask && state.openTask.id === action.payload.id) {
                state.openTask = state.tasks[index];
                localStorage.setItem('openTask', JSON.stringify(state.openTask));
                console.log(JSON.parse(localStorage.getItem('openTask')));
            }
            if (index !== -1) {
                state.tasks[index].completed = !state.tasks[index].completed;
                saveTasksToLocalStorage(state.tasks); // Save to localStorage
            }
        },
        setOpenTask: (state, action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            state.openTask = state.tasks[index];
            localStorage.setItem('openTask', JSON.stringify(state.openTask));
        },
        closeOpenTask: (state) => {
            state.openTask = null;
            localStorage.setItem('openTask', JSON.stringify(state.openTask));
        },
        deleteTask: (state, action) => {
            const updatedTasks = state.tasks.filter((task) => task.id !== action.payload.id);
            state.tasks = updatedTasks;
            state.openTask = null;
            localStorage.setItem('openTask', JSON.stringify(state.openTask));
            saveTasksToLocalStorage(updatedTasks); // Save to localStorage
        },
        toggleSidebar: (state) => {
            state.sidebar = !state.sidebar;
        },
        favorite: (state, action) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (state.openTask && state.openTask.id === action.payload.id) {
                state.openTask = state.tasks[index];
                localStorage.setItem('openTask', JSON.stringify(state.openTask));
            }
            if (index !== -1) {
                state.tasks[index].important = !state.tasks[index].important;
                saveTasksToLocalStorage(state.tasks); // Save to localStorage
            }
        },
        updateDueDate: (state, action) => {

            console.log("**************************", action.payload.toISOString().split('T')[0])

            if (state.openTask) {
                const index = state.tasks.findIndex((task) => task.id === state.openTask.id);

                state.openTask.dueDate = action.payload.toISOString().split('T')[0];
                state.tasks[index].dueDate = action.payload.toISOString().split('T')[0];

                localStorage.setItem('openTask', JSON.stringify(state.openTask));
                saveTasksToLocalStorage(state.tasks);
            }
        },

        addNote: (state, action) => {
            if (state.openTask) {
                const index = state.tasks.findIndex((task) => task.id === state.openTask.id);

                state.openTask.note = action.payload;
                state.tasks[index].note = action.payload;

                localStorage.setItem('openTask', JSON.stringify(state.openTask));
                saveTasksToLocalStorage(state.tasks);
            }
        }
    },
});

// Export actions
export const {
    addTask,
    updateTask,
    setOpenTask,
    closeOpenTask,
    deleteTask,
    toggleSidebar,
    favorite,
    updateDueDate,
    addNote
} = taskSlice.actions;

// Export reducer
export default taskSlice.reducer;