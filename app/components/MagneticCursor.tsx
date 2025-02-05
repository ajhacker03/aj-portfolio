"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function MagneticCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        let clientX = -100;
        let clientY = -100;
        let lastX = 0;
        let lastY = 0;
        let isHovered = false;
        let magneticElements: NodeListOf<Element>;

        const initCursor = () => {
            document.addEventListener("mousemove", (e: MouseEvent) => {
                clientX = e.clientX;
                clientY = e.clientY;
            });

            const render = () => {
                if (isHovered) return;
                lastX += (clientX - lastX) * 0.2;
                lastY += (clientY - lastY) * 0.2;

                if (cursor) {
                    gsap.set(cursor, {
                        x: lastX,
                        y: lastY,
                    });
                }

                requestAnimationFrame(render);
            };
            requestAnimationFrame(render);
        };

        const initHovers = () => {
            const handleMouseEnter = (e: MouseEvent) => {
                const target = e.currentTarget as HTMLElement;
                if (!cursor || isHovered) return;

                isHovered = true;
                gsap.to(cursor, {
                    scale: 4,
                    backgroundColor: "rgb(52, 211, 153)", // emerald-400
                    opacity: 0.2,
                    border: "none",
                    duration: 0.3,
                });

                const handleMouseMove = (e: MouseEvent) => {
                    const rect = target.getBoundingClientRect();
                    const targetX = rect.left + rect.width / 2;
                    const targetY = rect.top + rect.height / 2;
                    const deltaX = e.clientX - targetX;
                    const deltaY = e.clientY - targetY;

                    gsap.to(cursor, {
                        x: targetX + deltaX * 0.1,
                        y: targetY + deltaY * 0.1,
                        duration: 0.2,
                    });
                };

                document.addEventListener("mousemove", handleMouseMove);

                const handleMouseLeave = () => {
                    isHovered = false;
                    document.removeEventListener("mousemove", handleMouseMove);
                    gsap.to(cursor, {
                        scale: 1,
                        backgroundColor: "transparent",
                        opacity: 1,
                        border: "2px solid rgb(52, 211, 153)",
                        duration: 0.3,
                    });
                };

                target.addEventListener("mouseleave", handleMouseLeave, {
                    once: true,
                });
            };

            magneticElements = document.querySelectorAll("a, button");
            magneticElements.forEach((element) => {
                element.addEventListener(
                    "mouseenter",
                    handleMouseEnter as EventListener
                );
            });
        };

        initCursor();
        initHovers();

        return () => {
            magneticElements?.forEach((element) => {
                element.replaceWith(element.cloneNode(true));
            });
        };
    }, []);

    return (
        <div
            ref={cursorRef}
            className="hidden md:block fixed pointer-events-none z-[9999] w-4 h-4 rounded-full border-2 border-emerald-400 -translate-x-1/2 -translate-y-1/2"
        />
    );
}
