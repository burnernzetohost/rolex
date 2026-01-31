import type { Metadata } from "next";
import localFont from "next/font/local"; // Import localFont
import "./globals.css";

// Define the custom font
const theSeasons = localFont({
  src: "../public/fonts/Fontspring-DEMO-theseasons-bd.otf",
  variable: "--Fontspring-theseasons-bd",
});

export const metadata: Metadata = {
  title: "Rolex Submariner",
  description: "Luxury Swiss dive watch experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Add the font variable to the body class */}
      <body className={`${theSeasons.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}