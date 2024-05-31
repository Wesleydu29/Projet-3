
// email: sophie.bluel@test.tld

// password: S0phie 

const form = document.getElementById("loginForm")
console.log(form)
form.addEventListener("submit", function(event) {
        event.preventDefault()

        const inputEmail = document.getElementById("email");
        const email = inputEmail.value
        const inputPassword = document.getElementById("password");
        const password = inputPassword.value

        const chargeUtile = JSON.stringify({email, password})

        fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers : {"Content-Type": "application/json"},
        body : chargeUtile
        })
        .then((response) => {
            if (response.status !== 200) {
                alert("Identifiant ou mot de passe incorrect, veuillez réessayez")
            }else {
              response.json().then((data) => {
                localStorage.setItem("token", data.token); //STORE TOKEN
                window.location.href = "index.html";
              });
            }
          });
        });
        

//function afficherMessageErreur() {
    //const form = document.getElementById('loginForm');
    //const divErreur = document.createElement("div");
    //divErreur.classList.add("erreur");
    //divErreur.innerHTML = "Les indentifiants sont incorrects, veuillez en saisir de nouveaux";
    //form.appendChild(divErreur)
    //}

//function afficherMessageErreur() {
    //const form = document.getElementById('loginForm');
    //const divErreur = document.createElement("div");
    //divErreur.classList.add("erreur");
    //divErreur.innerHTML = "Les indentifiants sont incorrects, veuillez en saisir de nouveaux";
    //form.appendChild(divErreur)
    //}