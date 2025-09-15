function getStars1(rating, productId) {
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
        const filled = i <= rating ? "fa-solid" : "fa-regular";
        starsHTML += `<i class="${filled} fa-star" data-product="${productId}" data-rating="${i}"></i>`;
    }
    return starsHTML;
}

function addProducts1(products) {
    const container = document.querySelector(".pro-container1");
    container.innerHTML = "";
    products.forEach(product => {
        container.innerHTML += `
        <div class="pro">
            <img src="${product.img}" alt="${product.name}">
            <div class="des">
                <span>${product.brand}</span>
                <h5>${product.name}</h5>
                <div class="star">${getStars(product.rating, product.id)}</div>
                <h4>$${product.price}</h4>
            </div>
            <a href="product.html?id=${product.id}"><i class="fa-solid fa-cart-shopping"></i></a>
        </div>`;
    });
    
    // Gán sự kiện click cho các sao
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
            .then(() => {
                // reload lại dữ liệu sau khi update
                loadProducts1();
            });
        });
    });
}

function loadProducts1() {
    fetch("http://localhost:3000/products1")
        .then(res => res.json())
        .then(data => addProducts1(data))
        .catch(err => console.error("Lỗi:", err));
}

document.addEventListener("DOMContentLoaded", loadProducts1);

// Optional: Parallax nhẹ khi di chuột ở sản phẩm
document.querySelectorAll('.pro').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        card.style.transform = `rotateY(${x * 0.05}deg) rotateX(${y * -0.05}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });
});
