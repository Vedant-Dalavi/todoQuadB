import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API Configuration
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const GEMINI_API_KEY = "AIzaSyAZJzF2IDCvYK_amIZmVGx-TwAS7nFr92o"; // Replace with your API key

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

// Thunk to fetch insights and add a task
export const addTaskWithInsight = createAsyncThunk(
    'tasks/addTaskWithInsight',
    async (task, { rejectWithValue }) => {
        try {
            // API call to fetch insights
            console.log("before insert", task)
            const response = await axios.post(
                `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
                {
                    "contents": [
                        {
                            "parts": [{ "text": `How i can complete this task = ${task.title}, give smaller steps to complete this task` }], // Use the task title for insights
                        },
                    ],
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            // Extract insight from the response
            const insight = response.data?.candidates[0].content?.[0]?.parts?.[0]?.text || 'No insight available';
            console.log(response)
            // Return the task with the fetched insight added to the `note` field
            return {
                ...task,
                note: insight, // Add the insight to the `note` field
                id: Date.now(),
                completed: false,
                important: false,
                reminder: "",
                repeat: "None",
                steps: [],
                createdDate: new Date().toISOString(),
            };
        } catch (error) {
            console.error('Error fetching insight:', error);
            return rejectWithValue('Failed to fetch task insights');
        }
    }
);

// Task slice
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        fetchTasksStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchTasksSuccess: (state, action) => {
            state.loading = false;
            state.tasks = action.payload;
            saveTasksToLocalStorage(state.tasks); // Save to localStorage
        },
        fetchTasksFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        addTask: (state, action) => {
            const newTask = {
                ...action.payload,
                id: Date.now(),
                completed: false,
                important: false,
                reminder: "",
                repeat: "None",
                steps: [],
                createdDate: new Date().toISOString(),
            };
            state.tasks.push(newTask); // Add task to the state
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
    },
    extraReducers: (builder) => {
        // Handle addTaskWithInsight
        builder
            .addCase(addTaskWithInsight.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addTaskWithInsight.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks.push(action.payload); // Add the task with insight
                saveTasksToLocalStorage(state.tasks); // Save to localStorage
            })
            .addCase(addTaskWithInsight.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

// Export actions
export const {
    fetchTasksStart,
    fetchTasksSuccess,
    fetchTasksFailure,
    addTask,
    updateTask,
    setOpenTask,
    closeOpenTask,
    deleteTask,
    toggleSidebar,
    favorite,
} = taskSlice.actions;

// Export reducer
export default taskSlice.reducer;