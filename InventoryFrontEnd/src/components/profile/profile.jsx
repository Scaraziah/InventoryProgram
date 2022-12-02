import React, {useState} from "react";

const Profile = (props) => {

    return (
        
        <div>  
            {props.user && <div>Welcome to profile {props.user.name}</div>}   
        </div>
    );
}

export default Profile;