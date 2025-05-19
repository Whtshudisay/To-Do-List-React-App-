import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Todo from './Components/Todo'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Todo/>
  </StrictMode>,
)
