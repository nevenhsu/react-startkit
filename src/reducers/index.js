import { combineReducers } from 'redux'
import generalReducer from 'reducers/general'


const appReducer = combineReducers({
    general: generalReducer,
})

const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer
