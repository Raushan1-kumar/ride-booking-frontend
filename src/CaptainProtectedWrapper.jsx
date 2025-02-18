import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";



const CaptainProctedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(true);
    const token = localStorage.getItem("token");
    useEffect(()=>{
        if (!token) {
            return navigate('/captain-login');
        }
    },[token])


    axios.get('https://ride-booking-backend.onrender.com/captains/profile',{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }).then((result)=>{ 
        if(result){
            setIsLoaded(false);
        }
    })
    .catch((error)=>{
        navigate('/captain-login');
        localStorage.removeItem('token');
        console.log(error);
    })


    if(isLoaded){
        return <div>Loading...</div>
    }
    
    return (
        <div>
            {children}
        </div>
    );
    }
export default CaptainProctedWrapper;
