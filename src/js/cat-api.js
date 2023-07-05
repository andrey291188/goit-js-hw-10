import Notiflix from 'notiflix';

const BASE_URL = "https://api.thecatapi.com/v1/" 
const API_KEY = "live_q2VANmGriGpPVm7OWCJIeZRKrM98bMK73SB4Dycet42eGU4gajN64tOPVzc82gum";
let idCat = null;
const selectList = document.querySelector(".breed-select");
const boxCatInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".js-loader")

selectList.addEventListener("input", inputData);

function fetchBreeds() {
    loader.hidden = false;
    selectList.hidden = true;
    return fetch(`${BASE_URL}breeds?api_key=${API_KEY}`).then(resp => {return resp.json()})
}
 fetchBreeds()
 .then(data => selectList.insertAdjacentHTML("beforeend", createSelectMarkup(data)))
 .catch(err => Notiflix.Notify.failure("Sorry, server not found"));

function createSelectMarkup(arr) {
    loader.hidden = true;
    selectList.hidden = false;
    return arr.map(({id, name}) => `<option value="${id}">${name}</option>`).join("")
}

function inputData(evt) {
    const form = evt.currentTarget;
    idCat = form.value;
    catCard().then((data) => { 
        const { breeds, url } = data[0];
        boxCatInfo.innerHTML = `<img src="${url}" alt="${breeds[0].name}" class="cat-img">
            <div class="content-text">
            <h2>${breeds[0].name}</h2>
            <p>${breeds[0].description}</p>
            <p><b>Temperament:</b> ${breeds[0].temperament}</p> 
            </div>`;
            loader.hidden = true;
            selectList.hidden = false;
    }).catch(err => console.log(err))
}

function catCard () {
    loader.hidden = false;
    selectList.hidden = true;
    boxCatInfo.innerHTML = "";
 return fetch(`${BASE_URL}images/search?api_key=${API_KEY}&breed_ids=${idCat}`).then((resp) => {
  if (!resp.ok) {
    Notiflix.Notify.failure("Sorry, cat not found")
  } 
  return resp.json()});
};

