use web;
CREATE TABLE IF NOT EXISTS products1 (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10,2),
    rating INT DEFAULT 0,
    img VARCHAR(255),
    brand VARCHAR(255),
    quantity_in_stock int 
);

CREATE TABLE carts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    session_token VARCHAR(255), -- mã định danh cho mỗi phiên duyệt web
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products1 (img, brand, name, price, rating, quantity_in_stock, description) VALUES
('img/products/n1.jpg', 'adidas', 'Shirt', 100, 0, 10, 'Áo sơ mi thời trang nam cao cấp'),
('img/products/n2.jpg', 'nike', 'Shirt', 140, 0, 10, 'Áo sơ mi thể thao Nike thoáng mát'),
('img/products/n3.jpg', 'puma', 'Shirt', 85, 0, 10, 'Áo sơ mi Puma phong cách trẻ trung'),
('img/products/n4.jpg', 'reebok', 'T-Shirt', 90, 0, 10, 'Áo thun Reebok mềm mại, thoải mái'),
('img/products/n5.jpg', 'nike', 'Shirt', 110, 0, 10, 'Áo sơ mi Nike phiên bản giới hạn'),
('img/products/n6.jpg', 'puma', 'Puma Short', 98, 0, 10, 'Quần short Puma năng động, thoáng khí'),
('img/products/n7.jpg', 'chanel', 'Chanel Shirt', 200, 0, 10, 'Áo Chanel sang trọng, cá tính'),
('img/products/n8.jpg', 'LV', 'Luis Vuitton T-Shirt', 220, 0, 10, 'Áo thun LV đẳng cấp thương hiệu'),
('img/products/f1.jpg', 'adidas', 'T-Shirt', 78, 0, 10, 'Áo T-Shirt Adidas basic tiện dụng'),
('img/products/f2.jpg', 'nike', 'Running Shoes', 120, 0, 10, 'Giày chạy bộ Nike êm ái, bền bỉ'),
('img/products/f3.jpg', 'puma', 'Sweatshirt', 95, 0, 10, 'Áo sweatshirt Puma giữ ấm tốt'),
('img/products/f4.jpg', 'reebok', 'Jacket', 150, 0, 10, 'Áo khoác Reebok thể thao'),
('img/products/f5.jpg', 'nike', 'Nike Shirt', 100, 0, 10, 'Áo thun Nike thoáng khí'),
('img/products/f6.jpg', 'puma', 'Puma Shirt', 120, 0, 10, 'Áo Puma thể thao cổ điển'),
('img/products/f7.jpg', 'chanel', 'Chanel Shoes', 130, 0, 10, 'Giày Chanel thời thượng'),
('img/products/f8.jpg', 'LV', 'Luis Vuitton Shirt', 200, 0, 10, 'Áo LV phong cách hoàng gia');



