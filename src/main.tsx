import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { FunctionProvider } from './components/providers/FunctionProvider.tsx'
import { InputProvider } from './components/providers/ReserveProvider.tsx'
import TestFirebase from './components/firebase/TestFirebase.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FunctionProvider>
      <InputProvider>
        <App />
        {/* <TestFirebase /> */}
      </InputProvider>
    </FunctionProvider>
  </StrictMode>,
)
