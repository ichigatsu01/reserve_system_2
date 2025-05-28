import { useContext } from 'react'
import { FunctionContext } from '../providers/FunctionProvider'
import { Button } from '@mui/material'

const PatientCalender = () => {
    const { setIsLogin } = useContext(FunctionContext)
    return (
        <div>
            <Button variant='contained' onClick={() => setIsLogin(false)}>ログアウト</Button>
        </div>
    )
}

export default PatientCalender
