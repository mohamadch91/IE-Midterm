import { getData, clearData } from "./userManager.js";


const onSubmit = async (e) => {
    e.preventDefault();
    const loader= document.getElementById('loader');
    loader.style.display='block';
    const info= document.getElementById('info');
    info.style.display='none';
    const username= document.getElementById('username').value;
    const user =  await getData(username);
    loader.style.display='none';
    info.style.display='block';
    return false;
    // do something with user
}

window.onload =clearData;
document.getElementById('form').addEventListener('submit', onSubmit);
