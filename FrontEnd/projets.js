let projets = [];
let categories = [];

fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((json) => {
        projets = json;
        genererProjets(projets);
        genererProjetsModal(projets);
        afficherModeEdition();
    })
    .catch((error) => console.error('Erreur:', error));

// Fonction pour générer les projets dans la galerie
function genererProjets(projetsAAfficher) {
    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = "";
    
    projetsAAfficher.forEach(projet => {
        const baliseFigure = document.createElement("figure");
        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        const nomProjet = document.createElement("p");
        nomProjet.innerText = projet.title;
        
        baliseFigure.appendChild(imageProjet);
        baliseFigure.appendChild(nomProjet);
        gallery.appendChild(baliseFigure);
    });
}

// Requête pour obtenir les catégories
fetch("http://localhost:5678/api/categories")
    .then((response) => response.json())
    .then((json) => {
        categories = json;
        genererBoutonsCategories();
        ajouterCategorieForm(categories);
    })
    .catch((error) => console.error('Erreur:', error));

// Fonction pour générer les boutons de catégories
function genererBoutonsCategories() {
    const sectionCategories = document.querySelector(".categories");
    sectionCategories.innerHTML = "";
    
    const boutonTous = document.createElement("button");
    boutonTous.classList.add("btn-tous");
    boutonTous.innerText = "Tous";
    boutonTous.addEventListener("click", () => genererProjets(projets));
    sectionCategories.appendChild(boutonTous);

    categories.forEach(categorie => {
        const boutonsFiltres = document.createElement("button");
        boutonsFiltres.classList.add(`categorie${categorie.id}`);
        boutonsFiltres.innerText = categorie.name;
        boutonsFiltres.addEventListener("click", () => {
            const projetsFiltres = projets.filter(projet => projet.category.id === categorie.id);
            genererProjets(projetsFiltres);
        });
        sectionCategories.appendChild(boutonsFiltres);
    });
}

const footerModal = document.querySelector(".footer-modal");
const btnAjouterPhoto = document.createElement("button");
btnAjouterPhoto.classList.add("btn-ajouter-photo");
btnAjouterPhoto.innerText = "Ajouter une photo";
footerModal.appendChild(btnAjouterPhoto);

const footerModal2 = document.querySelector(".footer-modal2");
const btnValiderForm = document.createElement("button");
btnValiderForm.classList.add("btnValider", "valider");
btnValiderForm.innerText = "Valider";

// ici on vient rétablir le picturePreview par défaut à l'envoi du formulaire
btnValiderForm.addEventListener("click", envoyerRequeteForm);
btnValiderForm.addEventListener("click", (event) => {
    event.preventDefault
    document.querySelector(".form-modal").reset();
    document.getElementById("picturePreviewImg").style.display = "none";
    labelFile.style.display = "flex";
    iconFile.style.display = "flex";
    paragrapheFile.style.display = "flex";
})
footerModal2.appendChild(btnValiderForm);

const modal = document.querySelector(".modal");
const modal2 = document.querySelector(".modal2");
const modalBtn = document.querySelector(".btn-modal");
const modal2Btn = document.querySelector(".btn-ajouter-photo");
const closeBtnModal1 = document.querySelector(".modal .closeBtn");
const closeBtnModal2 = document.querySelector(".modal2 .closeBtn");
const btnReturnModal = document.querySelector(".modal2 .fa-arrow-left");

modalBtn.addEventListener("click", openModal);
modal2Btn.addEventListener("click", changeModal);
closeBtnModal1.addEventListener("click", closeModal);
closeBtnModal2.addEventListener("click", closeModal);
btnReturnModal.addEventListener("click", returnModal);
modal.addEventListener("click", clickOutside);
modal2.addEventListener("click", clickOutside);

// à l'ajout de l'image je viens cacher les éléments du preview 
const labelFile = document.querySelector(".picturePreview label");
const iconFile = document.querySelector(".picturePreview .fa-image");
const paragrapheFile = document.querySelector(".picturePreview p");
document.getElementById("file").addEventListener("change", previewPhoto);
document.getElementById("file").addEventListener("change", () => {
    labelFile.style.display = "none";
    iconFile.style.display = "none";
    paragrapheFile.style.display = "none";
});


function envoyerRequeteForm(event) {
    event.preventDefault();
    ajouterProjet();
}

