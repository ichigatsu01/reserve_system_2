import React, { createContext, useState, type ReactNode } from 'react'

// contextの中身の型を定義
type InputContextType = {
    petName: string;
    setPetName: React.Dispatch<React.SetStateAction<string>>;
    petType: string;
    setPetType: React.Dispatch<React.SetStateAction<string>>;
    details: string;
    setDetails: React.Dispatch<React.SetStateAction<string>>;
    reservedDate: string; // Firebaseに登録する予約日
    setReservedDate: React.Dispatch<React.SetStateAction<string>>;
    reservedDateYMDHM: string; // 予約確認時に表示する、読みやすくした予約日
    setReservedDateYMDHM: React.Dispatch<React.SetStateAction<string>>;
    entriedDate: string;
    setEntriedDate: React.Dispatch<React.SetStateAction<string>>;
    isOpenForm: boolean;
    setIsOpenForm: React.Dispatch<React.SetStateAction<boolean>>;
    isOpenConfirm: boolean;
    setIsOpenConfirm: React.Dispatch<React.SetStateAction<boolean>>;
    allClear: () => void
}

// 仮の値を与える
export const InputContext = createContext<InputContextType>({
    petName: "",
    setPetName: () => {},
    petType: "",
    setPetType: () => {},
    details: "",
    setDetails: () => {},
    reservedDate: "",
    setReservedDate: () => {},
    reservedDateYMDHM: "",
    setReservedDateYMDHM: () => {},
    entriedDate: "",
    setEntriedDate: () => {},
    isOpenForm: false,
    setIsOpenForm: () => {},
    isOpenConfirm: false,
    setIsOpenConfirm: () => {},
    allClear: () => {}
})

// childrenの型を定義
type InputProviderProps = {
    children: ReactNode
}


export const InputProvider = ({ children }: InputProviderProps) => {
    const [ petName, setPetName ] = useState("")
    const [ petType, setPetType ] = useState("")
    const [ details, setDetails ] = useState("")
    const [ reservedDate, setReservedDate ] = useState("")
    const [ entriedDate, setEntriedDate ] = useState("")
    const [ isOpenForm, setIsOpenForm ] = useState(false)
    const [ isOpenConfirm, setIsOpenConfirm ] = useState(false)
    const [ reservedDateYMDHM, setReservedDateYMDHM ] = useState("")

    // setter群のリセット関数
    const allClear = () => {
        setPetName(""),
        setPetType(""),
        setDetails(""),
        setReservedDate(""),
        setEntriedDate(""),
        setReservedDateYMDHM("")
    }

    return (
        <InputContext.Provider value={{
            petName, setPetName, petType, setPetType, details, setDetails, reservedDate, setReservedDate,
            reservedDateYMDHM, setReservedDateYMDHM, entriedDate, setEntriedDate, isOpenForm, setIsOpenForm,
            isOpenConfirm, setIsOpenConfirm, allClear
        }}>
            {children}
        </InputContext.Provider>
    )
}