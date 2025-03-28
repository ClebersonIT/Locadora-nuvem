import "./globals.css";
import { Header } from '../components/header';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home - Locadora de Veículos',
  description: 'Controlar cadastro de veículos!', 
  openGraph:{
    title: 'Home - Locadora de Veículos',
  },
  robots:{
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body

        className={`antialiased`}
      >
        <Header/>
        {children}
      </body>
    </html>
  );
}
