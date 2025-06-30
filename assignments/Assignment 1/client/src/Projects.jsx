import ProfileButtons from "./ProfileButtons";

export default function ProjectsPage() {
    return (
        <>
        <div>
            {/* Project Card: 1 */}
            <div className="project-card flex flex-col justify-center items-center bg-gray-100 p-5 m-10 gap-3 rounded-[10px]">
                <div className="flex justify-center items-center gap-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-[5lvh]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                    </svg>
                    <h1 className="font-extrabold text-[4lvh]">Java Game - Deer Burger</h1>
                </div>
                <h1 className="font-bold text-[2.5lvh]">February - April 2025</h1>
                <h1 className="font-light text-[2.5lvh]">View/Test it out Now.</h1>
                <ProfileButtons />
                <div>
                    <h1 className="text-white bg-gray-400 rounded-full p-[3.5px] m-0.5 w-[2lh] flex justify-center">Java</h1>
                </div>
            </div>

            {/* Project Card: 2 */}
            <div className="project-card flex flex-col justify-center items-center bg-gray-100 p-5 m-10 gap-3 rounded-[10px]">
                <div className="flex justify-center items-center gap-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-[4.5lvh]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z" />
                    </svg>
                    <h1 className="font-extrabold text-[4lvh]">Personal Business - ElkExpedition™</h1>
                </div>
                <h1 className="font-bold text-[2.5lvh]">January - Present 2025</h1>
                <h1 className="font-light text-[2.5lvh]">View/Test it out Now.</h1>
                <ProfileButtons />
                <div className="flex justify-center gap-3">
                    <h1 className="text-white bg-gray-400 rounded-full p-[3.5px] m-0.5 w-[2.4lh] flex justify-center">React</h1>
                    <h1 className="text-white bg-gray-400 rounded-full p-[3.5px] m-0.5 w-[2.9lh] flex justify-center">NextJS</h1>
                    <h1 className="text-white bg-gray-400 rounded-full p-[3.5px] m-0.5 w-[4.4lh] flex justify-center">TailwindCSS</h1>
                    <h1 className="text-white bg-gray-400 rounded-full p-[3.5px] m-0.5 w-[2.5lh] flex justify-center">Redux</h1>
                </div>
            </div>

            {/* Project Card: 3 */}
            <div className="project-card flex flex-col justify-center items-center bg-gray-100 p-5 m-10 gap-3 rounded-[10px]">
                <div className="flex justify-center items-center gap-5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-[4.5lvh]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    <h1 className="font-extrabold text-[4lvh]">Server Hosting - MoleHosting™</h1>
                </div>
                <h1 className="font-bold text-[2.5lvh]">December 2024 - February 2025</h1>
                <h1 className="font-light text-[2.5lvh]">View/Test it out Now.</h1>
                <ProfileButtons />
            </div>
        </div>
        </>
    )
}