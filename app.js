const loadDrinks = (name) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`)
    .then((res) => res.json())
    .then((data) => DisplayDrinks(data.drinks))
    .catch((err) => console.log(err));
};
loadDrinks("margarita");
// const drinkSearch = () => {
//   const drinkInput = document.getElementById("drink-input").value;
//   const defaultValue = "margarita";
//   if (drinkInput) loadDrinks(drinkInput);
//   else loadDrinks(defaultValue);
//   console.log(drinkInput);
// };

// //////
const DisplayDrinks = (data) => {
  const drinksContainer = document.getElementById("drinks-container");
  data.forEach((drink) => {
    const div = document.createElement("div");
    div.classList.add("co-12");
    div.classList.add("col-md-6");
    div.classList.add("col-lg-4");
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
                    <p class="card-text">${drink.strInstructions.slice(
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
    console.log(drink);
  });
  // console.log(drinksContainer);
};

const countOrder = document.getElementById("total-cart").innerText;
let countCart = parseInt(countOrder);

const handleAddCart = (name, image) => {
  // Count Add To cart
  if (countCart < 7) {
    countCart++;
    document.getElementById("total-cart").innerText = countCart;

    const cartContainer = document.getElementById("cart-container");
    const div = document.createElement("div");
    div.classList.add("d-flex");
    div.classList.add("justify-content-evenly");
    div.classList.add("align-items-center");
    div.classList.add("my-2");
    div.classList.add("py-2");
    div.classList.add("border-bottom");
    div.innerHTML = `
    <h6>${countCart}</h6>
    <img class="rounded-pill" src="${image}" class="card-img-top" alt="Image">
    <h6>${name.slice(0, 15)}..</h6>
  `;

    cartContainer.appendChild(div);
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
  modalTitle.innerText = `${data.strGlass}`;
  modalInfo.innerHTML = `
    <img class="img-fluid w-75 text-center" src="${data.strDrinkThumb}" class="card-img-top" alt="Image">
  `;
};
