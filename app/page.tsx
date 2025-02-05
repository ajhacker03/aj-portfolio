"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Loader from "./components/Loader";

gsap.registerPlugin(ScrollTrigger);

// Lazy-load components
const MagneticCursor = dynamic(() => import("./components/MagneticCursor"), { ssr: false });
const Header = dynamic(() => import("./components/Header"), { ssr: false });
const Hero = dynamic(() => import("./components/Hero"), { ssr: false });
const Gallery = dynamic(() => import("./components/Gallery"), { ssr: false });
const Skills = dynamic(() => import("./components/Skills"), { ssr: false });
const About = dynamic(() => import("./components/About"), { ssr: false });
const Contact = dynamic(() => import("./components/Contact"), { ssr: false });

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const mainRef = useRef(null);
    const heroRef = useRef(null);
    const sectionsRef = useRef<(HTMLHeadingElement | null)[]>([]);

    // Smooth scrolling for navbar links
    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            const targetId = e.currentTarget.getAttribute("href");
            if (!targetId?.startsWith("#")) return;
            const target = document.querySelector(targetId);
            if (!target) return;
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        },
        []
    );

    useEffect(() => {
        if (!isLoading) {
            const ctx = gsap.context(() => {
                // Set sections to be initially hidden
                gsap.set(heroRef.current, { opacity: 0, y: 50 });
                gsap.set(sectionsRef.current, { opacity: 0, y: 50 });

                // Animate Hero section first
                gsap.to(heroRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1.5,
                    ease: "power3.out",
                });

                // Animate other sections on scroll
                sectionsRef.current.forEach((section) => {
                    gsap.to(section, {
                        opacity: 1,
                        y: 0,
                        duration: 1.5,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 80%",
                            end: "bottom 60%",
                            scrub: 1.5,
                        },
                    });
                });

                // Attach smooth scrolling to navbar links
                const links = document.querySelectorAll('a[href^="#"]');
                links.forEach((link) =>
                    link.addEventListener("click", handleNavClick as any)
                );

                return () => {
                    ctx.revert();
                    links.forEach((link) =>
                        link.removeEventListener("click", handleNavClick as any)
                    );
                };
            });
        }
    }, [handleNavClick, isLoading]);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading ? (
                <Loader onLoadingComplete={handleLoadingComplete} />
            ) : (
                <div ref={mainRef} className="min-h-screen bg-white text-black">
                    <MagneticCursor />
                    <Header />
                    <main className="relative">
                        <section id="home" ref={heroRef} className="opacity-0">
                            <Hero />
                        </section>
                        <section
                            id="work"
                            ref={(el: any) => (sectionsRef.current[0] = el)}
                            className="px-6 md:px-12 lg:px-24 mb-32 opacity-0"
                        >
                            <Gallery />
                        </section>
                        <section
                            id="skills"
                            ref={(el: any) => (sectionsRef.current[1] = el)}
                            className="opacity-0"
                        >
                            <Skills />
                        </section>
                        <section
                            id="about"
                            ref={(el: any) => (sectionsRef.current[2] = el)}
                            className="opacity-0"
                        >
                            <About />
                        </section>
                        <section
                            id="contact"
                            ref={(el: any) => (sectionsRef.current[3] = el)}
                            className="opacity-0"
                        >
                            <Contact />
                        </section>
                    </main>
                </div>
            )}
        </>
    );
}
