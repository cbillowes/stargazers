import fs from 'fs';
import admin from 'firebase-admin';

const credentials = JSON.parse(
  fs.readFileSync(`${process.cwd()}/credentials.json`),
);

const firebaseAdmin = () => {
  admin.initializeApp({
    credential: admin.credential.cert(credentials),
  });
  return admin;
};

export { firebaseAdmin };
