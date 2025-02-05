"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";

export default function Contact() {
    const elementsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            elementsRef.current.forEach((element, index) => {
                gsap.from(element, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: element,
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
            id="contact"
            className="min-h-screen py-32 px-6 md:px-12 lg:px-24"
        >
            <div className="max-w-4xl">
                <h2
                    ref={(el) => (elementsRef.current[0] = el)}
                    className="text-4xl md:text-6xl font-bold mb-16"
                >
                    Let's Connect
                </h2>
                <div
                    ref={(el) => (elementsRef.current[1] = el)}
                    className="text-xl md:text-2xl mb-12"
                >
                    I&apos;m available for freelancing and I'm always interested
                    in hearing about new projects and opportunities.
                </div>
                <div
                    ref={(el) => (elementsRef.current[2] = el)}
                    className="flex flex-col md:flex-row gap-8"
                >
                    <a
                        href="mailto:ajayhacker03@gmail.com"
                        className="group flex items-center gap-4 text-lg hover:text-emerald-500 transition-colors"
                    >
                        <Mail className="w-6 h-6" />
                        <span className="border-b border-transparent group-hover:border-current">
                            ajayhacker03@gmail.com
                        </span>
                    </a>
                    <div className="flex gap-8">
                        <a
                            href="https://github.com/ajhacker03"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-emerald-500  transition-colors"
                        >
                            <Github className="w-6 h-6" />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/ajay-s-26203121b/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-emerald-500 transition-colors"
                        >
                            <Linkedin className="w-6 h-6" />
                        </a>
                        <a
                            href="https://instagram.com/ajhcker"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-emerald-500 transition-colors"
                        >
                            <Instagram className="w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
