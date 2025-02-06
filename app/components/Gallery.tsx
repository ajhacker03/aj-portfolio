"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import img from "../../public/sample.jpg";

const projects = [
    {
        id: 1,
        title: "#1 - Alimenture Industries",
        image: img,
        category: "Design and Developement",
        link: "https://alimenture.com/",
    },
    {
        id: 2,
        title: "#2 - Dune Fashions",
        image: img,
        category: "Development",
        link: "https://www.dunefashions.in/",
    },
    {
        id: 3,
        title: "#3 - Defy Design.Co - (WIP)",
        image: img,
        category: "Developement",
        link: "#",
    },
    {
        id: 4,
        title: "#4 - HighOn - (WIP)",
        image: img,
        category: "Developement",
        link: "#",
    },
    {
        id: 5,
        title: "#5 - HackSpyder - (WIP)",
        image: img,
        category: "Branding and Developement",
        link: "#",
    },
];

export default function Gallery() {
    const galleryRef = useRef(null);
    const itemsRef = useRef<(HTMLHeadingElement | null)[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            itemsRef.current.forEach((item, index) => {
                gsap.from(item, {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    delay: index * 0.2,
                    scrollTrigger: {
                        trigger: item,
                        start: "top bottom-=100",
                        end: "bottom center",
                        toggleActions: "play none none reverse",
                    },
                });
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <section id="work" className="min-h-screen">
            <h2 className="text-4xl md:text-6xl font-bold mb-16">Projects</h2>
            <div
                ref={galleryRef}
                className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-16"
            >
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        ref={(el: any) => (itemsRef.current[index] = el)}
                        className="group cursor-pointer"
                    >
                        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-4">
                            <Image
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-medium">
                                {project.title}
                            </h3>
                            <div className="flex items-center justify-between gap-4">
                                <div className="text-sm text-black/50">
                                    {project.category}
                                </div>
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-black/50 underline"
                                >
                                    Link
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
