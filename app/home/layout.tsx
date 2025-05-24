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
    <html lang="en">
      <body className={`${afacad.variable} font-[Afacad] antialiased flex`}>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
