import {configureStore} from '@reduxjs/toolkit'
import jobReducer from './jobSlice'


export default configureStore({
    reducer: jobReducer,
})