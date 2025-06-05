// import React from 'react'
import Header from './components/header/Header'
import './App.css'
import Login from './components/login/Login'
import { FunctionContext } from './components/providers/FunctionProvider'
import { useContext } from 'react'
import PatientMenu from './components/patient-calendar/PatientMenu'


const App = () => {
  const { isLogin } = useContext(FunctionContext)
  return (
    isLogin? 
        // ログイン時
    <>
        <Header />
        <PatientMenu />
    </>
    :
    // 未ログイン時
    <>
        <Header />
        <Login />
    </>
  )
}

export default App