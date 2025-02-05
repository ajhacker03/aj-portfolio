"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface LoaderProps {
    onLoadingComplete: () => void;
}

export default function Loader({ onLoadingComplete }: LoaderProps) {
    const loaderRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (loaderRef.current) {
                    gsap.to(loaderRef.current, {
                        yPercent: -100,
                        duration: 0.8,
                        ease: "power4.inOut",
                        onComplete: onLoadingComplete,
                    });
                }
            },
        });

        tl.from(textRef.current, {
            yPercent: 100,
            duration: 1,
            ease: "power4.out",
        }).to(textRef.current, {
            yPercent: -100,
            duration: 1,
            ease: "power4.in",
            delay: 0.5,
        });
    }, [onLoadingComplete]);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black text-white"
        >
            <div className="overflow-hidden">
                <div ref={textRef} className="text-4xl font-bold">
                    Ajhcker
                </div>
            </div>
        </div>
    );
}
