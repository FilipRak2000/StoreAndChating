import style from '../Profile/Profile.module.css'
import ProfileDetails from './ProfileDetails/ProfileDetails'
import { Navigate } from 'react-router-dom'

const Profile = () =>{

   

    return(
        <div className={`${style.profilecontainer} container`}>
            Change Password
            <ProfileDetails/>
        </div>
    )
}

export default Profile