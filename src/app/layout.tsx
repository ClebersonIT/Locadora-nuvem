import "./globals.css";
import { Header } from "../components/header";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Locadora de Veículos",
  description: "Controlar cadastro de veículos!",
  openGraph: {
    title: "Locadora de Veículos",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Suspense
          fallback={
            <div className="animate-pulse w-full flex justify-center items-center">
              Carregando...
            </div>
          }
        >
          <Header />
          {children}
        </Suspense>
      </body>
    </html>
  );
}
