import { getData, clearData } from "./userManager.js";
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
};
const changeContent = (id, content) => {
  document.getElementById(id).append(" " + content);
};

const changeSrc = (id, src) => {
  document.getElementById(id).setAttribute("src", src);
};

const changePage = (user, most_used_lang) => {
  changeContent("most", most_used_lang);
  changeSrc("most_img", `https://skillicons.dev/icons?i=${icon_dic[most_used_lang]}`);
  changeSrc("avatar", user.avatar_url);
  changeContent("fullname", user.name);
  changeContent("uname", user.login);
  changeContent("bio", user.bio);
  changeContent("followers", user.followers);
  changeContent("following", user.following);
  changeContent("location", user.location);
  changeContent("company", user.company);
  changeContent("blog", user.blog);
};

const onSubmit = async (e) => {
  e.preventDefault();
  const loader = document.getElementById("loader");
  loader.style.display = "block";
  const info = document.getElementById("info");
  info.style.display = "none";
  const username = document.getElementById("username").value;
  const user = await getData(username);
  const most_used_lang = user.most_used_lang;
  const user_data = user.u_data;
  changePage(user_data, most_used_lang);

  console.log(user);
  loader.style.display = "none";
  info.style.display = "block";
  return false;
  // do something with user
};

// window.onload =clearData;
document.getElementById("form").addEventListener("submit", onSubmit);
