import style from "../Menu/Menu.module.css";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Menu = () => {

  const [auth, setAuth] = useAuth() 


  const logout = (e) =>{
    e.preventDefault();
    setAuth(false)
  }

  return (
    <div className={`${style.menuContainer} container mt-3`}>
      <ul className={style.menu}>
        {auth ? (
          <>
          <li className={style.menuItem}>
            <Link to='/myfiles' className={style.element}>Files</Link>
        </li>
        <li className={style.menuItem}>
        <Link to='/profile' className={style.element}>Profile</Link>
        </li>
        <li className={style.menuItem}>
        <Link to='/myfriends' className={style.element}>Friends</Link>
        </li>
        <li className={style.menuItem}>
        <Link to='/login' onClick={logout} className={style.element}>Logout</Link>
        </li>
          </>
        ) : (
          <>
          <li className={style.menuItem}>
          <Link to='/' className={style.element}>Home</Link>
        </li>
        <li className={style.menuItem}>
        <Link to='/pricing' className={style.element}>Pricing</Link>
        </li>
        <li className={style.menuItem}>
        <Link to='/register' className={style.element}>Register</Link>
        </li>
          <li className={style.menuItem}>
          <Link to='/login' className={style.element}>Login</Link>
          </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Menu;
