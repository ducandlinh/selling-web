function getStars(rating, productId) {
    let starsHTML = "";
    for (let i = 1; i <= 5; i++) {
        const filled = i <= rating ? "fa-solid" : "fa-regular";
        starsHTML += `<i class="${filled} fa-star" data-product="${productId}" data-rating="${i}"></i>`;
    }
    return starsHTML;
}

function addProducts(products) {
    const container = document.querySelector(".pro-container");
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
                loadProducts();
            });
        });
    });
}

function loadProducts() {
    fetch("http://localhost:3000/products")
        .then(res => res.json())
        .then(data => addProducts(data))
        .catch(err => console.error("Lỗi:", err));
}

document.addEventListener("DOMContentLoaded", loadProducts);

// 3D Parallax Effect on Hero
const hero = document.getElementById('hero');
hero.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 25;
    const y = (window.innerHeight / 2 - e.pageY) / 25;
    hero.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});
hero.addEventListener('mouseleave', () => {
    hero.style.transform = `rotateY(0deg) rotateX(0deg)`;
});

