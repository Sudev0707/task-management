import { createAsyncThunk } from '@reduxjs/toolkit';
import { getTasksFromDB, saveTaskToDB, deleteTaskFromDB } from '../sqlite/database';
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
    return task; 
  }
);


export const updateTaskAsync  = createAsyncThunk(
  'tasks/updateTaskAsync ',
  async (task: any) => {
    await saveTaskToDB(task);
    return task; 
  }
);

export const deleteTaskAsync = createAsyncThunk(
  'tasks/deleteTaskAsync',
  async (taskId: string) => {
    await deleteTaskFromDB(taskId);
    return taskId; // return id to reducer
  }
);


