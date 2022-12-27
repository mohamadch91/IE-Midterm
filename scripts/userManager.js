import {
  setLocalStorage,
  getLocalStorage,
  
  clearLocalStorage,
  hasKey,
} from "./storageManager.js";
import {  fetchData} from "./fetchData.js";
/**
 * @param  {string} username
 * @returns {JSON} user data
 * @description get the user data from github api or local storage if it exists there
 * also set the user data to local storage
 * concat the user data with the user repos and the most used languages
 * @example getData('username')
 * 
 */
const getData = async (username) => {
    // check if the user data exists in local storage
    if (hasKey(username)) {
        // get the user data from local storage
        console.log('from local storage')
        const data = getLocalStorage(username);
        // return the user data
        return data;
    }
    // get the user data from github api
    console.log('from github api')
    const data= await fetchData(username);
    // set the user data to local storage
    setLocalStorage(username, data);
    // return the user data
    return data;
};
/**
 * @returns {void}
 * @description clear all the data from local storage
 * @example clearData()
 * use this function in the start of the app
 */
const clearData = () => {
    // clear all the data from local storage
    clearLocalStorage();
}

export { getData, clearData };