fetch("http://localhost:5678/api/categories").then((reponse) => {
    return reponse.json();
}).then((json) => {
    categories = json
    genererBoutonsCategories(categories)
});

categories = []

export function genererBoutonsCategories() {

    const sectionCategories = document.querySelector(".categories");
    const boutonTous = document.createElement("Button");
    boutonTous.classList.add("btn-tous");
    boutonTous.innerText = "Tous"

    sectionCategories.appendChild(boutonTous);
    
    for(let i = 0; i < categories.length; i++) {
        const categorie = categories[i]
        const boutonsfiltres = document.createElement("button")
        boutonsfiltres.classList.add(`categorie${categorie.id}`)
        boutonsfiltres.innerText = categorie.name
        console.log(categorie)
        

        sectionCategories.appendChild(boutonsfiltres)
    }

    const boutonFiltreObjets = document.querySelector(".categorie1")
    boutonFiltreObjets.addEventListener("click", () => {
    const projetsFiltres = projets.filter(function (projet) {
        return projet.category.id === 1
    
    });
    console.log(projetsFiltres)
    sectionGallery = document.querySelector(".gallery").innerHTML=""
    genererProjets(projetsFiltres)

    })

}

