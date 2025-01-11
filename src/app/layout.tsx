import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import Header from "@/components/shared/Header";
import { CartContextProvider } from "@/components/shared/CartContext";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "Developed by Sidak Marwah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`antialiased`}
      >
        <CartContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >


            <Header />

            <div className="container my-10">

              {children}

            </div>

            <Footer />

          </ThemeProvider>

        </CartContextProvider>

      </body>
    </html>
  );
}
