import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { FunctionProvider } from './components/providers/FunctionProvider.tsx'
import { InputProvider } from './components/providers/ReserveProvider.tsx'
// @ts-ignore
import TestCalender from './test/TestCalender'
// @ts-ignore
import TestFirebase from './components/firebase/TestFirebase.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FunctionProvider>
      <InputProvider>
        <App />
        {/* <TestCalender /> */}
        {/* <TestFirebase /> */}
      </InputProvider>
    </FunctionProvider>
  </StrictMode>
)
