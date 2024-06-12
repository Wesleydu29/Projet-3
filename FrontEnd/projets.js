
fetch("http://localhost:5678/api/works").then((reponse) => {
    return reponse.json();
}).then((json) => {
    projets = json
    genererProjets(projets)
    genererProjetsModal(projets)
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
};

const footerModal = document.querySelector(".footer-modal");

const btnAjouterPhoto = document.createElement("button");
btnAjouterPhoto.classList.add("btn-ajouter-photo");
btnAjouterPhoto.innerText = "Ajouter une photo"

footerModal.appendChild(btnAjouterPhoto)

// création de la flèche de retour //
const headerModal = document.querySelector(".header-modal");

const btnReturn = document.createElement("i");
btnReturn.classList.add("fa-solid", "fa-arrow-left");

headerModal.appendChild(btnReturn)

// Ici, la partie click, pour ouvrir et fermer la modal // 
const modal = document.querySelector(".modal");
const modal2 = document.querySelector(".modal2");

const modalBtn = document.querySelector(".btn-modal");
const modal2Btn = document.querySelector(".btn-ajouter-photo");

const closeBtnModal1 = document.querySelector(".modal .closeBtn");
const closeBtnModal2 = document.querySelector(".modal2 .closeBtn");

const btnReturnModal = document.querySelector(".modal2 .fa-arrow-left");

// ouvrir les modals //
modalBtn.addEventListener("click", openModal);
modal2Btn.addEventListener("click", changeModal);

// fermer les modals
closeBtnModal1.addEventListener("click", closeModal);
closeBtnModal2.addEventListener("click", closeModal);

btnReturnModal.addEventListener("click", returnModal);

modal.addEventListener("click", clickOutside);
modal2.addEventListener("click", clickOutside);

// Ajouter un nouveau projet //

const AjouterPhoto = document.querySelector(".ajout-photo");

const baliseImg = document.createElement("img");
baliseImg.classList.add("fa-regular","fa-image");

AjouterPhoto.appendChild(baliseImg);

// les functions en lien avec les clicks //
function openModal() {
    modal.style.display = "flex"
}
function changeModal(event) {
    if(event.target == modal2Btn) {
        modal2.style.display = "flex"
        modal.style.display = "none"
    }
}

function returnModal(event) {
    if(event.target == btnReturnModal) {
        modal2.style.display = "none"
        modal.style.display = "flex"
    }
}

function closeModal() {
    modal.style.display = "none"
    modal2.style.display = "none"
}

function clickOutside(event){
    if(event.target == modal ) {
        modal.style.display = "none"
    }else if (event.target == modal2) {
        modal2.style.display = "none"
    }
}

// affichage des projets dans la modal // 

function genererProjetsModal(projetsAAfficherModal) {
    document.querySelector(".gallery-modal").innerHTML = "";
    
    for( let i = 0; i < projetsAAfficherModal.length; i++) {
        const projet = projetsAAfficherModal[i];
        const baliseFigure = document.createElement("figure");
        baliseFigure.classList.add("containerBin");

        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        const categorieProjet = document.createElement("p");
        categorieProjet.innerText = projet.category
    
        const galleryModal = document.querySelector(".gallery-modal")

        const iconPoubelle = document.createElement("i");
        iconPoubelle.classList.add("fa-solid","fa-trash-can", "iconBin");
    
        baliseFigure.appendChild(imageProjet);
        baliseFigure.appendChild(iconPoubelle);
        galleryModal.appendChild(baliseFigure);
    }
}
