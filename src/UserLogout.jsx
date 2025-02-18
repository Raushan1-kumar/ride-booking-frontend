import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function UserLogout() {
    const navigate= useNavigate();
    const token = localStorage.getItem('token');

    if (!token) {
        navigate('/user-login');
    }
   
    
    axios.get('https://ride-booking-backend.onrender.com/users/logout',{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((result)=>{
        if(result){
            localStorage.removeItem('token');
            navigate('/user-login');
        }
    })
    .catch((error)=>{
        console.log(error);
    })

    return ( 
        <div>
            <h1>Logout</h1>
        </div>
     );
}

export default UserLogout;
