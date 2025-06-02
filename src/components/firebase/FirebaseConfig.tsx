// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { Firestore, getFirestore } from 'firebase/firestore';

// configデータを読み込む。環境変数を書いている.envファイルはルートディレクトリに置く。
// このように処理することでローカル作業中は.envファイルを見に行く。
// デプロイ後はVercelなどに環境変数を記載しておく必要がある。
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Firebaseの初期化
const app = initializeApp(firebaseConfig);

// Firestoreインスタンスの取得
const db: Firestore = getFirestore(app);

export default db;