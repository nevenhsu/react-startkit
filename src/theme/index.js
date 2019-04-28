import React from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Color from 'color'
// Custom
import palette from './custom/palette'
import typography, {
    fontFamilyBrand,
    fontFamilyBody,
} from './custom/typography'
import { DarkShadow, BlackShadow } from './custom/shadow'

// A custom theme
export const Theme = createMuiTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    typography: {
        fontSize: 16,
        fontFamily: fontFamilyBrand.join(','),
        ...typography,
    },
    palette,
    shadows: DarkShadow,
    shape: {
        borderRadius: 8,
    },
    zIndex: {
        mobileStepper: 1000,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
    },
    props: {
        MuiTooltip: {
            disableFocusListener: true,
        },
    },
    overrides: {
        
    }
})

function muiTheme(Component) {
    function MuiTheme(props) {
        // MuiThemeProvider makes the theme available down the React tree
        // thanks to React context.
        return (
            <MuiThemeProvider theme={Theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <Component {...props} />
            </MuiThemeProvider>
        )
    }

    return MuiTheme
}

export default muiTheme
