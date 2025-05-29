import React, { createContext, useState, type ReactNode } from 'react'

// contextの中身を定義
type FunctionContextType = {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
    patientNum: string;
    setPatientNum: React.Dispatch<React.SetStateAction<string>>;
    patientName: string;
    setPatientName: React.Dispatch<React.SetStateAction<string>>;
    patientTel: string;
    setPatientTel: React.Dispatch<React.SetStateAction<string>>;
}

// TypescriptにおいてはcreateContext宣言時、型を指定しているために各変数に仮の数字を入れる必要がある
export const FunctionContext = createContext<FunctionContextType>({
    isLogin: false,
    setIsLogin: () => {},
    patientNum: "0",
    setPatientNum: () => {},
    patientName: "ツナ田まぐ太郎",
    setPatientName: () => {},
    patientTel: "1234",
    setPatientTel: () => {},
});

// providerのpropsの型
type FunctionProviderProps = {
    children: ReactNode;
}

export const FunctionProvider = ({ children }: FunctionProviderProps) => {
    const [isLogin, setIsLogin] = useState(false);
    const [patientNum, setPatientNum] = useState("")
    const [patientName, setPatientName] = useState("")
    const [patientTel, setPatientTel] = useState("")

    return (
        <FunctionContext.Provider value={{ isLogin, setIsLogin, patientNum, setPatientNum, patientName, setPatientName, patientTel, setPatientTel }}>
            {children}
        </FunctionContext.Provider>
    );
};