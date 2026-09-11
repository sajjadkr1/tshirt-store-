// ==========================
// PANIER - FONCTIONS
// ==========================

// Récupère les produits enregistrés dans le localStorage
function getCart() {
  const savedCart = localStorage.getItem("cart");

  // Si un panier existe, on le transforme en tableau JavaScript
  if (savedCart) {
    return JSON.parse(savedCart);
  }

  // Sinon, retourne un tableau vide
  return [];
}


// Enregistre le panier dans le localStorage
function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}


// Ajoute un produit dans le panier
function addToCart(product) {

  // Récupère le panier actuel
  const cart = getCart();

  // Ajoute le nouveau produit
  cart.push(product);

  // Enregistre le nouveau panier
  saveCart(cart);

  // Met à jour l'affichage du panier
  displayCart();

  // Affiche le produit ajouté dans la console
  console.log("Produit ajouté au panier :", product);
}


// Supprime un produit du panier
function removeFromCart(index) {

  // Récupère le panier actuel
  const cart = getCart();

  // Supprime le produit selon sa position dans le tableau
  cart.splice(index, 1);

  // Enregistre le panier après suppression
  saveCart(cart);

  // Met à jour l'affichage du panier
  displayCart();
}


// Affiche les produits du panier
function displayCart() {

  // Sélectionne la zone du panier
  const cartContainer = document.getElementById("cart");

  // Vérifie que la zone du panier existe
  if (!cartContainer) {
    return;
  }

  // Vide le contenu actuel
  cartContainer.innerHTML = "";

  // Récupère les produits du panier
  const cart = getCart();

  // Message si le panier est vide
  if (cart.length === 0) {
    cartContainer.textContent = "Votre panier est vide.";
    return;
  }

  // Affiche chaque produit du panier
  cart.forEach(function (product, index) {

    // Crée la carte du produit
    const cartProduct = document.createElement("div");

    // Ajoute une classe CSS
    cartProduct.classList.add("cart-product");


    // Crée le nom du produit
    const productName = document.createElement("p");

    productName.textContent = product.name;

    cartProduct.appendChild(productName);


    // Crée le prix du produit
    const productPrice = document.createElement("p");

    productPrice.textContent = product.price;

    cartProduct.appendChild(productPrice);


    // Crée le bouton Supprimer
    const removeButton = document.createElement("button");

    removeButton.type = "button";
    removeButton.textContent = "Supprimer";

    removeButton.classList.add("remove-button");


    // Supprime le produit quand on clique sur le bouton
    removeButton.addEventListener("click", function () {
      removeFromCart(index);
    });


    // Ajoute le bouton dans la carte
    cartProduct.appendChild(removeButton);


    // Ajoute le produit dans le panier
    cartContainer.appendChild(cartProduct);
  });
}


// Affiche le panier au chargement de la page
displayCart();



// ==========================
// PRODUITS HTML
// ==========================

// Sélectionne tous les boutons "Ajouter au panier"
// des produits déjà présents dans le HTML
document.querySelectorAll(".pro1 button").forEach(function (button) {

  // Quand on clique sur un bouton
  button.addEventListener("click", function () {

    // Récupère la carte du produit sélectionné
    const parentElement = button.closest(".pro1");

    // Vérifie que la carte du produit existe
    if (!parentElement) {
      return;
    }


    // Récupère le nom du produit
    const nameElement = parentElement.querySelector("h3");

    // Récupère le prix du produit
    const priceElement = parentElement.querySelector("p");

    // Récupère l'image du produit
    const imageElement = parentElement.querySelector("img");


    // Vérifie que les informations existent
    if (!nameElement || !priceElement || !imageElement) {
      return;
    }


    // Regroupe les informations du produit dans un objet
    const product = {
      name: nameElement.textContent.trim(),
      price: priceElement.textContent.trim(),
      img: imageElement.src
    };


    // Ajoute le produit au panier
    addToCart(product);
  });
});



// ==========================
// CONNEXION / INSCRIPTION
// ==========================

// Récupère les boutons Connexion et Inscription
const signupTab = document.getElementById("signup-tab");
const loginTab = document.getElementById("login-tab");


// Récupère les deux formulaires
const registerForm = document.getElementById("register-form");
const loginForm = document.getElementById("login-form");


