import { useContext, useEffect } from 'react'
import { FunctionContext } from '../providers/FunctionProvider'
import { Button, Stack, Typography } from '@mui/material'
import AddCalendar from './AddCalendar'


const PatientMenu = () => {
    const { setIsLogin, patientName, setPatientNum, setPatientName, setPatientTel  } = useContext(FunctionContext)
    const handleLogout = () => {
        setPatientNum("")
        setPatientName("")
        setPatientTel("")
        setIsLogin(false)
    }
    // 強制的にFullcalenderの現在時刻に画面が吸い寄せられてしまうので修正
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <Stack sx={{width:'80vw', maxWidth: '1000px', alignItems: 'center', mx: 'auto', my: '20px'}}>
            <Typography variant='h5'>ようこそ、{patientName}様</Typography>
            <Button variant='contained' onClick={handleLogout} sx={{width: '100px', marginTop: '20px'}}>ログアウト</Button>
            <AddCalendar />
        </Stack>
    )
}

export default PatientMenu
