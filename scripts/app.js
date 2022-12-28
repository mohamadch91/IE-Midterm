import { getData, clearData } from "./userManager.js";
/**
 * @constant {object} icon_dic
 * @description dictionary of icons for the most used languages
 * @example icon_dic['C++'] = 'c-plusplus'
 *
 */
const icon_dic = {
  "C++": "c-plusplus",
  "C#": "csharp",
  C: "c",
  CSS: "css3",
  HTML: "html5",
  Java: "java",
  JavaScript: "javascript",
  PHP: "php",
  Python: "python",
  Ruby: "ruby",
  Shell: "shell",
  TypeScript: "typescript",
  Vue: "vue",
  React: "react",
  Angular: "angular",
  Dart: "dart",
  Go: "go",
  Kotlin: "kotlin",
  Swift: "swift",
  Rust: "rust",
  Scala: "scala",
  Perl: "perl",
  Lua: "lua",
  "Objective-C": "objectivec",
  "Jupyter Notebook": "jupyter",
  CMake: "cmake",
  CoffeeScript: "coffeescript",
  Shell: "powershell",
  TeX: "tex",
  PowerShell: "powershell",
  Node: "nodejs",
    "Visual Basic": "visualbasic",
    Nodejs: "nodejs",
    "HTML5": "html",
    "HTML": "html",
    "CSS": "css",
    "CSS3": "css",
    
};
/**
 * @param  {string} msg message to be displayed
 * @param  {string} color color of the alert
 * @returns {void}
 * @description display the alert with the message and the color
 * @example styledAlert('Data is from local storage', 'green')
 *
 */
export const styledAlert = (msg, color) => {
  document.getElementById("alert").style.display = "block";
  document.getElementById("alert").style.backgroundColor = color;

  document.getElementById("alert-text").innerHTML = msg;
  setTimeout(() => {
    document.getElementById("alert").style.display = "none";
  }, 3000);
};
/**
 * @param  {string} id id of the element
 * @param  {string} content content to be added
 * @returns {void}
 * @description add the content to the element with the id
 * @example changeContent('most', 'C++')
 *
 */
const changeContent = (id, content) => {
  document.getElementById(id).append(" " + content);
};
/**
 * @param  {string} id id of the element
 * @param  {string} href href of the link
 * @returns {void}
 * @description change the href of the link with the id
 * @example changeHref('most_link', 'https://skillicons.dev/icons?i=c-plusplus')
 * 
 */
const changeHref = (id, href) => {
    document.getElementById(id).setAttribute("href", href);
}







/**
 * @param  {string} id id of the element
 * @param  {string} content reset the content of the element with the id
 * @returns {void}
 * @description reset the content of the element with the id
 * @example resetContent('most', 'Most used language: ')
 *
 */
const resetContent = (id, content) => {
  document.getElementById(id).innerHTML = content;
};
/**
 * @param  {string} id id of the element
 * @param  {string} src src of the image URL
 * @returns {void}
 * @description change the src of the image with the id
 * @example changeSrc('most_img', 'https://skillicons.dev/icons?i=c-plusplus')
 *
 */
const changeSrc = (id, src) => {
  document.getElementById(id).setAttribute("src", src);
};
/**
 * @param  {object} user user data
 * @param  {string} most_used_lang most used language
 * @returns {void}
 * @description change the page content with the user data and the most used language
 * @example changePage(user, 'C++')
 *
 */
const changePage = (user, most_used_lang) => {
  changeContent("most", most_used_lang);
  changeSrc(
    "most_img",
    `https://skillicons.dev/icons?i=${icon_dic[most_used_lang]}`
  );
  changeSrc("avatar", user.avatar_url);
  changeContent("fullname", user.name);
  changeContent("uname", user.login);
  changeContent("bio", user.bio);
  changeContent("followers", user.followers);
  changeContent("following", user.following);
  changeContent("location", user.location);
  changeContent("company", user.company);
  changeContent("blog", user.blog);
    changeHref("blog", user.blog);
};
/**
 * @returns {void}
 * @description reset the page content
 * @example resetPage()
 *
 */
const resetPage = () => {
  resetContent("most", "Most used language: ");
  changeSrc("most_img", "");
  changeSrc("avatar", "./images/profile.png");
  resetContent("fullname", "Full name: ");
  resetContent("uname", "Username: ");
  resetContent("bio", "Bio: ");
  resetContent("followers", "Followers: ");
  resetContent("following", "Following: ");
  resetContent("location", "Location: ");
  resetContent("company", "Company: ");
  resetContent("blog", "");
    changeHref("blog", "");
};
/**
 * @param  {Event} e submit event
 * @returns {void}
 * @description submit event handler for user search
 * @example onSubmit(e)
 *
 */
const onSubmit = async (e) => {
  // prevent the default action of the submit event (refreshing the page)
  e.preventDefault();
  // reset the page
  resetPage();
  // check if the user is online
  if (window.navigator.onLine === false) {
    styledAlert("No internet connection", "red");
    return false;
  }
  // show the loader
  const loader = document.getElementById("loader");
  loader.style.display = "block";
  // hide the info
  const info = document.getElementById("info");
  info.style.display = "none";
  // get the username from the input
  const username = document.getElementById("username").value;
  // get the user data from the API
  const user = await getData(username);
  const most_used_lang = user.most_used_lang;
  const user_data = user.u_data;
  // check if the user data is null or undefined or empty string or API rate limit exceeded or user not found
  if (user_data === undefined) {
    styledAlert("Network error", "red");
  } else if (user_data.message == "API rate limit exceeded for") {
    styledAlert("API rate limit exceeded", "red");
  } else if (user_data.message == "Not Found") {
    styledAlert("User not found", "red");
  } else {
    // check if null or undefined or empty string
    for (const key in user_data) {
        if(key == "followers" || key == "following"){
            if(user_data[key] == null || user_data[key] == undefined || user_data[key] == ""){
                user_data[key] = 0;
                continue;
            }

        }
      if (
        user_data[key] == null ||
        user_data[key] == undefined ||
        user_data[key] == ""
      ) {
        user_data[key] = "Not available";
      }
    }
    // change the page content
    changePage(user_data, most_used_lang);
  }
  // hide the loader
  loader.style.display = "none";
  // show the info
  info.style.display = "block";
  return false;
};

// window.onload =clearData;
document.getElementById("form").addEventListener("submit", onSubmit);
