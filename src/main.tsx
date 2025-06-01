import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { FunctionProvider } from './components/providers/FunctionProvider.tsx'
import { InputProvider } from './components/providers/ReserveProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FunctionProvider>
      <InputProvider>
        <App />
      </InputProvider>
    </FunctionProvider>
  </StrictMode>,
)
