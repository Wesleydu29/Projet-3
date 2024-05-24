import { genererBoutonsCategories } from "./categories";

fetch("http://localhost:5678/api/works").then((reponse) => {
    return reponse.json();
}).then((json) => {
    projets = json
    genererProjets()
});



projets = []


function genererProjets() {
    const projetsFiltres = 0
    
    for( let i = 0; i < projets.length; i++) {
        const projet = projets[i];
        const baliseFigure = document.createElement("figure");
        const baliseFigcaption = document.createElement("figcaption");

        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        const nomProjet = document.createElement("p");
        nomProjet.innerText = projet.title;
        const categorieProjet = document.createElement("p");
        categorieProjet.innerText = projet.category
    
        const sectionGallery = document.querySelector(".gallery");
    
        baliseFigure.appendChild(imageProjet);
        baliseFigure.appendChild(nomProjet);
        sectionGallery.appendChild(baliseFigure);
    }

    const boutonFiltreTous = document.querySelector(".btn-tous")
    boutonFiltreTous.addEventListener("click", () => {
    projetsFiltres = projets.filter(function (projet) {
        return projet
    
})
})
}




//const boutonFiltreAppartements = document.querySelector(".btn-appartements")
//boutonFiltreAppartements.addEventListener("click", () => {
    //const projetsFiltres = projets.filter(function (projet) {
        //return projet.appartements
    //})
//})

//const boutonFiltreHotels = document.querySelector(".btn-hotels")
//boutonFiltreHotels.addEventListener("click", () => {
    //const projetsFiltres = projets.filter(function (projet) {
        //return projet.Hotels
    //})
//})