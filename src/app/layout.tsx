import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Barani Kumar G | Founder & Entrepreneur",
  description:
    "Explore Barani Kumar G's businesses, including Axxeler Media, Axxeler AI Automation, AxxChat, and partnering ventures.",
  openGraph: {
    title: "Barani Kumar G | Founder & Entrepreneur",
    description: siteConfig.introduction,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
