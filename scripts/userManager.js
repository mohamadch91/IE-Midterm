import {
  setLocalStorage,
  getLocalStorage,
  
  clearLocalStorage,
  hasKey,
} from "./storageManager.js";
import { getUserData, getUserRepos, mostUsedLanguages } from "./fetchData.js";
/**
 * @param  {string} username
 * @returns {JSON} user data
 * @description get the user data from github api or local storage if it exists there
 * also set the user data to local storage
 * concat the user data with the user repos and the most used languages
 * @example getData('username')
 * 
 */
const getData = (username) => {
    // check if the user data exists in local storage
    if (hasKey(username)) {
        // get the user data from local storage
        const data = getLocalStorage(username);
        // return the user data
        return data;
    }
    // get the user data from github api
    const data = getUserData(username);
    console.log(data);
    // get the user repos from github api
    const repos = getUserRepos(username);
    // get the most used languages
    const mostUsed = mostUsedLanguages(repos);
    // set the user data to local storage
    setLocalStorage(username, { data, repos, mostUsed });
    // return the user data
    console.log({ data, repos, mostUsed });
    return { data, repos, mostUsed };
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