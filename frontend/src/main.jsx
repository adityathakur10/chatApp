import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { ConversationContextprovider } from './context/ConversationContext.jsx'
import './lib/axiosSetup.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>

      <AuthContextProvider>
        <ConversationContextprovider>
          <App />
        </ConversationContextprovider>
      </AuthContextProvider>
      
    </BrowserRouter>
  </StrictMode>,
)
