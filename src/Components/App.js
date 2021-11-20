import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js'
import { AuthProvider } from './context/AuthContext';
import SignUp from '../Components/auth/register/sign-up';
import Login from '../Components/auth/login/Login';
import ForgotPassword from './ForgotPassword';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import MainPage from './MainPage_view/MainPage';
import SideBar from './sidebar/SideBar';
import PrivateRoute from './PrivateRoute';
import UpdateProfile from './UpdateProfile'
import Dashboard from './Dashboard';
import NavBar  from './home-page/Navbar/Nav';
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
        <NavBar/>
        <Routes>
          <Route  exact path="/" element={<MainPage/>}/>
          <Route path="/login-home" element={<PrivateRoute/>}>
            <Route path='/login-home' element={<SideBar/>}/>
          </Route>
          <Route exact path="/dashboard" element={<PrivateRoute/>}>
            <Route exact path='/dashboard' element={<Dashboard/>}/>
          </Route>
          
          <Route path="/update-profile" element={<PrivateRoute/>}>
            <Route path='/update-profile' element={<UpdateProfile/>}/>
          </Route>
          <Route path="/signUp" element={<SignUp/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/forgot-password" element={<ForgotPassword/>}></Route>
        </Routes>
      </AuthProvider>
    </Router>
    {/* <MainPage/>  */}
    </>
    
  ); 
}
export default App;

