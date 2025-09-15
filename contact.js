//emailjs

document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("EDuGUeWJuiurNdBtl");

  document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    emailjs.sendForm("service_gmail", "template_vkvy8kp", this).then(
      function () {
        alert("🎉 Gửi thành công!");
        document.getElementById("contact-form").reset();
      },
      function (error) {
        console.error("Gửi thất bại", error);
        alert("❌ Lỗi khi gửi tin nhắn.");
      }
    );
  });
});


