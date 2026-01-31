import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import CustomCursor from "@/components/CustomCursor";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Alex Rivera | Real Estate Vancouver",
  description:
    "Vancouver real estate made simple. Find your next home with a realtor who actually gets it.",
  keywords: [
    "vancouver real estate",
    "vancouver realtor",
    "homes for sale vancouver",
    "buy house vancouver",
    "real estate agent",
  ],
  openGraph: {
    title: "Alex Rivera | Real Estate Vancouver",
    description:
      "Vancouver real estate made simple. Find your next home with a realtor who actually gets it.",
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
    <html lang="en" className={jakarta.variable}>
      <body className="antialiased overflow-x-hidden">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
