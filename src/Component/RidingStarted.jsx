import { useNavigate } from "react-router-dom";
import { useRef, useState, useTransition } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ShowDistance from "./ShowDistance";
import FinishRide from "./FinishRide";
import Rating from "./Rating";
import axios from "axios";


function RidingStarted() {
    const panelRef = useRef(null);
    const rideRef = useRef(null);
    const ratingRef = useRef(null);
    const [rating, setRating] =useState(false);
    const [panelOpen, setPanelOpen] = useState(true);
    const [finishRide, setFinishRide]= useState(false);
    const [notify, setNotify] = useState(false);
    const pickup = localStorage.getItem('pickup');
    const destination = localStorage.getItem('destination');
    const fare = localStorage.getItem('fare');
    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '18%'
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
        if (finishRide) {
            gsap.to(rideRef.current, {
                height: '78%'
            })
        }
        else {
            gsap.to(rideRef.current, {
                height: '0%'
            }
            )
        }
    }, [finishRide])

    useGSAP(function () {
        if (rating) {
            gsap.to(ratingRef.current, {
                height: '18%'
            })
        }
        else {
            gsap.to(ratingRef.current, {
                height: '0%'
            }
            )
        }
    }, [rating])

    async function rideEnd() {
        const rideId = localStorage.getItem('rideId');
        const response = await axios.post('http://localhost:3002/rides/end-ride', {
            rideId:rideId,
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setFinishRide(false)
        setRating(true); 
       
    }


    const navigate = useNavigate();
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
                    <ShowDistance setPanelOpen={setPanelOpen} setFinishRide={setFinishRide} />
                </div>
            </>
            <>
                <div ref={rideRef} className="fixed  z-16 bottom-0  bg-white  w-full" >
                    <FinishRide setPanelOpen={setPanelOpen} pickup={pickup} destination={destination} fare={fare} />
                    <button className='w-[90%] ml-5 mt-2 font-bold rounded-xl bg-green-600 text-white p-2 ' onClick={()=>{rideEnd();}} >Complete Ride</button>
                </div>
            </>
            <>
            <div ref={ratingRef} className="fixed  z-16 bottom-0  bg-white  w-full" >
                    <Rating  />
                    <button className='w-[90%] ml-5 mt-2 font-bold rounded-xl bg-yellow-600 text-white p-2 ' onClick={()=>{setNotify(true); }}>Rate customer</button>
                {notify && (
                    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                        <div className="bg-white p-5 rounded-lg shadow-lg text-center">
                            <h2 className="text-2xl font-bold mb-4">Great job!</h2>
                            <p className="mb-4">You have done well.</p>
                            <button className="bg-pink-500 text-white px-4 py-2 rounded" onClick={() =>navigate('/captain/home')}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
                </div>
             
            
            </>
        </>


      );
}

export default RidingStarted;