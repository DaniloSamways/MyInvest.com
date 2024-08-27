import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MyInvest",
  description:
    "MyInvest é um site de investimentos, onde traz os principais indicadores para verificar se você está fazendo um bom investimento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} dark`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
