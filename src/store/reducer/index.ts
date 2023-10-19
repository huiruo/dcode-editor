import { combineReducers } from '@reduxjs/toolkit'
import designerReducer from '../designerSlice'

const rootReducer = combineReducers({
  designer: designerReducer,
})

export default rootReducer
