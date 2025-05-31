import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { FunctionProvider } from './components/providers/FunctionProvider.tsx'
// @ts-ignore
import TestCalender from './test/TestCalender.jsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FunctionProvider>
      <App />
      {/* <TestCalender /> */}
    </FunctionProvider>
  </StrictMode>,
)
