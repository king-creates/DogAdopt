
const dogGrid = document.getElementById("dogGrid");
const breedList = document.getElementById("breedList");
const searchBtn = document.getElementById("searchBtn");
const searchBreed = document.getElementById("searchBreed");

getRandomDogs();
loadAllBreeds();
// function to load all breeds and fetch from api
async function loadAllBreeds(){
  const res = await fetch("https://dog.ceo/api/breeds/list/all")
  const data = await res.json()
 createBreedList(data.message)
}

// function to create the breed list on the Dom
function createBreedList(listedBreed){
  breedList.innerHTML = `
  <ul>
    ${Object.keys(listedBreed).map((item)=>{
      return `<li>${item}</li>`
    }).join('')} 
  </ul>`
  
  const listItems = breedList.querySelectorAll('li');
    listItems.forEach((li)=>{
      li.addEventListener('click', (e) =>{
        let breed = e.target.textContent;
        loadDogsByBreed(breed);
      })
    })
}

// function to display random dogs on initial loading
async function getRandomDogs(breed) {
  try{
     const res = await fetch("https://dog.ceo/api/breeds/image/random/6")
    const data = await res.json()
    displayDogs(data.message, breed)
  }
  catch(err ){
    console.log(err)
  }
}

// function to load dogs by breed
async function loadDogsByBreed(breed) {
  try{
    const res = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/6`)
    const data = await res.json()
    displayDogs(data.message, breed)
  }
  catch(err){
    dogGrid.innerHTML = `<p>Breed not found, Try another Breed</p>`
  }
}

function displayDogs(images, breedName = "") {
  dogGrid.innerHTML = "";

 images.forEach((image, index) => {
    let breed = breedName;
    if (!breed) {
      breed = image.split("/breeds")[1].split("/")[0];
      breed = breed.replace("-", " ");
      breed = breed.charAt(0).toUpperCase();
    }
    const card = document.createElement("div");
    card.classList.add("box");
    card.innerHTML = `<img src="${image}" alt="${breed}">
    <div class = "box-text">
    <h3>${breed}</h3>
      <p>Gender: ${["male", "female"][Math.floor(Math.random() * 2)]}</p>
      <p>Age: ${Math.floor(Math.random() * 3) + 1}years</p>
      <button>Adopt Me</button>
    </div>
       
     `;
    dogGrid.appendChild(card);

  });
  
 
}
 searchBtn.addEventListener('click', () =>{
      const breed = searchBreed.value;
      if (breed != '') {
         loadDogsByBreed(breed);
    }else{
      alert(`please enter the breed Or use the breed menu`)
    }
  }
  )

    searchBreed.addEventListener('keypress', (e) =>{
      const breed = searchBreed.value
      if(e.key == "Enter") {
         loadDogsByBreed(breed);
      }
    })