import React, { createContext, useState, type ReactNode } from 'react'

// contextの中身を定義
type FunctionContextType = {
    isLogin: boolean;
    setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

// state等の初期値…[isLogin, setIsLogin]=useState()と同義
export const FunctionContext = createContext<FunctionContextType>({
    isLogin: false,
    setIsLogin: () => {},
});

// providerのpropsの型
type FunctionProviderProps = {
    children: ReactNode;
}

export const FunctionProvider = ({ children }: FunctionProviderProps) => {
    const [isLogin, setIsLogin] = useState(false);

    return (
        <FunctionContext.Provider value={{ isLogin, setIsLogin }}>
            {children}
        </FunctionContext.Provider>
    );
};