import { getData, clearData } from "./userManager.js";


const onSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    const username= document.getElementById('username').value;
    console.log(username);
    const user = getData(username);
    
    // do something with user
}

window.onload =clearData;
document.getElementById('form').addEventListener('submit', onSubmit);
