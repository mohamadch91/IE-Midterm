/**
 * @param  {string} key github username
 * @param  {JSON} value github user data
 * @returns {void}
 * @description set the user data to local storage
 * @example setLocalStorage('username', {name: 'John Doe', email: ''})
 * 
 */
const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};
/**
 * @param  {string} key github username
 * @returns {JSON} user data
 * @description get the user data from local storage
 * @example getLocalStorage('username')
 */
const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

/**
 * @returns {void}
 * @description clear all the data from local storage
 * @example clearLocalStorage()
 * 
 */
const clearLocalStorage = () => {
    localStorage.clear();
}
/**
 * @param  {string} key github username
 * @returns {boolean} true if the key exists
 * @description check if the key exists in local storage
 * @example hasKey('username')
 * 
 */
const hasKey = (key) => {
    return localStorage.hasOwnProperty(key);
}

export {setLocalStorage, getLocalStorage, clearLocalStorage, hasKey};
