import { json } from "body-parser";

// Sélectionne tous les boutons "Ajouter au panier"
document.querySelectorAll('.pro1 button').forEach(function (button) {

  // Quand on clique sur un bouton
  button.addEventListener('click', function () {

    // Récupère la carte du produit sélectionné
    const parentElement = button.closest('.pro1') || button.parentElement;

    // Récupère le nom du produit
    const productName = parentElement.querySelector('h3').textContent.trim();

    // Récupère le prix du produit
    const price = parentElement.querySelector('p').textContent.trim();

    // Récupère l'image du produit
    const img = parentElement.querySelector('img').src;

    // Regroupe les informations du produit dans un objet
    const product = {
      name: productName,
      price: price,
      img: img,
    };

    // Enregistre le nom du produit dans le localStorage
    localStorage.setItem('productName', productName);

    // Affiche les informations dans la console
    console.log(productName);
    console.log(product);
  });

});


// Récupère le produit enregistré dans le localStorage
const savedProduct = localStorage.getItem('productName');

// Sélectionne la zone du panier
const cart = document.querySelector('#cart');

// Vérifie que la zone du panier existe avant de l'utiliser
if (cart) {
  cart.textContent = savedProduct || '';
}



// ==========================
// CONNEXION / INSCRIPTION
// ==========================

// Récupère les boutons Login et Sign Up
const signupTab = document.getElementById("signup-tab");
const loginTab = document.getElementById("login-tab");

// Récupère les deux formulaires
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");

// Vérifie que les éléments existent dans la page
if (signupTab && loginTab && registerForm && loginForm) {

  // Quand on clique sur Sign Up
  signupTab.addEventListener('click', function () {

    // Affiche le formulaire d'inscription
    registerForm.style.display = "block";

    // Cache le formulaire de connexion
    loginForm.style.display = "none";

    // Active le bouton Sign Up
    signupTab.classList.add("active");

    // Désactive le bouton Login
    loginTab.classList.remove("active");
  });


  // Quand on clique sur Login
  loginTab.addEventListener('click', function () {

    // Affiche le formulaire de connexion
    loginForm.style.display = "block";

    // Cache le formulaire d'inscription
    registerForm.style.display = "none";

    // Active le bouton Login
    loginTab.classList.add("active");

    // Désactive le bouton Sign Up
    signupTab.classList.remove("active");
  });

}



// ==========================
// PANIER
// ==========================

// Récupère le bouton qui ouvre le panier
const cartButton = document.getElementById("cart-button");

// Récupère le panneau du panier
const cartPanel = document.getElementById("cart-panel");

// Récupère le bouton de fermeture
const closeCart = document.getElementById("close-cart");

// Vérifie que tous les éléments du panier existent
if (cartButton && cartPanel && closeCart) {

  // Ouvre le panier quand on clique sur l'icône
  cartButton.addEventListener('click', function () {

    // Ajoute la classe "open" pour afficher le panier
    cartPanel.classList.add('open');
  });


  // Ferme le panier quand on clique sur la croix
  closeCart.addEventListener('click', function () {

    // Retire la classe "open" pour cacher le panier
    cartPanel.classList.remove('open');
  });

}

fetch("http://localhost:3000/api/products")
  .then(function (response) {
    return response.json();
  })
  .then(function (products) {

    console.log(products);

    const productsList = document.getElementById("products-list");

    products.forEach(function (product) {

      const productCard = document.createElement("div");

      productCard.classList.add("pro1");

      const productName = document.createElement("h3");

      productName.textContent = product.name;

      productCard.appendChild(productName);

      productsList.appendChild(productCard);

      const productPrice = document.createElement("p");

      productPrice.textContent = `${product.price}€`;

      productCard.appendChild(productPrice);

      productsList.appendChild(productCard);

      const productImage = document.createElement("img");
      
      productImage.src = product.imgUrl
      
      productCard.appendChild(productImage);

      // const addButton = document.createElement("button");
     // addButton.textContent = "Ajouter au panier";
     // productCard.appendChild(addButton);
     // addButton.addEventListener("click", function(){
       // console.log(product);
       // localStorage.setItem("cart", JSON.stringify(product));
      })
    });

  //});