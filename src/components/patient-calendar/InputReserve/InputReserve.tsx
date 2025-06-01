import type { DateClickArg } from 'fullcalendar/index.js'
import { useContext } from 'react'
import { FunctionContext } from '../../providers/FunctionProvider'
import { Dialog, DialogContent, DialogContentText } from '@mui/material'
import { InputContext } from '../../providers/ReserveProvider'

type Props = {
    dateArg: DateClickArg | null
}

const InputReserve = ({ dateArg }: Props) => {
    const { patientName, patientNum } = useContext(FunctionContext)
    const { isOpenForm, setIsOpenForm } = useContext(InputContext)

    if (!dateArg){
        console.warn('dateArgがnullなのでガッされてる')
        return null //dateArgが空の場合は何も返さない
    }

    return (
        <Dialog
            open={isOpenForm}
            onClose={() => setIsOpenForm(false)}
        >
            <DialogContent>
                <DialogContentText>診察番号：{patientNum}</DialogContentText>
                <DialogContentText>飼い主様のお名前：{patientName}</DialogContentText>
                <DialogContentText>予約日：{dateArg.dateStr}</DialogContentText>
            </DialogContent>
        </Dialog>
    )
}

export default InputReserve
