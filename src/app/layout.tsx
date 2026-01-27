import type { Metadata } from 'next';
import { Press_Start_2P, Inter } from 'next/font/google';
import '../index.css';

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
    display: 'swap',
});

const pressStart2P = Press_Start_2P({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-press-start-2p',
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Terry's Portfolio",
    description: "Full Stack AI Application Developer",
    icons: {
        icon: '/logo.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.className} ${pressStart2P.variable} antialiased`}>{children}</body>
        </html>
    );
}
