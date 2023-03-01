const ProfileDetails = () =>{
    return(
        <form className="text-center">
            
            <div className="form-group mt-2 d-flex justify-content-center">
                <label>Email</label>
                <input type={"email"} className="mx-2"></input>
            </div>
            
            <div className="form-group mt-2 d-flex justify-content-center">
                <label>Password</label>
                <input type={"password"} className="mx-2"></input>
            </div>
        
        </form>
    )
}

export default ProfileDetails
