let countParagraph = document.getElementById("cardNumber");
let cartProductSection = document.querySelector(".cartView");
let cart = [];
let counter;
initialCard();
initialItem();
function initialCard() {
  if (localStorage.getItem("cardCount")) {
    countParagraph.innerHTML = localStorage.getItem("cardCount");
    counter = parseInt(localStorage.getItem("cardCount"));
  }
}
function initialItem() {
  if (localStorage.getItem("card")) {
    cart = JSON.parse(localStorage.getItem("card"));
    getProduct(cart);
  }
}
function getProduct(arr) {
  for (const product of arr) {
    createCartProduct(product);
  }
}

function createCartProduct(product) {
  let productContainer = document.createElement("div");
  let img = document.createElement("img");
  img.setAttribute("src", product["image"]);
  let productName = document.createElement("h4");
  let productCardName = product["title"].split(" ");
  let productCardName2 = `${productCardName[0]}${productCardName[1]}${productCardName[2]}`;
  console.log();
  productName.innerHTML = productCardName2;
  let productPrice = document.createElement("h5");
  productPrice.innerHTML = `Price :${product["price"]}$`;
  let cartRate = document.createElement("p");
  let rating = product["rating"];
  cartRate.innerHTML = `Rate :${rating["rate"]}`;
  let productBtn = document.createElement("button");
  productBtn.setAttribute("id", product["id"]);
  productBtn.innerHTML = "Remove";
  productBtn.addEventListener("click", (e) => {
    cartRemove(e.target, e.target.id);
    counterRemove();
  });
  productContainer.append(img, productName, productPrice, cartRate, productBtn);
  cartProductSection.appendChild(productContainer);
}
function counterRemove() {
  counter--;
  if (counter > 0) {
    localStorage.setItem("cardCount", counter);
    initialCard();
  } else {
    localStorage.removeItem("cardCount");
    countParagraph.innerHTML = "";
  }
}
function cartRemove(productPosition, productId) {
  //remove it form div and from local storage
  cart.splice(
    cart.findIndex((product) => product.id == productId),
    1
  );
  localStorage.setItem("card", JSON.stringify(cart));
  cartProductSection.removeChild(productPosition.closest("div"));
}
//up Arrow
const upBtn = document.querySelector(".btnScrollToTop");
var upClick = upBtn.addEventListener("click", (e) => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});
var upDisplay = window.addEventListener("scroll", (e) => {
  upBtn.style.display = window.scrollY > 20 ? "block" : "none";
});
