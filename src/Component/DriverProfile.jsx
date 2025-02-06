
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from "../context/socketContext";


function DriverProfile(props) {
        const [ride, setRide] = useState(null);
        const { socket } = useContext(SocketContext);
    
        useEffect(() => {
            console.log(ride);
        }, [ride]);
    
        useEffect(() => {
            socket.on('ride-ended', ride => {
                props.setDriverProfile(false);
                props.setRideStarted(true);
            });
            // socket.on('ride-request', rideRequest => {
            //     console.log('Ride request received:', rideRequest);
            //     // Handle the ride request as needed
            // });
    
            return () => {
                socket.off('ride-end');
                socket.off('ride-request');
            };
        }, [socket]);
          
    return (
        <>
         <div className="flex flex-col justify-between items-center bg-white p-2">
                <div className='h-[100%] w-[100%] flex items-center mb-2 mt-2 justify-between'>
                    <div>
                    <img src={require('./autopng.png')} alt="uber" className='h-20' />
                    </div>
                    <div className='flex flex-col '>
                      <h2 className='text-sm font-bold'>{props.ride?.captain.fullName.firstName}</h2>
                      <h1 className='text-xl font-bold'>{props.ride?.captain.vehicle.noPlate}</h1>
                      <p className='text-base text-gray-600'>{props.ride?.captain.vehicle.vehicleType}</p>
                      <p className='text-sm font-medium'>OTP :-{props.otp}</p>
                    </div>
                </div>

                <div className='flex flex-row w-full h-15 items-center'>
                    <h2 className="flex w-10 items-center justify-center mx-3 flex-start"> <i className="fa fa-map-marker text-xl" aria-hidden="true"></i></h2>
                    <div>
                        <h1 className="font-bold text-xl mx-2 pt-1 pb-1">562/11-A </h1>
                        <p className="mx-2 pt-1 font-medium text-base text-gray-500">{props.destination}</p>
                    </div>
                </div>
                <hr className='w-full h-1 bg-gray-200 px-0 mt-2' />

                <div className='flex flex-row w-full py-2 h-14 items-center'>
                    <h2 className="flex w-10 items-center justify-center mx-3"> <i class="fa fa-credit-card-alt" aria-hidden="true"></i></h2>
                    <div>
                        <h1 className="font-bold text-xl mx-2 pt-2">{props.fare}</h1>
                        <p className="mx-2 pt-1 font-medium text-base text-gray-500">Cash Cash</p>
                    </div>
                </div>
            </div>
        </>
      );
}

export default DriverProfile;