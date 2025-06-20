import { Sidebar } from "./components/sidebar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex w-full h-full pb-[0.75rem] ">
        <Sidebar />
        {children}
      </div>
    </>
  );
}
