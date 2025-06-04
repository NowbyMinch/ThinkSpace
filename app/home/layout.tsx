import { Afacad } from "next/font/google";
import { Sidebar } from "./components/sidebar";
import "./globals.css";

const afacad = Afacad({
  variable: "--font-afacad",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${afacad.variable} font-[Afacad] antialiased flex h-full `}>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
