const loadDrinks = (name) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((data) => DisplayDrinks(data.drinks))
    .catch((err) => console.log(err));
};

window.onload = () => {
  loadDrinks("margarita");
};

// Drinks Container By id
const drinksContainer = document.getElementById("drinks-container");
// Search Drinks
const drinkSearch = () => {
  const drinkInput = document.getElementById("drink-input").value;
  if (drinkInput.length > 0) drinksContainer.innerText = "";
  if (drinkInput) loadDrinks(drinkInput);
  document.getElementById("drink-input").value = "";
};

// Show Drinks
const DisplayDrinks = (data) => {
  if (data) {
    data.forEach((drink) => {
      const div = document.createElement("div");
      div.classList.add("co-12");
      div.classList.add("col-md-6");
      div.classList.add("col-xl-4");
      div.innerHTML = `
              <div class="card">
                  <img src="${
                    drink.strDrinkThumb
                  }" class="card-img-top" alt="Image">
                  <div class="card-body">
                      <h5 class="card-title">Name: ${drink.strGlass}</h5>
                      <p class="card-text"><b>Category:</b> ${
                        drink.strCategory
                      }</p>
                      <p class="card-text"><b>Instructions:</b> ${drink.strInstructions.slice(
                        0,
                        15
                      )}...</p>
                      <button onclick="handleAddCart('${drink.strGlass}',
                        '${drink.strDrinkThumb}')"
                      class="btn btn-outline-dark">Add To Cart</button>
                      <button onclick="handleModal('${
                        drink.idDrink
                      }')" class="btn btn-outline-success"
                      data-bs-toggle="modal" data-bs-target="#exampleModal"
                      >Details</button>
                  </div>
              </div>
          `;

      drinksContainer.appendChild(div);
    });
  } else {
    drinksContainer.innerHTML = `<h1 class="fs-2 d-flex justify-content-center align-items-center">Sorry! No Drinks found!!!</h1>`;
  }
};

const countOrder = document.getElementById("total-cart").innerText;
let countCart = parseInt(countOrder);

const handleAddCart = (name, image) => {
  // Count Add To cart
  if (countCart < 7) {
    countCart++;
    document.getElementById("total-cart").innerText = countCart;

    const cartContainer = document.getElementById("cart-container");
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <th scope="row">${countCart}</th>
      <td><img class="rounded-pill" src="${image}" class="card-img-top" alt="Image"></td>
      <td>${name.slice(0, 15)}..</td>
  `;
    cartContainer.appendChild(tr);
  } else alert("Sorry!! You have reached the maximum limit!");
};

// Modal Info
const handleModal = (id) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => drinkDetailsModal(...data.drinks))
    .catch((err) => console.log(err));
};

const drinkDetailsModal = (data) => {
  const modalTitle = document.getElementById("modal-title");
  const modalInfo = document.getElementById("modal-info");
  modalTitle.innerText = `Name: ${data.strGlass}`;
  modalInfo.innerHTML = `
      <img class="img-fluid" src="${data.strDrinkThumb}" alt="Image">
      <h4>Details:</h4>
      <h5 class="mt-2">Category: ${data.strCategory}</h5>
      <h5 class="mt-2">Alcoholic: ${data.strAlcoholic}</h5>
      <p class="mt-2">${data.strInstructions}</p>
  `;
};
