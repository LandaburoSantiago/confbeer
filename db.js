import { collection, getFirestore } from "firebase/firestore";
import { app } from "./firebase-config";

const db = getFirestore(app);
const conferencesDocument = collection(db, "Conferencias");

export { conferencesDocument };
