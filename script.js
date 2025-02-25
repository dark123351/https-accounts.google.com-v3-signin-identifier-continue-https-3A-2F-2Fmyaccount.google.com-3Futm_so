// ฟังก์ชันตรวจสอบอีเมลและไปหน้าป้อนรหัสผ่าน
function nextPage() {
    let email = document.getElementById("email").value;
    if (email === "") {
        document.getElementById("error-message").innerText = "โปรดป้อนอีเมล";
    } else {
        localStorage.setItem("userEmail", email);
        window.location.href = "password.html";
    }
}

// ฟังก์ชันตรวจสอบรหัสผ่าน (ผ่านเสมอ)
function verifyPassword() {
    let password = document.getElementById("password").value;
    if (password === "") {
        alert("โปรดป้อนรหัสผ่าน");
    } else {
        window.location.href = "otp.html";
    }
}

// แสดงอีเมลในหน้ารหัสผ่าน
window.onload = function() {
    let userEmail = localStorage.getItem("userEmail");
    if (document.getElementById("user-email")) {
        document.getElementById("user-email").innerText = userEmail;
    }
}

// ฟังก์ชันตรวจสอบ OTP
function verifyOTP() {
    let otp = document.getElementById("otp").value;
    if (otp === "") {
        alert("โปรดป้อนรหัส OTP");
    } else {
        alert("เข้าสู่ระบบสำเร็จ!");
        // สามารถเปลี่ยนไปหน้าหลักที่ต้องการได้
    }
}
