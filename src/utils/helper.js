import _ from 'lodash'
import ChangeCase from 'change-case'

const func = () => {}

const Helper = {
    // ===== Object ===== //

    /**
     * 更改Object propName style
     * @param {object} data
     * @param {string} funcName - function name ex: 'camelCase', 'snakeCase', ...
     * @param {function} middleware - 客製化處理value (key, value) => newValue
     * @param {boolean} deepChange - 深層改變名稱
     * @returns {object}
     */
    changeCase: (
        data,
        funcName = 'camelCase',
        middleware = (key, value) => value,
        deepChange = true
    ) => {
        const caseName = funcName || 'camelCase'

        if (!_.isObject(data)) return data

        if (_.isArray(data)) {
            return data.map(item =>
                Helper.changeCase(item, caseName, middleware)
            )
        }

        const newObj = {}

        Object.keys(data).forEach(key => {
            const propName = ChangeCase[caseName](key)

            // Deep Change Case
            const value = deepChange
                ? Helper.changeCase(data[key], caseName, middleware)
                : data[key]
            const processedValue = middleware(propName, value) || value

            newObj[propName] = processedValue
        })

        return newObj
    },

    /* 把object轉 array */
    objectToArray: obj => {
        const array = []
        if (_.isObject(obj)) {
            const keys = Object.keys(obj)
            const values = Object.values(obj)
            for (let i = 0; i < keys.length; i += 1) {
                array.push(values[i])
            }
        }
        return array
    },

    // Object清理 undefined, null, ''
    cleanObject: obj => {
        Object.keys(obj).forEach(key => {
            if (obj[key] && _.isObject(obj[key])) Helper.cleanObject(obj[key])
            else if (!obj[key]) delete obj[key]
        })
        return obj
    },

    // Count Object keys that have value
    countObjectKeys: obj => {
        if (!_.isObject(obj)) return 0
        let count = 0

        Object.keys(obj).forEach(key => {
            if (_.isObject(obj[key])) {
                count += Helper.countObjectKeys(obj[key])
            } else if (_.isArray(!obj[key]) && obj[key].length > 0) {
                count += 1
            } else if (obj[key]) {
                count += 1
            }
        })

        return count
    },

    // Safe Parse Json
    parseJson: (str, fallback = {}) => {
        if (!str) return fallback // 如果是null, undefined, ''

        try {
            const json = JSON.parse(str)
            return !!json && typeof json === typeof fallback ? json : fallback
        } catch (error) {
            if (typeof str === typeof fallback) return str // 已經是object
            return fallback
        }
    },

    // ===== Array ===== //

    insert: (nth, array, ...ins) => [
        ...array.slice(0, nth),
        ...ins,
        ...array.slice(nth),
    ],

    // 比對 Array 有無交集
    hasIntersection: (array1 = [], array2 = []) =>
        array1.some(item => array2.indexOf(item) > -1),

    // 合併 Array
    mergeArray: (objValue, srcValue) => {
        if (_.isArray(objValue)) {
            const value = objValue.concat(srcValue)
            return _.uniq(value)
        }
    },

    // 排列array items
    /* order : 'asc', 'desc' */
    orderArray: (data, order, orderBy) =>
        stableSort(data, getSorting(order, orderBy)),

    // ===== String ===== //

    clearSpecialCharacter: (str = '') =>
        str.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, ''),

    clearCharacter: (value, character) => {
        if (typeof value === 'string') {
            // Clear hash
            const regex = new RegExp(character, 'gi')
            return value.replace(regex, '')
        }
        return value
    },

    // ===== utils ===== //

    waitFor: (milliseconds = 0, data = {}) =>
        new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(data)
            }, milliseconds)
        }),

    validateEmail: email => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
    },

    toBool: value => {
        if (value == false || value === 'false' || value === 'FALSE') {
            return false
        }

        if (value == true || value === 'true' || value === 'TRUE') {
            return true
        }

        return false
    },
}

// MARK: For Array order
function desc(a, b, orderby) {
    if (b[orderby] < a[orderby]) {
        return -1
    }
    if (b[orderby] > a[orderby]) {
        return 1
    }
    return 0
}

function stableSort(data, cmp) {
    const array = _.isArray(data) ? data : []
    const stabilizedThis = array.map((el, index) => [el, index])
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0])
        if (order !== 0) return order
        return a[1] - b[1]
    })
    return stabilizedThis.map(el => el[0])
}

function getSorting(order, orderBy) {
    return order === 'desc'
        ? (a, b) => desc(a, b, orderBy)
        : (a, b) => -desc(a, b, orderBy)
}

export default Helper
