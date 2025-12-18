import { createSlice } from '@reduxjs/toolkit';
import { addTaskAsync, loadTasksAsync, updateTaskAsync } from './taskThunks';

const initialState = {
    tasks: [],
};

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,

    reducers: {
        storeTasks: (state, action) => {
            state.tasks = action.payload;
        },

        updateTask: (state, action) => {
            const index = state.tasks.findIndex(
                t => t.id === action.payload.id
            );
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },

        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter(
                t => t.id !== action.payload
            );
        },

        toggleComplete: (state, action) => {
            const task = state.tasks.find(
                t => t.id === action.payload
            );
            if (task) {
                task.completed = !task.completed;
            }
        },
    },

    // async thunks here
    extraReducers: builder => {
        builder
            .addCase(loadTasksAsync.fulfilled, (state, action) => {
                state.tasks = action.payload;
            })
            .addCase(addTaskAsync.fulfilled, (state, action) => {
                state.tasks.push(action.payload);
            })

            .addCase(updateTaskAsync.fulfilled, (state, action) => {
                const index = state.tasks.findIndex(
                    t => t.id === action.payload.id
                );
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
            });
    },




});

//  EXPORT ONLY EXISTING REDUCERS
export const {
    storeTasks,
    updateTask,
    deleteTask,
    toggleComplete,
} = taskSlice.actions;

export default taskSlice.reducer;
