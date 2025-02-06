import { useState, useContext } from "react";
import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { CaptainDataContext } from './context/CaptainContext';

function CaptainSignup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [colors, setcolors] = useState('');
    const [noPlate, setnoPlate] = useState('');
    const [capacity, setCapacity] = useState('');
    const [vehicleType, setvehicleType] = useState('');
    const [loading, setLoading] = useState(false);
    
    const {captain,setCaptain} =  React.useContext(CaptainDataContext);
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await axios.post('http://localhost:3002/captains/register', {
                fullName: { firstName, lastName },
                email,
                password,
                vehicle: { colors, noPlate, capacity, vehicleType }
            });
            const data = result.data;
            setCaptain(data.captain);

            setFirstName('');
            setLastName('');
            setEmail('');
            setPassword('');
            setcolors('');
            setnoPlate('');
            setCapacity('');
            setvehicleType('');
            navigate('/captain-login');

        } catch (error) {
            if (error.response) {
                // Server responded with a status other than 2xx
                console.error('Response Error:', error.response.data);
            } else if (error.request) {
                // No response received
                console.error('Request Error:', error.request);
            } else {
                // Error setting up the request
                console.error('Setup Error:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="p-7 flex flex-col justify-between h-screen">
                <div>
                    <form onSubmit={submitHandler}>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <h3 className="text-base font-bold mb-2">First Name</h3>
                                <input
                                    className="bg-[#eeeeee] mb-3 rounded px-4 py-1 border w-full text-base placeholder:text-base"
                                    required
                                    type="text"
                                    placeholder="First Name"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div className="w-1/2">
                                <h3 className="text-base font-bold mb-2">Last Name</h3>
                                <input
                                    className="bg-[#eeeeee] mb-3 rounded px-4 py-1 border w-full text-base placeholder:text-base"
                                    required
                                    type="text"
                                    placeholder="Last Name"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                        </div>
                        <h3 className="text-base font-bold mb-2 ">What's your email</h3>
                        <input
                            className="bg-[#eeeeee] mb-3 rounded px-4 py-1 border w-full text-base placeholder:text-base"
                            required
                            type="email"
                            placeholder="email@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <h3 className="text-base font-bold mb-2">Enter your password</h3>
                        <input
                            className="bg-[#eeeeee] mb-3 rounded px-4 py-1 border w-full text-base placeholder:text-base"
                            required
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <h3 className=" text-xl font-bold text-center mb-2">Vehicles Detail</h3>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <h3 className="text-base font-bold mb-2">colors</h3>
                                <input
                                    className="bg-[#eeeeee] mb-3 rounded px-4 py-1 border w-full text-base placeholder:text-base"
                                    required
                                    type="text"
                                    placeholder="Black"
                                    onChange={(e) => setcolors(e.target.value)}
                                />
                            </div>
                            <div className="w-1/2">
                                <h3 className="text-base font-bold mb-2">Number</h3>
                                <input
                                    className="bg-[#eeeeee] mb-3 rounded px-4 py-1 border w-full text-base placeholder:text-base"
                                    required
                                    type="text"
                                    placeholder="ABC-123"
                                    onChange={(e) => setnoPlate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <h3 className="text-base font-bold mb-2">Capacity</h3>
                                <input
                                    className="bg-[#eeeeee] mb-7 rounded px-4 py-1 border w-full text-base placeholder:text-base"
                                    required
                                    type="number"
                                    placeholder="4"
                                    onChange={(e) => setCapacity(e.target.value)}
                                />
                            </div>
                            <div className="w-1/2">
                                <h3 className="text-base font-bold mb-2">Type</h3>
                                <select
                                    className="bg-[#eeeeee] mb-7 rounded px-4 py-1 border w-full text-base placeholder:text-base"
                                    required
                                    onChange={(e) => setvehicleType(e.target.value)}
                                    defaultValue={'Select Vehicle'}
                                >
                                    <option value="bike" className=" text-base ">Bike</option>
                                    <option value="car" className=" text-base ">Car</option>
                                    <option value="auto" className=" text-base ">Auto</option>
                                </select>
                            </div>
                        </div>
                        <button
                            className="bg-[#111] text-white font-semibold  mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-base"
                            type="submit"
                            disabled={loading}
                        >
                           {loading && <i className="fas fa-spinner fa-spin"></i>|| !loading && 'Register (Captain)'}
                        </button>
                    </form>
                    <p className="text-center">Already have an <Link className="text-blue-500" to='/captain-login'>Account</Link></p>
                </div>
                <div>
                    <Link to='/user-signup' className="block text-center bg-[#d5622d] text-white font-semibold  mb-5 rounded px-2 py-2 border w-full text-lg placeholder:text-bas">
                        Register as User
                    </Link >
                </div>
            </div>
            
        </>

    );
}

export default CaptainSignup;



