import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const useLenis = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            // easing: (t) => 1 - Math.pow(1 - t, 3),
            // Enable smooth scrolling on touch devices
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);
};

export default useLenis;
