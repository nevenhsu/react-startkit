import React from 'react'
import _ from 'lodash'
import { toast, ToastPosition } from 'react-toastify'
import { ErrorType } from 'constants/general'
import { FormattedMessage } from 'react-intl'
import Numeral from 'numeral'
import Palette from 'theme/custom/palette'
import Helper from './helper'

const uiHelper = {
    numberFormat: (number, fallback = '') => {
        if (number > 1000) {
            return Numeral(number).format('0.0a')
        }

        if (_.isNumber(number)) {
            return number
        }

        return fallback
    },

    /**
     * Toast Error Message
     * @param { object } error - { status, ... }
     * @param { string } messages - { 0, 401, 404, 503 }
     * @return { number } status
     */
    apiErrorMessage: (error = {}, messages = {}, toastOptions = {}) => {
        const { response: { status } = {} } = error

        const defaultMessage = {
            0: (
                <FormattedMessage
                    id="error.0"
                    defaultMessage="Oops! Please try again or contact us for more help."
                />
            ),
            401: (
                <FormattedMessage
                    id="error.401"
                    defaultMessage="Oops! Something goes wrong. Please try again."
                />
            ),
            404: (
                <FormattedMessage
                    id="error.404"
                    defaultMessage="Automatically logged out after logging in on another device."
                />
            ),
            503: (
                <FormattedMessage
                    id="error.503"
                    defaultMessage="Sorry, the server is down. We are under maintenance!"
                />
            ),
        }

        const errorMessage = { ...defaultMessage, ...messages }

        switch (status) {
            case ErrorType.unauthorized: {
                const msg = errorMessage[ErrorType.unauthorized]
                if (msg) {
                    toast.error(msg, { autoClose: false, ...toastOptions })
                }

                return error
            }

            case ErrorType.notFound: {
                const msg = errorMessage[ErrorType.notFound]
                if (msg) {
                    toast.error(msg, toastOptions)
                }
                return error
            }

            case ErrorType.noService: {
                const msg = errorMessage[ErrorType.noService]
                if (msg) {
                    toast.error(msg, {
                        position: ToastPosition.TOP_CENTER,
                        autoClose: false,
                        ...toastOptions,
                    })
                }
                return error
            }

            default: {
                const msg = errorMessage[ErrorType.default]
                if (msg) {
                    toast.error(msg, {
                        position: ToastPosition.BOTTOM_CENTER,
                        autoClose: false,
                        ...toastOptions,
                    })
                }
                return error
            }
        }
    },
}

export default uiHelper
