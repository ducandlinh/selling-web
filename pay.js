const singleProduct = JSON.parse(localStorage.getItem("selectedProduct"));
const cartProducts = JSON.parse(localStorage.getItem("selectedCart"));

const productInfoContainer = document.querySelector(".product-info");
let totalAmount = 0;

// Trường hợp 1 sản phẩm
if (singleProduct && !cartProducts) {
    const total = singleProduct.price * singleProduct.quantity;
    totalAmount = total;

    productInfoContainer.innerHTML = `
        <h3>Thông Tin Sản Phẩm</h3>
        <img src="${singleProduct.img}" alt="${singleProduct.name}" width="150">
        <p><strong>Tên:</strong> ${singleProduct.name}</p>
        <p><strong>Giá:</strong> $${singleProduct.price}</p>
        <p><strong>Size:</strong> ${singleProduct.size}</p>
        <p><strong>Số lượng:</strong> ${singleProduct.quantity}</p>
        <p><strong>Tổng tiền:</strong> $${total.toFixed(2)}</p>
    `;
}

// Trường hợp nhiều sản phẩm
if (cartProducts && Array.isArray(cartProducts)) {
    let listHTML = `<h3>Thông Tin Sản Phẩm</h3>`;
    cartProducts.forEach(item => {
        const itemTotal = item.price * item.quantity;
        totalAmount += itemTotal;

        listHTML += `
            <div style="border-bottom: 1px solid #ccc; padding: 10px 0;">
                <img src="${item.img}" alt="${item.name}" width="100">
                <p><strong>${item.name}</strong> | Size: ${item.size} | SL: ${item.quantity} | Đơn giá: $${item.price} | Tổng: $${itemTotal.toFixed(2)}</p>
            </div>
        `;
    });

    listHTML += `<p style="font-weight:bold;">Tổng tiền tất cả: $${totalAmount.toFixed(2)}</p>`;
    productInfoContainer.innerHTML = listHTML;
}

// Khi Submit => Hiện QR
document.getElementById("payment-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const accountNumber = "0845225205";  
    const accountName = "LUU MINH DUC"; 
    const bankName = "MB Bank";         
    const content = `Thanh toan ${Date.now()}`;

    const qrData = `STK: ${accountNumber}\nChủ TK: ${accountName}\nNgân hàng: ${bankName}\nSố tiền: $${totalAmount.toFixed(2)}\nNội dung: ${content}`;
    const qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`;

    document.getElementById("qr-image").src = qrURL;
    document.getElementById("qr-info").innerHTML = `
        <strong>Số tài khoản:</strong> ${accountNumber} <br>
        <strong>Chủ TK:</strong> ${accountName} <br>
        <strong>Ngân hàng:</strong> ${bankName} <br>
        <strong>Số tiền:</strong> $${totalAmount.toFixed(2)} <br>
        <strong>Nội dung:</strong> ${content}
    `;

    document.getElementById("payment-form").style.display = "none";
    document.getElementById("qr-container").style.display = "block";
});

// Hoàn tất thanh toán
function finishPayment() {
    alert("✅ Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
    localStorage.removeItem("selectedProduct");
    localStorage.removeItem("selectedCart");
    window.location.href = "home.html";
}
