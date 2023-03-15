import style from "../Menu/Menu.module.css";
import useAuth from "../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";


const Menu = () => {

  const [auth, setAuth] = useAuth() 


  const logout = (e) =>{
    e.preventDefault();
    setAuth(false)
  }

  const navLinkStyle = ({isActive}) =>{
    return{
      color: isActive ? "#0000FF" : "black"
    }
  }

  return (
    <div className={`${style.menuContainer} container mt-3`}>
      <ul className={style.menu}>
        {auth ? (
          <>
          <li className={style.menuItem}>
            <NavLink style={navLinkStyle} to='/myfiles'>Files</NavLink>
        </li>
        <li className={style.menuItem}>
        <NavLink style={navLinkStyle} to='/profile'>Profile</NavLink>
        </li>
        <li className={style.menuItem}>
        <NavLink style={navLinkStyle}  to='/myfriends'>Friends</NavLink>
        </li>
        <li className={style.menuItem}>
        <NavLink style={navLinkStyle}  to='/' onClick={logout} >Logout</NavLink>
        </li>
          </>
        ) : (
          <>
          <li className={style.menuItem}>
          <NavLink style={navLinkStyle}  to='/' >Home</NavLink>
        </li>
        <li className={style.menuItem}>
        <NavLink style={navLinkStyle}  to='/pricing'>Pricing</NavLink>
        </li>
        <li className={style.menuItem}>
        <NavLink style={navLinkStyle}  to='/register'>Register</NavLink>
        </li>
          <li className={style.menuItem}>
          <NavLink style={navLinkStyle}  to='/login'>Login</NavLink>
          </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
