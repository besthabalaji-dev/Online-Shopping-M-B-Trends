const container = document.getElementById("product-container");
const cartCount = document.getElementById("cart-count");

// Retrieve cart from localStorage or initialize empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Products
function displayProducts(productList) {
  container.innerHTML = "";
  productList.forEach((p) => {
    container.innerHTML += `
          <div class="col-md-3 col-sm-6">
            <div class="card h-100 shadow-sm ">
              <img src="${p.image}" class="card-img-top" alt="${p.name}">
              <div class="card-body">
                <h6 class="card-title fw-bold">${p.name}</h6>
                <p class="small text-secondary">${p.description}</p>
                <p class="rating mb-1"><strong>Rating:</strong> ⭐ ${p.rating} | ${p.count}+</p>
                <p class="fw-bold text-success">₹${p.price}  <s class=" small text-secondary">${p.actualprice}</s></p>
              </div>
              <div class="card-footer bg-transparent border-0 d-flex justify-content-between">
                <button class="btn btn-danger btn-sm w-50 me-1" onclick="addToCart(${p.id})">Add to Cart</button>
                <button class="btn btn-success btn-sm w-50 ms-1" onclick="buyNow(${p.id})" href="cart.html">Buy Now</button>
              </div>
            </div>
          </div>
        `;
  });
}

// Filter Products
function filterProducts(category) {
  const buttons = document.querySelectorAll(".filter-buttons .btn");

  buttons.forEach((btn) =>
    btn.classList.replace("btn-primary", "btn-outline-primary")
  );
  const activeBtn = [...buttons].find((btn) =>
    btn.textContent
      .toLowerCase()
      .includes(category === "all" ? "all" : category)
  );
  if (activeBtn)
    activeBtn.classList.replace("btn-outline-primary", "btn-primary");

  if (category === "all") {
    displayProducts(products);
  } else {
    const filtered = products.filter((p) => p.category === category);
    displayProducts(filtered);
  }
}

// Add to Cart
function addToCart(id) {
  const item = products.find((p) => p.id === id);
  const existing = cart.find((c) => c.id === id);
  const button = event.target;

  if (existing) {
    existing.quantity += 1;
    window.location.href = "cart.html";
  } else {
    cart.push({ ...item, quantity: 1 });
    updateButtonToGoToCart(button);
  }

  updateCartCount();
  localStorage.setItem("cart", JSON.stringify(cart));
}
//Update button to "Go to Cart"
function updateButtonToGoToCart(button) {
  button.textContent = "Go to Cart";
  button.classList.remove("btn-danger");
  button.classList.add("btn-success");
  button.onclick = () => (window.location.href = "cart.html");
}
// Buy now
function buyNow(id) {
  addToCart(id); // First add the product to cart
  window.location.href = "cart.html"; // Then redirect to the cart page
}

// Update Cart Counter
function updateCartCount() {
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) cartCount.textContent = total;
}

cartCount.classList.add("updated");
setTimeout(() => cartCount.classList.remove("updated"), 300);

// scroll to categories section
document
  .getElementById("categories-link")
  .addEventListener("click", function (e) {
    e.preventDefault();
    document.getElementById("categories-section").scrollIntoView({
      behavior: "smooth",
    });
  });

// scroll to contact us section
document.getElementById("contact-link").addEventListener("click", function (e) {
  e.preventDefault();
  document.getElementById("contact-section").scrollIntoView({
    behavior: "smooth",
  });
});
// Initial Load
displayProducts(products);
updateCartCount();
