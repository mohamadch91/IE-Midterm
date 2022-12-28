/**
 * @param  {string} username github username
 * @returns {JSON} user data  and the most used language
 * @description get the user data from github api
 * @example fetchData('username')
 *
 *
 */
const fetchData = async (username) => {
  // get the user data from github api
  const user_data = await fetch(
    `https://api.github.com/users/${username}`
  ).catch((err) => {
    console.log(err);
  });
  // get the user repos from github api
  const user_repo = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=5&sort=pushed`
  ).catch((err) => {
    console.log(err);
  });
  // convert the user data to json
  const user_repos = await user_repo?.json().catch((err) => {
    console.log(err);
  });
  const u_data = await user_data?.json().catch((err) => {
    console.log(err);
  });

  // get the most used language from the user repos API
  const langs = [];
  for (let i = 0; i < user_repos?.length; i++) {
    const element = user_repos[i];
    const langues = await fetch(element?.languages_url).catch((err) => {
      console.log(err);
    });
    const lang = await langues?.json().catch((err) => {
      console.log(err);
    });
    langs.push(lang);
  }
  let max = 0;
  let max_lang = "";
  //   find the most used language
  for (let j = 0; j < langs.length; j++) {
    const element = langs[j];
    for (const key in element) {
      if (element.hasOwnProperty(key)) {
        const value = element[key];
        if (value > max) {
          max = value;
          max_lang = key;
        }
      }
    }
  }
  const most_used_lang = max_lang;
  return { u_data, most_used_lang };
};

export { fetchData };
