import logo from '../../assets/world-2.png'
import style from '../Header/Logo.module.css'

const Logo = () =>{
    return(
        <div className={`${style.logo} container`}>
            <span className={style.span}>Store</span>
            <img src={logo}/>
            <span className={style.span}>Chating</span>
        </div>

    )
}

export default Logo