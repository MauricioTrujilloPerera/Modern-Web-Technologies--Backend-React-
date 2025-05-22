import Navbar from "./Navbar";
import Image from 'next/image';

export default function HomePage() {

    const handleClickPlaceholder = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="m-3 p-3 w-[1500px] h-[1000px] bg-cover bg-center rounded-x;" style={{ backgroundImage: "url('/gray-mountains.png')" }}>
                    <Navbar />
                    <div>
                        {/* <Image source={require('/elkexpeditionlogo.png')} /> */}
                    </div>
                    <div className="flex flex-col text-center mt-40">
                        <p className="hunterra text-[10lvh]">Elk Expedition</p>
                        <p className="hunterra text-[5lvh] text-orange-600">Book your Hunt Today</p>
                    </div>

                    <div className="flex justify-center m-5">
                        <button 
                            className="hunter-button bg-gray-600 p-2 text-2xl hunterra rounded-xl cursor-pointer"
                            onClick={handleClickPlaceholder}
                                >Book Hunt
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}