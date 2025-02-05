"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isOpen, setIsOpen] = useState<null | boolean>(null); // Initially null to prevent SSR mismatch
    const menuRef = useRef<HTMLDivElement>(null);

    // This effect ensures that the state is only updated once the component is mounted on the client.
    useEffect(() => {
        // Set to false when mounted on the client, ensuring the menu starts closed.
        setIsOpen(false);
    }, []);

    // This effect handles the menu open/close and applies body scroll locking.
    useEffect(() => {
        if (isOpen === null) return; // Don't run logic until the component has mounted.

        if (isOpen) {
            document.body.style.overflow = "hidden";
            menuRef.current?.classList.remove("translate-x-full");
        } else {
            document.body.style.overflow = "auto";
            menuRef.current?.classList.add("translate-x-full");
        }
    }, [isOpen]);

    if (isOpen === null) return null; // Prevent rendering before the component is mounted

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-white/50 backdrop-blur-sm">
            <nav className="flex justify-between items-center px-6 md:px-12 lg:px-24 py-6">
                <Link
                    href="#home"
                    className="[text-sm tracking-widest hover:opacity-50 transition-opacity"
                >
                    Ajhcker
                </Link>
                <div className="hidden md:flex gap-8">
                    {["work", "skills", "about", "contact"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item}`}
                            className="text-sm tracking-widest hover:opacity-50 transition-opacity"
                        >
                            {item.toUpperCase()}
                        </Link>
                    ))}
                </div>
                <button
                    className="p-2 md:hidden z-50"
                    onClick={() => setIsOpen((prev) => !prev)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                ref={menuRef}
                className={`md:hidden fixed h-screen inset-0 bg-white z-40 flex flex-col items-center justify-center transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {["work", "skills", "about", "contact"].map((item) => (
                    <Link
                        key={item}
                        href={`#${item}`}
                        className="text-2xl tracking-widest hover:opacity-50 transition-opacity my-4"
                        onClick={() => setIsOpen(false)} // Close the menu when an item is clicked
                    >
                        {item.toUpperCase()}
                    </Link>
                ))}
            </div>
        </header>
    );
}
