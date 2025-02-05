"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const skills = {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
    Backend: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],
    Tools: ["Git", "Docker", "AWS", "Figma", "VS Code"],
    Other: [
        "UI/UX Design",
        "Responsive Design",
        "SEO",
        "Performance Optimization",
        "Agile",
    ],
};

export default function Skills() {
    const categoriesRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            categoriesRef.current.forEach((category, index) => {
                gsap.from(category, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: category,
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
            id="skills"
            className="min-h-screen py-32 px-6 md:px-12 lg:px-24"
        >
            <h2 className="text-4xl md:text-6xl font-bold mb-16">
                Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {Object.entries(skills).map(([category, skillList], index) => (
                    <div
                        key={category}
                        ref={(el) => (categoriesRef.current[index] = el)}
                        className="space-y-6"
                    >
                        <h3 className="text-2xl font-medium">{category}</h3>
                        <div className="space-y-4">
                            {skillList.map((skill, i) => (
                                <div
                                    key={i}
                                    className="group flex items-center gap-4"
                                >
                                    <div className="h-[1px] w-8 bg-black/20 group-hover:w-16 group-hover:bg-emerald-400 transition-all duration-300" />
                                    <span className="text-lg  group-hover:text-emerald-400">
                                        {skill}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
