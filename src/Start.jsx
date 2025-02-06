import { Link } from "react-router-dom";

function Start() {
    return ( 
        <div>
            <div className="bg-cover bg-center bg-[url(uberhome.jpg)] h-screen pt-8 flex w-full justify-between flex-col bg-red-400">
                <img className="w-20  ml-8" src="https://pluspng.com/img-png/uber-logo-vector-png-uber-icon-png-50-px-1600.png"></img>
                <div className="bg-white py-4 px-4">
                    <h2 className="text-3xl font-bold">Get Started with Uber</h2>
                    <Link  to='/user-login' className=" block w-full bg-black font-bold text-center text-white py-4 rounded mt-5">Continue</Link>
                </div>
            </div>
        </div>
      );
}

export default Start;