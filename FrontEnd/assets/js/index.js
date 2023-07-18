const gallery = document.querySelector(".gallery"); 
const gallerydiv = document.querySelectorAll("gallery > div");
const btn = document.getElementsByClassName("button");
const filters = document.querySelector(".filters");
const btnchanges = document.querySelector(".changes");
const modaldisplay = document.querySelectorAll(".modaldisplay")




const CatAll = document.createElement("button");
CatAll.setAttribute("categoryId", "0");
CatAll.setAttribute("class", "button");
CatAll.innerText = "Tous";
CatAll.addEventListener("click", () => {
    gallerydiv.forEach((div) => (div.style.display = "block"));
});
filters.appendChild(CatAll);



async function button() {
    const filtersbtn = await getCategorieApi();
    filtersbtn.forEach((btn) => {
        const filtersbtns = document.createElement("button");
        filtersbtns.setAttribute("categoryId", btn.id);
        filtersbtns.setAttribute("class" , "button");
        filtersbtns.innerText = btn.name;
        filters.appendChild(filtersbtns);
    });
}

button();






/* Appel des catégories et des projets */

async function getCategorieApi() {
    const req = await fetch("http://localhost:5678/api/categories");
    const categories = await req.json();
    return categories;   
}

async function getWorksApi() {
    const req = await fetch("http://localhost:5678/api/works");
    const works = await req.json();
    console.log(works);
    return works;
}


/* Affichage des projets */

async function Projets() {
    const dataProjets = await getWorksApi();
    dataProjets.forEach((galleryImg) => {
        const imgProjet = document.createElement("div");
        const imgSoB = document.createElement("img");
        const titleso = document.createElement("h3");
        imgSoB.src = galleryImg.imageUrl;
        titleso.innerText = galleryImg.title;
        imgProjet.appendChild(imgSoB);
        imgProjet.appendChild(titleso);
        gallery.appendChild(imgProjet);       
    });
}

Projets(); 


async function filtersforworks() {
    const workfilters = await getWorksApi();
    const catfilters = await getCategorieApi();
    for (let i = 0; i < btn.length; i++) {
      btn[i].addEventListener("click", () => {
        console.log(btn[i]);
        let ctgId = btn[i].getAttribute("categoryId");
        console.log(ctgId);
        if (ctgId == 0) {
          gallery.innerHTML = "";
          Projets();
        } else {
          gallery.innerHTML = "";
          workfilters.forEach((galleryImg) => {
            if (galleryImg.categoryId == ctgId) {
              const imgProjet = document.createElement("div");
              const imgSoB = document.createElement("img");
              const titleso = document.createElement("h3");
              imgSoB.src = galleryImg.imageUrl;
              titleso.innerText = galleryImg.title;
              imgProjet.appendChild(imgSoB);
              imgProjet.appendChild(titleso);
              gallery.appendChild(imgProjet);
            }
          });
        }
      });
    }
  }
  
  filtersforworks();



/* Mode édition après login */

function editMode() {
    if (localStorage.login === "true") {
        btnchanges.style.setProperty("display", "flex");
        console.log("Vous êtes connecté ! Enjoy !"); 
    } 
else {
    console.log("Vous n'êtes pas connecté ! Identifiez-vous !");
}
 }


editMode();



/* Ouverture de la première modale*/


let modal1 = null; 
let previousModal = null;

function openModal() {
  const modalOpen = document.querySelector(e.target.getAttribute("href"));
  console.log(modalOpen);
  previousModal = modal1;
  modalOpen.style.display = "flex";
  modaldisplay.style.setProperty("display", "flex");
  modal1 = modalOpen;
  modal1.addEventListener("click", closeModal);
  modal1.querySelector(".js-close-modal").addEventListener("click", closeModal);
  modal1
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

document.querySelectorAll("modal1js").forEach((a) => {
    a.addEventListener("click", openModal);
  });














window.onload = () => {
    let filters = document.querySelectorAll(".filters div");

    for(let filter of filters){
        filter.addEventListener("click", function(){
            let tag = this.id;

            let images = document.querySelectorAll("img");

            for(let image of images){
                image.classList.replace("active", "inactive");

                if(tag in image.dataset || tag ==="tous"){
                    image.classList.replace("inactive", "active")
                }
            }

            let figcaptions = document.querySelectorAll(".gallery figcaption");

            for(let figcaption of figcaptions){
                figcaption.classList.replace("active", "inactive");

                if(tag in figcaption.dataset || tag ==="tous"){
                    figcaption.classList.replace("inactive", "active")
                }
            }
        });
    }


}
