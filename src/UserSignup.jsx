import axios from "axios";
import React from "react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "./context/UserContext";

function Usersignup() {
     const { user, setUser } = React.useContext(UserDataContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = (e) => {
    setLoading(true);
     e.preventDefault();
     axios.post('http://localhost:3002/users/register',{
        fullName:{
            firstName:firstName,
            lastName:lastName,
        },
        email:email,
        password:password,
     })
     .then(result=>{
        setLoading(false);
        setUser(result.data.user);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        navigate('/user-login');

     })
     .catch(error=>{
        console.log(error);
        setLoading(false);
     })
    }
    return ( 
     <>
     <div className="p-7 flex flex-col justify-between h-screen">
          <div>
          <img className="w-20 " src="https://pluspng.com/img-png/uber-logo-vector-png-uber-icon-png-50-px-1600.png"></img>
            <form onSubmit={submitHandler}>
            <div className="flex space-x-4">
                            <div className="w-1/2">
                                <h3 className="text-base font-bold mb-2">First Name</h3>
                                <input
                                    className="bg-[#eeeeee] mb-3 rounded px-4 py-1 border w-full text-lg placeholder:text-base"
                                    required
                                    type="text"
                                    placeholder="First Name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="w-1/2">
                                <h3 className="text-base font-bold mb-2">Last Name</h3>
                                <input
                                    className="bg-[#eeeeee] mb-3 rounded px-4 py-1 border w-full text-lg placeholder:text-base"
                                    required
                                    type="text"
                                    placeholder="Last Name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                <h3 className="text-base font-bold mb-2">What's your email</h3>
                <input
                    className="bg-[#eeeeee] mb-4 rounded px-4 py-1 border w-full text-lg placeholder:text-base"
                    required
                    type="email"
                    placeholder="email@example.com" 
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <h3 className="text-base font-bold mb-2">Enter your password</h3>
                <input
                    className="bg-[#eeeeee] mb-4 rounded px-4 py-1 border w-full text-lg placeholder:text-base"
                    required
                    type="password"
                    placeholder="password" 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <button className="bg-[#111] text-white font-semibold  mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
                    type="submit">
                      {loading && <i className="fas fa-spinner fa-spin"></i>|| !loading && 'Register (user)'}
                </button>
            </form>
            <p className="text-center">Already have an <Link className="text-blue-500" to='/user-login'>Account</Link></p>
          </div>
          <div>
            <Link to='/captain-signup'  className=" block text-center bg-[#10b461] text-white font-semibold  mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base">
                Register as Captain
            </Link>
          </div>
        </div>
     </>
     );
}

export default Usersignup;