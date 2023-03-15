import style from '../About/About.module.css'
import question from '../../assets/help_question_mark-0.png'
import safedata from '../../assets/users_key-4.png'
import Profile from '../Profile/Profile'
import useAuth from '../../hooks/useAuth'




const About = () =>{

    const [auth] = useAuth()
    return(
        <div className={`${style.aboutContainer} container mt-5`}>
            {auth ? 

            <Profile/>
 
            : (
                <>
                <h3>Best place to store/share files and chat with friends</h3>
                <h3>How it works <img src={question} alt='?'/></h3>
                <div className={`${style.instruction} container mt-5`}>
                <div className={`${style.bluescreen} container mt-5`}>
                <h3>Register and...</h3>
                </div>
                <h4>Store your files</h4>
                <h4>Add friends and let them download</h4>
                <h4>Chat with your friends</h4>
                <a href='/register'><button className={`${style.registerBtn}`}>register!</button></a>
                </div>
                <div className='container mt-5'>
                <img src={safedata} alt='data'/>
                <h4 className={`${style.privacy}`}>Privacy first. Your messages are deleted every 30 minutes</h4>
                </div>
                </>
            )
        }
        

        </div>

      
    )
}

export default About