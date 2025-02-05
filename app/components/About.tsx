"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function About() {
    const textRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            textRefs.current.forEach((text, index) => {
                gsap.from(text, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: text,
                        start: "top bottom-=100",
                        end: "bottom center",
                        toggleActions: "play none none reverse",
                    },
                    delay: index * 0.2,
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="about"
            className="min-h-screen py-32 px-6 md:px-12 lg:px-24 bg-black text-white"
        >
            <div className="max-w-4xl">
                <h2
                    ref={(el) => (textRefs.current[0] = el)}
                    className="text-4xl md:text-6xl font-bold mb-16"
                >
                    About Me
                </h2>
                <div
                    ref={(el) => (textRefs.current[1] = el)}
                    className="text-xl md:text-2xl leading-relaxed space-y-8"
                >
                    <p>
                        I'm a Full Stack Developer with a passion for creating
                        beautiful, functional, and user-centered digital
                        experiences.
                    </p>
                    <p>
                        With 2+ years of experience in web development, I
                        specialize in building modern web applications using
                        React, Next.js, and Node.js.
                    </p>
                    <p>
                        I believe in writing clean, maintainable code and
                        creating intuitive user interfaces that make technology
                        accessible to everyone.
                    </p>
                </div>
            </div>
        </section>
    );
}
