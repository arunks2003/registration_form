import { db } from "../firebase-config";

import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

const personCollectionRef = collection(db, "aruncivil")
class PersonDataService {
    addPerson = (newPerson) => {
        return addDoc(personCollectionRef, newPerson);
    }
}

export default new PersonDataService();

