const reponse =fetch("http://localhost:5678/api/users/login").then((reponse) => {
    return reponse.json();
}).then((json) => {
    console.log(json)
});

