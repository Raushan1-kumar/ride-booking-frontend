import { useContext, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { CaptainDataContext } from './context/CaptainContext';

function CaptainLogin() {
    const {captain,setCaptain} =  React.useContext(CaptainDataContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post('https://ride-booking-backend.onrender.com/captains/login', {
                email: email,
                password: password
            });
           if(result){
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('captainId',result.data.captain._id);
            
           }
           setCaptain(result.data);
           console.log(result.data);
           setEmail('');
           setPassword('');
           
           navigate('/captain/home');

        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };
    return (  
        <div className="p-7 flex flex-col justify-between h-screen">
        <div>
        <img className="w-20 " src="https://pluspng.com/img-png/uber-logo-vector-png-uber-icon-png-50-px-1600.png"></img>
          <form onSubmit={submitHandler}>
              <h3 className="text-xl font-medium mb-2">What's your email</h3>
              <input
                  className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  required
                  type="email"
                  placeholder="email@example.com" 
                  onChange={(e) => setEmail(e.target.value)}
                  />
              <h3 className="text-xl font-medium mb-2">Enter your password</h3>
              <input
                  className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                  required
                  type="password"
                  placeholder="password" 
                  onChange={(e) => setPassword(e.target.value)}
                  />
              <button className="bg-[#111] text-white font-semibold  mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
                  type="submit">
                  Login (Captain)  {loading && <i className="fas fa-spinner fa-spin"></i>}
              </button>
          </form>
          <p className="text-center">Join us? <Link className="text-blue-500" to='/captain-signup'>Register as a captain</Link></p>
        </div>
        <div>
          <Link to='/user-login' className="block text-center bg-[#d5622d] text-white font-semibold  mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base">
              Sign in as User
          </Link >
        </div>
      </div>
    );
}

export default CaptainLogin;
