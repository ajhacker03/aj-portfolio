"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import img from "../../public/sample.webp";

const projects = [
    {
        id: 1,
        title: "Project 1 - (Work in Progress)",
        image: img,
        category: "Design",
    },
    {
        id: 2,
        title: "Project 2 - (Work in Progress)",
        image: img,
        category: "Development",
    },
    {
        id: 3,
        title: "Project 3 - (Work in Progress)",
        image: img,
        category: "Branding",
    },
];

export default function Gallery() {
    const galleryRef = useRef(null);
    const itemsRef = useRef([]);

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
        <div
            ref={galleryRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12"
        >
            {projects.map((project, index) => (
                <div
                    key={project.id}
                    ref={(el) => (itemsRef.current[index] = el)}
                    className="group cursor-pointer"
                >
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4">
                        <Image
                            src={project.image || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">{project.title}</h3>
                        <span className="text-sm text-black/50">
                            {project.category}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
