//* 参考：https://firebase.google.com/docs/firestore/manage-data/add-data?utm_source=chatgpt.com&hl=ja
//* 参考２(読込)：https://firebase.google.com/docs/firestore/query-data/get-data?hl=ja

import db from './FirebaseConfig'
import { addDoc, collection, getDocs } from "firebase/firestore"
import { Button, Stack } from '@mui/material'
import { useState } from 'react'

const TestFirebase = () => {
    const [ reservations, setReservations ] = useState<any>([]); // とりあえず中身を見たい
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

    const testRead = async () => {
        try {
            console.log("読み取ります");
            const querySnapshot = await getDocs(collection(db, "reservation")); //doc(db, "コレクション名", "ドキュメント名")はドキュメント単体を読み込むためのメソッド
            querySnapshot.forEach((doc) => {
                console.log(doc.id, " => ", doc.data());
            });
            // querySnapshotの中身を分解する
            const docsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setReservations(docsData);
            console.log(reservations)

        } catch(e) {
            console.error("Error reading document: ", e)
        }
    }

    return (
        <>
            <Stack spacing={4}>
                <Button variant='contained' onClick={testWrite}>書き込みます</Button>
                <Button variant='contained' onClick={testRead}>読み込みます</Button>
            </Stack>
            {reservations && reservations.map((resv: any, index: number) => (
                <div key={index}>
                    {Object.entries(resv).map(([key, value]) => (
                        <p key={key}>{key}: {String(value)}: 型：{typeof value}</p>
                    ))}
                </div>
            ))}
        </>
    )
}

export default TestFirebase