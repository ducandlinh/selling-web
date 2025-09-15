// Lấy ID sản phẩm từ URL
const id = new URLSearchParams(window.location.search).get("id");

// Hàm tạo sao đánh giá
function getStars2(rating, productId) {
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
        const filled = i <= rating ? "fa-solid" : "fa-regular";
        starsHTML += `<i class="${filled} fa-star" data-product="${productId}" data-rating="${i}"></i>`;
    }
    return starsHTML;
}

// Hàm thêm sản phẩm vào giao diện
function addProducts2(products) {
    const container = document.querySelector(".product-tail");
    container.innerHTML = "";

    products.forEach(product => {
        container.innerHTML += `
            <div class="pro">
                <div class="group-img">
                    <div class="main-img">
                        <img src="${product.img}" alt="${product.name}">
                    </div>
                    <div class="relative-img">
                        <img src="${product.img}" alt="${product.name}">
                        <img src="${product.img}" alt="${product.name}">
                        <img src="${product.img}" alt="${product.name}">
                        <img src="${product.img}" alt="${product.name}">
                    </div>
                    <div class="information-product">
                        <h4>Information of product</h4>
                        <p>${product.description}</p>
                    </div>
                </div>
                <div class="des">
                    <span>${product.brand}</span>
                    <h5>${product.name}</h5>
                    <div class="star">${getStars2(product.rating, product.id)}</div>
                    <h4>$${product.price}</h4>
                </div>
                <a href="#?id=${product.id}"><i class="fa-solid fa-cart-shopping"></i></a>
                <label>Size:
                    <select id="product-size">
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                    </select>
                </label>
                <label>Số lượng:
                    <input type="number" id="product-quantity" value="1" min="1" max="10">
                </label>
                <button class="buy-now-btn">Mua ngay</button>
                <button class="add-to-cart-btn">Thêm vào giỏ hàng</button>
            </div>`;
    });

    // Gán sự kiện cho sao đánh giá
    document.querySelectorAll(".star i").forEach(star => {
        star.addEventListener("click", function () {
            const productId = this.dataset.product;
            const selectedRating = this.dataset.rating;

            fetch(`http://localhost:3000/products1/${productId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ rating: selectedRating })
            })
            .then(res => res.json())
            .then(() => loadProducts2());
        });
    });

    // Gán sự kiện cho nút "Thêm vào giỏ hàng"
    document.querySelectorAll(".pro").forEach(productElem => {
        const addToCartBtn = productElem.querySelector(".add-to-cart-btn");
        addToCartBtn.addEventListener("click", () => {
            const productId = productElem.querySelector(".star i")?.dataset.product;
            const productName = productElem.querySelector("h5")?.innerText;
            const productPrice = parseFloat(productElem.querySelector(".des h4")?.innerText.replace("$", ""));
            const productImg = productElem.querySelector(".main-img img")?.src;
            const productSize = productElem.querySelector("#product-size")?.value;
            const productQuantity = parseInt(productElem.querySelector("#product-quantity")?.value);

            const cartItem = {
                id: productId,
                name: productName,
                price: productPrice,
                img: productImg,
                size: productSize,
                quantity: productQuantity
            };

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existing = cart.find(item => item.id === cartItem.id && item.size === cartItem.size);

            if (existing) {
                existing.quantity += cartItem.quantity;
            } else {
                cart.push(cartItem);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Đã thêm vào giỏ hàng!");
        });

        // Gán sự kiện cho nút "Mua ngay"
        const buyNowBtn = productElem.querySelector(".buy-now-btn");
        buyNowBtn.addEventListener("click", () => {
            const productId = productElem.querySelector(".star i")?.dataset.product;
            const productName = productElem.querySelector("h5")?.innerText;
            const productPrice = parseFloat(productElem.querySelector(".des h4")?.innerText.replace("$", ""));
            const productImg = productElem.querySelector(".main-img img")?.src;
            const productSize = productElem.querySelector("#product-size")?.value;
            const productQuantity = parseInt(productElem.querySelector("#product-quantity")?.value);

            const selectedProduct = {
                id: productId,
                name: productName,
                price: productPrice,
                img: productImg,
                size: productSize,
                quantity: productQuantity
            };

            localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
            window.location.href = "pay.html";
        });
    });
}

const thumbnails = document.querySelectorAll('#tail-product .relative-img img');
const mainImg = document.querySelector('#tail-product .main-img img');

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
        mainImg.src = thumbnail.src;
        mainImg.classList.add('active');
        setTimeout(() => {
            mainImg.classList.remove('active');
        }, 500); // hiệu ứng phóng to khi đổi ảnh
    });
});


// Load sản phẩm từ API
function loadProducts2() {
    fetch(`http://localhost:3000/productstail/${id}`)
        .then(res => res.json())
        .then(data => addProducts2(data))
        .catch(err => console.error("Lỗi:", err));
}

// Gọi hàm khi trang tải
document.addEventListener("DOMContentLoaded", loadProducts2);
