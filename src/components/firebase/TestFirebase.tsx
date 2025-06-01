//* 参考：https://firebase.google.com/docs/firestore/manage-data/add-data?utm_source=chatgpt.com&hl=ja

import React from 'react'
import db from './FirebaseConfig'
import { addDoc, collection } from "firebase/firestore"
import { Button } from '@mui/material'

const TestFirebase = () => {
    const testWrite = async () => {
        try {
            console.log("クリックしました")
            const docRef = await addDoc(collection(db, "users"), {
                first: "Ada",
                last: "Lovelace",
                born: 1815
            });
            console.log("Document written with ID: ", docRef.id);
        } catch(e) {
            console.error("Error adding document: ", e)
        }
    }
    return (
        <div>
            <Button onClick={testWrite}>ぽち</Button>
        </div>
    )
}

export default TestFirebase