export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;
import { Geist, Geist_Mono } from "next/font/google";
// import 'flowbite';
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Footer from "@/component/Footer";
import Clientlayout from "@/component/Clientlayout";
import { CartProvider } from "@/component/CartContext";
import SearchResult from "@/component/SearchResult";
import '@fortawesome/fontawesome-free/css/all.min.css';
import SessionWrapper from "@/component/SessionWrapper";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shopovix - Your One-Stop Online Store",
  description: "Shopovix offers premium quality products at best prices. Shop online easily and securely with fast delivery.",
  keywords: ["Shopovix", "Online Shopping", "E-commerce", "Premium Products", "Fast Delivery"],
  authors: [{ name: "Shopovix Team", url: "https://shopovix.store" }],
  openGraph: {
    title: "Shopovix - Your One-Stop Online Store",
    description: "Shopovix offers premium quality products at best prices. Shop online easily and securely with fast delivery.",
    url: "https://shopovix.store",
    siteName: "Shopovix",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shopovix - Your One-Stop Online Store",
    description: "Shopovix offers premium quality products at best prices. Shop online easily and securely with fast delivery.",
    images: ["/og-image.png"],
    creator: "@ardsuhail",
  },
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning >
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <SessionWrapper>
            <CartProvider>
              <SearchResult />
              <Clientlayout>{children}</Clientlayout>
              <Footer />
            </CartProvider>
          </SessionWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}


