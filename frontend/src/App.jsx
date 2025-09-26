import { Routes,Route } from "react-router-dom"
import ChatPage from "./pages/ChatPage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import { ProtectedRoutes } from "./components/protectedRoutes"

function App() {
  return (
    <Routes>
      <Route path="/" element={
          <ProtectedRoutes>
            <ChatPage/>
          </ProtectedRoutes>}>
        </Route>
      <Route path="/login" element={<LoginPage/>}></Route>
      <Route path="/signup" element={<SignupPage/>}></Route>
    </Routes>
  )
}

export default App