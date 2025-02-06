import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import VehicleShow from "./VehicleShow";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

function LocationSearchPanel({props}) {
     const panelRef = useRef(null);
       const vehicleRef= useRef(null);
       const [vehicleOpen,setVehicleOpen] = useState(false);
       const [panelOpen, setPanelOpen] = useState(false);

      useGSAP(function(){
        if(panelOpen){
            gsap.to(panelRef.current, { 
                height:'52%'
            })
        }
        else{
            gsap.to(panelRef.current, { 
                height:'0%'
            }
            )
        }
    },[panelOpen])


    useGSAP(function(){
        if(vehicleOpen){
            gsap.to(vehicleRef.current, { 
                height:'52%'
            })
        }
        else{
            gsap.to(vehicleRef.current, { 
                height:'0%'
            }
            )
        }
    },[vehicleOpen])
    
    const handlePanelOpen = () => {
        setPanelOpen(true);
    }
    const handlePanelClose = () => {
        setPanelOpen(false);
    }
    
    useEffect(()=>{
        console.log(props);
    })
    return (
        <>
            {/* //This is just sample data, you can replace it with your own data
         */}
            <div className="scroll-smooth h-[100%] overflow-y-auto" >
               
            
           
            </div>

        </>
    );
}

export default LocationSearchPanel;