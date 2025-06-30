import { useState, useEffect } from "react";
import InfiniteCarousel from "./DynamicInfiniteScroll";
import ProjectsPage from "./Projects";
import AboutMePage from "./About";

function Home() {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => { 
            setVisible(true);
        }, 100)

        return () => clearTimeout(timer);
    }, [])

    return (
        <div>
            <div class="p-3">
                <div class="flex gap-8 justify-center items-center mt-[3lh] relative">
                    <h1 class="text-gray-600 font-light text-[5lvh] opacity-0 animate-text-change">
                        Welcome
                    </h1>
                    <h1 class="text-gray-600 font-light text-[5lvh] opacity-0 animate-text-change animation-delay-5s">
                        Look Around
                    </h1>
                    <h1 class="text-gray-600 font-light text-[5lvh] opacity-0 animate-text-change animation-delay-8s">
                       Enjoy The View
                    </h1>
                </div>
                    <div className={`flex flex-col gap-3 justify-center items-center mt-[2lh] transition-opacity duration-[3000ms] ${visible ? "opacity-100" : "opacity-0"}`}>
                        {visible && (  // && means: if A is true, then do B. if A is false, ignore/skip B
                            <>
                                {/*MUST all be wrapped in a single parent element! either a div or <></> */}
                                <h1 className="text-gray-700 font-bold text-[4lvh]">Mauricio Trujillo Perera</h1>
                                <h1 className="text-gray-500 font-bold text-[3.2lvh]">Full-Stack Developer</h1>
                                <InfiniteCarousel />
                                <AboutMePage />
                                <ProjectsPage />
                            </>
                        )}
                    </div>
            </div>
        </div>
    )
}

export default Home;