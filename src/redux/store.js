import {configureStore} from '@reduxjs/toolkit'
import  userReducer  from './slice'
import  taskReducer  from './taskSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        tasks: taskReducer,
    }
})


