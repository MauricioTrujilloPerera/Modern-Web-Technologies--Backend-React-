import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import Navbar from "./Navbar";
import Image from 'next/image';
import MainHomepageInfo from "./HomeInfo";
import FeaturedPage from "./Featured";

export default function HomePage() {
    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const [username, setUsername] = useState("");

    // Helper to update username from localStorage
    const updateUsername = () => {
        const storedUser = localStorage.getItem("elkexpedition_user");
        if (storedUser) {
            try {
                const userObj = JSON.parse(storedUser);
                setUsername(userObj.username || "");
            } catch {
                setUsername("");
            }
        } else {
            setUsername("");
        }
    };

    useEffect(() => {
        updateUsername();
        const timer = setTimeout(() => { 
            setVisible(true);
        }, 100)
        // Listen for storage changes (e.g., logout in another tab)
        window.addEventListener("storage", updateUsername);
        // Listen for route changes (e.g., after logout)
        const handleRouteChange = () => updateUsername();
        router.events?.on("routeChangeComplete", handleRouteChange);
        return () => {
            clearTimeout(timer);
            window.removeEventListener("storage", updateUsername);
            router.events?.off("routeChangeComplete", handleRouteChange);
        };
    }, [router]);
    
    const BookingClickHandler = (event) => {
        event.preventDefault();
        router.push('/components/HuntBookings');
    }
    
    return (
        <>
        <div>
            {/* Floating user badge */}
            {username && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center bg-gray-900 border-2 border-amber-400 rounded-2xl shadow-xl px-5 py-3 gap-4 backdrop-blur-md" style={{ minWidth: 220 }}>
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden border-2 border-amber-400">
                        {(() => {
                            const storedUser = localStorage.getItem("elkexpedition_user");
                            if (storedUser) {
                                try {
                                    const userObj = JSON.parse(storedUser);
                                    if (userObj.profilePic) {
                                        return <img src={userObj.profilePic} alt="Profile" className="object-cover w-full h-full" />;
                                    }
                                } catch {}
                            }
                            return (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                            );
                        })()}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-cream font-bold text-lg">{username}</span>
                        <span className="text-gray-400 text-xs">{(() => {
                            const storedUser = localStorage.getItem("elkexpedition_user");
                            if (storedUser) {
                                try {
                                    const userObj = JSON.parse(storedUser);
                                    return userObj.email;
                                } catch {}
                            }
                            return null;
                        })()}</span>
                    </div>
                </div>
            )}
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