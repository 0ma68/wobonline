const { post } = require("../routes");

const form = document.querySelector("form");
const API_URL = "http://localhost:80"

form.addEventListener("submit", (event) => {
    //event.preventDefault();
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");

    const credentials = {
        username,
        password
    };
    console.log(credentials);

    fetch(API_URL,{
        method: post,
        body: JSON.stringify(credentials),
        headers: {
            'content-type': 'application/json'
        }
    });
});