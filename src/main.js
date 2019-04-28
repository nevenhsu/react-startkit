/* Global Style */
require('assets/sass/style.scss')

import React from 'react'
import ReactDOM from 'react-dom'

// Redux
import { Provider } from 'react-redux' /* react bindings for redux */
import Store, { history } from 'store/store'

// JSS
import { create } from 'jss'
import jssExpand from 'jss-expand'
import jssCompose from 'jss-compose'
import JssProvider from 'react-jss/lib/JssProvider'
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles'

/* Container */
import App from 'containers/app/App'
import ConnectedIntlProvider from 'containers/intlProvider/IntlProvider'

// Configure JSS
const jss = create({
    plugins: [...jssPreset().plugins, jssCompose(), jssExpand()],
}) // 增加JSS plugins
const generateClassName = createGenerateClassName()

ReactDOM.render(
    <Provider store={Store}>
        <ConnectedIntlProvider>
            <JssProvider jss={jss} generateClassName={generateClassName}>
                <App history={history} />
            </JssProvider>
        </ConnectedIntlProvider>
    </Provider>,
    document.getElementById('root')
)
