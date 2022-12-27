import {
  setLocalStorage,
  getLocalStorage,
  
  clearLocalStorage,
  hasKey,
} from "./storageManager.js";
import { getUserData, getUserRepos, mostUsedLanguages } from "./fetchData.js";

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
    // get the user repos from github api
    const repos = getUserRepos(username);
    // get the most used languages
    const mostUsed = mostUsedLanguages(repos);
    // set the user data to local storage
    setLocalStorage(username, { data, repos, mostUsed });
    // return the user data
    return { data, repos, mostUsed };
};

const clearData = () => {
    // clear all the data from local storage
    clearLocalStorage();
}

export { getData, clearData };