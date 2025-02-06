import { useContext, useEffect, useState } from 'react';
import { SocketContext } from "../context/socketContext";

function SearchDriver(props) {
    const [ride, setRide] = useState(null);
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        console.log(ride);
    }, [ride]);

    useEffect(() => {
        socket.on('ride-confirmed', ride => {
            props.setSearchDriver(false);
            props.setDriverProfile(true);
            setRide(ride);
            props.setRide(ride);
        });

        // socket.on('ride-request', rideRequest => {
        //     console.log('Ride request received:', rideRequest);
        //     // Handle the ride request as needed
        // });

        return () => {
            socket.off('ride-confirmed');
            socket.off('ride-request');
        };
    }, [socket]);

    return (
        <div className="flex flex-col justify-between items-center bg-white p-2">
            <h2 className='text-xl font-bold mb-2 mt-2'>Looking for Driver...</h2>
            <div className='loader w-full h-1 bg-gray-200 px-0'></div>
            <div className='h-[100%] w-[40%] flex items-center mb-2 rounded-full mt-2 bg-gray-200 justify-center'>
                <img src={require('./autopng.png')} alt="uber" className='h-20' />
            </div>
            <div className='flex flex-row w-full h-20 py-2 my-2 items-center'>
                <h2 className="flex w-10 items-center justify-center mx-3 flex-start"> <i className="fa fa-map-marker text-xl" aria-hidden="true"></i></h2>
                <div>
                    <h1 className="font-bold text-xl mx-2 pt-1">562/11-A </h1>
                    <p className="mx-2  font-medium text-base pb-1 text-gray-500">{props.pickup}</p>
                </div>
            </div>
            <hr className='w-full h-1 bg-gray-200 px-0' />
            <div className='flex flex-row w-full py-2 h-20 items-center'>
                <h2 className="flex w-10 items-center justify-center mx-3"> <i className="fa text-xl font-bold fa-plus" aria-hidden="true"></i></h2>
                <div className="flex flex-col">
                    <h1 className="font-bold text-xl mx-2 pt-1 ">663/23-R </h1>
                    <p className="mx-2  font-medium text-base text-gray-500">{props.destination}</p>
                </div>
            </div>
            <hr className='w-full h-1 bg-gray-200 px-0' />
            <div className='flex flex-row w-full py-2 h-15 pt-1 pb-1 items-center'>
                <h2 className="flex w-10 items-center justify-center mx-3"> <i className="fa fa-credit-card-alt" aria-hidden="true"></i></h2>
                <div>
                    <h1 className="font-bold text-xl mx-2 pt-1 pb-1">{props.fare}</h1>
                    <p className="mx-2 pt-1 font-medium text-base text-gray-500">Cash Cash</p>
                </div>
            </div>
        </div>
    );
}

export default SearchDriver;