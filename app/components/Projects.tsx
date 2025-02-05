"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const projects = [
    {
        title: "E-commerce Platform",
        description:
            "A full-stack e-commerce solution built with React and Node.js",
    },
    {
        title: "Task Management App",
        description:
            "A productivity app with real-time updates using Socket.io",
    },
    {
        title: "Social Media Dashboard",
        description:
            "An analytics dashboard for social media platforms using D3.js",
    },
];

export default function Projects({ sectionRef }) {
    const projectsRef = useRef(null);

    useEffect(() => {
        gsap.from(projectsRef.current.children, {
            opacity: 0,
            y: 100,
            stagger: 0.2,
            duration: 1,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "left center",
                end: "right center",
                scrub: 1,
            },
        });
    }, [sectionRef]);

    return (
        <section
            ref={sectionRef}
            className="w-screen h-screen flex flex-col items-center justify-center bg-gray-800"
        >
            <h2 className="text-4xl font-bold mb-12">Projects</h2>
            <div
                ref={projectsRef}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="bg-gray-900 rounded-lg shadow-lg p-6 transition-all duration-300 hover:bg-blue-600"
                    >
                        <h3 className="text-2xl font-semibold mb-4">
                            {project.title}
                        </h3>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
