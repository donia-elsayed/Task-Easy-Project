import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js'
import { AuthProvider } from './context/AuthContext';
import SignUp from '../Components/auth/register/sign-up';
import Login from '../Components/auth/login/Login';
import ForgotPassword from '../Components/auth/forget-password/ForgotPassword';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import MainPage from './MainPage_view/MainPage';
import SideBar from './sidebar/SideBar';
import PrivateRoute from './PrivateRoute';
import UpdateProfile from './edit-profile/UpdateProfile'
import NavBar  from './home-page/Navbar/Nav';
import Profile from '../Components/edit-profile/Profile';
import SecondUserProvider from './context/secondUser';
import FeaturesTabs from './tabs/Tabs';
import TaskDetails from './task-details/TaskDetails';
import { useState } from 'react';
// import Todo from './add-todo/Todo';
// import ChatView from "../Components/layout/ChatView"
// import BarCharts from './charts/BarCharts';
function App() {
  const [show ,setShow]= useState(false);
  return (
    <>
      <Router>
        <AuthProvider>
          <SecondUserProvider>
            <NavBar show={show} setShow={setShow}/>{/*show*/}
            <Routes>
              <Route  exact path="/" element={<MainPage/>}/>
              <Route path="/login-home" element={<PrivateRoute/>}>
                <Route path='/login-home' element={<SideBar/>}/>
              </Route>
              <Route exact path="/profile" element={<PrivateRoute/>}>
                <Route exact path='/profile' element={<Profile/>}/>
              </Route>
              <Route exact path="/task-details" element={<PrivateRoute/>}>
                <Route exact path='/task-details' element={<TaskDetails/>}/>
              </Route>
              {/* <Route exact path="/chat" element={<PrivateRoute/>}>
                <Route exact path='/chat' element={<ChatView/>}/>
              </Route>
              <Route exact path="/charts" element={<PrivateRoute/>}>
                <Route exact path='/charts' element={<BarCharts/>}/>
              </Route> */}
              <Route exact path="/tabs" element={<PrivateRoute/>}>
                <Route exact path='/tabs' element={<FeaturesTabs show={show}/>}/>
              </Route>
              <Route path="/update-profile" element={<PrivateRoute/>}>
                <Route path='/update-profile' element={<UpdateProfile/>}/>
              </Route>
              <Route path="/signUp" element={<SignUp/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
            </Routes>
          </SecondUserProvider>
        </AuthProvider>
    </Router>
    </>
    
  ); 
}
export default App;

