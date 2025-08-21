import { Sidebar } from "./components/sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex w-screen h-screen overflow-hidden">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
