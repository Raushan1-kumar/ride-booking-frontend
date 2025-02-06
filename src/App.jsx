import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import UserLogin from './UserLogin';
import Usersignup from './UserSignup';
import CaptainLogin from './CaptainLogin';
import CaptainSignup from './CaptainSignup';
import Start from './Start';
import UserProctedWrapper from './UserProtectedWrapper';
import UserLogout from './UserLogout';
import CaptainProctedWrapper from './CaptainProtectedWrapper';
import CaptainLogout from './CaptainLogout';
import CaptainHome from './CaptainHome';
import RidingStarted from './Component/RidingStarted';


function App() {
  return (
<>
<div>
  <Routes>
    <Route path='/' element={<Start/>}></Route>
    <Route path='/home' element={<UserProctedWrapper><Home/></UserProctedWrapper>}></Route>
    <Route path='/user-login' element={<UserLogin/>}></Route>
    <Route path='/user-signup' element={<Usersignup/>}></Route>
    <Route path='/captain-login' element={<CaptainLogin/>}></Route>
    <Route path='/captain-signup' element={<CaptainSignup/>}></Route>
    <Route path='/user/logout' element={<UserProctedWrapper><UserLogout/></UserProctedWrapper>}></Route>
    <Route path='/captain/home' element={<CaptainProctedWrapper><CaptainHome/></CaptainProctedWrapper>}></Route>
    <Route path='/captain/riding' element={<CaptainProctedWrapper><RidingStarted/></CaptainProctedWrapper>}></Route>
    <Route path='/captain/logout' element={<CaptainProctedWrapper><CaptainLogout/></CaptainProctedWrapper>}></Route>
  </Routes>
</div>

</>  
);
}

export default App;
