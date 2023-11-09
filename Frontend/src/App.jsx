import './index.css'
import { Suspense, lazy } from 'react'

import RegisterFormPage from './pages/Login-Register/RegisterFormPage'
import LoginFormPage from './pages/Login-Register/LoginFormPage'
import DevBoardPage from './pages/Dev board/DevBoardPage'
import { Routes,Route } from 'react-router-dom'
import EmailVerificationPage from './pages/Login-Register/EmailVerificationPage'
import {AuthorizedContext} from './util/components/Context/isAuthorizedContext'
import YourGamesDevPage from './pages/Dev board/YourGamesDevPage'
import CreateGamePage from './pages/Dev board/CreateGamePage'
import EditGamePage from './pages/Dev board/EditGamePage'
import AlertProvider from './util/components/Context/AlertContext'
import AlertPopIn from './util/components/AlertPopIn'
const LoginPage=lazy(()=> import ('./pages/Login-Register/LoginPage'))
import RegisterPage from './pages/Login-Register/Register'
import StoreLayOut from './pages/Store/StoreLayOut'
import HomePage from './pages/Store/Home Page/HomePage'
import BrowseGame from './pages/Store/Browse Game/BrowseGame'
import Game from './pages/Store/Game/Game'
import Logout from './pages/Login-Register/Logout'
import DevPage from './pages/Dev board/DevPage'
import DevStatPage from './pages/Dev board/Dev Stat/DevStatPage'
import DevGamePage from './pages/Dev board/DevGamePage'
import DevGameStatPage from './pages/Dev board/Dev Game Stat/DevGameStatPage'
import LibraryLayOut from './pages/Library/LibraryLayOut'
import LibraryPage from './pages/Library/LibraryPage'
import SuccessPage from './pages/Store/SuccessPage'
import FailPage from './pages/Store/FailPage'



function App() {
  return (
    <div className='w-full min-h-screen'>
      <AlertProvider>
        <AlertPopIn></AlertPopIn>
          <AuthorizedContext>
            <Suspense>
              <Routes>
                <Route path='/register' element={<RegisterPage/>}></Route>
                <Route path='/register/dev' element={ <RegisterFormPage userType={'dev'}/>}></Route>
                <Route path='/register/customer' element={ <RegisterFormPage userType={'customer'}/>}></Route>
                <Route path='/login' element={<LoginPage/>}></Route>
                <Route path='/login/dev' element={<LoginFormPage userType={'dev'}/>}></Route>
                <Route path='/login/customer' element={<LoginFormPage userType={'customer'}/>}></Route>
                <Route path='/verify/:token' element={<EmailVerificationPage/>}></Route>
                <Route path='/logout' element={<Logout/>}></Route>

                <Route path='/success' element={<SuccessPage/>}></Route>
                <Route path='/cancel' element={<FailPage/>}></Route>
                
                <Route path='/' element={<StoreLayOut/>}>
                  <Route path='' element={<HomePage/>}></Route>
                  <Route path='/browse' element={<BrowseGame/>}></Route>
                  <Route path='/game/:gameId' element={<Game/>}></Route>
                </Route>

                <Route path='/library' element={<LibraryLayOut/>}>
                  <Route path='' element={<LibraryPage/>}></Route>
                </Route>
              
                <Route path='/devboard' element={<DevBoardPage/>}>
                  <Route path='dev' element={<DevPage/>}>
                    <Route path='yourgames' element={<YourGamesDevPage/>}></Route>
                    <Route path='' element={<DevStatPage/>}></Route>
                  </Route>
                  
                  <Route path='devgame/:gameId' element={<DevGamePage/>}>
                    <Route path='editgame' element={<EditGamePage></EditGamePage>}></Route>
                    <Route path='' element={<DevGameStatPage/>}></Route>
                  </Route>
                  <Route path='creategame' element={<CreateGamePage/>}></Route>
                </Route>
              </Routes>
            </Suspense>
          </AuthorizedContext>
      </AlertProvider>
    </div>
  )
}

export default App
