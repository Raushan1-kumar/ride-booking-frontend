import axios from "axios";
import { useNavigate } from "react-router-dom";


function CaptainLogout() {
    const navigate= useNavigate();
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/captain-login');
    }
   
    
    axios.get('https://ride-booking-backend.onrender.com/captains/logout',{
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((result)=>{
        if(result){
            console.log(result);
            localStorage.removeItem('token');
            navigate('/captain-login');
            
        }
    })
    .catch((error)=>{
        console.log(error);
    })

    return ( 
        <div>
            <h1>Logout</h1>
        </div>
     );
}

export default CaptainLogout;


// {suggestion ? suggestion.map((suggestion, index) => (
//     <div key={index} ref={panelRef} className="bg-white h-full" onClick={closeOpenPanel}>
//         <div className="bg-white mb-4 active:border-black flex items-center rounded-lg justify-center hover:bg-gray-200 cursor-pointer" onClick={() => { setVehicleOpen(true); setPanelOpen(false) }}>
//             <h2 className="flex w-10 items-center mx-3 justify-center "> <i className="fa fa-map-marker text-xl" aria-hidden="true"></i></h2>
//             <h1 className="font-medium mx-2 pt-1 pb-1"> {suggestion} </h1>
//         </div>
//     </div>
// )) : null}
