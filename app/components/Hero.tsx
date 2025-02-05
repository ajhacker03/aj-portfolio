"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
    const headingRef = useRef(null);
    const highlightRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Ensure initial state is set
            gsap.set(headingRef.current.children, {
                opacity: 0,
                y: 100,
            });
            gsap.set(highlightRef.current, {
                opacity: 0,
                x: -100,
            });

            // Animate heading lines
            gsap.to(headingRef.current.children, {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.5, // Add a slight delay to start after the loader
            });

            // Animate highlight word
            gsap.to(highlightRef.current, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                delay: 1, // Increase delay to start after heading animation
                ease: "power4.out",
            });
        });

        return () => ctx.revert();
    }, []);

    const handleMouseEnter = () => {
        gsap.to(highlightRef.current.querySelector(".underline"), {
            scaleX: 1,
            duration: 0.5,
            delay: 0.25,
            transformOrigin: "center",
            ease: "power4.in",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(highlightRef.current.querySelector(".underline"), {
            scaleX: 0,
            duration: 0.5,
            delay: 0.25,
            transformOrigin: "center",
            ease: "power4.out",
        });
    };

    return (
        <section className="w-screen min-h-screen flex items-center px-6 md:px-12 lg:px-24">
            <h1
                ref={headingRef}
                className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-tight tracking-tight max-w-6xl"
            >
                <div>I AM AJAY,</div>
                <div className="flex flex-wrap items-center gap-x-4">
                    <span>I CREATE</span>
                    <span
                        ref={highlightRef}
                        className="text-emerald-400 italic cursor-pointer relative"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        Unconventional
                        {/* Underline element */}
                        <span className="underline absolute bottom-0 left-0 w-full h-0.5 bg-emerald-400 scale-x-0 transform transition-all"></span>
                    </span>
                </div>
                <div>YET FUNCTIONAL &</div>
                <div>VISUALLY PLEASING</div>
                <div>INTERFACES FOR THE</div>
                <div>MOBILE AND WEB.</div>
            </h1>
        </section>
    );
}
