import { getData, clearData } from "./userManager.js";


const onSubmit = async (e) => {
    e.preventDefault();
    const loader= document.('loader');
    const username= document.getElementById('username').value;
    const user =  await getData(username);
    return false;
    // do something with user
}

window.onload =clearData;
document.getElementById('form').addEventListener('submit', onSubmit);
