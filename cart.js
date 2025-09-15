let cart = JSON.parse(localStorage.getItem("cart")) || [];
const container = document.getElementById("cart-container");
const totalPriceEl = document.getElementById("total-price");

function renderCart() {
  container.innerHTML = "";
  totalPriceEl.textContent = "";

  if (cart.length === 0) {
    container.innerHTML = `<div class="empty">Giỏ hàng hiện đang trống.</div>`;
    return;
  }

  let totalAll = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.quantity * item.price;
    totalAll += itemTotal;

    const itemHTML = document.createElement("div");
    itemHTML.className = "cart-item";
    itemHTML.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="product-img">
      <div class="item-details">
        <h3>${item.name}</h3>
        <p>Size: ${item.size}</p>
        <p>
          Số lượng: 
          <input type="number" min="1" value="${item.quantity}" data-index="${index}">
        </p>
        <p>Đơn giá: $${item.price.toFixed(2)}</p>
        <p><strong>Tổng: $<span class="item-total">${itemTotal.toFixed(2)}</span></strong></p>
        <div class="item-buttons">
          <button class="delete-btn" data-index="${index}">🗑 Xoá sản phẩm</button>
          <button class="checkout-single-btn" data-index="${index}">💵 Thanh toán sản phẩm</button>
        </div>
      </div>
    `;

    container.appendChild(itemHTML);
  });

  totalPriceEl.textContent = `Tổng cộng: $${totalAll.toFixed(2)}`;
}

// Cập nhật số lượng sản phẩm
container.addEventListener("input", function (e) {
  if (e.target.type === "number") {
    const index = e.target.dataset.index;
    const newQuantity = parseInt(e.target.value);
    if (newQuantity >= 1) {
      cart[index].quantity = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }
  }
});

// Xoá sản phẩm hoặc thanh toán riêng lẻ
container.addEventListener("click", function (e) {
  const index = e.target.dataset.index;
  if (e.target.classList.contains("delete-btn")) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  if (e.target.classList.contains("checkout-single-btn")) {
    const item = cart[index];
    localStorage.setItem("selectedProduct", JSON.stringify(item)); // Lưu sản phẩm đã chọn
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    window.location.href = "pay.html"; // Chuyển trang thanh toán
  }
});

// Xoá toàn bộ giỏ hàng
function clearCart() {
  if (confirm("Bạn có chắc chắn muốn xoá toàn bộ giỏ hàng?")) {
    localStorage.removeItem("cart");
    cart = [];
    renderCart();
  }
}

// Thanh toán toàn bộ giỏ hàng
function checkout() {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống!");
    return;
  }
  localStorage.setItem("selectedCart", JSON.stringify(cart)); // Lưu toàn bộ giỏ để dùng bên pay.html
  localStorage.removeItem("cart"); // Xoá giỏ
  cart = [];
  renderCart();
  window.location.href = "pay.html"; // Chuyển trang
}

renderCart();
