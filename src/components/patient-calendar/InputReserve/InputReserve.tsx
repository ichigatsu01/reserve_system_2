import type { DateClickArg } from 'fullcalendar/index.js'
import { useContext, useEffect, useState } from 'react'
import { FunctionContext } from '../../providers/FunctionProvider'
import { Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Stack, TextField } from '@mui/material'
import { InputContext } from '../../providers/ReserveProvider'

type Props = {
    dateArg: DateClickArg | null
}

const InputReserve = ({ dateArg }: Props) => {
    const { patientName, patientNum } = useContext(FunctionContext)
    const { isOpenForm, setIsOpenForm, petName, setPetName, petType, setPetType, details, setDetails,
        setIsOpenConfirm, setReservedDate, reservedDateYMDHM, setReservedDateYMDHM
    } = useContext(InputContext)

    const [ alertMessage, setAlertMessage ] = useState<string[]>([])
    const [ isNameError, setIsNameError ] = useState(false)
    const [ isTypeError, setIsTypeError ] = useState(false)
    const [ isDetailsError, setIsDetailsError ] = useState(false)

    if (!dateArg){ // Fullcalenderから情報がうまく取得できていなかったときの対処
        console.warn('dateArgがnullなのでガッされてる')
        return null //dateArgが空の場合は何も返さない
    }
    useEffect(() => {
        setReservedDate(dateArg.dateStr);
        // dateArg.dateStrの日付情報を読みやすくする
        const reservedDateYear: number = Number(dateArg.dateStr.substring(0, 4))
        const reservedDateMonth: number = Number(dateArg.dateStr.substring(5, 7))
        const reservedDateDay: number = Number(dateArg.dateStr.substring(8, 10))
        const reservedDateHour: number = Number(dateArg.dateStr.substring(11, 13))
        const minute: number = Number(dateArg.dateStr.substring(14, 16)) // 0分なら〇時より、30分なら〇時△分より、と表記を切り替える
        const reservedDateMinute: string = minute !== 0 ? `${minute}分より` : "より"
        setReservedDateYMDHM(`${reservedDateYear}年${reservedDateMonth}月${reservedDateDay}日 ${reservedDateHour}時 ${reservedDateMinute}`)
    })


    const animalOptions = [ // ペットの種類の選択肢を設定
        { value: 'いぬ', name: 'いぬ'},
        { value: 'ねこ', name: 'ねこ'},
        { value: 'うさぎ', name: 'うさぎ'}
    ];

    const handleConfirm = () => {
        let newAlert: string[] = [];
        let nameErr: boolean = false;
        let typeErr: boolean = false;
        let detailsErr: boolean = false;
        // ペット名前チェック
        if (petName.trim() == "") {
            nameErr = true;
            newAlert.push('ペットのお名前')
        }
        // ペット種類チェック
        if (petName.trim() == "") {
            typeErr = true;
            newAlert.push('ペットの種類')
        }
        // 診察内容チェック
        if (details.trim() == "") {
            detailsErr = true;
            newAlert.push('診察内容')
        }
        // それぞれのエラー内容を反映する
        setIsNameError(nameErr)
        setIsTypeError(typeErr)
        setIsDetailsError(detailsErr)
        if (newAlert.length == 0) {
            setIsOpenConfirm(true);
        } else {
            setAlertMessage(newAlert);
        }
    }
    return (
        <>
            <Dialog
                open={isOpenForm}
                onClose={() => setIsOpenForm(false)}
            >
                <DialogTitle>予約内容入力画面</DialogTitle>
                <DialogContent>
                    <DialogContentText>診察番号：{patientNum}</DialogContentText>
                    <DialogContentText>飼い主様のお名前：{patientName}</DialogContentText>
                    <DialogContentText>予約日：{reservedDateYMDHM}</DialogContentText>
                </DialogContent>
                <DialogContent>
                    <DialogContentText sx={{marginBottom: '10px'}}>診察を受けるペットのお名前や種類、症状を入力してください</DialogContentText>
                    {/* エラーメッセージ */}
                    {alertMessage.length > 0 && <DialogContentText>次の入力内容を確認してください！</DialogContentText>}
                    {alertMessage.length > 0 && 
                        <Stack direction={'row'}>
                            {alertMessage.map((msg: string, index: number) => (
                            <Chip key={index} label={msg} color='warning' />
                        ))}
                        </Stack>
                    }
                    <Stack direction={'row'} sx={{marginTop: '10px'}}>
                        <TextField label="お名前" sx={{width: '70%', marginRight: '10px'}}
                            error={isNameError}
                            onChange={(e) =>setPetName(e.target.value)}
                        />
                        <TextField
                            select
                            label="種類"
                            sx={{ width: '30%' }}
                            value={petType}
                            onChange={(e) => setPetType(e.target.value)}
                            error={isTypeError}
                        >
                            {animalOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Stack>
                    <TextField label="診察内容" sx={{width: '100%', marginTop: '15px'}}
                        multiline
                        placeholder='複数行の入力も可能です'
                        error={isDetailsError}
                        onChange={(e) =>setDetails(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm}>予約確認画面へ</Button>
                    <Button onClick={() => setIsOpenForm(false)}>予約中止</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default InputReserve
