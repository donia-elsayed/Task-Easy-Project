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
import Todo from './add-todo/Todo';
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
          <Route exact path="/profile" element={<PrivateRoute/>}>
            <Route exact path='/profile' element={<Profile/>}/>
          </Route>
          <Route exact path="/add-todo" element={<PrivateRoute/>}>
            <Route exact path='/add-todo' element={<Todo/>}/>
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

