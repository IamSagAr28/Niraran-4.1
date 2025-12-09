import { ArrowRight } from "lucide-react";
import React, { useEffect, useState } from "react";

const FloatingCTA = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const workshopSection = document.getElementById("workshops");
        if (workshopSection) {
            const { top, bottom } = workshopSection.getBoundingClientRect();
            const isScrolledIntoView = top < window.innerHeight && bottom > 0;
            setIsVisible(isScrolledIntoView);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <a
            href="tel:+919129455565"
            className={`fixed bottom-8 right-8 z-50 flex-1 inline-flex items-center justify-center px-8 py-4 bg-[#F8D548] text-[#2A2A2A] rounded-xl font-bold hover:bg-[#DBB520] hover:text-white transition-all shadow-lg shadow-[#F8D548]/20 hover:shadow-xl hover:-translate-y-0.5 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
        >
            Book a Workshop
            <ArrowRight className="w-5 h-5 ml-2" />
        </a>
    );
};

export default FloatingCTA;