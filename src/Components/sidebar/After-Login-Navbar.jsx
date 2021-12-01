import logo from "../../assets/images/logo.png"
import person from "../../assets/images/person.ico"
import {usersCollection} from "../../firebase"
import { BsChatText,BsBell, BsJustify,BsHouseDoorFill,BsFillPinFill} from "react-icons/bs";
import {RiStackFill} from "react-icons/ri"
import { useState,useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from "react-router-dom";
function AfterLoginNavbar({show ,setShow}) {
    const [error,setError] = useState("")
    const {currentUser,logOut} = useAuth()
    const [username,setUsername] = useState("")
    async function handleLogout(){
        setError('')
        try{
          await logOut()
        }
        catch{
           setError('Failed to Logout')
        }
    }
      async function getUsername(){
        try {
            const query = await usersCollection
              .where("uid", "==", currentUser?.uid)
              .get();
            const data = await query.docs[0].data();
            setUsername(data.name);
          } catch (err) {
            console.error(err);
          }
      }
      useEffect(()=>{
          getUsername()
      },[]) 
    return (
        <section>
            <div  className={`p-2 my-container ${show?"active-cont":""}`}>
                <div className= "navbar__section ps-2  pe-4 d-flex py-2">
                    <button className="btn me-3 " id="menu-btn" onClick={()=>{setShow(!show)}}> <BsJustify className="fs-3 text-white"/></button>
                        <figure className="m-0">
                            <img src= {logo} className="w-100" alt=""/>
                        </figure>
                        <ul className="d-flex align-items-baseline mb-0">
                            <li className= "px-3 text-capitalize"><BsChatText className="fs-4"/></li>
                            <li className= "px-3 text-capitalize"><BsBell className="fs-4"/></li>
                            <li className= "px-3 text-capitalize">  
                                <div className="dropdown"> 
                                    <span className="profile__img me-2"><img src={person} alt="" className="rounded-circle me-2 w-100"/></span> 
                                    <strong>{username}</strong> 
                                    <button className=" text-decoration-none dropdown-toggle border-0 bg-transparent ms-2" id="dropdownUser1" 
                                    data-bs-toggle="dropdown" aria-expanded="false"></button>
                                    <ul className="mt-3 dropdown-menu dropdown-menu-dark text-small shadow" aria-labelledby="dropdownUser1">
                                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                        <li>
                                        <hr className="dropdown-divider"/>
                                        </li>
                                        <li className="ps-3">
                                            <button  className="bg-transparent border-0 text-white text-decoration-none"onClick={handleLogout}>Logout</button>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                </div>
            </div>
            
            <nav className={`home__navbar navbar-expand d-flex flex-column align-item-start p-3 ${show ?"active-nav":""}`} id="sidebar" >
                <button className="navbar-brand text-light my-4 border-0 bg-transparent">
                    <div className="display-6">TaskEasy</div>
                </button>
                <ul className="navbar-nav d-flex flex-column  w-100">
                    <li className="nav-item"> <button className="nav-link nav__active border-0 bg-transparent" aria-current="page"> <BsHouseDoorFill className="text-white"/><span className="ms-2">Home</span> </button> </li> 
                    <li> <button className="nav-link border-0 bg-transparent"> <BsFillPinFill className="text-white"/>
                    <Link className="ms-2 text-white text-decoration-none" to="/login-home"> My Projects</Link> </button> </li>
                    <li> <button className="nav-link border-0 bg-transparent"> <RiStackFill className="text-white"/>
                    <Link className="ms-2 text-white text-decoration-none" to="/add-todo"> My Tasks </Link> </button> </li>
                </ul>
            </nav>
        </section>
    )
}

export default AfterLoginNavbar
