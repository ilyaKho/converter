import * as admin  from 'firebase-admin';
const serviceAccount = require ("./serviceAccount.json")
export const auth = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

