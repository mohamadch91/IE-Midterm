/**
 * @param  {string} username github username
 * @returns {JSON} user data
 * @description get the user data from github api
 * @example getUserData('username')
 * 
 */
const getUserData = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data =  response.json();
    return data;
}

/**
 * @param  {string} username github username
 * @returns {JSON} user repos
 * @description get the user 5 last pushed repos from github api
 * @example getUserRepos('username')
 * 
 */
const getUserRepos = async (username) => {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=pushed&per_page=5`);
    const data =  response.json();
    return data;
}



/**
 * @param  {JSON} repos user repos
 * @returns {JSON} most used languages
 * @description get the most used languages
 * @example mostUsedLanguages(repos)
 * 
 * 
 */
const mostUsedLanguages = (repos) => {
    const languages = repos.reduce((total, item) => {
        const {language, stargazers_count} = item;
        if (!language) return total;
        if (!total[language]) {
            total[language] = {label: language, value: 1, stars: stargazers_count};
        } else {
            total[language] = {...total[language], value: total[language].value + 1, stars: total[language].stars + stargazers_count};
        }
        return total;
    }, {});
    const mostUsed = Object.values(languages).sort((a, b) => {
        return b.value - a.value;
    }).slice(0, 5);
    return mostUsed;
}

export {getUserData, getUserRepos, mostUsedLanguages};
