const reponse = fetch("http://localhost:5678/api/works").then((reponse) => {
    return reponse.json();
}).then((json) => {
    console.log(json)
});

projets = []

const sectionCategories = document.querySelector(".categories");

const boutonTous = document.createElement("Button");
boutonTous.classList.add("btn-tous");
boutonTous.innerText = "Tous"
const boutonObjets = document.createElement("Button");
boutonObjets.classList.add("btn-objets");
boutonObjets.innerText= "Objets"
const boutonAppartements = document.createElement("Button");
boutonAppartements.classList.add("btn-appartements");
boutonAppartements.innerText= "Appartements"
const boutonHotels = document.createElement("Button");
boutonHotels.classList.add("btn-hotels");
boutonHotels.innerText= "Hotels & restaurants"

sectionCategories.appendChild(boutonTous);
sectionCategories.appendChild(boutonObjets);
sectionCategories.appendChild(boutonAppartements);
sectionCategories.appendChild(boutonHotels);

const boutonFiltreObjets = document.querySelector(".btn-objets")
boutonFiltreObjets.addEventListener("click", () => {
    const projetsFiltres = projets.filter(function (projet) {
        return projet.objets
    })
})

const boutonFiltreAppartements = document.querySelector(".btn-appartements")
boutonFiltreAppartements.addEventListener("click", () => {
    const projetsFiltres = projets.filter(function (projet) {
        return projet.appartements
    })
})

const boutonFiltreHotels = document.querySelector(".btn-hotels")
boutonFiltreHotels.addEventListener("click", () => {
    const projetsFiltres = projets.filter(function (projet) {
        return projet.Hotels
    })
})