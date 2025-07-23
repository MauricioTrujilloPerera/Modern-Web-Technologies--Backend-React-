import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Navbar from "./Navbar";
import Image from 'next/image';
import MainHomepageInfo from "./HomeInfo";
import FeaturedPage from "./Featured";

export default function HomePage() {
    const router = useRouter();
    const [visible, setVisible] = useState(false);

    const BookingClickHandler = (event) => {
        event.preventDefault();
        router.push('/components/HuntBookings');
    }

    useEffect(() => {
        const timer = setTimeout(() => { 
            setVisible(true);
        }, 100)

        

        return () => clearTimeout(timer);
    }, [])
    
    return (
        <>
        <div>
            <div className="flex justify-center">
                <div className="m-3 p-3 w-[1500px] h-[1000px] bg-cover bg-center rounded-x;" style={{ backgroundImage: "url('/gray-mountains.png')" }}>
                    <Navbar />
                    <div className={`website-logo flex justify-center flex-col transition-opacity duration-[3500ms] ${visible ? "opacity-100" : "opacity-0"}`} >
                        <div className="flex justify-center">
                            <Image src="/elkexpeditionlogo.png" alt="Elk Expedition Logo" className="website-logo" width={200} height={200}/>
                        </div>
                        <div className="flex flex-col text-center">
                            <p className="hunterra text-[5lvh] md:text-[10lvh]">Elk Expedition</p>
                            <p className="hunterra text-[2.5lvh] md:text-[5lvh] text-orange-400">Book your Hunt Today</p>
                        </div>
                    </div>
                    <div className="flex justify-center m-5">
                        <button 
                            className="hunter-button bg-gray-600 p-2 text-2xl hunterra rounded-xl cursor-pointer"
                            onClick={BookingClickHandler}
                            >Book Hunt
                        </button>
                    </div>
                </div>
            </div>
            {/* Extra Home Info */}
            <div>
                <div className="flex justify-center p-2 m-2">
                    <p className='hunterra text-2xl flex-col'>How it Works?</p>
                </div>
                <MainHomepageInfo />
            </div>

            {/* Featured */}
            <div>
                <div className="flex justify-center p-2 m-2">
                    <p className='hunterra text-2xl flex-col'>Featured Trips</p>
                </div>
                <FeaturedPage />
            </div>
        </div>
        </>
    )
}