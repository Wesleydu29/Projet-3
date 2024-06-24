
//function changeColorBtnValider() {
    //if(document.getElementById("title").value != "" && document.getElementById("photo").files[0] != undefined && select.options[selectedIndex].id != ""){
        //document.querySelector(".valider").style.backgroundColor = "#1D6164";
    //}
//}

fetch("http://localhost:5678/api/works").then((reponse) => {
    return reponse.json();
}).then((json) => {
    projets = json
    genererProjets(projets)
    genererProjetsModal(projets)
    afficherModeEdition()
    envoyerRequeteForm()
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
    ajouterCategorieForm(categories)
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
        

        sectionCategories.appendChild(boutonsfiltres)
    }
};

const footerModal = document.querySelector(".footer-modal");

const btnAjouterPhoto = document.createElement("button");
btnAjouterPhoto.classList.add("btn-ajouter-photo");
btnAjouterPhoto.innerText = "Ajouter une photo"

footerModal.appendChild(btnAjouterPhoto)

const footerModal2 = document.querySelector(".footer-modal2");

const btnValiderForm = document.createElement("button");
btnValiderForm.classList.add("btnValider");
btnValiderForm.classList.add("valider")
btnValiderForm.innerText = "Valider"
btnValiderForm.addEventListener("click", envoyerRequeteForm)

footerModal2.appendChild(btnValiderForm)

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

//document.addEventListener("click", deleteBtn)

// Ajouter un nouveau projet //

const uploadPhoto = document.getElementById("photo")
uploadPhoto.addEventListener("click", previewPhoto)

function EnvoyerFormulaire(event) {
    if(event.target == document.querySelector(".valider")) {
        event.preventDefault();
        ajouterProjet();
    }
}

function ValiderFormulaire() {
    if(image == undefined) {
        alert("erreur : ajoutez une photo de votre projet");
    }
    if (title.trim().length == "") {
        alert("erreur : Ajoutez un titre à votre projet");
    }
    if (categorieId == "") {
        alert("erreur : choisissez une catégorie");
    }else {
        return true
    }
}
function previewPhoto() {
    document.getElementById("photo").addEventListener("change", function(event) {
        const  file = event.target.files[0];
        if(file){
            const reader = new FileReader();
            reader.onload = function(e) {
                const imgElement = document.getElementById("picturePreviewImg");
                imgElement.src = e.target.result;
                imgElement.style.display = "block";
            }
            reader.readAsDataURL(file);
        }
    });
}

function envoyerRequeteForm(event) {
    event.preventDefault();
    ajouterProjet();
    closeModal()
}

function ajouterProjet() {
    const token = localStorage.getItem("token");
    const select = document.getElementById("selectCategory");

    let title = document.getElementById("title").value;
    let categoryName = select.options[select.selectedIndex].innerText;
    let categoryId = select.options[select.selectedIndex].id;
    let image = document.getElementById("photo").files[0];

    let validation = ValiderFormulaire(image, title, categoryId);
    if(validation === true) {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("category", categoryId);

        envoyerData(token, formData, title, categoryName)
    }
}
// ajout du nouveau projet au tableau projets
function ajouterData(data, categoryName) {
    const nouveauProjet = {};
    nouveauProjet.title = data.title;
    nouveauProjet.id = data.id;
    nouveauProjet.category = {"id" : data.categorieId, "name" : categoryName};
    nouveauProjet.imageUrl = data.imageUrl
    projets.push(nouveauProjet);
}

// appel à l'api pour ajouter un projet
function envoyerData(token, formData, title) {
    token = localStorage.getItem("token");
    fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: {
        authorization: `bearer ${token}`
    },
    body:formData,
    })
    .then((response) => {
        if(response.ok) {
            alert("Le nouveau projet :" + title + "bien été ajouté");

            closeModal()
        }else {
            alert("Une erreur est survenue lors de l'ajout du projet");
        }
    }).then((data) => {
        ajouterData(data, categoryName);
        genererProjets(projets)
    })
    .catch((error) => console.error("Erreur:", error)); 
}

// les functions en lien avec les clicks //

function deleteBtn(event) {
    event.preventDefault();
    if(event.target.matches(".fa-trash-can")) {
        deleteProjet(event.target.id);
    }
}

function deleteProjet(i) {
    let token = localStorage.getItem("token")
    fetch("http://localhost:5678/api/works/" + i, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        }
    }).then((response) => {
        if(response.ok) {
            alert("Le projet a bien été supprimé")
            projets = projets.filter((projet) => projet.id != i)
            genererProjets(projets);
            genererProjetsModal(projets);

            closeModal()
        }else {
            alert("Erreur lors de la suppression")
            
        }
    });
}

//ajout des catégories à la balise select 
function ajouterCategorieForm() {
    const baliseSelect = document.getElementById("selectCategory")
    baliseSelect.innerHTML="";
    
    for(let i = 0; i < categories.length; i++) {
        const categorie = categories[i]
        const choixOption = document.createElement("option");
        choixOption.innerText = categorie.name;

        baliseSelect.appendChild(choixOption)
    }

}

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

function afficherModeEdition() {
    if(localStorage.getItem("token")?.length == 143) {
        document.querySelector(".categories").style.display = "none"
        document.getElementById("btn-login").innerText = "logout"
        document.querySelector(".mode-edition").style.display = "flex"
        document.querySelector(".btn-modifier").style.display = "flex"
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
        iconPoubelle.addEventListener("click", () => {
            deleteProjet(projet.id)
        });
    
        baliseFigure.appendChild(imageProjet);
        baliseFigure.appendChild(iconPoubelle);
        galleryModal.appendChild(baliseFigure);
    }
}

