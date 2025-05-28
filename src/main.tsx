import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { FunctionProvider } from './components/providers/FunctionProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FunctionProvider>
      <App />
    </FunctionProvider>
  </StrictMode>,
)
