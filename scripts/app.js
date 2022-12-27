import { getData, clearData } from "./userManager.js";


const onSubmit = (e) => {
    e.preventDefault();
    const username= document.getElementById('username').value;
    const user = getData(username);
    return false;
    // do something with user
}

// window.onload =clearData;
document.getElementById('form').addEventListener('submit', onSubmit);
