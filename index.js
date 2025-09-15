// server.js (hoặc app.js)
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Dùng __dirname thì tất cả ảnh nằm trong thư mục sẽ được truy cập đúng

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Duc2252005@", // thay bằng mật khẩu MySQL nếu có
    database: "web"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL connected.");
});

// API get feature products
app.get("/products", (req, res) => {
    db.query("SELECT * FROM products1 WHERE id >= 9", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// API get all products
app.get("/products1", (req, res) => {
    db.query("SELECT * FROM products1", (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// API get product if id product = id;
app.get("/productstail/:id", (req, res) => {
    const {id} = req.params;
    db.query("SELECT * FROM products1 where id = ?", [id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// API update rating

app.patch("/products1/:id", (req, res) => {
    const { rating } = req.body;
    const { id } = req.params;
    db.query("UPDATE products1 SET rating = ? WHERE id = ?", [rating, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ success: true, updatedId: id });
    });
});

app.patch("/productstail/:id", (req, res) => {
    const { rating } = req.body;
    const { id } = req.params;
    db.query("UPDATE products1 SET rating = ? WHERE id = ?", [rating, id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ success: true, updatedId: id });
    });
});

app.listen(port, () => {
    console.log(`API running on http://localhost:${port}`);
});
