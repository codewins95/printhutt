import localFont from "next/font/local";
import "./globals.css";
import '@/public/style.css';
import Layout from "@/components/Layout";
import 'animate.css';
import "aos/dist/aos.css";
import 'remixicon/fonts/remixicon.css'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});



export const metadata = {
  title: "Shop made for everyone’s dream Decoration - Print Hutt",
  description:
    "We are India No.1 neon light makers. We make customised neon lights and signs for your home, business or events. If you’re looking for a high-quality, custom neon sign maker, contact us at Neon Attack.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable}`}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
