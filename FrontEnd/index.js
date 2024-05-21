fetch("http://localhost:5678/api/works").then((reponse) => {
    return reponse.json();
}).then((json) => {
    projets = json
    genererProjets()
});

fetch("http://localhost:5678/api/categories").then((reponse) => {
    return reponse.json();
}).then((json) => {
    categories = json
    genererBoutonsCategories()
});

projets = []
categories = []

function genererBoutonsCategories() {

    const sectionCategories = document.querySelector(".categories");
    const boutonTous = document.createElement("Button");
    boutonTous.classList.add("btn-tous");
    boutonTous.innerText = "Tous"

    sectionCategories.appendChild(boutonTous);
    
    for(let i = 0; i < categories.length; i++) {
        const categorie = categories[i]
        const boutonsfiltres = document.createElement("button")
        boutonsfiltres.innerText = categorie.name.value
        console.log(categorie)
        

        sectionCategories.appendChild(boutonsfiltres)
    }

    

}


function genererProjets() {
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
}


//const boutonFiltreObjets = document.querySelector(".btn-objets")
//boutonFiltreObjets.addEventListener("click", () => {
    //const projetsFiltres = projets.filter(function (projet) {
        //return projet.objets
    //})
    //document.querySelector(".gallery").innerHTML=""
    //genererProjets(projet)
//})

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