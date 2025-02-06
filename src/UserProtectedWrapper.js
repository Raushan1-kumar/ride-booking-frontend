import React, { useEffect } from "react";
import {  useNavigate } from "react-router-dom";



const UserProctedWrapper = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
   
    useEffect(()=>{
        if (!token) {
            return navigate('/user-login');
        }
    })

    return (
        <div>
            {children}
        </div>
    );
    }
export default UserProctedWrapper;