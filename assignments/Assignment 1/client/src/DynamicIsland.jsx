import { useState } from "react";
import NavBar from "./NavBar";

export default function DynamicIsland() {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="bg-black border-t-black w-full h-2 fixed z-998">
            <div className="flex justify-center">
                <div
                className="dynamic-island-main"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                    <div className={`transition-opacity duration-150 ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                        <NavBar />
                    </div>
                </div>
            </div>
        </div>
    );
};