// Vérifie que les éléments existent dans la page
if (signupTab && loginTab && registerForm && loginForm) {

  // Cache le formulaire d'inscription au chargement
  registerForm.style.display = "none";


  // Quand on clique sur S'inscrire
  signupTab.addEventListener("click", function () {

    // Affiche le formulaire d'inscription
    registerForm.style.display = "block";

    // Cache le formulaire de connexion
    loginForm.style.display = "none";

    // Active le bouton Inscription
    signupTab.classList.add("active");

    // Désactive le bouton Connexion
    loginTab.classList.remove("active");
  });


  // Quand on clique sur Connexion
  loginTab.addEventListener("click", function () {

    // Affiche le formulaire de connexion
    loginForm.style.display = "block";

    // Cache le formulaire d'inscription
    registerForm.style.display = "none";

    // Active le bouton Connexion
    loginTab.classList.add("active");

    // Désactive le bouton Inscription
    signupTab.classList.remove("active");
  });
}



// ==========================
// PANNEAU DU PANIER
// ==========================

// Récupère le bouton qui ouvre le panier
const cartButton = document.getElementById("cart-button");

// Récupère le panneau du panier
const cartPanel = document.getElementById("cart-panel");

// Récupère le bouton qui ferme le panier
const closeCart = document.getElementById("close-cart");


// Vérifie que tous les éléments existent
if (cartButton && cartPanel && closeCart) {

  // Ouvre le panier
  cartButton.addEventListener("click", function () {

    // Ajoute la classe "open"
    cartPanel.classList.add("open");

    // Informe les technologies d'assistance
    cartButton.setAttribute("aria-expanded", "true");
  });


  // Ferme le panier
  closeCart.addEventListener("click", function () {

    // Retire la classe "open"
    cartPanel.classList.remove("open");

    // Informe les technologies d'assistance
    cartButton.setAttribute("aria-expanded", "false");
  });
}



// ==========================
// PRODUITS DE L'API
// ==========================

// Sélectionne la zone qui recevra les produits MongoDB
const productsList = document.getElementById("products-list");


// Vérifie que la zone existe avant d'appeler l'API
if (productsList) {

  // Récupère les produits depuis le backend
  fetch("http://localhost:3000/api/products")

    // Vérifie la réponse du serveur
    .then(function (response) {

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des produits");
      }

      return response.json();
    })


    // Récupère les produits
    .then(function (products) {

      // Affiche les produits dans la console
      console.log(products);


      // Parcourt tous les produits reçus
      products.forEach(function (product) {

        // ==========================
        // CARTE DU PRODUIT
        // ==========================

        // Crée la carte du produit
        const productCard = document.createElement("article");

        // Ajoute la classe CSS
        productCard.classList.add("pro1");


        // ==========================
        // NOM DU PRODUIT
        // ==========================

        // Crée le titre
        const productName = document.createElement("h3");

        // Ajoute le nom
        productName.textContent = product.name;

        // Ajoute le titre dans la carte
        productCard.appendChild(productName);


        // ==========================
        // IMAGE DU PRODUIT
        // ==========================

        // Crée l'image
        const productImage = document.createElement("img");

        // Ajoute l'adresse de l'image
        productImage.src = product.imgUrl;

        // Ajoute un texte alternatif pour l'accessibilité
        productImage.alt = product.name;

        // Ajoute l'image dans la carte
        productCard.appendChild(productImage);


        // ==========================
        // PRIX DU PRODUIT
        // ==========================

        // Crée le prix
        const productPrice = document.createElement("p");

        // Ajoute le prix
        productPrice.textContent = `${product.price} €`;

        // Ajoute le prix dans la carte
        productCard.appendChild(productPrice);


        // ==========================
        // BOUTON AJOUTER AU PANIER
        // ==========================

        // Crée le bouton
        const addButton = document.createElement("button");

        // Définit le type du bouton
        addButton.type = "button";

        // Ajoute le texte du bouton
        addButton.textContent = "Ajouter au panier";

        // Ajoute le bouton dans la carte
        productCard.appendChild(addButton);


        // Quand on clique sur le bouton
        addButton.addEventListener("click", function () {

          // Prépare les informations du produit
          const cartProduct = {
            name: product.name,
            price: `${product.price} €`,
            img: product.imgUrl
          };

          // Ajoute le produit au panier
          addToCart(cartProduct);
        });


        // ==========================
        // AFFICHAGE DE LA CARTE
        // ==========================

        // Ajoute la carte complète dans la page
        productsList.appendChild(productCard);
      });
    })


    // Affiche une erreur si le serveur ne répond pas
    .catch(function (error) {
      console.error("Erreur API :", error);
    });
}