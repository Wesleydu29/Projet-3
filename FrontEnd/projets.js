
fetch("http://localhost:5678/api/works").then((reponse) => {
    return reponse.json();
}).then((json) => {
    projets = json
    genererProjets(projets)
});



projets = []


function genererProjets(projetsAAfficher) {
    document.querySelector(".gallery").innerHTML = "";
    
    for( let i = 0; i < projetsAAfficher.length; i++) {
        const projet = projetsAAfficher[i];
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

// CATEGORIES //

fetch("http://localhost:5678/api/categories").then((reponse) => {
    return reponse.json();
}).then((json) => {
    categories = json
    genererBoutonsCategories(categories)
});

categories = []

function genererBoutonsCategories() {

    const sectionCategories = document.querySelector(".categories");
    const boutonTous = document.createElement("Button");
    boutonTous.classList.add("btn-tous");
    boutonTous.innerText = "Tous";
    boutonTous.addEventListener("click", () => {
        genererProjets(projets);
    });

    sectionCategories.appendChild(boutonTous);
    
    for(let i = 0; i < categories.length; i++) {
        const categorie = categories[i]
        const boutonsfiltres = document.createElement("button")
        boutonsfiltres.classList.add(`categorie${categorie.id}`)
        boutonsfiltres.innerText = categorie.name;
        boutonsfiltres.addEventListener("click", function() {
            const projetsFiltres = projets.filter(function (projet) {
                return projet.category.id === categorie.id;
            });
            genererProjets(projetsFiltres);
        });
        console.log(categorie)
        

        sectionCategories.appendChild(boutonsfiltres)
    }
}