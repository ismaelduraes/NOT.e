import { auth, db } from "../firebase-config";
import {
    doc,
    deleteDoc,
    addDoc,
    collection,
    getDocs,
    setDoc,
} from "@firebase/firestore";

export async function deleteNote(noteId) {
    await deleteDoc(doc(db, `notes/user/${auth.currentUser.uid}/${noteId}`));
}

export async function submitNote(noteTitle, noteText, color, imageId) {
    await addDoc(collection(db, `notes/user/${auth.currentUser.uid}`), {
        title: noteTitle,
        text: noteText,
        userDisplayName: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
        colorCSS: color.css,
        colorAvg: color.colorAvg,
        imageId: imageId,
    });
}

export async function getNotes() {
    const data = await getDocs(
        collection(db, `notes/user/${auth.currentUser.uid}`)
    );
    return data.docs;
}

export async function setNote(noteId, title, text, color, imageId) {
    console.log(color);
    await setDoc(doc(db, `notes/user/${auth.currentUser.uid}/${noteId}`), {
        title,
        text,
        userDisplayName: auth.currentUser.displayName,
        userId: auth.currentUser.uid,
        colorCSS: color.css,
        colorAvg: color.colorAvg,
        imageId,
    });
}
