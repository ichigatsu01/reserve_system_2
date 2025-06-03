import { useContext, useEffect } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider } from '@mui/material'
import { InputContext } from '../../providers/ReserveProvider'
import { FunctionContext } from '../../providers/FunctionProvider'
import { sendFirebase } from '../../firebase/SendReserve'

const ReserveConfirm = () => {
    const { patientName, patientNum } = useContext(FunctionContext)
    const { isOpenConfirm, setIsOpenConfirm, reservedDate, reservedDateYMDHM, petName, petType, details, setIsOpenForm } = useContext(InputContext);
    useEffect(() => {
        setIsOpenForm(false);
    })

    // 予約内容をオブジェクトにまとめる
    const reserveSummary = {
        patientNum: patientNum,
        patientName: patientName,
        reservedDate: reservedDate,
        entriedDate: new Date(),
        petName: petName,
        petType: petType,
        details: details
    }
    console.log(reserveSummary.entriedDate);

    const handleConfirm = () => {
        sendFirebase(reserveSummary);
        setIsOpenConfirm(false)
    }
    return (
        <div>
            <Dialog
                open={isOpenConfirm}
                onClose={() => setIsOpenConfirm(false)}
            >
                <DialogTitle>予約内容確認画面</DialogTitle>
                <DialogContent>
                    <DialogContentText>以下の内容で予約します。よろしいですか？</DialogContentText>
                    <Divider sx={{borderColor: '#454545', my: '15px'}}/>
                    <DialogContentText>診察番号：{patientNum}</DialogContentText>
                    <DialogContentText>飼い主様のお名前：{patientName}</DialogContentText>
                    <DialogContentText>予約日：{reservedDateYMDHM}</DialogContentText>
                    <DialogContentText>ペットのお名前：{petName}</DialogContentText>
                    <DialogContentText>ペットの種類：{petType}</DialogContentText>
                    <DialogContentText>診察内容：{details}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirm}>予約確定</Button>
                    <Button onClick={() => setIsOpenConfirm(false)}>予約中止</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ReserveConfirm
