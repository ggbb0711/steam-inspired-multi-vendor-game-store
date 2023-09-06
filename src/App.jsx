import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import RegisterFormPage from './pages/RegisterFormPage'
import LoginFormPage from './pages/LoginFormPage'
import DevBoardPage from './pages/DevBoardPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import EmailVerificationPage from './pages/EmailVerificationPage'
import PersistLogin from './pages/components/PersistLogin'
import YourGamesDevPage from './pages/YourGamesDevPage'
import CreateGamePage from './pages/CreateGamePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='w-screen min-h-screen'>
      <Routes>
        <Route path='/' element={ <RegisterFormPage userType={'dev'}/>}></Route>
        <Route path='/login' element={<LoginFormPage userType={'dev'}/>}></Route>
        <Route path='/verify/:token' element={<EmailVerificationPage/>}></Route>

        <Route element={<PersistLogin/>}>
          <Route path='/devboard' element={<DevBoardPage/>}>
            <Route path='yourgame' element={<YourGamesDevPage/>}></Route>
            <Route path='creategame' element={<CreateGamePage/>}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
