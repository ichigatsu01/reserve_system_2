# Web順番予約アプリ
（作成中）  
Fullcalender.jsとFirestoreの連携による予約管理機能を持たせたアプリです。  
ログイン画面では簡易的な入力チェック（未入力、数字を入れるべき場所に数字以外の文字が入っているか）を行います。  
なおユーザマスタは設定していません。    
予約管理画面では利用者個人での予約登録・変更・削除が出来ます。  
GoogleFirebaseの認証機能で管理者としてログインすることで、予約全体の管理や休診日の設定などが行えます。  

## スクリーンショット
<p align="center">
  <img src="public/ss1.jpg" width="30%" />
</p>

## 技術スタック
- HTML/CSS
- TypeScript
- Fullcalender.js
- React
- Vite
- MaterialUI
- Firebase/Firestore

## 作成の狙い
- Firestoreを活用したNoSQLの技術習得
- TypeScriptによるコーディングの練習