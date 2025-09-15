const blogData = [
  {
    title: "Bí quyết bảo quản đồ da bền lâu",
    image: "https://via.placeholder.com/400x200?text=Do+da",
    desc: "Hướng dẫn cách bảo quản túi xách, giày da giúp sản phẩm luôn như mới."
  },
  {
    title: "Top 5 sản phẩm bán chạy tháng 6",
    image: "https://via.placeholder.com/400x200?text=Top+5",
    desc: "Khám phá những món đồ được yêu thích nhất và lý do tại sao bạn nên sở hữu."
  },
  {
    title: "Cách chọn size quần áo chuẩn nhất",
    image: "https://via.placeholder.com/400x200?text=Size+clothing",
    desc: "Không còn lo lắng khi đặt hàng online với bảng size và mẹo chọn size phù hợp."
  }
];

const blogList = document.getElementById("blog-list");
if (blogList) {
  blogList.innerHTML = blogData.map(post => `
    <div class="blog-post">
      <img src="${post.image}" alt="${post.title}">
      <h4>${post.title}</h4>
      <p>${post.desc}</p>
    </div>
  `).join("");
}
