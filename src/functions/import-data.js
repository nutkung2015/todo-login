// import-data.js

const admin = require('firebase-admin');
const XLSX = require('xlsx');

// 1. เริ่มต้น Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: 'vehicle-name'    // เปลี่ยนเป็น projectId ของคุณ
});
const db = admin.firestore();

/**
 * อ่านไฟล์ Excel แล้วแปลงเป็น JSON array
 * @param {string} filePath - พาธไฟล์ .xlsx
 * @returns {Array<Object>}
 */
function readExcel(filePath) {
    const wb = XLSX.readFile(filePath);
    const sheetName = wb.SheetNames[0];
    return XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
}

/**
 * นำข้อมูล JSON ไปเขียนลง Firestore แบบ batch
 * @param {string} collectionName - ชื่อ collection ใน Firestore
 * @param {Array<Object>} dataArray 
 */
async function importBatch(collectionName, dataArray) {
    const batch = db.batch();
    dataArray.forEach(item => {
        // สร้าง doc ด้วย auto-ID
        const docRef = db.collection(collectionName).doc();
        batch.set(docRef, item);
    });
    await batch.commit();
    console.log(`✅ Imported ${dataArray.length} records into '${collectionName}'`);
}

async function main() {
    try {
        // อ่านข้อมูลจากไฟล์ Excel
        const brands = readExcel('./DataCarBrand.xlsx');
        const models = readExcel('./DataCarModel.xlsx');

        // เขียนลง Firestore
        await importBatch('ev_brands', brands);
        await importBatch('ev_models', models);

        console.log('🎉 All data imported successfully!');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error importing data:', err);
        process.exit(1);
    }
}

main();
