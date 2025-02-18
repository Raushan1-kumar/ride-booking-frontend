import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";
import DriverProfile from "./DriverProfile";
import SearchDriver from "./SearchDriver";
import axios from "axios";
import RideStarted from "./RideStarted";
import ChoosePaymentMethod from "./ChoosePaymentMethod";

function VehicleDetail(props) {
    const searchDriverRef = useRef(null);
    const driverProfileRef = useRef(null);
    const rideStartedRef = useRef(null);
    const confirmPaymentRef = useRef(null);
    const [loading, setLoading]= useState(false);
    const [searchDriver, setSearchDriver] = useState(false);
    const [driverProfile, setDriverProfile] = useState(false);
    const [rideStarted, setRideStarted] = useState(false);
    const [confirmPayment, setConfirmPayment] = useState(false);
    const [otp, setOtp] = useState('');
    const [ride, setRide] = useState(null);
    

    useGSAP(function () {
        if (searchDriver) {
            gsap.to(searchDriverRef.current, {
                height: '75%'
            })
        }
        else {
            gsap.to(searchDriverRef.current, {
                height: '0%'
            }
            )
        }
    }, [searchDriver])

    useGSAP(function () {
        if (driverProfile) {
            gsap.to(driverProfileRef.current, {
                height: '60%'
            })
        }
        else {
            gsap.to(driverProfileRef.current, {
                height: '0%'
            }
            )
        }
    }, [driverProfile])

    
    useGSAP(function () {
        if (rideStarted) {
            gsap.to(rideStartedRef.current, {
                height: '70%'
            })
        }
        else {
            gsap.to(rideStartedRef.current, {
                height: '0%'
            }
            )
        }
    }, [rideStarted])

    useGSAP(function () {
        if (confirmPayment) {
            gsap.to(confirmPaymentRef.current, {
                height: '100%'
            })
        }
        else {
            gsap.to(confirmPaymentRef.current, {
                height: '0%'
            }
            )
        }
    }, [confirmPayment])



    const handleSearchDriver = async() => {
        setLoading(true);
        const user=  localStorage.getItem('userId');
        const distance = localStorage.getItem('distance');
        console.log(distance);
        console.log(props.pickup);
        console.log(props.destination);
      try {
           await  axios.post('https://ride-booking-backend.onrender.com/rides/create',{
               user:user,
               pickup:props.pickup,
               distance:distance,
               destination:props.destination,
               fare:props.fare,
               vehicleType:props.vehicleType,
             }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
             .then(result=>{
                if(result.data.ride.otp){
                    setOtp(result.data.ride.otp);
                }
                setSearchDriver(true);
                setLoading(false);
                props.setPanelOpen(false)
             })
             .catch(error=>{
                console.log(error);
             })
            }
            catch(err){
                console.log('error')
            }
       
    }
    return (
        <>
           
                <div className="flex flex-col justify-between items-center mb-2 bg-white p-2">

                    <h2 className='text-xl font-bold mb-2 mt-2'>Confirm your rides</h2>
                    <hr className='w-full h-1 bg-gray-200 px-0' />
                    <div className='h-[100%] w-[40%] flex items-center mb-2 rounded-full mt-2 bg-gray-200 justify-center'>
                        <img src={require('./autopng.png')} alt="uber" className='h-20' />
                    </div>

                    <div className='flex flex-row w-full  py-2 my-2 items-center'>
                        <h2 className="flex w-10 items-center justify-center mx-3 flex-start"> <i className="fa fa-map-marker text-xl" aria-hidden="true"></i></h2>
                        <div>
                            <h1 className="font-bold text-xl mx-2 pt-1 pb-1">562/11-A </h1>
                            <p className="mx-2 pt-1 font-medium text-base text-gray-500">{props.pickup}</p>
                        </div>
                    </div>
                    <hr className='w-full h-1 bg-gray-200 px-0' />
                    <div className='flex flex-row w-full py-2 h-17 items-center'>
                        <h2 className="flex w-10 items-center justify-center mx-3"> <i className="fa fa-map-marker text-xl" aria-hidden="true"></i></h2>
                        <div className="flex flex-col">
                            <h1 className="font-bold text-xl mx-2 pt-1 pb-1">663/23-R </h1>
                            <p className="mx-2 pt-1 font-medium text-base text-gray-500">{props.destination}</p>
                        </div>
                    </div>
                    <hr className='w-full h-1 bg-gray-200 px-0' />

                    <div className='flex flex-row w-full py-2 h-17 items-center'>
                        <h2 className="flex w-10 items-center justify-center mx-3">  <i class="fa fa-credit-card-alt" aria-hidden="true"></i></h2>
                        <div>
                            <h1 className="font-bold text-xl mx-2 pt-1 pb-1">{props.fare}</h1>
                            <p className="mx-2 pt-1 font-medium text-base text-gray-500">Cash Cash</p>
                        </div>
                    </div>
                    <div className="w-full flex flex-row justify-evenly">
                    <button className='w-[45%] mt-2 text-bold rounded-xl bg-green-600 text-white p-2' onClick={()=>{handleSearchDriver();}}>Confirm  {loading && <i className="fas fa-spinner fa-spin"></i>}</button>
                    <button className='w-[45%] mt-2 text-bold rounded-xl bg-red-600 text-white p-2' onClick={()=>{props.setPanelOpen(false)}}>Cancel </button>
                    </div>
                   
                </div>

            <>
                <div ref={searchDriverRef} className="fixed   z-20 bottom-0  bg-white   w-full">
                    <hr className='w-10 h-1 bg-gray-400 rounded-xl flex items-center justify-center mx-40 mt-2' />
                    <SearchDriver setSearchDriver={setSearchDriver} setDriverProfile={setDriverProfile} pickup={props.pickup} fare={props.fare} destination={props.destination} setRide={setRide}/>
                </div>
            </>
            <>
                <div ref={driverProfileRef} className="fixed   z-20 bottom-0  bg-white  w-full">
                    <hr className='w-10 h-1 bg-gray-400 rounded-xl flex items-center justify-center mx-40 mt-2' onClick={() => { setDriverProfile(false) }} />
                    <DriverProfile setDriverProfile={setDriverProfile} setRideStarted={setRideStarted} destination={props.destination} fare={props.fare} otp={otp} ride={ride} />
                </div>
            </>
            <>
                <div ref={rideStartedRef} className="fixed   z-20 bottom-0  bg-white  w-full">
                    <hr className='w-10 h-1 bg-gray-400 rounded-xl flex items-center justify-center mx-40 mt-2' onClick={() => { setDriverProfile(false) }} />
                    <RideStarted setRideStarted={setRideStarted} setDriverProfile={setDriverProfile} setConfirmPayment={setConfirmPayment} destination={props.destination} fare={props.fare} otp={otp} ride={ride} />
                </div>
            </>
            <>
                <div ref={confirmPaymentRef} className="fixed   z-20 bottom-0  bg-white  w-full">
                    <hr className='w-10 h-1 bg-gray-400 rounded-xl flex items-center justify-center mx-40 mt-2' onClick={() => { setDriverProfile(false) }} />
                    <ChoosePaymentMethod setConfirmPayment={setConfirmPayment}/>
                </div>
            </>


        </>
    );
}

export default VehicleDetail;
