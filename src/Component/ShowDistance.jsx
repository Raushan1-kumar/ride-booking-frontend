
function ShowDistance(props) {
   const distance  = localStorage.getItem('distance')
   const handlePanel=()=>{
    props.setPanelOpen(false);
    props.setFinishRide(true);
   }

    return (
        <>
            <div className="flex w-full flex-col gap-2 bg-yellow-300">
                <div className="flex justify-center items-center">
                    <h2><i className="fa text-xl font-bold fa-angle-up" aria-hidden="true" onClick={handlePanel}></i></h2>
                </div>
                <div className="flex flex-row justify-evenly items-center mb-10 w-full">
                    <h1 className="text-xl font-bold">{distance} away</h1>
                    <button className='w-[50%] mt-2 font-bold rounded-xl bg-green-600 text-white p-2 ' onClick={handlePanel}>Complete Ride</button>
                </div>
            </div>
            
        </>

    );
}

export default ShowDistance;