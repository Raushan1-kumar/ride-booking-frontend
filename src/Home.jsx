import { useContext, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanel from "./Component/LocationSearchPanel";
import { Link, useNavigate, useRevalidator } from "react-router-dom";
import axios from "axios";
import VehicleShow from "./Component/VehicleShow";
import {SocketContext} from "./context/socketContext"
import { UserDataContext } from "./context/UserContext";


function Home() {
    const [pickup, setPickup] = useState('');
    const navigate = useNavigate();
    const [destination, setDestination] = useState('');
    const [panelOpen, setPanelOpen] = useState(false);
    const [arrow, setArrow] = useState(false);
    const panelRef = useRef(null);
    const buttonRef = useRef(null);
    const [buttonOpen, setButtonOpen] = useState(false);
    const [suggestion, setSuggestion] = useState([]);
    const vehicleRef = useRef(null);
    const [vehicleOpen, setVehicleOpen] = useState(false);
    const [activeInput, setActiveInput] = useState(null);
    const [loading, setLoading]= useState(false);
    const [distance, setDistance] = useState(0);
    const [vehicle,setVehicle]=useState(true);
    const [duration , setDuration] = useState(0);
    const [bikeFare, setBikeFare]= useState(0);
    const [autoFare, setAutoFare] = useState(0);
    const [carFare, setCarFare] = useState(0);
    const {socket}= useContext(SocketContext)

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        socket.emit('join', {
            userId: userId,
            userType: 'user'
        })
    }, []);

   
    const submitHandler = async (e) => {
        setLoading(true);
        e.preventDefault();
    
        try {
            // Fetch the distance and duration from the API
            const response = await axios.get(
                `http://localhost:3002/maps/get-distance?pickupAddress=${pickup}&destinationAddress=${destination}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
    
            const result = response.data; // Extract the API response
    
            // Log the entire response for debugging
            console.log("API Response:", result);
    
            // Update state variables
            setDistance(result.distance);
            setDuration(result.duration);
    
            // Store updated values in localStorage
            localStorage.setItem('distance', result.distance);
            localStorage.setItem('duration', result.duration);
    
            // Log the values directly from the API response
            console.log("Distance from API:", result.distance);
            console.log("Duration from API:", result.duration);
    
            console.log("State update queued for distance and duration...");
            getFare();
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    
        // Update UI elements
        setLoading(false);
        setPanelOpen(false);
        setButtonOpen(false);
        setVehicleOpen(true);
        
    };
    
    const getFare = async () => {
        try {
            const distance = localStorage.getItem('distance');
            const token = localStorage.getItem("token");
    
            if (!distance) {
                console.error("Distance is missing from localStorage.");
                return;
            }
    
            if (!token) {
                console.error("Authorization token is missing from localStorage.");
                return;
            }
    
            // API call
            const response = await axios.get(`http://localhost:3002/maps/get-fare`, {
                params: { distance },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            const result = response.data;
    
            // Validate the response structure
            if (!result.fares || !Array.isArray(result.fares)) {
                console.error("Invalid API response: fares not found or not an array.", result);
                return;
            }
    
            console.log("Fares received from API:", result.fares);
    
            // Store fares in localStorage (serialized as JSON)
            try {
                setBikeFare(result.fares[0].fare);
                setAutoFare(result.fares[1].fare);
                setCarFare (result.fares[2].fare);
    
                // Log to confirm storage
                console.log("Bike fare saved:", JSON.parse(localStorage.getItem('bike')));
                console.log("Auto fare saved:", JSON.parse(localStorage.getItem('auto')));
                console.log("Car fare saved:", JSON.parse(localStorage.getItem('car')));
            } catch (storageError) {
                console.error("Error saving to localStorage:", storageError);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    
    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                paddingTop: '40px'
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
        if (vehicleOpen) {
            gsap.to(vehicleRef.current, {
                height: '65%',

            })
        }
        else {
            gsap.to(vehicleRef.current, {
                height: '0%'
            }
            )
        }
    }, [vehicleOpen])

    useGSAP(function () {
        if (buttonOpen) {
            gsap.to(buttonRef.current, {
                display: 'block'

            })
        }
        else {
            gsap.to(buttonRef.current, {
                display: 'hidden'
            }
            )
        }
    }, [buttonOpen])

    const closeOpenPanel = () => {
        setPanelOpen(false);
        setArrow(false);
    }
    const handlePanelOpen = (e) => {

        setPanelOpen(true);
        setButtonOpen(true);
        setActiveInput(e);
        setArrow(true);
    };


    const fetchSuggestions = async (query) => {
        if (!query || query.length < 4) {
            return;
        }
        try {
            const response = await axios.get(`http://localhost:3002/maps/get-suggestion?query=${query}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            });
            setSuggestion(response.data.suggestions);
            console.log(response.data.suggestions); // Log the fetched suggestions
        } catch (error) {
            console.error(error);
        }
       
    };

    const handleSuggestionClick = (suggestion) => {
        if (activeInput === 'pickup') {
            setPickup(suggestion.display_name);
        } else if (activeInput === 'destination') {
            setDestination(suggestion.display_name);
        }
    };
 

    const checknav=()=>{
        console.log('click')
    }


    return (
        <>
        <div className="absolute w-10 h-10 flex justify-center items-center text-xl bg-white rounded-full top-4 right-4" onClick={() => { checknav(); navigate('/captain-login') }}>
            <i class="fa fa-sign-out" aria-hidden="true"></i>
                   
                </div>
            <div>
            
                <img className="w-12 absolute top-5 left-5"
                    src="https://pluspng.com/img-png/uber-logo-vector-png-uber-icon-png-50-px-1600.png" alt="home" />
                <div className="w-screen h-screen">
                    <img className="h-full w-full object-cover" src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="home" />
                </div>
                <div className="h-screen static flex flex-col justify-end absolute scroll-smooth bottom-0 w-full">
                    <div className="h-[30%] p-5 bg-white relative">
                        <>
                            {
                                arrow && (
                                    <i className="fa fa-angle-down" aria-hidden="true" onClick={closeOpenPanel}></i>
                                )
                            }
                        </>
                        <h1 className="text-2xl font-bold">Find a trip</h1>
                        <form onSubmit={submitHandler}>
                            <div className="line h-12 w-1 ml-6 mt-6 bg-gray-700 rounded-full absolute"></div>
                            <input required value={pickup} type="text" className="bg-[#eee] px-12 py-2 rounded-lg mb-3 mt-2 w-full text-lg" placeholder="Add a pickup location" onChange={(e) => { fetchSuggestions(e.target.value); setPickup(e.target.value) }} onClick={() => { handlePanelOpen('pickup') }} />
                            <input required value={destination} type="text" className="bg-[#eee] px-12 py-2 rounded-lg mb-4 w-full text-lg" placeholder="Enter a destination location" onChange={(e) => { setDestination(e.target.value); fetchSuggestions(e.target.value) }} onClick={() => { handlePanelOpen('destination') }} />
                            <div ref={buttonRef} type="submit" className="hidden static"><button className='w-full font-bold rounded-xl bg-yellow-600 text-white p-2 mb-2'>Find Rider {loading && <i className="fas fa-spinner fa-spin"></i>}</button></div>
                        </form>

                    </div>
                    <>
                        <div ref={panelRef} className="bg-white w-full h-full" >

                            <div className="overflow-y-scroll h-full">
                                {suggestion ? suggestion.map((suggestion, index) => (
                                    <div key={index} className="bg-white w-full mb-4 active:border-black flex items-center pb-2 rounded-lg justify-center active:bg-gray-200 cursor-pointer" onClick={() => handleSuggestionClick(suggestion)}>
                                        <h2 className="flex w-[12%] items-center mx-3 justify-center "> <i className="fa fa-map-marker text-xl" aria-hidden="true"></i></h2>
                                        <h1 className="font-medium mx-2 flex flex-start w-[80%] pt-2 pb-1"> {suggestion.display_name} </h1>
                                    </div>
                                )) : null}
                            </div>
                        </div>
                    </>
                    <>
                        <div ref={vehicleRef} className="fixed z-20 bottom-0 bg-white my-1 w-full">
                            <button className='bg-black ml-1 text-center mt-2 text-white rounded-full w-1/3 py-1 font-bold' onClick={()=>{setVehicleOpen(false); setPickup(false); setDestination(false); setButtonOpen(false); setArrow(false)}}>leave..</button>
                            <div>
                                <VehicleShow setVehicleOpen={setVehicleOpen}  pickup={pickup} destination={destination} bikeFare={bikeFare} autoFare={autoFare} carFare={carFare}/>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </>
    );
}

export default Home;









