function DriverDetail() {
    return (
        <>
            <div className="flex flex-col h-full gap-1  w-full ">
                <div className="flex flex-row justify-between w-full">
                    <div className="flex flex-row  items-center">
                        <div className=" w-[30%] h-[70%] mx-2 my-5 flex justify-center items-center rounded-full overflow-hidden">
                            <img src="https://th.bing.com/th/id/OIP.05pqdFP-RHBKqVXCBZidzQHaE8?w=282&h=188&c=7&r=0&o=5&dpr=1.3&pid=1.7" className="w-full h-full object-cover"></img>
                        </div>
                        <div className=" flex justify-center items-center">
                            <h1 className="text-xl font-bold ml-2">Harsh Patel</h1>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center items-center mr-4">
                        <h1 className="text-2xl font-bold"><i className="fa text-xl fa-inr" aria-hidden="true"></i> 1232.30</h1>
                        <p className="text-sm font-medium text-gray-400">Earned</p>
                    </div>
                </div>
                <div className="h-[40%] w-[95%] flex justify-center items-center bg-gray-100 rounded-xl ml-2">
                    <div className="flex flex-row items-center justify-evenly w-full">
                        <div className="flex flex-col h-full my-1 ">
                            <h2 className="flex justify-center items-center"><i className="fa mt-2 text-xl text-green-800 fa-clock" aria-hidden="true"></i></h2>
                            <h1 className="text-xl font-bold text-center mt-1">10.2</h1>
                            <p className="text-sm font-medium text-gray-600">Hours Online</p>
                        </div>
                        <div className="flex flex-col h-full my-1 ">
                            <h2 className="flex justify-center items-center"><i className="fa text-xl text-black mt-2 fa-road" aria-hidden="true"></i></h2>
                            <h1 className="text-xl font-bold text-center mt-1">100.2 Km</h1>
                            <p className="text-sm font-medium text-gray-600">Distance Cover</p>
                        </div>
                        <div className="flex flex-col h-full my-1 mt-3 ">
                            <h2 className="flex justify-center items-center"><i className="fa text-xl fa-first-order" aria-hidden="true"></i></h2>
                            <h1 className="text-xl font-bold text-center mt-1">6</h1>
                            <p className="text-sm font-medium text-gray-600">Order Done</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default DriverDetail;