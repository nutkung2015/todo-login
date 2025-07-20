const functions = require('firebase-functions');
const admin = require('firebase-admin');

// เรียกใช้งาน service account หรือ applicationDefault
admin.initializeApp();

exports.listCollections = functions.https.onRequest(async (req, res) => {
    try {
        const collections = await admin.firestore().listCollections();
        const ids = collections.map(col => col.id);
        res
            .set('Access-Control-Allow-Origin', '*')      // ปลด CORS ถ้าต้องการ
            .json({ collections: ids });
    } catch (error) {
        console.error('Error listing collections:', error);
        res.status(500).json({ error: error.toString() });
    }
});
