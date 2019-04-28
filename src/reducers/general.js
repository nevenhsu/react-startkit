import {
    CHANGE_LANG,
} from 'actions/general'

// Languages
const acceptLang = ['en', 'zh']
const browserLang = navigator.language.split(/[-_]/)[0] // language without region code
const lang = acceptLang.indexOf(browserLang) > -1 ? browserLang : 'en'

const defaultState = {
    lang,
}

const generalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case CHANGE_LANG: {
            return {
                ...state,
                lang:
                    action.payload === acceptLang[0]
                        ? acceptLang[1]
                        : acceptLang[0],
            }
        }

        default: {
            return state
        }
    }
}

export default generalReducer
