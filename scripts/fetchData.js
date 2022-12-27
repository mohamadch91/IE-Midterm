

const fetchData = (username)=>{
    const user_data = fetch(`https://api.github.com/users/${username}`)
    .then((response)=>response.json())
    .then((data)=>{
        return data;
    }
    )
    .catch((error)=>{
        console.log(error);
    }
    )
    const user_repos = fetch(`https://api.github.com/users/${username}/repos`)
    .then((response)=>response.json())
    .then((data)=>{
        return data;
    }
    )
    .catch((error)=>{
        console.log(error);
    }
    )
    // find the most used languages
    const langs=[]
    for (let i = 0; i < user_repos.length; i++) {
        const element = user_repos[i];
        const langues= fetch(element.language_url).then((response)=>response.json())
        .then((data)=>{
            return data;
            langs.push(data);
        }
        )
    }
    let max=0
    let max_lang=""
    for (let j =0; j<langs.length; j++){
        const element = langs[j];
        // iterate each ket in langs[j]
        for (const key in element) {
            if (element.hasOwnProperty(key)) {
                const value = element[key];
                if (value>max){
                    max=value;
                    max_lang=key;
                }
            }
        }
    }
    const most_used_lang = max_lang;
    return {user_data, user_repos, most_used_lang}
}