import { collection, getDocs } from "firebase/firestore";
import db from './FirebaseConfig';

// 患者の予約日程を取得する
export const loadPatient = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "reservation")); //doc(db, "コレクション名", "ドキュメント名")はドキュメント単体を読み込むためのメソッド
            // querySnapshotの中身を分解する
            const docsData = querySnapshot.docs.map(doc => ({
                // querySnapshotのうちdata()にFirestoreの登録内容が含まれるので取り出す
                ...doc.data(),
            }));
            // 終了時間をstartの30分後にする。もしstartが30分だった場合、hourを数字に直して+1にする必要がある
            const endTime = (date: string) => {
                let newTime = "";
                if (date.slice(14, 16) == "00") {
                    newTime = date.slice(0, 14) + "30" + date.slice(16);
                } else {
                    newTime = date.slice(0, 11) + String(parseInt(date.slice(11, 13)) + 1).padStart(2, '0') + ':00' + date.slice(16);
                }
                return newTime;
            }
            const newData = docsData.map((doc) => ({
                title: "予約済",
                start: doc.reservedDate,
                end: endTime(doc.reservedDate)
            }))
            return newData;
        } catch(e) {
            console.error("Error reading document: ", e)
        }
    }