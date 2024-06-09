function adminUserMode() {
    //display admin mode if token is found and has the expected length (optional chaining)
    if (sessionStorage.getItem("token")?.length == 143) {
      //Hide filter
      document.querySelector(".filter").style.display = "none";
      //change login to logout
      document.getElementById("logBtn").innerText = "logout";
      //display top menu bar
      const body = document.querySelector("body");
      const topMenu = document.createElement("div");
      const publishBtn = document.createElement("button");
      const editMode = document.createElement("p");
  
      topMenu.className = "topMenu";
      editMode.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>Mode édition`;
      publishBtn.innerText = "Publier les changements";
  
      body.insertAdjacentElement("afterbegin", topMenu);
      topMenu.append(editMode, publishBtn);
      //edit buttons
      const editBtn = `<p class="editBtn"><i class="fa-regular fa-pen-to-square"></i>Modifier</p>`;
      document.querySelector("#introduction img").insertAdjacentHTML("afterend", editBtn);
      document.querySelector("#introduction article").insertAdjacentHTML("afterbegin", editBtn);
      document.querySelector("#portfolio h2").insertAdjacentHTML("afterend", editBtn);
      //event listener modal
      document.querySelector("#portfolio p").addEventListener("click", openModal);
    }
}

//*********MODAL*******//

//open modal if token is found and has the expected length
const openModal = function () {
    if (localStorage.getItem("token")?.length == 143) {
      modal = document.querySelector(".modal");
      modal.style.display = "flex";
      document.querySelector("#addPicture").style.display = "none";
      document.querySelector("#editGallery").style.display = "flex";
      modalGallery(worksData);
      modalStep = 0;
      // close modal listener
      modal.addEventListener("click", closeModal);
      // DELETE button listener
      document.addEventListener("click", deleteBtn);
      document.addEventListener("click", openNewWorkForm);
    }
};

//close modal
const closeModal = function (event) {
    if (
      event.target === document.querySelector(".modal") ||
      event.target === document.getElementsByClassName("fa-xmark")[modalStep]
    ) {
      document.querySelector(".modal").style.display = "none";
      document.removeEventListener("click", closeModal);
      document.removeEventListener("click", deleteBtn);
      modalStep = null;
    }
};

//*************DELETE***************/

//display modal gallery function
function modalGallery(data) {
    const modalContent = document.querySelector(".modalContent");
    modalContent.innerHTML = "";
    //show all works in array
    data.forEach((i) => {
      //create elements
      const projetsModal = document.createElement("figure");
      const workImage = document.createElement("img");
      const edit = document.createElement("figcaption");
      const iconPoubelle = document.createElement("i");
      //trashcan ID is work ID
      iconPoubelle.id = i.id;
      iconPoubelle.classList.add("fa-solid", "fa-trash-can");
      workImage.src = i.imageUrl;
      workImage.alt = i.title;
      edit.innerText = "éditer";
      projetsModal.className = "projets-modal";
      //references to DOM
      modalContent.appendChild(projetsModal);
      projetsModal.append(workImage, edit, iconPoubelle);
    });
};

//DELETE work event listener handler
const boutonSupprimer = function (event) {
    event.preventDefault();
    //clicked button
    if (event.target.matches(".fa-trash-can")) {
      supprimerProjet(event.target.id);
    }
};

//API call for DELETE route
function supprimerProjet(i) {
    //authentify user and send API response
    let token = localStorage.getItem("token");
    fetch("http://localhost:5678/api/works", {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      //if response is positive, update the works gallery accordingly
      if (response.ok) {
        alert("Projet supprimé")
        //delete work from worksData array
        worksData = worksData.filter((work) => work.id != i);
        //display updated galleries
        displayGallery(worksData);
        modalGallery(worksData);
        //if response is negative report an error
      } else {
        alert("Erreur : " + response.status);
        closeModal;
      }
    });
};
  
  
  
  