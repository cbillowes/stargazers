import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDEOdZNONdkStipqw8AfTBnsYb7vlx4S94",
  authDomain: "stargazers-fdc01.firebaseapp.com",
  projectId: "stargazers-fdc01",
  storageBucket: "stargazers-fdc01.appspot.com",
  messagingSenderId: "60351846267",
  appId: "1:60351846267:web:19f615fb989b1511eb0fde"
};

const firebaseApp = () => {
  const app = initializeApp(firebaseConfig);
  return app;
}

export {
  firebaseApp
}
