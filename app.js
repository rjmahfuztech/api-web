const loadDrinks = () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then((res) => res.json())
    .then((data) => DisplayDrinks(data.drinks))
    .catch((err) => console.log(err));
};

loadDrinks();

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
                    <h5 class="card-title">${drink.strGlass.slice(
                      0,
                      15
                    )}...</h5>
                    <p class="card-text">${drink.strInstructions.slice(
                      0,
                      50
                    )}...</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        `;

    drinksContainer.appendChild(div);
    console.log(drink);
  });
  console.log(drinksContainer);
};
