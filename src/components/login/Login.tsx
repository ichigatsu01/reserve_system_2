// import React from 'react'
import { useContext, useState } from "react"
import { FunctionContext } from "../providers/FunctionProvider"
import { Alert, Button, Divider, Stack, TextField, Typography } from "@mui/material"


const Login = () => {
    // Contextからの輸入
    const { setIsLogin, patientNum, setPatientNum, patientName ,setPatientName, patientTel, setPatientTel } = useContext(FunctionContext)

    // 入力エリアに対する警告
    const [ alertMessage, setAlertMessage ] = useState<string[]>([])
    const [ isNumError, setIsNumError ] = useState(false)
    const [ isNameError, setIsNameError ] = useState(false)
    const [ isTelError, setIsTelError ] = useState(false)
    const isOnlyDigits = (text: string) => /^[0-9]+$/.test(text);
    const handleLogin = () => {
        // 診療番号チェック
        console.log(patientNum)
        let newAlert: string[] = [];
        if (patientNum.trim() == "") {
            newAlert.push("診療番号が入力されていません")
            setIsNumError(true)
        } else if (!isOnlyDigits(patientNum)) {
            newAlert.push("診療番号には半角数字のみ入力してください")
            setIsNumError(true)
        } else {
            setIsNumError(false)
        }
        // 飼い主名チェック
        console.log(patientName)
        if (patientName.trim() == "") {
            newAlert.push("飼い主様のお名前が入力されていません")
            setIsNameError(true)
        } else {
            setIsNameError(false)
        }
        // 電話番号チェック
        console.log(patientTel)
        if (patientTel.trim() == "") {
            newAlert.push("電話番号が入力されていません")
            setIsTelError(true)
        } else if (!isOnlyDigits(patientTel)) {
            newAlert.push("電話番号には半角数字のみ入力してください")
            setIsTelError(true)
        } else {
            setIsTelError(false)
        }
        newAlert.length == 0 ? setIsLogin(true) : setAlertMessage(newAlert)
    };

    return (
        <Stack spacing={4} sx={{maxWidth: '400px', mx: 'auto', my: '25px'}}>
            <Stack spacing={2}>
                <Typography variant="h4">Web順番予約システム</Typography>
                <Typography variant="body1">受診される方の情報を入力してください。</Typography>
                <Typography variant="body1">診察番号は診察券の左上に記載されています。</Typography>
                <Typography variant="body1">※診察券を紛失された方は直接ご来院ください</Typography>
            </Stack>
            <Divider variant="middle" sx={{borderColor: '#454545'}}/>
            <Stack spacing={2}>
                <Typography variant="h5">入力フォーム</Typography>
                {alertMessage.length > 0 && //alertMessageに何らかのメッセージが入っているか？
                        alertMessage.map((msg, index) => (
                            <Alert key={index} severity="warning" variant="filled">{msg}</Alert>
                        ))
                }
                <TextField label="診察番号" required error={isNumError}
                    onChange={(e) =>setPatientNum(e.target.value)}
                />
                <TextField label="飼い主様のお名前" required error={isNameError}
                    onChange={(e) =>setPatientName(e.target.value)}
                />
                <TextField label="電話番号下4桁" required error={isTelError}
                    onChange={(e) =>setPatientTel(e.target.value)}
                />
                <Button
                    variant="contained"
                    onClick={handleLogin}
                >
                    予約画面へ
                </Button>
                <Button // !テスト用ログインボタン
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        setIsLogin(true)
                        setPatientNum('0001')
                        setPatientName('ツナ田　まぐ太郎')
                        setPatientTel('1234')
                    }}
                >
                    テスト用ログインボタン
                </Button>
            
            </Stack>
        </Stack>
    )
}

export default Login