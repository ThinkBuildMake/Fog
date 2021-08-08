// Environment Enums
export enum envs {
    DEVELOPMENT = 'http://localhost:5000',
    PRODUCTION = 'https://fog-test-abuimpincq-uc.a.run.app'
}

// Sizes and Custom Styling with Size Enum
export enum Sizes {
    EXTRA_SMALL,
    SMALL,
    MEDIUM,
    LARGE
}

export function determineModalSize(size: Sizes) {
    switch (size) {
        case Sizes.EXTRA_SMALL:
            return '30%'
        case Sizes.SMALL:
            return '25%'
        case Sizes.MEDIUM:
            return '15%'
        case Sizes.LARGE:
            return '5%'
        default:
            return '5%'
    }
}

export function determineButtonSize(size: Sizes): string {
    // TODO: make more scalable
    switch (size) {
        case Sizes.EXTRA_SMALL:
            return '175px'
        case Sizes.SMALL:
            return '200px'
        case Sizes.MEDIUM:
            return '400px'
        case Sizes.LARGE:
            return '600px'
        default:
            return '600px'
    }
}

// Checks if form has empty parameters
interface checkReturn {
    valid: boolean
    message: string
}
export function checkFormValuesEmpty(form: object): checkReturn {
    for (var attribute in form) {
        if (form[attribute] == null || form[attribute] == '') {
            return { valid: false, message: `${attribute} not in form` }
        }
    }
    return { valid: true, message: '' }
}
// TODO: TYPE THESE
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

export async function postRequest(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
}

export async function postRequestWithoutHeaders(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    return response.json() // parses JSON response into native JavaScript objects
}
export async function getRequest(url = '') {
    // Default options are marked with *
    const response = await fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('access_token')
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    })
    return response.json() // parses JSON response into native JavaScript objects
}

export function getDiffFromTimeStampsInWholeHours(date1, date2) {
    return Math.floor((date1 - date2) / 1000 / 60 / 60)
}
