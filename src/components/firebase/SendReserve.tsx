import db from './FirebaseConfig'
import { addDoc, collection } from 'firebase/firestore'

type reserveSummaryType = {
    patientNum: string,
    patientName: string,
    reservedDate: string,
    entriedDate: Date,
    petName: string,
    petType: string,
    details: string
}

export const sendFirebase = async (reserveSummary: reserveSummaryType) => {
    const { patientNum, patientName, reservedDate, entriedDate, petName, petType, details} = reserveSummary
    try {
        const docRef = await addDoc(collection(db, "reservation"), {
            patientNum: patientNum,
            patientName: patientName,
            reservedDate: reservedDate,
            entriedDate: entriedDate,
            petName: petName,
            petType: petType,
            details: details,
        });
        console.log("Document written with ID: ", docRef.id);
        alert('予約完了しました');
    } catch(e) {
        console.error("Error adding document: ", e);
        alert('予約に失敗しました。電波の良いところで再度行うか、時間をおいて予約してください');
    }
}