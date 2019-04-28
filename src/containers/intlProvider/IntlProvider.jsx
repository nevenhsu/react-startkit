import { connect } from 'react-redux'
import { IntlProvider, addLocaleData } from 'react-intl'
import Helper from 'utils/helper'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'

addLocaleData([...en, ...zh])

import Translations from 'translations'

const mapStateToProps = state => {
    const { general = {} } = state
    const { lang } = general

    const cleanLang = Helper.clearSpecialCharacter(lang)
    const messages = Translations[cleanLang] || Translations.en

    return { locale: lang, messages }
}

export default connect(mapStateToProps)(IntlProvider)
