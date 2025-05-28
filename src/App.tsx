// import React from 'react'
import Header from './components/header/Header'
import './App.css'
import Login from './components/login/Login'
import { FunctionContext } from './components/providers/FunctionProvider'
import PatientCalender from './components/patient-calender/PatientCalender'
import { useContext } from 'react'

const App = () => {
  const { isLogin } = useContext(FunctionContext)
  return (
    isLogin? 
        // ログイン時
    <>
        <Header />
        {/* <Login /> */}
        <PatientCalender />
    </>
    :
    // 未ログイン時
    <>
        <Header />
        <Login />
        {/* <PatientCalender /> */}
    </>
  )
}

export default App