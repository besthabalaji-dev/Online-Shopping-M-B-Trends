let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  const container = document.getElementById("cart-items");
  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = `<p class="text-center text-muted fs-5">Your cart is empty.</p>`;
    document.getElementById("cart-total").textContent = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.quantity;
    container.innerHTML += `
          <div class="col-md-3 col-sm-6">
            <div class="cart-item h-100 shadow-sm ">
              <img src="${item.image}" class="cart-img-top" alt="${item.name}">
              <div class="card-body">
                <h6 class="card-title fw-bold">${item.name}</h6>
                <p class="small text-secondary">${item.description}</p>
                <p class="rating mb-1"><strong>Rating:</strong> ⭐ ${item.rating} |  ${item.count}</p>
                <p class="price fw-bold text-success">₹${item.price}  <s class=" small text-secondary">${item.actualprice}</s></p>
              </div>
             <div class="quantity">
                <button class="btn btn-outline-secondary btn-sm w-10 " onclick="changeQty(${index}, -1)">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button class="btn btn-outline-secondary btn-sm  w-10" onclick="changeQty(${index}, 1)">+</button>
              </div>
              <button class="btn btn-danger btn-sm" onclick="removeItem(${index})">Remove</button>


            </div>
          </div>
        `;
  });

  document.getElementById("cart-total").textContent = total.toFixed(2);
}

function changeQty(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

displayCart();