function ajouterProjet() {
    const token = localStorage.getItem("token");
    const select = document.getElementById("selectCategory");

    let title = document.getElementById("title").value;
    let categoryId = select.options[select.selectedIndex].value;
    let image = document.getElementById("file").files[0];

    if (validerFormulaire(image, title, categoryId)) {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("category", categoryId);

        fetch("http://localhost:5678/api/works/", {
            method: "POST",
            headers: {
                authorization: `Bearer ${token}`,
            },
            body: formData,
        })
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erreur lors de l'ajout du projet");
            }
        })
        .then((data) => {
            ajouterData(data, categoryId);
            genererProjets(projets);
            genererProjetsModal(projets)
            alert(`Le nouveau projet ${title} a bien été ajouté`);
        })
        .catch((error) => console.error("Erreur:", error));
    }
}

function ajouterData(data, categoryId) {
    const nouveauProjet = {
        title: data.title,
        id: data.id,
        category: {
            id: categoryId,
            name: categories.find(cat => cat.id == categoryId).name,
        },
        imageUrl: data.imageUrl,
    };
    projets.push(nouveauProjet);
}

function validerFormulaire(image, title, categoryId) {
    if (!image) {
        alert("Erreur : ajoutez une photo de votre projet");
        return false;
    }
    if (title.trim() === "") {
        alert("Erreur : ajoutez un titre à votre projet");
        return false;
    }
    if (!categoryId) {
        alert("Erreur : choisissez une catégorie");
        return false;
    }
    return true;
}

//function changeColorBtnValider() {
    //if(validerFormulaire().ok){
        //document.querySelector(".valider").style.backgroundColor = "#1D6164";
    //}
//}

function previewPhoto() {
    const file = document.getElementById("file").files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgElement = document.getElementById("picturePreviewImg");
            imgElement.src = e.target.result;
            imgElement.style.display = "block";
        };
        reader.readAsDataURL(file);
    }
}

function deleteBtn(event) {
    event.preventDefault();
    if (event.target.matches(".fa-trash-can")) {
        deleteProjet(event.target.id);
    }
}

function deleteProjet(id) {
    let token = localStorage.getItem("token");
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            authorization: `Bearer ${token}`,
        },
    })
    .then((response) => {
        if (response.ok) {
            projets = projets.filter(projet => projet.id != id);
            genererProjets(projets);
            genererProjetsModal(projets);
            alert("Le projet a bien été supprimé");
            closeModal();
        } else {
            alert("Erreur lors de la suppression");
        }
    })
    .catch((error) => console.error("Erreur:", error));
}

function ajouterCategorieForm(categories) {
    const selectCategory = document.getElementById("selectCategory");
    selectCategory.innerHTML = "";
    
    categories.forEach(categorie => {
        const option = document.createElement("option");
        option.value = categorie.id;
        option.innerText = categorie.name;
        selectCategory.appendChild(option);
    });
}

function openModal() {
    modal.style.display = "flex";
}

function changeModal(event) {
    if (event.target === modal2Btn) {
        modal2.style.display = "flex";
        modal.style.display = "none";
    }
}

function returnModal(event) {
    if (event.target === btnReturnModal) {
        modal2.style.display = "none";
        modal.style.display = "flex";
    }
}

function closeModal() {
    modal.style.display = "none";
    modal2.style.display = "none";
}

function clickOutside(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    } else if (event.target === modal2) {
        modal2.style.display = "none";
    }
}

function afficherModeEdition() {
    if (localStorage.getItem("token")?.length === 143) {
        document.querySelector(".categories").style.display = "none";
        document.getElementById("btn-login").innerText = "logout";
        document.getElementById("btn-login").addEventListener("click", function(e) {
            e.preventDefault();
            localStorage.removeItem("token");
            location.reload();
        })
        document.querySelector(".mode-edition").style.display = "flex";
        document.querySelector(".btn-modifier").style.display = "flex";
    }
}

function genererProjetsModal(projetsAAfficherModal) {
    const galleryModal = document.querySelector(".gallery-modal");
    galleryModal.innerHTML = "";
    
    projetsAAfficherModal.forEach(projet => {
        const baliseFigure = document.createElement("figure");
        baliseFigure.classList.add("containerBin");

        const imageProjet = document.createElement("img");
        imageProjet.src = projet.imageUrl;
        const iconPoubelle = document.createElement("i");
        iconPoubelle.classList.add("fa-solid", "fa-trash-can", "iconBin");
        iconPoubelle.addEventListener("click", () => deleteProjet(projet.id));

        baliseFigure.appendChild(imageProjet);
        baliseFigure.appendChild(iconPoubelle);
        galleryModal.appendChild(baliseFigure);
    });
}