import { getData, clearData } from "./userManager";


const onSubmit = (e) => {
    e.preventDefault();
    const username= document.getElementById('username').value;
    const user = getData(username);
    
    // do something with user
}