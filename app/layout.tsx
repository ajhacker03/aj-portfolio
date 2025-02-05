import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import type React from "react"; // Import React

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata = {
    title: "Ajay's Portfolio",
    description: "Design and Development Portfolio",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={spaceGrotesk.className}>{children}</body>
        </html>
    );
}
