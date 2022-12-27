const fetchData = async (username) => {
  const user_data = await fetch(`https://api.github.com/users/${username}`)
  const user_repo = await fetch(`https://api.github.com/users/${username}/repos?per_page=5&sort=pushed`)
    const user_repos = await user_repo.json();
    const u_data = await user_data.json();

    
  // find the most used languages
  const langs = [];
  for (let i = 0; i < user_repos.length; i++) {
    const element = user_repos[i];
    const langues = await fetch(element.languages_url)
    const lang = await langues.json();
    langs.push(lang);

      
  }
  let max = 0;
  let max_lang = "";
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
  return { u_data, user_repos, most_used_lang };
};

export { fetchData };
