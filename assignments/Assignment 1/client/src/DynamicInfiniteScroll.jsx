export default function InfiniteCarousel() {
    return  (
        <div className="flex overflow-hidden mt-10 bg-black">
            <ul className="flex gap-10 bg-black text-white py-4 animate-infinite-carousel-scroll">
                {/* Duplicating the 'carouselItems' so it loops seamlessly */}
                {[...carouselItems, ...carouselItems].map((carouselItems, index) => (
                    <li key={index} className="flex gap-2 font-bold">{carouselItems.text}</li>
                ))}
            </ul>
        </div>
    )
}

const carouselItems = [
    { text: "React" },
    { text: "JavaScript" },
    { text: "Tailwind CSS" },
    { text: "Next.js" },
    { text: "Node.js" },
    { text: "MongoDB" },
    { text: "Express" },
    { text: "TypeScript" },
    { text: "Figma" },
    { text: "Git & GitHub" },
    { text: "Responsive Design" },
    { text: "API Integration" },
    { text: "Problem Solving" },
    { text: "Team Collaboration" },
];