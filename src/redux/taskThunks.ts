import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTasksFromDB, saveTaskToDB } from '../sqlite/database';
import { updateTaskInDB } from '../sqlite/database';

export const loadTasksAsync = createAsyncThunk(
  'tasks/loadTasksAsync',
  async () => {
    return await getTasksFromDB();
  }
);


export const addTaskAsync = createAsyncThunk(
  'tasks/addTaskAsync',
  async (task: any) => {
    await saveTaskToDB(task);
    return task; // returned value goes to reducer
  }
);


export const updateTaskAsync  = createAsyncThunk(
  'tasks/updateTaskAsync ',
  async (task: any) => {
    await saveTaskToDB(task);
    return task; // returned value goes to reducer
  }
);



