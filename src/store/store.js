import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import { createStore, applyMiddleware } from 'redux'
import {
    routerMiddleware,
    connectRouter,
} from 'connected-react-router' /* synchronize router state with redux store (history -> store -> router -> components) */
import { createBrowserHistory } from 'history' /* history object for use in modern web browsers */
import thunk from 'redux-thunk'
import rootReducer from 'reducers/index'

// Configure redux-router
export const history = createBrowserHistory()

const initialState = {}
const middleware = [thunk, routerMiddleware(history)] // 把middleware跟history資料串起來
const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware))

const store = createStore(
    connectRouter(history)(
        rootReducer
    ) /* new root reducer with router state */,
    initialState,
    composedEnhancers
)

export default store
