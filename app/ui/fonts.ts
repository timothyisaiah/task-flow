import { Geist, Geist_Mono } from "next/font/google";

export const GeistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
export const GeistMono = Geist_Mono({  
    variable: "--font-geist-mono",
    subsets: ["latin"],
});