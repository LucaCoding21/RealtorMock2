import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Sophia Chen | Luxury Real Estate Vancouver",
  description:
    "Vancouver's premier luxury real estate specialist. Curating exceptional living spaces in Coal Harbour, West Vancouver, and beyond. 15+ years of excellence.",
  keywords: [
    "luxury real estate vancouver",
    "vancouver realtor",
    "coal harbour homes",
    "west vancouver real estate",
    "luxury homes",
    "penthouse vancouver",
  ],
  openGraph: {
    title: "Sophia Chen | Luxury Real Estate Vancouver",
    description:
      "Vancouver's premier luxury real estate specialist. Curating exceptional living spaces.",
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased noise-overlay">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
