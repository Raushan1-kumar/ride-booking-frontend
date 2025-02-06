import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { use, useEffect, useRef, useState } from "react";
import VehicleDetail from "./VehicleDetail";
import axios from "axios";

function VehicleShow(props) {
    const panelRef = useRef(null);
    const [panelOpen, setPanelOpen] = useState(false);
    const [fare, setFare]= useState(0);
    const [vehicleType, setVehicleType]=useState('')
    const bikefare=props.bikeFare;
    const autofare= props.autoFare;
    const carfare= props.carFare;
    const pickup=props.pickup;
    const destination=props.destination;

   useGSAP(function(){
     if(panelOpen){
         gsap.to(panelRef.current, { 
             height:'80%'
         })
     }
     else{
         gsap.to(panelRef.current, { 
             height:'0%'
         }
         )
     }
 },[panelOpen])

 const handlePanelOpen = (fare,vehicle) => {
    console.log(props.pickup);
    console.log(props.destination);
     setPanelOpen(true);
     setVehicleType(vehicle)
     props.setVehicleOpen(false)
     setFare(fare)

 }
 const handlePanelClose = () => {
     setPanelOpen(false);
 }
 
    return (
        <>
         <div className="mb-0">
                    <h3 className='text-xl mx-2 font-bold mb-4'>Choose your Vehicle...</h3>
                    <div className='flex border-2 active:border-black rounded-xl items-center mx-1 bg-white p-2 mb-2' onClick={()=>{handlePanelOpen(bikefare,'bike')} } >
                        <img src={require('./bike.jpeg')} alt="uber" className="h-10 w-10" />

                        <div className='px-4 pt-1 w-[50%]'>
                            <h3 className="text-black font-bold">UberGo <i className="fa fa-user h-5" aria-hidden="true"></i>1</h3>
                            <h4 className='text-sm font-medium'>2 mins away</h4>
                            <p className='text-xs font-medium text-gray-500'>Affordable, compact rides</p>
                        </div>
                        <div className='p-2 text-lg font-bold mx-2'>
                            <h1>Rs: {bikefare}</h1>
                        </div>
                        


                    </div>
                    <div className=' flex border-2 active:border-black rounded-xl items-center mx-1 bg-white p-2 ' onClick={()=>{handlePanelOpen(autofare,'auto')} }>
                        <img src={require('./autopng.png')} alt="uber" className="h-10 w-10" />

                        <div className='px-4 pt-1 w-[50%]'>
                            <h3 className="text-black font-bold">UberGo <i className="fa fa-user h-5" aria-hidden="true"></i>3</h3>
                            <h4 className='text-sm font-medium'>2 mins away</h4>
                            <p className='text-xs font-medium text-gray-500'>Affordable, compact rides</p>
                        </div>
                        <div className='p-2 text-lg font-bold mx-2'>
                            <h1>Rs: {autofare}</h1>
                        </div>


                    </div>
                  
                    <div className=' flex border-2 active:border-black rounded-xl items-center mx-1 bg-white p-2 mt-2 mb-6 'onClick={()=>{handlePanelOpen(carfare,'car')} }>
                        <img src={require('./carpng.webp')} alt="uber" className="h-10  w-10" />

                        <div className='px-4 pt-1 w-[50%]'>
                            <h3 className="text-black font-bold">UberGo <i className="fa fa-user h-5" aria-hidden="true"></i>4</h3>
                            <h4 className='text-sm font-medium'>2 mins away</h4>
                            <p className='text-xs font-medium text-gray-500'>Affordable, compact rides</p>
                        </div>
                        <div className='p-2 text-lg font-bold mx-2'>
                            <h1>Rs: {carfare}</h1>
                        </div>


                    </div>
                </div>
                <>
                                <div ref={panelRef} className="fixed   z-20 bottom-0  bg-white   w-full" >
                                <hr className='w-10 h-1 bg-gray-400 rounded-xl flex items-center justify-center mx-40 mt-2' onClick={handlePanelClose}/>
                                    <VehicleDetail setPanelOpen={setPanelOpen} fare={fare} pickup={pickup} destination={destination} vehicleType={vehicleType} />
                                </div>
                         
                    </>
        </>
      );
}

export default VehicleShow;