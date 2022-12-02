import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"


function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState ('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
      
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async(event)=>{
        event.preventDefault();
        const user={
            email: email,
            password: password
           }
           await axios.post(`http://localhost:5000/api/auth/`, user)
           .then(response => {
               localStorage.setItem('token', response.data);
               navigate('../test', {replace: true});
           })
        };  

      

    return (
        <div>
          <form onSubmit ={handleSubmit}>
              <div className= " row form-group">
                  <div className = "col">
                    <input type="email" placeholder="Enter email" onChange={handleEmailChange} />
                    <br></br>
                    <input type="password" placeholder="Password" onChange={handlePasswordChange}/>
                    <br></br>
                    <button variant="primary" type="submit">LogIn</button>
                    <br></br>  
                  </div>
                </div>
            </form>
        </div>
    );
}

export default LogIn;