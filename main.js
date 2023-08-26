let slider = document.getElementById("slider");
let sliderPrev = document.getElementById("sliderPrev");
let sliderNext = document.getElementById("sliderNext");
let sliderIndex = 0;
let sliderImages = [
  "./images/slidebar/1.jpg",
  "./images/slidebar/2.jpg",
  "./images/slidebar/3.jpg",
  "./images/slidebar/4.jpg",
  "./images/slidebar/5.jpg",
  "./images/slidebar/6.jpg",
  "./images/slidebar/7.jpg",
];
var sliderImgInter = setInterval(function () {
  if (sliderIndex < sliderImages.length - 1) {
    sliderIndex++;
  } else {
    sliderIndex = 0;
  }
  slider.setAttribute("src", sliderImages[sliderIndex]);
}, 4000);
sliderPrev.addEventListener("click", function () {
  sliderPrevAction();
});
sliderNext.addEventListener("click", function () {
  sliderNextAction();
});
function sliderPrevAction() {
  if (sliderIndex <= 0) {
    sliderIndex = sliderImages.length - 1;
  } else {
    sliderIndex--;
  }
  slider.setAttribute("src", sliderImages[sliderIndex]);
}
function sliderNextAction() {
  if (sliderIndex >= sliderImages.length - 1) {
    sliderIndex = 0;
  } else {
    sliderIndex++;
  }
  slider.setAttribute("src", sliderImages[sliderIndex]);
}
// Up Arrow
export const upBtn = document.querySelector(".btnScrollToTop");
export var upClick = upBtn.addEventListener("click", (e) => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
});
export var upDisplay = window.addEventListener("scroll", (e) => {
  upBtn.style.display = window.scrollY > 20 ? "block" : "none";
});
// --Product Data
let ProductContainerDiv = document.querySelector(".smallCategorisContainer");
let categoryBtns = document.querySelector(".categoryBtns");
let countParagraph = document.getElementById("cardNumber");
let allData = [];
countParagraph.innerHTML = localStorage.getItem("cardNumber");
let cardCount = 0;
function CreateProduct(obj) {
  let productDiv = document.createElement("div");
  productDiv.className = "row";
  let productImg = document.createElement("img");
  productImg.className = "col4";
  productImg.src = obj["image"];
  let productName = document.createElement("h4");
  let productCardName = obj["title"].split(" ");
  let productCardName2 = `${productCardName[0]}${productCardName[1]}${productCardName[2]}`;
  productName.innerHTML = productCardName2;
  let productPrice = document.createElement("h5");
  productPrice.innerHTML = `Price :${obj["price"]}$`;
  let cartRate = document.createElement("p");
  let rating = obj["rating"];
  cartRate.innerHTML = `Rate :${rating["rate"]}`;
  let productBtn = document.createElement("button");
  productBtn.setAttribute("id", obj["id"]);
  productBtn.className = "ProductBtn";
  productBtn.innerHTML = "Add To Cart";
  productBtn.addEventListener("click", (e) => {
    cardCountHandler();
    addToCart(e.target.id);
  });
  productDiv.append(
    productImg,
    productName,
    productPrice,
    cartRate,
    productBtn
  );
  ProductContainerDiv.append(productDiv);
}
function getProduct(productArray) {
  ProductContainerDiv.innerHTML = "";
  for (const Product of productArray) {
    CreateProduct(Product);
  }
}
async function getData() {
  let ApiData = await fetch(`https://fakestoreapi.com/products`);

  let ApiJasonData = await ApiData.json();
  getProduct(ApiJasonData);
  allData = ApiJasonData;
}

async function getCategories() {
  let ApiData = await fetch(`https://fakestoreapi.com/products/categories`);

  let ApiJasonData = await ApiData.json();
  CreateProductCategoryBtns(ApiJasonData);
}

function CreateProductCategoryBtns(arr) {
  for (const iterator of arr) {
    let productBtn = document.createElement("button");
    productBtn.setAttribute("id", iterator);
    productBtn.innerHTML = iterator;
    categoryBtns.append(productBtn);
    productBtn.addEventListener("click", (e) => {
      filterProduct(e.target.id);
    });
  }
}

function cardCountHandler() {
  cardCount++;
  window.localStorage.setItem("cardCount", cardCount);
  countParagraph.innerHTML = localStorage.getItem("cardCount");
}
function initialCard() {
  cardCount = localStorage.getItem("cardCount");
  countParagraph.innerHTML = cardCount;
}
// Filtering Btn
// first Way fetch with ptn categ sec filter the array on get data
async function filterProduct(category) {
  let productCategoryArray = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  let ApiJasonData = await productCategoryArray.json();
  getProduct(ApiJasonData);
}
function addToCart(productId) {
  let product = allData.find((p) => p.id == productId);
  let card = [];
  if (localStorage.getItem("card")) {
    card = JSON.parse(localStorage.getItem("card"));
    card.push(product);
  } else {
    localStorage.setItem("card", card);
    card.push(product);
  }
  localStorage.setItem("card", JSON.stringify(card));
}
getData();
getCategories();
initialCard();
