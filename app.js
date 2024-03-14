// DOM ELEMENTS
const productEL = document.querySelector(".products");
const cartItemsEl = document.querySelector(".cart-items");

// Function to render products
function renderProducts() {
  products.forEach((item) => {
    productEL.innerHTML += `
      <div class="item">
        <div class="item-container">
          <div class="item-img">
            <img src="${item.imgSrc}" alt="${item.name}">
          </div>
          <div class="desc">
            <h2>${item.name}</h2>
            <h2><small>$</small>${item.price}</h2>
            <p>${item.description}</p>
          </div>
          <div class="add-to-wishlist">
            <img src="./icons/heart.png" alt="add to wish list">
          </div>
          <div class="add-to-cart" onclick="addToCart(${item.id})">
            <img src="./icons/bag-plus.png" alt="add to cart">
          </div>
        </div>
      </div>`;
  });
}

// Function to initialize rendering of products
renderProducts();

let cart = JSON.parse(localStorage.getItem("Cart"))|| [];
update();

// Function to add an item to the cart
function addToCart(id) {
  // Check if the item is already in the cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    // Find the item by id and add it to the cart
    const item = products.find((product) => product.id === id);
    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }
  // Update the cart display
  update();
}

// Function to update the cart display
function update() {
  renderCartItems();
  renderSubtotal();
  localStorage.setItem('Cart',JSON.stringify(cart));
}

// Function to render items in the cart
function renderCartItems() {
  cartItemsEl.innerHTML = "";
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
      <div class="cart-item">
        <div class="item-info" onclick='removeFromTheCart(${item.id})'>
          <img src="${item.imgSrc}" alt="${item.name}">
          <h4>${item.name}</h4>
        </div>
        <div class="unit-price">
          <small>$</small>${item.price}
        </div>
        <div class="units">
          <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
          <div class="number">${item.numberOfUnits}</div>
          <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>
        </div>
      </div>`;
  });
}

// Function to change the number of units for an item in the cart
// Function to change the number of units for an item in the cart
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    if (item.id === id) {
      let numberOfUnits = item.numberOfUnits;
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
      // Update the numberOfUnits property in the returned item
      return { ...item, numberOfUnits: numberOfUnits };
    }
    return item;
  });
  // Update the cart display
  update();
}

function renderSubtotal() {
  let totalPrice = 0,
    totalItems = 0;
  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });
  document.querySelector(
    ".subtotal"
  ).innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
  document.querySelector(".total-items-in-cart").innerHTML = `${totalItems}`;
}
function removeFromTheCart(id) {
  cart=cart.filter((item) => item.id !== id);

  update();
}
