// import React from 'react'
import { useState } from "react"

const Login = () => {
    const [ isLogin, setIsLogin ] = useState(false);
    
    // ログイン時の入力内容チェック

    function handleLogin() {
        let num: string = "0001";
        let name: string = "ツナ田 マグ太郎";
        let telNum: number = 1234;
    }



    return (
    <div id="login-screen">
        <div>
            <div id="login-announce">
                <h1>Web順番予約システム</h1>
                <p>受診される方の情報を入力してください。</p>
                <p>診察番号は診察券の左上に記載されています。</p>
                <p>※診察券を紛失された方は直接ご来院ください</p>
            </div>
            <h2>入力フォーム</h2>
            <div id="login-form">
                    <div className="form-row">
                        <label htmlFor="num">診察番号：</label>
                        <input type="text" id="num" name="num" required placeholder="0001" value="0001"></input>
                    </div>
                    <div className="form-row">
                        <label htmlFor="name">飼い主様のお名前：</label>
                        <input type="text" id="name" name="name" required placeholder="ツナ田 マグ太郎" value="ツナ田 マグ太郎"></input>
                    </div>
                    <div className="form-row">
                        <label htmlFor="tel">電話番号（下4桁）：</label>
                        <input type="text" id="tel" name="tel" required placeholder="1234" value="1234"></input>
                    </div>
                    <div className="form-row">
                        <input type="submit" id="login-btn" value="予約画面へ"></input>
                    </div>
            </div>
        </div>
    </div>
    )
}

export default Login