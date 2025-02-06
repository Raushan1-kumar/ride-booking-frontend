function RidePopUp(props) {
    const distance=localStorage.getItem('distance');
    const handleSearchDriver=()=>{

    }
    return (
        <>
            <div className="flex flex-col justify-between w-full items-center bg-white p-2">

                <h2 className='text-xl font-bold w-full  mt-2 mb-8'>New Rides Available!</h2>
                <div className="flex flex-row mb-2 justify-between bg-yellow-400 rounded-xl w-full">
                    <div className="flex flex-row  items-center">
                        <div className=" w-20 h-20 mx-2 my-2 flex justify-center items-center rounded-full overflow-hidden">
                            <img src="https://th.bing.com/th/id/OIP.05pqdFP-RHBKqVXCBZidzQHaE8?w=282&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7" className="w-full h-full object-cover"></img>
                        </div>
                        <div className=" flex justify-center items-center">
                            <h1 className="text-xl font-bold ml-2">mahesh</h1>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mr-4">
                        <h1 className="text-xl font-bold">{props.ride?.distance}</h1>
                    </div>

                </div>
                <div className='flex flex-row w-full h-20 py-2 my-2 items-center'>
                    <h2 className="flex w-10 items-center justify-center mx-3 flex-start"> <i className="fa fa-map-marker text-xl" aria-hidden="true"></i></h2>
                    <div className="">
                        <h1 className="font-bold text-xl mx-2 pt-1 pb-1">562/11-A </h1>
                        <p className="mx-2 pt-1 font-medium text-base text-gray-500">{props.ride?.pickup}</p>
                    </div>
                </div>
                <hr className='w-full h-1 bg-gray-200 px-0' />
                <div className='flex flex-row w-full py-2 h-17 items-center'>
                    <h2 className="flex w-10 items-center justify-center mx-3"> <i className="fa fa-map-marker text-xl" aria-hidden="true"></i></h2>
                    <div className="flex flex-col">
                        <h1 className="font-bold text-xl mx-2 pt-1 pb-1">562/11-A </h1>
                        <p className="mx-2 pt-1 font-medium text-base text-gray-500">{props.ride?.destination}</p>
                    </div>
                </div>
                <hr className='w-full h-1 bg-gray-200 px-0' />

                <div className='flex flex-row w-full py-2 h-17 items-center'>
                    <h2 className="flex w-10 items-center justify-center mx-3">  <i class="fa fa-credit-card-alt" aria-hidden="true"></i></h2>
                    <div>
                        <h1 className="font-bold text-xl mx-2 pt-1 pb-1">{props.ride?.fare}</h1>
                        <p className="mx-2 pt-1 font-medium text-base text-gray-500">Cash Cash</p>
                    </div>
                </div>

                
            </div>

        </>
    );
}

export default RidePopUp;