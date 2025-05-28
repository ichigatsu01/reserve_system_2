// import React from 'react'
import { useContext } from "react"
import { FunctionContext } from "../providers/FunctionProvider"
import { Button, Divider, Stack, TextField, Typography } from "@mui/material"


const Login = () => {
    
    const { setIsLogin } = useContext(FunctionContext)

    // ログイン時の入力内容チェック

    // function handleLogin() {
    //     let num: string = "0001";
    //     let name: string = "ツナ田 マグ太郎";
    //     let telNum: number = 1234;
    // }

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
                <TextField id="num" label="診療番号" required/>
                <TextField id="num" label="飼い主様のお名前" required/>
                <TextField id="num" label="電話番号(下4桁)" required/>
                <Button
                    variant="contained"
                    onClick={() => setIsLogin(true)}
                >
                    予約画面へ
                </Button>
            </Stack>
        </Stack>
    )
}

export default Login