import {configureStore} from '@reduxjs/toolkit'
import UserReducer from './userSlice.js'

const store=configureStore({
    reducer:{
        user:UserReducer,
    }
})

export default store