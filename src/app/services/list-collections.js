const admin = require('firebase-admin');

// ใส่ config ของคุณให้ถูกต้อง
admin.initializeApp({
    credential: admin.credential.applicationDefault(), // หรือใช้ serviceAccount ก็ได้
    projectId: "benjasiri-new-base", // ต้องใส่ projectId ตรงนี้ด้วย
});

const db = admin.firestore();

async function listCollections() {
    const collections = await db.listCollections();
    console.log('Collections in Firestore:');
    collections.forEach(col => {
        console.log('- ' + col.id);
    });
}

listCollections().catch(console.error);
