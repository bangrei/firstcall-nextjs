import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Modal from "./components/Modal";
import Alert from "./components/Alert";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FirstCall QA",
  description: "Automate tests easily, in any spoken language, using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="absolute bg-gradient-to-tr from-teal-400 to-blue-500 h-64 w-full -z-50 top-0 left-0 filter blur-3xl opacity-50" />
        <main className="flex min-h-screen flex-col">
          <Header />
          <div className="p-4 md:px-20">{children}</div>
          <Footer />
        </main>
        <Modal />
        <Alert />
      </body>
    </html>
  );
}
