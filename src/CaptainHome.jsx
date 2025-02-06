import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { data, useNavigate } from "react-router-dom";
import DriverDetail from "./Component/DriverDetail";
import RidePopUp from "./Component/RidePopUp";
import ConfirmRide from "./Component/ConfirmRide";
import {SocketContext} from "./context/socketContext"
import { CaptainDataContext } from './context/CaptainContext';
import axios from "axios";
import { io } from 'socket.io-client';


function CaptainHome() {
    const {socket}= useContext(SocketContext)
    const navigate = useNavigate();
    const panelRef = useRef(null);
    const rideRef = useRef(null);
    const confirmRideRef = useRef(null);
    const [panelOpen, setPanelOpen] = useState(true);
    const [rideOpen, setRideOpen] = useState(false);
    const [confirmRide, setConfirmRide] = useState(false);
    const {captain}= useContext(CaptainDataContext);
     const {sendMessage}=useContext(SocketContext);
    const {receiveMessage}=useContext(SocketContext);
    const [otp, setOtp]= useState('');
    const [ride, setRide] = useState(null);
    
    
    useEffect(() => {
        const captainId = localStorage.getItem('captainId');
        socket.emit('join', {
            userId: captainId,
            userType: 'captain'
        })
        const updateLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    socket.emit('update-location-captain', {
                        userId: captainId,
                        location: {
                            ltd: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                    })
                })
            }
        }

        const locationInterval = setInterval(updateLocation, 10000)
        updateLocation()

        // return () => clearInterval(locationInterval)
    }, [])


  useEffect(() => {
    // Log whenever `ride` changes
    console.log('Updated ride:', ride);
    localStorage.setItem('rideId',ride?._id);
    localStorage.setItem('distance', ride?.distance);
    localStorage.setItem('pickup', ride?.pickup);
    localStorage.setItem('destination', ride?.destination);
    localStorage.setItem('fare', ride?.fare);
  }, [ride]);


  socket.on('new-ride', (data) => {
    console.log('New ride data:', data);
    if (data) {
      setRide(data); // Update state
      setRideOpen(true); // Open ride
    }
  });

    
    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '38%'
            })
        }
        else {
            gsap.to(panelRef.current, {
                height: '0%'
            }
            )
        }
    }, [panelOpen])

    useGSAP(function () {
        if (rideOpen) {
            gsap.to(rideRef.current, {
                height: '88%'
            })
        }
        else {
            gsap.to(rideRef.current, {
                height: '0%'
            }
            )
        }
    }, [rideOpen])

    useGSAP(function () {
        if (confirmRide) {
            gsap.to(confirmRideRef.current, {
                height: '100%'
            })
        }
        else {
            gsap.to(confirmRideRef.current, {
                height: '0%'
            }
            )
        }
    }, [confirmRide])
    
    async function confirmride() {
        const captainId = localStorage.getItem('captainId');
        const response = await axios.post('http://localhost:3002/rides/confirm', {
            rideId: ride._id,
            captainId:captainId,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setRideOpen(false)
        setConfirmRide(true);
    }


    const checkOtp = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3002/rides/checkOtp', {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    otp: otp
                }
            });
           if(response.data.isValid){
            console.log(response.data)
            navigate('/captain/riding');
           }
        } catch (error) {
            console.error('Error checking OTP:', error);
        }
      
    };

    return (
        <>

            <div className="absolute w-10 h-10 flex justify-center items-center text-xl bg-white rounded-full top-4 right-4" onClick={() => { navigate('/captain-login') }}>
                <i class="fa fa-sign-out" aria-hidden="true"></i>
            </div>
            <img className="w-12 absolute top-5 left-5"
                src="https://pluspng.com/img-png/uber-logo-vector-png-uber-icon-png-50-px-1600.png" alt="home" />
            <div className="w-screen h-screen">
                <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="home" />
            </div>
            <>
                <div ref={panelRef} className="fixed   z-20 bottom-0  bg-white  w-full" >
                    <DriverDetail setPanelOpen={setPanelOpen} ride={ride} />
                </div>
            </>
            <>
                <div ref={rideRef} className="fixed  flex flex-col items-center z-20 bottom-0  bg-white  w-full">
                    <RidePopUp setRideOpen={setRideOpen} ride={ride}/>
                    <button className='w-[95%] mt-2 font-bold rounded-xl bg-green-600 text-white p-2' onClick={() => {  confirmride();}}>Accept </button>
                    <button className='w-[95%] mt-2 font-bold rounded-xl bg-gray-600 text-white p-2' onClick={() => { setRideOpen(false) }}>Ignore </button>
                </div>
            </>
            <>
                <div ref={confirmRideRef} className="fixed flex flex-col items-center z-20 bottom-0 bg-white w-full">
                    <ConfirmRide  ride={ride}/>
                     <hr className='w-full h-1 bg-gray-200 ' />
                        <div className="mt-3">
                        <input
                            className="bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base"
                            required
                            type="string"
                            placeholder="Enter the OTP"
                            onChange={(e)=>{setOtp(e.target.value)}}
                        />
                        </div>
                    <button className='w-[95%] mt-1 font-bold rounded-xl bg-green-600 text-white p-2 ' onClick={()=>{checkOtp();}}>Confirm </button>
                    <button className='w-[95%] mt-1 font-bold rounded-xl bg-red-600 text-white p-2' onClick={()=>{setConfirmRide(false)}}>Cancel </button>
                </div>
            </>

        </>
    );
}

export default CaptainHome;

{/* <i class="fa fa-clock-o" aria-hidden="true"></i>
            <i class="fa fa-address-book" aria-hidden="true"></i> */}