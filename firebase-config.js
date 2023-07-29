import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// COMPLETAR CON CREDENCIALES DE FIREBASE
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage };
