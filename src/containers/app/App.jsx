import React from 'react'
import PropTypes from 'prop-types'
import Loadable from 'react-loadable'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router-dom' // react-router v4
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from '@material-ui/styles'
import theme, { Theme } from 'theme' // material-ui theme

// Components
const Loading = () => <div />

// Containers
import Home from 'containers/home/Home'



const App = ({ history }) => {

    return (
        <ThemeProvider theme={Theme}>
            <div
                className="container-fluid"
                style={{ minHeight: '100vh', padding: 0 }}
            >
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path="/" component={Home} />
                    </Switch>
                </ConnectedRouter>

                <ToastContainer
                    position="bottom-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    draggable
                    pauseOnHover
                    style={{ zIndex: 9999 }}
                />
            </div>
        </ThemeProvider>
    )
}

App.propTypes = {
    history: PropTypes.object,
}

App.defaultProps = {
    history: {},
}

export default theme(App)
